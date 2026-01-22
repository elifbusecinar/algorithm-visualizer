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

// Post-order traversal: Left -> Right -> Root
const postOrderTraversal = (node, steps, visitedOrder) => {
    if (!node) return;

    // Visit left subtree
    if (node.left) {
        steps.push({
            description: `Traversing to left child of ${node.value}`,
            visitedOrder: [...visitedOrder],
            currentNode: node.left.id,
            code: 'postOrder(node.left)',
            lineIndex: 2
        });
    }
    postOrderTraversal(node.left, steps, visitedOrder);

    // Visit right subtree
    if (node.right) {
        steps.push({
            description: `Traversing to right child of ${node.value}`,
            visitedOrder: [...visitedOrder],
            currentNode: node.right.id,
            code: 'postOrder(node.right)',
            lineIndex: 3
        });
    }
    postOrderTraversal(node.right, steps, visitedOrder);

    // Visit root last
    node.isVisited = true;
    visitedOrder.push(node.value);
    steps.push({
        description: `Visiting node ${node.value}`,
        visitedOrder: [...visitedOrder],
        currentNode: node.id,
        code: `visit(${node.value})`,
        lineIndex: 4
    });
};

export const generatePostOrderSteps = (inputArray) => {
    const steps = [];
    nodeIdCounter = 0;

    const root = buildSampleTree(inputArray);
    calculatePositions(root);

    steps.push({
        description: 'Starting Post-Order Traversal (Left-Right-Root)',
        ...flattenTree(root),
        visitedOrder: [],
        code: 'postOrder(root)',
        lineIndex: 1
    });

    const visitedOrder = [];
    postOrderTraversal(root, steps, visitedOrder);

    steps.push({
        description: `✓ Traversal Complete! Order: [${visitedOrder.join(', ')}]`,
        ...flattenTree(root),
        visitedOrder: visitedOrder,
        complete: true,
        code: 'return result',
        lineIndex: 5
    });

    return steps.map(step => ({
        ...step,
        ...flattenTree(root)
    }));
};
