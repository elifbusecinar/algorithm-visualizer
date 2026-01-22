const rows = 15;
const cols = 25;

// Helper to deep clone grid
const cloneGrid = (grid) => {
    return grid.map(row => row.map(node => ({ ...node })));
};

// Helper to get unvisited neighbors (up, down, left, right)
// For DFS, order matters for the "shape" of exploration
const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    // Order: Up, Right, Down, Left (can be changed to affect path shape)
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col < cols - 1) neighbors.push(grid[row][col + 1]);
    if (row < rows - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
};

// Reconstruct path
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

export const generateDFSSteps = () => {
    const steps = [];
    const grid = getInitialGrid();
    const startNode = grid[7][3];
    const endNode = grid[7][21];

    startNode.distance = 0;
    // Stack for DFS
    const stack = [startNode];

    steps.push({
        description: 'Initialize Grid. DFS uses a Stack (LIFO) to explore deeply.',
        grid: cloneGrid(grid),
        startNode: { ...startNode },
        endNode: { ...endNode },
        code: 'S.push(start)',
        lineIndex: 1
    });

    while (stack.length > 0) {
        const currentNode = stack.pop();

        // If already visited (can happen if added multiple times from different paths), skip
        if (currentNode.isVisited) continue;

        currentNode.isVisited = true;

        if (currentNode !== startNode) {
            steps.push({
                description: `Visiting [${currentNode.row}, ${currentNode.col}]`,
                grid: cloneGrid(grid),
                startNode: { ...startNode },
                endNode: { ...endNode },
                code: 'u = S.pop(), mark visited',
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
                description: `✓ Path Found! (Not necessarily shortest)`,
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
            // For DFS, we push neighbors to stack.
            // When we pop, we process them.
            // So we record previousNode here, but mark visited only when popped.
            neighbor.previousNode = currentNode;
            stack.push(neighbor);
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
