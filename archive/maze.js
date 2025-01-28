const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const loadingText = document.getElementById("loading");

// Resize the canvas based on the window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initialize canvas size
resizeCanvas();

// Helper function to get mouse position
let mousePos = { x: 0, y: 0 };
window.addEventListener('mousemove', function (event) {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
});

let mazeGenerated = false;
let maze = null;

// Maze generation using Recursive Backtracking
class Maze {
    constructor(width, height, startX, startY) {
        this.cellSize = 40; // Double the original size (passage width doubled)
        this.cols = Math.floor(width / this.cellSize);
        this.rows = Math.floor(height / this.cellSize);
        this.grid = [];
        this.stack = [];
        this.current = null;
        this.end = null;
        this.startX = startX;
        this.startY = startY;

        // Initialize grid
        for (let y = 0; y < this.rows; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.cols; x++) {
                this.grid[y][x] = new Cell(x, y, this.cellSize);
            }
        }
        this.current = this.grid[Math.floor(this.startY / this.cellSize)][Math.floor(this.startX / this.cellSize)];
        this.stepsPerFrame = 10; // Increase speed of drawing (10 steps per frame)
    }

    generateMaze() {
        // Generate multiple steps per frame to speed up the process
        for (let i = 0; i < this.stepsPerFrame; i++) {
            if (!this.current) return false; // In case maze already completed
            this.current.visited = true;
            let next = this.current.checkNeighbors(this.grid);
            if (next) {
                next.visited = true;
                this.stack.push(this.current);
                removeWalls(this.current, next);
                this.current = next;
            } else if (this.stack.length > 0) {
                this.current = this.stack.pop();
            } else {
                return false; // Maze generation is complete
            }
        }
        return true; // Continue generating
    }

    drawMaze(ctx) {
        for (let row of this.grid) {
            for (let cell of row) {
                cell.show(ctx);
            }
        }
    }

    setRandomExit() {
        const randomCol = Math.floor(Math.random() * this.cols);
        const randomRow = Math.floor(Math.random() * this.rows);
        this.end = this.grid[randomRow][randomCol];
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(this.end.x * this.cellSize + this.cellSize / 2, this.end.y * this.cellSize + this.cellSize / 2, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Cell class to represent each maze cell
class Cell {
    constructor(x, y, cellSize) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.visited = false;
        this.walls = [true, true, true, true]; // top, right, bottom, left
    }

    show(ctx) {
        const x = this.x * this.cellSize;
        const y = this.y * this.cellSize;
        ctx.strokeStyle = "white";

        // Draw walls
        ctx.beginPath();
        if (this.walls[0]) ctx.moveTo(x, y), ctx.lineTo(x + this.cellSize, y); // top
        if (this.walls[1]) ctx.moveTo(x + this.cellSize, y), ctx.lineTo(x + this.cellSize, y + this.cellSize); // right
        if (this.walls[2]) ctx.moveTo(x + this.cellSize, y + this.cellSize), ctx.lineTo(x, y + this.cellSize); // bottom
        if (this.walls[3]) ctx.moveTo(x, y + this.cellSize), ctx.lineTo(x, y); // left
        ctx.stroke();

        if (this.visited) {
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, this.cellSize, this.cellSize);
        }
    }

    checkNeighbors(grid) {
        let neighbors = [];
        let top = this.y > 0 ? grid[this.y - 1][this.x] : undefined;
        let right = this.x < grid[0].length - 1 ? grid[this.y][this.x + 1] : undefined;
        let bottom = this.y < grid.length - 1 ? grid[this.y + 1][this.x] : undefined;
        let left = this.x > 0 ? grid[this.y][this.x - 1] : undefined;

        [top, right, bottom, left].forEach(neighbor => {
            if (neighbor && !neighbor.visited) neighbors.push(neighbor);
        });

        return neighbors.length > 0 ? neighbors[Math.floor(Math.random() * neighbors.length)] : undefined;
    }
}

// Helper function to remove walls between cells
function removeWalls(a, b) {
    let x = a.x - b.x;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    let y = a.y - b.y;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

// Main loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    maze.drawMaze(ctx);

    if (!maze.generateMaze()) {
        if (!mazeGenerated) {
            mazeGenerated = true;
            maze.setRandomExit();
            loadingText.style.display = "none"; // Hide loading when maze is ready
        }

        // Check if the mouse touches the border
        if (mousePos.x <= 0 || mousePos.y <= 0 || mousePos.x >= canvas.width || mousePos.y >= canvas.height) {
            resetGame(); // Regenerate the maze
        }

        // Draw start point
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(gameLoop);
}

// Reset game and generate new maze
function resetGame() {
    mazeGenerated = false;
    loadingText.style.display = "block";
    maze = new Maze(canvas.width, canvas.height, mousePos.x, mousePos.y);
}

// Initialize game
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

resetGame(); // Start the game with the first maze

requestAnimationFrame(gameLoop);