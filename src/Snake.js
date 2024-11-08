// src/Snake.js

class Snake {
    constructor() {
        this.segments = [{ x: 10, y: 10 }];  // Initial position of the snake
        this.direction = { x: 1, y: 0 };     // Initial direction (moving right)
        this.growing = false;                // Flag to determine if the snake should grow
    }

    move() {
        // Get the head position and add direction using bitwise shift for performance
        const head = {
            x: (this.segments[0].x + this.direction.x) >> 0,
            y: (this.segments[0].y + this.direction.y) >> 0
        };

        // Add new head position at the start of the array
        this.segments.unshift(head);

        // Remove the last segment if the snake is not growing
        if (!this.growing) {
            this.segments.pop();
        } else {
            // Reset growing flag after the snake has grown
            this.growing = false;
        }
    }

    setDirection(x, y) {
        // Update direction with the given x and y values
        this.direction = { x: x >> 0, y: y >> 0 };
    }

    grow() {
        // Set the flag to grow the snake
        this.growing = true;
    }

    checkCollision(point) {
        // Check if the snake's head collides with a given point (e.g., food)
        return (this.segments[0].x === point.x) && (this.segments[0].y === point.y);
    }

    checkSelfCollision() {
        // Check if the snake's head collides with any of its own segments
        const [head, ...body] = this.segments;
        return body.some(segment => segment.x === head.x && segment.y === head.y);
    }
}

export default Snake;
