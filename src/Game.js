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

        this.score = 0;
        this.isGameOver = false;
        this.speed = null; // Speed will be set based on selection

        this.food.reposition(this.grid);

        // UI elements
        this.startButton = document.getElementById('startButton');
        this.speedSelect = document.getElementById('speedSelect');
        this.restartButton = document.getElementById('restartButton');

        // Event listener for speed selection
        this.speedSelect.addEventListener('change', () => {
            this.setSpeed();
        });

        // Event listener for the "Start" button
        this.startButton.addEventListener('click', () => {
            this.start();
        });

        // Event listener for the "Restart" button
        this.restartButton.addEventListener('click', () => {
            this.restart();
        });
    }

    setSpeed() {
        // Set speed based on selected value from dropdown
        const selectedValue = this.speedSelect.value;
        switch (selectedValue) {
            case 'slow':
                this.speed = 500; // Slow speed
                break;
            case 'medium':
                this.speed = 200; // Medium speed
                break;
            case 'fast':
                this.speed = 100; // Fast speed
                break;
            default:
                this.speed = null;
        }

        // Enable the "Start" button only if a speed is selected
        this.startButton.disabled = !this.speed;
    }

    start() {
        // Ensure that a speed is selected before starting the game
        if (!this.speed) return;

        this.isGameOver = false;
        this.score = 0;
        this.snake = new Snake();
        this.food.reposition(this.grid);

        document.getElementById('score').textContent = `Score: ${this.score}`;

        // Initialize InputHandler only after the game starts
        new InputHandler(this.snake);

        // Disable the dropdown and "Start" button after game starts
        this.startButton.disabled = true;
        this.speedSelect.disabled = true;

        this.gameLoop();
    }

    gameLoop() {
        if (this.isGameOver) return;

        this.snake.move();

        // Check for collision with food
        if (this.snake.checkCollision(this.food.getPosition())) {
            this.snake.grow();
            this.food.reposition(this.grid);
            this.score++;
            document.getElementById('score').textContent = `Score: ${this.score}`;
        }

        // Check for wall or self-collision
        if (this.checkWallCollision() || this.snake.checkSelfCollision()) {
            this.endGame();
            return;
        }

        this.renderer.render(this.snake, this.food);

        // Run game loop with the selected speed delay
        setTimeout(() => this.gameLoop(), this.speed);
    }

    checkWallCollision() {
        const head = this.snake.segments[0];
        return head.x < 0 || head.x >= this.grid.width || head.y < 0 || head.y >= this.grid.height;
    }

    endGame() {
        this.isGameOver = true;
        document.getElementById('score').textContent = `Game Over! Final Score: ${this.score}`;

        // Reset dropdown and "Start" button after game ends
        this.startButton.disabled = false;
        this.speedSelect.disabled = false;
        this.speedSelect.value = ""; // Reset dropdown to initial state
    }

    restart() {
        // Reset game state and start a new game with the selected speed
        this.isGameOver = false;
        this.snake = new Snake();
        this.food.reposition(this.grid);
        this.score = 0;

        document.getElementById('score').textContent = `Score: ${this.score}`;

        // Disable the "Restart" button again after restart
        this.restartButton.disabled = true;

        this.gameLoop();
    }
}

export default Game;
