const path = require('path');
const Easycmd = require('easycmd');
const HappyGal = require('../index');

const config = require('../package.json');


let cmdConfig = {
    version: config.version,
    help: `
        Usage: ${config.name} [options]

        Options:
            -h, --help                   输出使用指南
            -v, --version                输出版本信息
            -d <gameDirPath>             游戏根目录，默认是当前目录
            -c <gameConfigFilePath>      游戏配置文件，默认是game.config.js
    `,
    options: [
        { alias: 'd', hasParam: true },
        { alias: 'c', hasParam: true },
    ]
};

class Args {
    constructor(args) {
        this.easycmd = new Easycmd(cmdConfig);
        this.happyGal = new HappyGal();

        let result = this.easycmd.run(args);
        let { cmds } = result;

        cmds.forEach(cmd => {
            if (cmd.alias && this['_' + cmd.alias]) this['_' + cmd.alias](cmd.value);
        });

        this.happyGal.run();
    }

    _d(gameDirPath) {
        this.happyGal.setGameDirPath(gameDirPath);
    }

    _c(gameConfigFilePath) {
        this.happyGal.setGameConfigPath(gameConfigFilePath);
    }
}

module.exports = Args;
