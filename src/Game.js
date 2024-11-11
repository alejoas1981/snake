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
        this.grid = new Grid(20, 20);
        this.renderer = new Renderer();
        new InputHandler(this.snake); // Initialize InputHandler without saving to `this`

        this.score = 0;
        this.isGameOver = false;
        this.speed = 200; // Initial speed in milliseconds (higher = slower)

        this.food.reposition(this.grid);
    }

    start() {
        this.gameLoop();
    }

    gameLoop() {
        if (this.isGameOver) return;

        this.snake.move();

        if (this.snake.checkCollision(this.food.getPosition())) {
            this.snake.grow();
            this.food.reposition(this.grid);
            this.score++;
            document.getElementById('score').textContent = `Score: ${this.score}`;

            // Optionally increase speed slightly with each food collected
            this.speed = Math.max(this.speed - 5, 50); // Minimum speed of 50ms
        }

        if (this.checkWallCollision() || this.snake.checkSelfCollision()) {
            this.endGame();
            return;
        }

        this.renderer.render(this.snake, this.food);

        // Call gameLoop with a delay for controlled speed
        setTimeout(() => this.gameLoop(), this.speed);
    }

    checkWallCollision() {
        const head = this.snake.segments[0];
        return head.x < 0 || head.x >= this.grid.width || head.y < 0 || head.y >= this.grid.height;
    }

    endGame() {
        this.isGameOver = true;
        document.getElementById('score').textContent = `Game Over! Final Score: ${this.score}`;
        document.getElementById('restartButton').style.display = 'block';
    }

    restart() {
        this.isGameOver = false;
        this.snake = new Snake();
        this.food.reposition(this.grid);
        this.score = 0;
        this.speed = 200; // Reset speed
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('restartButton').style.display = 'none';
        this.start();
    }
}

export default Game;
