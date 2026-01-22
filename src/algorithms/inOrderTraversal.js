// Tree node class (same as BST)
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

// Build a sample BST for traversal demonstration
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

// Calculate positions for tree layout
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

// Flatten tree to nodes and edges for visualization
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
            edges.push({
                source: node.id,
                target: node.left.id
            });
            traverse(node.left);
        }

        if (node.right) {
            edges.push({
                source: node.id,
                target: node.right.id
            });
            traverse(node.right);
        }
    };

    traverse(root);
    return { nodes, edges, rootId: root ? root.id : null };
};

// In-order traversal: Left -> Root -> Right
const inOrderTraversal = (node, steps, visitedOrder, root) => {
    if (!node) return;

    // Visit left subtree
    if (node.left) {
        steps.push({
            description: `Traversing to left child of ${node.value}`,
            ...flattenTree(root),
            visitedOrder: [...visitedOrder],
            currentNode: node.left.id,
            code: 'inOrder(node.left)',
            lineIndex: 2
        });
    }
    inOrderTraversal(node.left, steps, visitedOrder, root);

    // Visit root
    node.isVisited = true;
    visitedOrder.push(node.value);
    steps.push({
        description: `Visiting node ${node.value}`,
        ...flattenTree(root),
        visitedOrder: [...visitedOrder],
        currentNode: node.id,
        code: `visit(${node.value})`,
        lineIndex: 3
    });

    // Visit right subtree
    if (node.right) {
        steps.push({
            description: `Traversing to right child of ${node.value}`,
            ...flattenTree(root),
            visitedOrder: [...visitedOrder],
            currentNode: node.right.id,
            code: 'inOrder(node.right)',
            lineIndex: 4
        });
    }
    inOrderTraversal(node.right, steps, visitedOrder, root);
};

export const generateInOrderSteps = (inputArray) => {
    const steps = [];
    nodeIdCounter = 0;

    // Build tree
    const root = buildSampleTree(inputArray);
    calculatePositions(root);

    steps.push({
        description: 'Starting In-Order Traversal (Left-Root-Right)',
        ...flattenTree(root),
        visitedOrder: [],
        code: 'inOrder(root)',
        lineIndex: 1
    });

    // Perform traversal
    const visitedOrder = [];
    inOrderTraversal(root, steps, visitedOrder, root);

    // Add final step
    steps.push({
        description: `✓ Traversal Complete! Order: [${visitedOrder.join(', ')}]`,
        ...flattenTree(root),
        visitedOrder: visitedOrder,
        complete: true,
        code: 'return result',
        lineIndex: 5
    });

    // Update all steps with tree structure
    return steps;
};
