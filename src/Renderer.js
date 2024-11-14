// src/Renderer.js

class Renderer {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');

        // Fixed canvas size with increased cell size for larger objects
        this.canvas.width = 200;
        this.canvas.height = 260;
        this.cellSize = 12;
    }

    render(snake, food) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw food based on type
        const foodPosition = food.getPosition();
        const foodType = food.getType();

        if (foodType === 'normal') {
            this.context.fillStyle = '#000';
            this.context.fillRect(
                (foodPosition.x << 3) + (foodPosition.x << 2), // foodPosition.x * cellSize
                (foodPosition.y << 3) + (foodPosition.y << 2), // foodPosition.y * cellSize
                this.cellSize,
                this.cellSize
            );
        } else if (foodType === 'double') {
            // Draw a larger, blinking double food with a bow
            const size = this.cellSize * 1.3;
            const offset = (size - this.cellSize) / 2;

            // Make the food blink
            this.context.fillStyle = Math.random() > 0.5 ? '#000' : '#444';

            // Draw the double food square
            this.context.fillRect(
                ((foodPosition.x << 3) + (foodPosition.x << 2)) - offset,
                ((foodPosition.y << 3) + (foodPosition.y << 2)) - offset,
                size,
                size
            );

            // Draw bow on top of the double food
            this.context.fillStyle = '#999';
            this.context.beginPath();
            this.context.moveTo(
                ((foodPosition.x << 3) + (foodPosition.x << 2)) - offset + size / 4,
                ((foodPosition.y << 3) + (foodPosition.x << 2)) - offset - size / 4
            );
            this.context.lineTo(
                ((foodPosition.x << 3) + (foodPosition.x << 2)) - offset + (3 * size) / 4,
                ((foodPosition.y << 3) + (foodPosition.y << 2)) - offset - size / 4
            );
            this.context.lineTo(
                ((foodPosition.x << 3) + (foodPosition.x << 2)) - offset + size / 2,
                ((foodPosition.y << 3) + (foodPosition.x << 2)) - offset
            );
            this.context.closePath();
            this.context.fill();
        }

        // Draw snake segments
        snake.segments.forEach(segment => {
            this.context.fillStyle = '#000';
            this.context.fillRect(
                (segment.x << 3) + (segment.x << 2), // segment.x * cellSize
                (segment.y << 3) + (segment.y << 2), // segment.y * cellSize
                this.cellSize,
                this.cellSize
            );

            this.context.clearRect(
                ((segment.x << 3) + (segment.x << 2)) + 2,
                ((segment.y << 3) + (segment.y << 2)) + 2,
                this.cellSize - 4,
                this.cellSize - 4
            );

            this.context.fillStyle = '#000';
            this.context.fillRect(
                ((segment.x << 3) + (segment.x << 2)) + 3,
                ((segment.y << 3) + (segment.y << 2)) + 3,
                this.cellSize - 6,
                this.cellSize - 6
            );
        });
    }

    displayGameOverMessage() {
        this.context.fillStyle = '#000';
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
