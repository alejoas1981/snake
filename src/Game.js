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
        this.fastSpeed = this.baseSpeed / 3; // Calculate fast speed as half of base speed
        this.startButton.disabled = !this.speed;
    }

    start() {
        if (!this.speed) return;

        this.isGameOver = false;
        this.score = 0;

        // Use cellSize from Renderer to calculate grid dimensions
        this.grid.width = Math.floor(this.renderer.canvas.width / this.renderer.cellSize);
        this.grid.height = Math.floor(this.renderer.canvas.height / this.renderer.cellSize);

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

    checkWallCollision() {
        const head = this.snake.segments[0];
        return head.x < 0 || head.x >= this.grid.width || head.y < 0 || head.y >= this.grid.height;
    }

    endGame() {
        this.isGameOver = true;
        document.getElementById('score').textContent = `Game Over! Final Score: ${this.score}`;

        // Enable the "Restart" button after game ends
        this.restartButton.disabled = false;

        // Reset dropdown and "Start" button after game ends
        this.startButton.disabled = true;
        this.speedSelect.disabled = false;
        this.speedSelect.value = ""; // Reset dropdown to initial state

        // Display "GAME OVER!" message on the canvas
        this.renderer.displayGameOverMessage();
    }

    restart() {
        // Reset game state and UI for a new start
        this.isGameOver = true; // Set to game over to prevent any unwanted actions
        this.score = 0;
        document.getElementById('score').textContent = `Score: ${this.score}`;

        // Reset snake and food position
        this.snake = new Snake();
        this.food.reposition(this.grid);

        // Clear canvas to reset the screen
        this.renderer.clearScreen();

        // Reset speed selection and enable speed dropdown
        this.speed = null;
        this.speedSelect.value = "";
        this.speedSelect.disabled = false;

        // Disable "Restart" and enable "Start" button
        this.restartButton.disabled = true;
        this.startButton.disabled = true;
    }

    handleKeyDown(event) {
        // Set fast speed when holding down direction keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            this.speed = this.fastSpeed;
        }
    }

    handleKeyUp(event) {
        // Return to base speed when direction key is released
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            this.speed = this.baseSpeed;
        }
    }
}

export default Game;
