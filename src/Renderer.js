// src/Renderer.js

class Renderer {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 200;  // Set canvas width to match CSS
        this.canvas.height = 260; // Set canvas height to match CSS
    }

    render(snake, food) {
        // Clear the canvas with a transparent background to show the dot pattern
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw food as a solid black square
        this.context.fillStyle = '#000'; // Black color for food
        const foodPosition = food.getPosition();
        this.context.fillRect(foodPosition.x * 10, foodPosition.y * 10, 10, 10);

        // Draw snake segments with black border and black inner square with transparent gap
        snake.segments.forEach(segment => {
            // Draw outer black square (border)
            this.context.fillStyle = '#000';
            this.context.fillRect(segment.x * 10, segment.y * 10, 10, 10);

            // Draw inner transparent square to create gap
            this.context.clearRect(segment.x * 10 + 2, segment.y * 10 + 2, 6, 6);

            // Draw inner black square
            this.context.fillStyle = '#000';
            this.context.fillRect(segment.x * 10 + 3, segment.y * 10 + 3, 4, 4);
        });
    }
}

export default Renderer;
