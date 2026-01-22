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
            isFound: node.isFound || false
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

// BST Search - find a target value
const searchBST = (node, target, steps, root) => {
    if (!node) {
        steps.push({
            description: `Reached null node. Value ${target} not found in tree.`,
            ...flattenTree(root),
            currentNode: null,
            found: false,
            code: 'return null',
            lineIndex: 5
        });
        return null;
    }

    node.isVisited = true;

    steps.push({
        description: `Comparing ${target} with ${node.value}`,
        currentNode: node.id,
        ...flattenTree(root),
        code: `if (${target} == ${node.value})`,
        lineIndex: 2
    });

    if (target === node.value) {
        node.isFound = true;
        steps.push({
            description: `✓ Found ${target}!`,
            currentNode: node.id,
            ...flattenTree(root),
            found: true,
            code: `return node`,
            lineIndex: 3
        });
        return node;
    } else if (target < node.value) {
        steps.push({
            description: `${target} < ${node.value}, searching left subtree`,
            currentNode: node.id,
            ...flattenTree(root),
            code: `search(node.left, ${target})`,
            lineIndex: 4
        });
        return searchBST(node.left, target, steps, root);
    } else {
        steps.push({
            description: `${target} > ${node.value}, searching right subtree`,
            currentNode: node.id,
            ...flattenTree(root),
            code: `search(node.right, ${target})`,
            lineIndex: 5
        });
        return searchBST(node.right, target, steps, root);
    }
};

export const generateBSTSearchSteps = (inputArray, target = null) => {
    const steps = [];
    nodeIdCounter = 0;

    // Build tree
    const root = buildSampleTree(inputArray);
    calculatePositions(root);

    // If no target specified, search for a value that exists
    if (target === null) {
        target = inputArray[Math.floor(inputArray.length / 2)];
    }

    steps.push({
        description: `Starting BST Search for value ${target}`,
        ...flattenTree(root),
        target: target,
        found: false,
        code: `search(root, ${target})`,
        lineIndex: 1
    });

    // Perform search
    searchBST(root, target, steps, root);

    return steps;
};
