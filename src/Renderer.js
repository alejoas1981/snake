// src/Renderer.js

class Renderer {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 200;  // Set canvas width to match CSS
        this.canvas.height = 260; // Set canvas height to match CSS
        this.cellSize = 10; // Define the cell size in one place
    }

    render(snake, food) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw food
        const foodPosition = food.getPosition();
        this.context.fillStyle = '#000';
        this.context.fillRect(
            foodPosition.x * this.cellSize,
            foodPosition.y * this.cellSize,
            this.cellSize,
            this.cellSize
        );

        // Draw snake segments with dynamic cell size
        snake.segments.forEach(segment => {
            // Draw outer square
            this.context.fillStyle = '#000';
            this.context.fillRect(
                segment.x * this.cellSize,
                segment.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );

            // Draw transparent inner square to create gap
            this.context.clearRect(
                segment.x * this.cellSize + 2,
                segment.y * this.cellSize + 2,
                this.cellSize - 4,
                this.cellSize - 4
            );

            // Draw inner black square
            this.context.fillStyle = '#000';
            this.context.fillRect(
                segment.x * this.cellSize + 3,
                segment.y * this.cellSize + 3,
                this.cellSize - 6,
                this.cellSize - 6
            );
        });
    }

    displayGameOverMessage() {
        this.context.fillStyle = '#000'; // Black for mono effect
        this.context.font = '24px Arial';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GAME OVER!', this.canvas.width / 2, this.canvas.height / 2);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default Renderer;
