// src/InputHandler.js

class InputHandler {
    constructor(snake) {
        this.snake = snake;

        // Add event listener for keyboard input
        document.addEventListener('keydown', (event) => {
            this.handleKeydown(event);
        });
    }

    handleKeydown(event) {
        console.log(`Key pressed: ${event.key}`); // Debugging line
        // Check key code and set snake direction accordingly
        switch (event.key) {
            case 'ArrowUp':
                // Move up (y decreases)
                if (this.snake.direction.y === 0) {
                    this.snake.setDirection(0, -1);
                }
                break;
            case 'ArrowDown':
                // Move down (y increases)
                if (this.snake.direction.y === 0) {
                    this.snake.setDirection(0, 1);
                }
                break;
            case 'ArrowLeft':
                // Move left (x decreases)
                if (this.snake.direction.x === 0) {
                    this.snake.setDirection(-1, 0);
                }
                break;
            case 'ArrowRight':
                // Move right (x increases)
                if (this.snake.direction.x === 0) {
                    this.snake.setDirection(1, 0);
                }
                break;
            default:
                break;
        }
    }
}

export default InputHandler;
