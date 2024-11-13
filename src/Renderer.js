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

        // Draw food based on type
        const foodPosition = food.getPosition();
        const foodType = food.getType();

        if (foodType === 'normal') {
            this.context.fillStyle = '#000';
            this.context.fillRect(
                foodPosition.x * this.cellSize,
                foodPosition.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );
        } else if (foodType === 'double') {
            // Draw a larger, blinking double food with a bow
            const size = this.cellSize * 1.3; // 1.3x size for double food
            const offset = (size - this.cellSize) / 2;

            // Make the food blink
            this.context.fillStyle = Math.random() > 0.5 ? '#000' : '#444';

            // Draw the double food square
            this.context.fillRect(
                foodPosition.x * this.cellSize - offset,
                foodPosition.y * this.cellSize - offset,
                size,
                size
            );

            // Draw bow on top of the double food
            this.context.fillStyle = '#999';
            this.context.beginPath();
            this.context.moveTo(foodPosition.x * this.cellSize - offset + size / 4, foodPosition.y * this.cellSize - offset - size / 4);
            this.context.lineTo(foodPosition.x * this.cellSize - offset + (3 * size) / 4, foodPosition.y * this.cellSize - offset - size / 4);
            this.context.lineTo(foodPosition.x * this.cellSize - offset + size / 2, foodPosition.y * this.cellSize - offset);
            this.context.closePath();
            this.context.fill();
        }

        // Draw snake segments
        snake.segments.forEach(segment => {
            this.context.fillStyle = '#000';
            this.context.fillRect(
                segment.x * this.cellSize,
                segment.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );

            this.context.clearRect(
                segment.x * this.cellSize + 2,
                segment.y * this.cellSize + 2,
                this.cellSize - 4,
                this.cellSize - 4
            );

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
