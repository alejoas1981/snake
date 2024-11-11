// src/Snake.js

class Snake {
    constructor() {
        this.segments = [{ x: 10, y: 10 }];  // Initial position of the snake
        this.direction = { x: 1, y: 0 };     // Initial direction (moving right)
        this.growing = false;                // Flag to determine if the snake should grow
    }

    move() {
        // Calculate new head position based on current direction
        const head = {
            x: this.segments[0].x + this.direction.x,
            y: this.segments[0].y + this.direction.y
        };
        console.log(`Current direction: (${this.direction.x}, ${this.direction.y})`); // Debugging line
        // Add the new head position to the beginning of the segments array
        this.segments.unshift(head);
        console.log(`Moving to: (${head.x}, ${head.y})`); // Debugging line

        // If the snake is not growing, remove the last segment
        if (!this.growing) {
            this.segments.pop();
        } else {
            this.growing = false;  // Reset growing flag
        }
    }

    setDirection(x, y) {
        // Ensure that the new direction is not directly opposite to the current direction
        if ((x !== 0 && x !== -this.direction.x) || (y !== 0 && y !== -this.direction.y)) {
            console.log(`Direction changed to: (${x}, ${y})`); // Debugging line
            this.direction = { x, y };
        }
    }

    grow() {
        this.growing = true; // Set growing flag to true
    }

    checkCollision(point) {
        // Check if the snake's head collides with a given point (e.g., food)
        const head = this.segments[0];
        return head.x === point.x && head.y === point.y;
    }

    checkSelfCollision() {
        // Get the head of the snake
        const [head, ...body] = this.segments;

        // Check if any segment in the body has the same position as the head
        return body.some(segment => segment.x === head.x && segment.y === head.y);
    }
}

export default Snake;
