'use strict';

import './main.less';
import Game from './component/main/game';

let game = new Game(window.data);

game.render('#cnt');