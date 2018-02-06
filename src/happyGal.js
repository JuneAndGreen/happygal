const path = require('path');
const fs = require('fs');
const vm = require('vm');

const builder = require('electron-builder');

const _ = require('./utils/utils');

const cwd = process.cwd();

class HappyGal {
    constructor() {
        this.gameDirPath = cwd;
        this.gameConfigFilePath = path.join(cwd, './game.config.js');
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
     * 开始生成游戏
     */
    run() {
        this.gameDirPath = this.transformToAbsolute(this.gameDirPath, cwd);
        this.gameConfigFilePath = this.transformToAbsolute(this.gameConfigFilePath);

        this.readGameConfig();

        let gameConfig = this.gameConfig;
        let distDirPath = this.transformToAbsolute(gameConfig.dist); // 生成目录
        let iconPath = this.transformToAbsolute(gameConfig.icon); // 游戏图标

        _.mkdir(distDirPath); // 保证生成目录一定存在

        builder.build({
            config: {
                appId: `com.june01.happyGal.${gameConfig.name}`,
                productName: gameConfig.name,
                directories: {
                    buildResources: path.join(__dirname, './temp'),
                    output: distDirPath,
                    app: path.join(__dirname, './template'),
                },
                win: {
                  icon: iconPath,
                },
                mac: {
                  icon: iconPath,
                  target: 'dmg'
                }
            }
        }).then(res => {
            console.log(`生成完毕！生成目录：${distDirPath}`);
        }).catch(err => {
            _.error('生成失败！');
        })
    }
}

module.exports = HappyGal;
