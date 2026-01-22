// Tree node class
class TreeNode {
    constructor(value, id) {
        this.value = value;
        this.id = id;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

let nodeIdCounter = 0;

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
            edges.push({ from: node.id, to: node.left.id });
            traverse(node.left);
        }

        if (node.right) {
            edges.push({ from: node.id, to: node.right.id });
            traverse(node.right);
        }
    };

    traverse(root);
    return { nodes, edges, rootId: root ? root.id : null };
};

// Level-order traversal (BFS): Level by level using queue
export const generateLevelOrderSteps = (inputArray) => {
    const steps = [];
    nodeIdCounter = 0;

    const root = buildSampleTree(inputArray);
    if (!root) return steps;

    calculatePositions(root);

    steps.push({
        description: 'Starting Level-Order Traversal (BFS)',
        ...flattenTree(root),
        visitedOrder: [],
        queue: [root.value],
        code: 'queue = [root]',
        lineIndex: 1
    });

    const queue = [root];
    const visitedOrder = [];

    while (queue.length > 0) {
        const currentNode = queue.shift();

        currentNode.isVisited = true;
        visitedOrder.push(currentNode.value);

        const queueValues = queue.map(n => n.value);

        steps.push({
            description: `Visiting node ${currentNode.value} (Level-by-level)`,
            ...flattenTree(root),
            visitedOrder: [...visitedOrder],
            queue: queueValues,
            currentNode: currentNode.id,
            code: `node = queue.dequeue() // ${currentNode.value}`,
            lineIndex: 3
        });

        // Add children to queue
        if (currentNode.left) {
            queue.push(currentNode.left);
            steps.push({
                description: `Adding left child ${currentNode.left.value} to queue`,
                ...flattenTree(root),
                visitedOrder: [...visitedOrder],
                queue: queue.map(n => n.value),
                currentNode: currentNode.id,
                code: `queue.enqueue(node.left)`,
                lineIndex: 4
            });
        }

        if (currentNode.right) {
            queue.push(currentNode.right);
            steps.push({
                description: `Adding right child ${currentNode.right.value} to queue`,
                ...flattenTree(root),
                visitedOrder: [...visitedOrder],
                queue: queue.map(n => n.value),
                currentNode: currentNode.id,
                code: `queue.enqueue(node.right)`,
                lineIndex: 5
            });
        }
    }

    steps.push({
        description: `✓ Traversal Complete! Order: [${visitedOrder.join(', ')}]`,
        ...flattenTree(root),
        visitedOrder: visitedOrder,
        queue: [],
        complete: true,
        code: 'return result',
        lineIndex: 6
    });

    return steps.map(step => ({
        ...step,
        ...flattenTree(root)
    }));
};
