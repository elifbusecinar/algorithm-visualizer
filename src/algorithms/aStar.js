const rows = 15;
const cols = 25;

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === 7 && col === 3,
        isEnd: row === 7 && col === 21,
        distance: Infinity, // gScore
        fScore: Infinity,
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

// Manhattan Distance Heuristic
const calculateHeuristic = (node, endNode) => {
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
};

export const generateAStarSteps = () => {
    const steps = [];
    const grid = getInitialGrid();
    const startNode = grid[7][3];
    const endNode = grid[7][21];

    // Initialize start node
    startNode.distance = 0; // gScore
    startNode.fScore = calculateHeuristic(startNode, endNode);

    // OpenSet containing unvisited nodes that are discovered
    // We will technically keep all nodes in a list but only consider "open" ones as candidates
    // For visualization simplicity, we treat 'distance != Infinity' as being in open set if not visited
    // But to be proper A*, let's manage an openList
    let openList = [startNode];

    steps.push({
        description: 'Initialize Grid. A* uses Heuristic to guide search towards target.',
        grid: cloneGrid(grid),
        startNode: { ...startNode },
        endNode: { ...endNode },
        code: 'gScore[start] = 0, fScore[start] = h(start)',
        lineIndex: 1
    });

    while (openList.length > 0) {
        // Sort by fScore
        openList.sort((nodeA, nodeB) => nodeA.fScore - nodeB.fScore);
        const closestNode = openList.shift();

        // If locked by walls or unreachable (shouldn't happen if openList not empty, but safety check)
        if (closestNode.distance === Infinity) {
            steps.push({
                description: 'No path found!',
                grid: cloneGrid(grid),
                complete: true,
                code: 'return failure',
                lineIndex: 16
            });
            return steps;
        }

        closestNode.isVisited = true;

        // Visualize visit
        steps.push({
            description: `Visiting [${closestNode.row}, ${closestNode.col}]. fScore = ${closestNode.fScore} (g=${closestNode.distance} + h=${closestNode.fScore - closestNode.distance})`,
            grid: cloneGrid(grid),
            startNode: { ...startNode },
            endNode: { ...endNode },
            code: 'current = lowest fScore, remove from openSet',
            lineIndex: 5
        });

        if (closestNode === endNode) {
            steps.push({
                description: 'Target reached! Reconstructing path...',
                grid: cloneGrid(grid),
                startNode: { ...startNode },
                endNode: { ...endNode },
                code: 'if current == goal: return reconstruct_path()',
                lineIndex: 6
            });

            // Reconstruct path
            let currentNode = endNode;
            while (currentNode !== null) {
                currentNode.isPath = true;
                currentNode = currentNode.previousNode;
            }

            steps.push({
                description: `✓ Shortest Path Found! Cost: ${endNode.distance}`,
                grid: cloneGrid(grid),
                startNode: { ...startNode },
                endNode: { ...endNode },
                complete: true,
                code: 'return path',
                lineIndex: 16
            });
            return steps;
        }

        updateUnvisitedNeighbors(closestNode, endNode, grid, openList);
    }

    // If openList empty and not found
    steps.push({
        description: 'No path found! OpenSet is empty.',
        grid: cloneGrid(grid),
        complete: true,
        code: 'return failure',
        lineIndex: 16
    });

    return steps;
};

function updateUnvisitedNeighbors(node, endNode, grid, openList) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        // tentative_g = gScore[current] + 1 (assuming edge weight 1)
        const tentativeGScore = node.distance + 1;

        // If we found a better path to this neighbor (or it's the first time we see it)
        if (tentativeGScore < neighbor.distance) {
            neighbor.previousNode = node;
            neighbor.distance = tentativeGScore;
            neighbor.fScore = neighbor.distance + calculateHeuristic(neighbor, endNode);

            // If not in openList, add it
            if (!openList.includes(neighbor)) {
                openList.push(neighbor);
            }
        }
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
