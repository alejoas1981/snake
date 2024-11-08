// src/main.js

import './styles.less';
import Game from './Game';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.start();
});