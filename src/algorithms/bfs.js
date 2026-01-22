const rows = 15;
const cols = 25;

// Helper to deep clone grid
const cloneGrid = (grid) => {
    return grid.map(row => row.map(node => ({ ...node })));
};

// Helper to get unvisited neighbors (up, down, left, right)
const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < rows - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < cols - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
};

// Reconstruct path from endNode to startNode
const reconstructPath = (endNode) => {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode.isPath = true;
        currentNode = currentNode.previousNode;
    }
    return path;
};

// Initial grid setup (same as others to keep consistency)
const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === 7 && col === 3,
        isEnd: row === 7 && col === 21,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
        isPath: false,
    };
};

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    // Add random walls
    for (let i = 0; i < 40; i++) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (!((r === 7 && c === 3) || (r === 7 && c === 21))) {
            grid[r][c].isWall = true;
        }
    }
    return grid;
};

export const generateBFSSteps = () => {
    const steps = [];
    const grid = getInitialGrid();
    const startNode = grid[7][3];
    const endNode = grid[7][21];

    startNode.distance = 0;
    startNode.isVisited = true;

    // Queue for BFS
    const queue = [startNode];

    steps.push({
        description: 'Initialize Grid. BFS uses a Queue (FIFO) to explore layers.',
        grid: cloneGrid(grid),
        startNode: { ...startNode },
        endNode: { ...endNode },
        code: 'Q.enqueue(start), marked visited',
        lineIndex: 1
    });

    while (queue.length > 0) {
        const currentNode = queue.shift();

        // Visualize current node processing
        if (currentNode !== startNode) {
            steps.push({
                description: `Visiting [${currentNode.row}, ${currentNode.col}]`,
                grid: cloneGrid(grid), // Snapshot
                startNode: { ...startNode },
                endNode: { ...endNode },
                code: 'u = Q.dequeue()',
                lineIndex: 3
            });
        }

        if (currentNode === endNode) {
            steps.push({
                description: 'Target reached! Reconstructing path...',
                grid: cloneGrid(grid),
                startNode: { ...startNode },
                endNode: { ...endNode },
                code: 'if u == target: return path',
                lineIndex: 4
            });

            reconstructPath(endNode);

            steps.push({
                description: `✓ Shortest Path Found! Distance: ${endNode.distance}`,
                grid: cloneGrid(grid),
                startNode: { ...startNode },
                endNode: { ...endNode },
                complete: true,
                code: 'return path',
                lineIndex: 10
            });
            return steps;
        }

        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            neighbor.isVisited = true;
            neighbor.distance = currentNode.distance + 1;
            neighbor.previousNode = currentNode;
            queue.push(neighbor);

            // Visualize adding to queue (optional, can be too noisy, lets verify if needed)
            // For now, we visualize when we pop from queue (visit)
        }
    }

    steps.push({
        description: 'No path found!',
        grid: cloneGrid(grid),
        complete: true,
        code: 'return failure',
        lineIndex: 10
    });

    return steps;
};
