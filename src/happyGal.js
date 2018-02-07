const path = require('path');
const fs = require('fs');
const vm = require('vm');
const os = require('os');

const builder = require('electron-builder');

const _ = require('./utils/utils');

const cwd = process.cwd();
const tmp = path.join(os.tmpdir(), './happyGal'); // 临时目录

class HappyGal {
    constructor() {
        this.needInstaller = false;
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
    generate(distDirPath, isInstaller) {
        let gameConfig = this.gameConfig;
        let ext = '';
        let prefix = '';
        if (process.platform === 'darwin') {
            ext = isInstaller ? '.dmg' : '.app';
            prefix = isInstaller ? '' : 'mac';
        } else if (process.platform === 'win32') {
            ext = isInstaller ? '.exe' : '.exe';
            prefix = isInstaller ? '' : 'win';
        }
        let source = path.join(tmp, prefix, `${gameConfig.name}${ext}`);
        let target = path.join(distDirPath, `${gameConfig.name}${ext}`);

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
        _.mkDir(tmp); // 保证临时目录一定存在
        _.emptyDir(tmp); // 清空临时目录

        builder.build({
            config: {
                appId: `com.june01.happyGal.${gameConfig.name}`,
                productName: gameConfig.name,
                directories: {
                    buildResources: path.join(__dirname, './temp'),
                    output: tmp,
                    app: path.join(__dirname, './template'),
                },
                win: {
                    artifactName: '${productName}.${ext}',
                    icon: iconPath,
                    target: 'portable'
                },
                mac: {
                    artifactName: '${productName}.${ext}',
                    icon: iconPath,
                    target: this.needInstaller ? ['dir', 'dmg'] : 'dir'
                }
            }
        }).then(res => {
            try {
                this.generate(distDirPath);
                if (this.needInstaller) this.generate(distDirPath, true);

                _.emptyDir(tmp);
                console.log(`生成完毕！生成目录：${distDirPath}`);
            } catch (err) {
                _.emptyDir(tmp);
                console.error(err);
                _.error('生成失败！');
            }
        }).catch(err => {
            _.emptyDir(tmp);
            _.error('生成失败！');
        })
    }
}

module.exports = HappyGal;
