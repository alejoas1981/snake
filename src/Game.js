// src/Game.js

import Snake from './Snake';
import Food from './Food';
import Grid from './Grid';
import Renderer from './Renderer';
import InputHandler from './InputHandler';

class Game {
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.grid = new Grid(20, 20); // Размеры игрового поля
        this.renderer = new Renderer();
        this.inputHandler = new InputHandler(this.snake);
    }

    start() {
        // Запуск игрового цикла
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop() {
        // Основной цикл игры
        this.snake.move();
        if (this.snake.checkCollision(this.food)) {
            this.snake.grow();
            this.food.reposition(this.grid);
        }
        this.renderer.render(this.snake, this.food);
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

export default Game;