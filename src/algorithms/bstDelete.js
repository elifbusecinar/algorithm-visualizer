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
            isDeleted: node.isDeleted || false
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

// Find minimum value node in a tree
const findMin = (node) => {
    while (node.left !== null) {
        node = node.left;
    }
    return node;
};

// BST Delete - remove a node from the tree
const deleteBST = (node, target, steps, parent = null) => {
    if (!node) {
        steps.push({
            description: `Value ${target} not found in tree`,
            code: 'return null',
            lineIndex: 8
        });
        return null;
    }

    node.isVisited = true;

    steps.push({
        description: `Searching for ${target}, currently at ${node.value}`,
        currentNode: node.id,
        code: `if (${target} < ${node.value})`,
        lineIndex: 2
    });

    if (target < node.value) {
        node.left = deleteBST(node.left, target, steps, node);
        return node;
    } else if (target > node.value) {
        node.right = deleteBST(node.right, target, steps, node);
        return node;
    }

    // Found the node to delete
    node.isDeleted = true;
    steps.push({
        description: `Found node ${target} to delete`,
        currentNode: node.id,
        code: `// Node found`,
        lineIndex: 3
    });

    // Case 1: Leaf node (no children)
    if (!node.left && !node.right) {
        steps.push({
            description: `Case 1: ${target} is a leaf node. Simply remove it.`,
            currentNode: node.id,
            code: 'return null',
            lineIndex: 4
        });
        return null;
    }

    // Case 2: One child
    if (!node.left) {
        steps.push({
            description: `Case 2: ${target} has only right child. Replace with right child.`,
            currentNode: node.id,
            code: 'return node.right',
            lineIndex: 5
        });
        return node.right;
    }

    if (!node.right) {
        steps.push({
            description: `Case 2: ${target} has only left child. Replace with left child.`,
            currentNode: node.id,
            code: 'return node.left',
            lineIndex: 6
        });
        return node.left;
    }

    // Case 3: Two children
    steps.push({
        description: `Case 3: ${target} has two children. Find in-order successor (min in right subtree).`,
        currentNode: node.id,
        code: 'successor = findMin(node.right)',
        lineIndex: 7
    });

    const successor = findMin(node.right);

    steps.push({
        description: `Found successor: ${successor.value}. Replace ${target} with ${successor.value}.`,
        currentNode: node.id,
        code: `node.value = ${successor.value}`,
        lineIndex: 8
    });

    node.value = successor.value;
    node.isDeleted = false;

    steps.push({
        description: `Now delete the successor ${successor.value} from right subtree`,
        currentNode: node.id,
        code: `delete(node.right, ${successor.value})`,
        lineIndex: 9
    });

    node.right = deleteBST(node.right, successor.value, steps, node);

    return node;
};

export const generateBSTDeleteSteps = (inputArray, target = null) => {
    const steps = [];
    nodeIdCounter = 0;

    // Build tree
    let root = buildSampleTree(inputArray);
    calculatePositions(root);

    // If no target specified, delete a middle value
    if (target === null) {
        target = inputArray[Math.floor(inputArray.length / 2)];
    }

    steps.push({
        description: `Starting BST Delete for value ${target}`,
        ...flattenTree(root),
        target: target,
        code: `delete(root, ${target})`,
        lineIndex: 1
    });

    // Perform deletion
    root = deleteBST(root, target, steps);
    calculatePositions(root);

    steps.push({
        description: `✓ Deletion complete! Node ${target} removed from tree.`,
        ...flattenTree(root),
        target: target,
        complete: true,
        code: 'return root',
        lineIndex: 10
    });

    // Update all steps with tree structure
    return steps.map((step, index) => ({
        ...step,
        ...flattenTree(root),
        target: target
    }));
};
