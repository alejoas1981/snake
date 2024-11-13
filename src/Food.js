// src/Food.js

class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.type = 'normal'; // Types: 'normal', 'double'
        this.timer = null;
    }

    reposition(grid) {
        this.position.x = Math.floor(Math.random() * grid.width);
        this.position.y = Math.floor(Math.random() * grid.height);

        // Randomly assign type of food (with a chance for double food)
        this.type = Math.random() < 0.2 ? 'double' : 'normal'; // 20% chance for double food

        // If double food, set a timer for it to disappear
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
