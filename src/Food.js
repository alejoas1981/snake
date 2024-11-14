// src/Food.js

class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.type = 'normal'; // Types: 'normal', 'double'
        this.timer = null;
    }

    reposition(grid) {
        // Generate random position within grid bounds
        this.position.x = Math.floor(Math.random() * grid.width);
        this.position.y = Math.floor(Math.random() * grid.height);

        // Randomly assign type of food with a 20% chance for double food
        this.type = Math.random() < 0.2 ? 'double' : 'normal';

        // Set a timer for double food to disappear after 5 seconds
        if (this.type === 'double') {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.type = 'normal'; // Revert to normal if time runs out
            }, 5000); // Double food lasts for 5 seconds
        }
    }

    getPosition() {
        return this.position;
    }

    getType() {
        return this.type;
    }
}

export default Food;
