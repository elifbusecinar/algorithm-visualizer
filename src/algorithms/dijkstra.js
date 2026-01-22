const rows = 15;
const cols = 25;

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
    // Add some random walls
    for (let i = 0; i < 40; i++) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (!((r === 7 && c === 3) || (r === 7 && c === 21))) {
            grid[r][c].isWall = true;
        }
    }
    return grid;
};

// Deep copy grid for snapshots
const cloneGrid = (grid) => {
    return grid.map(row => row.map(node => ({ ...node })));
};

export const generateDijkstraSteps = () => {
    const steps = [];
    const grid = getInitialGrid();
    const startNode = grid[7][3];
    const endNode = grid[7][21];

    startNode.distance = 0;

    // Unvisited nodes list (simulating Priority Queue efficiently for grid)
    const unvisitedNodes = [];
    for (const row of grid) {
        for (const node of row) {
            unvisitedNodes.push(node);
        }
    }

    steps.push({
        description: 'Initialize Grid. Start (Green) at [7,3], End (Red) at [7,21].Walls (Dark) placed randomly.',
        grid: cloneGrid(grid),
        startNode: { ...startNode },
        endNode: { ...endNode },
        code: 'dist[start] = 0, Q.add(all nodes)',
        lineIndex: 1
    });

    while (unvisitedNodes.length) {
        // Sort by distance (simulate Priority Queue extractMin)
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
        const closestNode = unvisitedNodes.shift();

        // If locked by walls
        if (closestNode.distance === Infinity) {
            steps.push({
                description: 'No path found! All reachable nodes visited.',
                grid: cloneGrid(grid),
                startNode: { ...startNode },
                endNode: { ...endNode },
                complete: true,
                code: 'return infinite distance',
                lineIndex: 6
            });
            return steps;
        }

        closestNode.isVisited = true;

        // Visualize visit
        steps.push({
            description: `Visiting node at [${closestNode.row}, ${closestNode.col}] with distance ${closestNode.distance}`,
            grid: cloneGrid(grid),
            startNode: { ...startNode },
            endNode: { ...endNode },
            code: 'u = Q.extractMin(), marked visited',
            lineIndex: 4
        });

        if (closestNode === endNode) {
            steps.push({
                description: 'Target reached! Reconstructing path...',
                grid: cloneGrid(grid),
                startNode: { ...startNode },
                endNode: { ...endNode },
                code: 'if u == target: return reconstructPath()',
                lineIndex: 7
            });

            // Reconstruct path
            let currentNode = endNode;
            const path = [];
            while (currentNode !== null) {
                path.unshift(currentNode);
                currentNode.isPath = true; // Mark for visualization
                currentNode = currentNode.previousNode;
                // Visualizing path reconstruction step by step could be too slow, 
                // so we'll just mark the path in the final grid
            }

            steps.push({
                description: `✓ Shortest Path Found! Length: ${endNode.distance}`,
                grid: cloneGrid(grid), // This snapshot has 'isPath' true due to reference, but clone protects history
                startNode: { ...startNode },
                endNode: { ...endNode },
                complete: true,
                code: 'return path',
                lineIndex: 14
            });

            return steps;
        }

        updateUnvisitedNeighbors(closestNode, grid);
    }

    return steps;
};

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < rows - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < cols - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}
