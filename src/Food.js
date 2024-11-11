// src/Food.js

class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
    }

    reposition(grid) {
        // Randomly place food within the grid boundaries
        const maxX = grid.width - 1;
        const maxY = grid.height - 1;

        this.position.x = Math.floor(Math.random() * (maxX + 1)) >> 0;
        this.position.y = Math.floor(Math.random() * (maxY + 1)) >> 0;
    }

    getPosition() {
        // Return the current position of the food
        return this.position;
    }
}

export default Food;
