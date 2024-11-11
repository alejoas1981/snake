// src/Renderer.js

class Renderer {
    constructor() {
        // Find the canvas and set up the WebGL context
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d'); // Using 2D context for simplicity

        // Set background color
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(snake, food) {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw food
        this.context.fillStyle = '#ff0000';
        const foodPosition = food.getPosition();
        this.context.fillRect(foodPosition.x * 20, foodPosition.y * 20, 20, 20);

        // Draw snake
        this.context.fillStyle = '#00ff00';
        snake.segments.forEach(segment => {
            this.context.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        });
    }
}

export default Renderer;
