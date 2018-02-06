'use strict';

const path = require('path');
const Args = require('../src/args');

const gameConfig = path.join(__dirname, './game.config.js');

new Args(['-d', __dirname, '-c', gameConfig]);