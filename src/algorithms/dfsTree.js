// Tree node class
class TreeNode {
    constructor(value, id) {
        this.value = value;
        this.id = id;
        this.left = null;
        this.right = null;
        this.x = 0; // Visual position
        this.y = 0;
    }
}

let nodeIdCounter = 0;

// Identical tree builder to keep consistency with other tree algos
const buildSampleTree = (values) => {
    let root = null;

    const insert = (node, value) => {
        if (!node) {
            return new TreeNode(value, `node-${nodeIdCounter++}`);
        }
        if (value < node.value) {
            node.left = insert(node.left, value);
        } else {
            node.right = insert(node.right, value);
        }
        return node;
    };

    for (const value of values) {
        root = insert(root, value);
    }

    return root;
};

// Calculate visual positions (simple recursive layout)
const calculatePositions = (node, x = 400, y = 50, xOffset = 100) => {
    if (!node) return;

    node.x = x;
    node.y = y;

    if (node.left) {
        calculatePositions(node.left, x - xOffset, y + 80, xOffset * 0.6);
    }
    if (node.right) {
        calculatePositions(node.right, x + xOffset, y + 80, xOffset * 0.6);
    }
};

const flattenTree = (root) => {
    const nodes = [];
    const edges = [];

    const traverse = (node) => {
        if (!node) return;

        nodes.push({
            id: node.id,
            value: node.value,
            x: node.x,
            y: node.y,
            isVisited: node.isVisited || false,
            isNew: node.isNew || false
        });

        if (node.left) {
            edges.push({ source: node.id, target: node.left.id });
            traverse(node.left);
        }

        if (node.right) {
            edges.push({ source: node.id, target: node.right.id });
            traverse(node.right);
        }
    };

    traverse(root);
    return { nodes, edges, rootId: root ? root.id : null };
};

// DFS Traversal using an explicit Stack to show LIFO behavior
export const generateDFSTreeSteps = (inputArray) => {
    const steps = [];
    nodeIdCounter = 0;

    const root = buildSampleTree(inputArray);
    if (!root) return steps;

    calculatePositions(root);

    // Initial State
    // We start by pushing root to stack
    const stack = [root];
    const visitedOrder = [];

    steps.push({
        description: 'Initialize Tree DFS. Using a Stack (LIFO).',
        ...flattenTree(root),
        visitedOrder: [],
        queue: stack.map(n => n.value), // Re-using 'queue' prop name for visualization component to show Stack content
        code: 'stack = [root]',
        lineIndex: 1
    });

    while (stack.length > 0) {
        // Pop from stack
        const currentNode = stack.pop();

        // Mark as visited
        currentNode.isVisited = true;
        visitedOrder.push(currentNode.value);

        // Get stack values for visualization
        const stackValues = stack.map(n => n.value);

        steps.push({
            description: `Popped ${currentNode.value} from Stack. Visiting...`,
            ...flattenTree(root),
            visitedOrder: [...visitedOrder],
            queue: stackValues, // Visualization component likely renders this list
            currentNode: currentNode.id,
            code: `node = stack.pop() // ${currentNode.value}`,
            lineIndex: 3
        });

        // Push children: Right first, then Left
        // Why? So that Left is popped first (standard Pre-Order DFS usually goes Left then Right)
        if (currentNode.right) {
            stack.push(currentNode.right);
            steps.push({
                description: `Pushing right child ${currentNode.right.value} to Stack`,
                ...flattenTree(root),
                visitedOrder: [...visitedOrder],
                queue: stack.map(n => n.value),
                currentNode: currentNode.id,
                code: `stack.push(node.right)`,
                lineIndex: 6
            });
        }

        if (currentNode.left) {
            stack.push(currentNode.left);
            steps.push({
                description: `Pushing left child ${currentNode.left.value} to Stack`,
                ...flattenTree(root),
                visitedOrder: [...visitedOrder],
                queue: stack.map(n => n.value),
                currentNode: currentNode.id,
                code: `stack.push(node.left)`,
                lineIndex: 5
            });
        }
    }

    steps.push({
        description: `✓ Traversal Complete! Order: [${visitedOrder.join(', ')}]`,
        ...flattenTree(root),
        visitedOrder: visitedOrder,
        queue: [], // Stack empty
        complete: true,
        code: 'return result',
        lineIndex: 9
    });

    return steps;
};
