// src/Snake.js

class Snake {
    constructor() {
        this.segments = [{ x: 10, y: 10 }];  // Initial position of the snake
        this.direction = { x: 1, y: 0 };     // Initial direction (moving right)
        this.growing = false;                // Flag to determine if the snake should grow
    }

    setRandomStartPosition(gridWidth, gridHeight) {
        // Set random position, ensuring it is at least 3 cells from the edge
        const minDistanceFromEdge = 3;
        const maxX = gridWidth - minDistanceFromEdge;
        const maxY = gridHeight - minDistanceFromEdge;

        const startX = Math.floor(Math.random() * (maxX - minDistanceFromEdge) + minDistanceFromEdge);
        const startY = Math.floor(Math.random() * (maxY - minDistanceFromEdge) + minDistanceFromEdge);

        this.segments = [{ x: startX, y: startY }]; // Start with a single segment

        // Set random initial direction
        const directions = [
            { x: 1, y: 0 },  // Right
            { x: -1, y: 0 }, // Left
            { x: 0, y: 1 },  // Down
            { x: 0, y: -1 }  // Up
        ];
        this.direction = directions[Math.floor(Math.random() * directions.length)];
    }

    move(gridWidth, gridHeight) {
        const head = this.segments[0];
        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };

        // Wrap horizontally
        if (newHead.x >= gridWidth) {
            newHead.x = 0; // Exits right, re-enters from left
        } else if (newHead.x < 0) {
            newHead.x = gridWidth - 1; // Exits left, re-enters from right
        }

        // Wrap vertically
        if (newHead.y >= gridHeight) {
            newHead.y = 0; // Exits bottom, re-enters from top
        } else if (newHead.y < 0) {
            newHead.y = gridHeight - 1; // Exits top, re-enters from bottom
        }

        // Add new head position to the beginning of segments
        this.segments.unshift(newHead);

        // Remove the last segment if not growing
        if (!this.growing) {
            this.segments.pop();
        } else {
            this.growing = false;
        }
    }

    setDirection(x, y) {
        // Ensure that the new direction is not directly opposite to the current direction
        if ((x !== 0 && x !== -this.direction.x) || (y !== 0 && y !== -this.direction.y)) {
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
