const path = require('path');
const fs = require('fs');
const vm = require('vm');
const os = require('os');

const builder = require('electron-builder');

const _ = require('./utils/utils');

const cwd = process.cwd();
const appTemp = path.join(os.tmpdir(), './happyGal');

_.mkDir(appTemp);

class HappyGal {
    constructor() {
        this.needInstaller = false;
        this.onlyWeb = false;
        this.gameDirPath = cwd;
        this.gameConfigFilePath = path.join(cwd, './game.config.js');
    }

    /**
     * 需要同时生成安装程序
     */
    setNeedInstaller(flag) {
        this.needInstaller = !!flag;
    }

    /**
     * 只生成web版游戏
     */
    setOnlyWeb(flag) {
        this.onlyWeb = !!flag;
    }

    /**
     * 设置游戏根目录
     */
    setGameDirPath(gameDirPath) {
        gameDirPath = _.formatPath(gameDirPath);

        this.gameDirPath = gameDirPath;
    }

    /**
     * 设置游戏配置文件
     */
    setGameConfigPath(gameConfigFilePath) {
        gameConfigFilePath = _.formatPath(gameConfigFilePath);

        this.gameConfigFilePath = gameConfigFilePath;
    }

    /**
     * 将相对游戏目录的路径转成绝对路径
     */
    transformToAbsolute(filePath, dir) {
        dir = dir || this.gameDirPath;

        return _.isAbsolute(filePath) ? filePath : path.join(dir, filePath);
    }

    /**
     * 读取游戏配置文件
     */
    readGameConfig() {
        let data = '{}';
        let sandbox = { config: {} };

        // 读取
        try {
            data = fs.readFileSync(this.gameConfigFilePath);
        } catch (err) {
            _.error(`${this.gameConfigFilePath} 文件不存在！`);
        }

        // 解析
        try {
            vm.createContext(sandbox);
            vm.runInContext(`config = ${data}`, sandbox);
        } catch (err) {
            _.error(`${this.gameConfigFilePath} 格式错误，无法解析！`);
        }

        this.gameConfig = sandbox.config;
    }

    /**
     * 将临时目录的生成文件拷贝到目标目录
     */
    generate(distDirPath, buildTemp, isInstaller) {
        let gameConfig = this.gameConfig;
        let ext = '';
        let subDir = '';
        let suffix = '';
        if (process.platform === 'darwin') {
            ext = isInstaller ? 'dmg' : 'app';
            subDir = isInstaller ? '' : 'mac';
        } else if (process.platform === 'win32') {
            ext = 'exe';
            suffix = isInstaller ? '-installer' : '';
        }
        let source = path.join(buildTemp, subDir, `${gameConfig.name}-happyGal${suffix}.${ext}`);
        let target = path.join(distDirPath, `${gameConfig.name}-happyGal${suffix}.${ext}`);

        _.rmDir(target);

        // 拷贝生成文件到目标目录
        fs.accessSync(source);
        fs.renameSync(source, target);
    }

    /**
     * 开始生成游戏
     */
    run() {
        this.gameDirPath = this.transformToAbsolute(this.gameDirPath, cwd);
        this.gameConfigFilePath = this.transformToAbsolute(this.gameConfigFilePath);

        this.readGameConfig();

        let gameConfig = this.gameConfig;
        let distDirPath = this.transformToAbsolute(gameConfig.dist); // 生成目录
        let iconPath = this.transformToAbsolute(gameConfig.icon); // 游戏图标

        _.mkDir(distDirPath); // 保证生成目录一定存在
        _.emptyDir(appTemp); // 清空系统临时目录

        let webTemp = path.join(distDirPath, './_happyGalWebTemp');
        _.rmDir(webTemp); // 如果已存在临时目录，则干掉
        _.mkDir(webTemp); // 保证web临时目录一定存在

        // 初始化游戏生成环境
        let templateDir = path.join(__dirname, './template');
        ['package.json', 'page.html', 'window.js'].forEach(file => {
            _.copyFile(file, templateDir, appTemp);
        });

        if (this.onlyWeb) {
            // 只生成web版
            
            // TODO
        } else {
            let buildTemp = path.join(distDirPath, './_happyGalBuildTemp');
            _.rmDir(buildTemp); // 如果已存在临时目录，则干掉
            _.mkDir(buildTemp); // 保证生成临时目录一定存在

            builder.build({
                config: {
                    appId: `com.june01.happyGal.${gameConfig.name}`,
                    productName: gameConfig.name,
                    directories: {
                        output: buildTemp,
                        app: appTemp,
                    },
                    win: {
                        artifactName: '${productName}-happyGal.${ext}',
                        icon: iconPath,
                        target: this.needInstaller ? ['portable', 'nsis'] : 'portable'
                    },
                    mac: {
                        artifactName: '${productName}-happyGal.${ext}',
                        icon: iconPath,
                        target: this.needInstaller ? ['dir', 'dmg'] : 'dir'
                    },
                    nsis: {
                        oneClick: false,
                        allowToChangeInstallationDirectory: true,
                        artifactName: '${productName}-happyGal-installer.${ext}',
                        deleteAppDataOnUninstall: true,
                        menuCategory: 'happyGal',
                        shortcutName: gameConfig.name
                    }
                }
            }).then(res => {
                try {
                    this.generate(distDirPath, buildTemp);
                    if (this.needInstaller) this.generate(distDirPath, buildTemp, true);

                    _.emptyDir(appTemp);
                    _.rmDir(buildTemp);
                    _.rmDir(webTemp);
                    
                    console.log(`生成完毕！生成目录：${distDirPath}`);
                } catch (err) {
                    _.emptyDir(appTemp);
                    _.rmDir(buildTemp);
                    _.rmDir(webTemp);

                    // console.error(err);
                    _.error('生成失败！');
                }
            }).catch(err => {
                _.emptyDir(appTemp);
                _.rmDir(buildTemp);
                _.rmDir(webTemp);

                // console.error(err);
                _.error('生成失败！');
            })
        }
    }
}

module.exports = HappyGal;
