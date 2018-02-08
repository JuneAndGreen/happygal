'use strict';

const path = require('path');
const Args = require('../src/args');

const gameConfig = path.join(__dirname, './game.config.js');

// new Args(['-w', '-d', __dirname, '-c', gameConfig]); // web版
new Args(['-i', '-d', __dirname, '-c', gameConfig]); // 带安装程序
// new Args(['-d', __dirname, '-c', gameConfig]); // 不带安装程序