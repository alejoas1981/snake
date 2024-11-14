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
        this.renderer = new Renderer();

        this.score = 0;
        this.isGameOver = false;
        this.speed = null; // Speed will be set based on selection

        // Calculate grid dimensions based on canvas size and cellSize from Renderer
        const cellSize = this.renderer.cellSize;
        this.grid = {
            width: Math.floor(this.renderer.canvas.width / cellSize),
            height: Math.floor(this.renderer.canvas.height / cellSize)
        };

        this.food.reposition(this.grid);

        // UI elements
        this.startButton = document.getElementById('startButton');
        this.speedSelect = document.getElementById('speedSelect');
        this.restartButton = document.getElementById('restartButton');

        // Event listeners for UI
        this.speedSelect.addEventListener('change', () => {
            this.setSpeed();
        });
        this.startButton.addEventListener('click', () => {
            this.start();
        });
        this.restartButton.addEventListener('click', () => {
            this.restart();
        });

        // Event listeners for key hold and release
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    setSpeed() {
        // Set speed based on selected value from dropdown
        const selectedValue = this.speedSelect.value;
        switch (selectedValue) {
            case 'slow':
                this.baseSpeed = 500; // Slow speed
                break;
            case 'medium':
                this.baseSpeed = 200; // Medium speed
                break;
            case 'fast':
                this.baseSpeed = 100; // Fast speed
                break;
            default:
                this.baseSpeed = 200;
        }

        this.speed = this.baseSpeed;
        this.fastSpeed = this.baseSpeed >> 1; // Fast speed is half of base speed
        this.startButton.disabled = !this.speed;
    }

    start() {
        if (!this.speed) return;

        this.isGameOver = false;
        this.score = 0;

        this.snake = new Snake();
        this.snake.setRandomStartPosition(this.grid.width, this.grid.height);
        this.food.reposition(this.grid);

        document.getElementById('score').textContent = `Score: ${this.score}`;

        new InputHandler(this.snake);

        this.startButton.disabled = true;
        this.speedSelect.disabled = true;
        this.restartButton.disabled = false;

        this.gameLoop();
    }

    gameLoop() {
        if (this.isGameOver) return;

        this.snake.move(this.grid.width, this.grid.height);

        if (this.snake.checkCollision(this.food.getPosition())) {
            if (this.food.getType() === 'double') {
                this.score += 2;        // Double food gives 2 points
                this.snake.grow(2);     // Grow by 2 segments
            } else {
                this.score++;
                this.snake.grow();
            }

            document.getElementById('score').textContent = `Score: ${this.score}`;
            this.food.reposition(this.grid); // Reposition food
        }

        if (this.snake.checkSelfCollision()) {
            this.endGame();
            return;
        }

        this.renderer.render(this.snake, this.food);

        setTimeout(() => this.gameLoop(), this.speed);
    }

    endGame() {
        this.isGameOver = true;
        document.getElementById('score').textContent = `Game Over! Final Score: ${this.score}`;

        this.restartButton.disabled = false;
        this.startButton.disabled = true;
        this.speedSelect.disabled = false;
        this.speedSelect.value = ""; // Reset dropdown to initial state

        this.renderer.displayGameOverMessage();
    }

    restart() {
        this.isGameOver = true; // Set to game over to prevent any unwanted actions
        this.score = 0;
        document.getElementById('score').textContent = `Score: ${this.score}`;

        this.snake = new Snake();
        this.food.reposition(this.grid);

        this.renderer.clearScreen();

        this.speed = null;
        this.speedSelect.value = "";
        this.speedSelect.disabled = false;

        this.restartButton.disabled = true;
        this.startButton.disabled = true;
    }

    handleKeyDown(event) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            this.speed = this.fastSpeed;
        }
    }

    handleKeyUp(event) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            this.speed = this.baseSpeed;
        }
    }
}

export default Game;
