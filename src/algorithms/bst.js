// Basic Node Class
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

// Helper to layout tree nodes with coordinates
// This is a simple implementation where width is divided at each level
const calculateLayout = (node, x, y, level, width) => {
    if (!node) return;

    node.x = x;
    node.y = y;

    const verticalSpacing = 80;
    const nextLevelY = y + verticalSpacing;

    // Spread decreases as we go deeper
    // Level 1: width/4, Level 2: width/8, etc.
    const offset = width / (Math.pow(2, level + 2));

    calculateLayout(node.left, x - offset, nextLevelY, level + 1, width);
    calculateLayout(node.right, x + offset, nextLevelY, level + 1, width);
};

const flattenTree = (root) => {
    const nodes = [];
    const edges = [];

    if (!root) return { nodes, edges };

    const traverse = (node) => {
        if (!node) return;

        nodes.push({
            id: node.id,
            value: node.value,
            x: node.x,
            y: node.y,
            isNew: node.isNew,
            isVisited: node.isVisited,
            isFound: node.isFound
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
    return { nodes, edges };
};

// Deep copy logic for visualization snapshots
// We need to reconstruct the tree structure to clone it properly or just store flat snapshots
// For simplicity in step generation, we'll rebuild the flat structure each time
const snapshot = (root, activeNodeId = null, action = null) => {
    // 1. Calculate Layout first to ensure positions are up to date
    calculateLayout(root, 400, 50, 0, 800); // 800px width container, root at (400, 50)

    // 2. Flatten
    const { nodes, edges } = flattenTree(root);

    // 3. Apply active state
    if (activeNodeId) {
        const activeNode = nodes.find(n => n.id === activeNodeId);
        if (activeNode) {
            if (action === 'visit') activeNode.isVisited = true;
            if (action === 'new') activeNode.isNew = true;
            if (action === 'found') activeNode.isFound = true;
            // Clear others if needed, here we just mark the active one
        }
    }

    return { nodes, edges, rootId: root ? root.id : null };
};


export const generateBSTSteps = (inputArray) => {
    const steps = [];
    nodeIdCounter = 0;
    let root = null;

    // Initial empty state
    steps.push({
        description: 'Starting with empty tree',
        ...snapshot(null),
        code: 'Root = null',
        lineIndex: 1
    });

    // Helper for Recursive Insertion
    // Returns the new root (although mostly mutates in place)
    const insert = (node, value, parentX, parentY) => {
        // If we are at a null spot, create new node
        if (!node) {
            const newNode = new TreeNode(value, `node-${nodeIdCounter++}`);
            // Temporarily set position for animation start (will be fixed by layout)
            // But layout runs on snapshot, so logical structure matters most
            return newNode;
        }

        // Visualize traversal
        // We technically need to 'push' a step here showing we are visiting 'node'
        // But since this is a recursive function executing instantly, we need to capture state

        // Push step: Visiting node
        // We need a way to clone the CURRENT tree state before modification
        // But since we are modifying the tree structure recursively, we can't easily clone the 'in-progress' tree 
        // without a full deep copy of the tree class. 
        // For simplicity: We will build the tree iteratively in the generator for visualization purposes?
        // OR: We stick to real recursion but manage 'steps' carefully.

        // Let's rely on the fact that objects are references. 
        // To snapshot, we need a DEEP CLONE of the entire tree structure at this moment.
        return node;
    };

    // Iterative Insertion approach is easier to snapshot
    for (const value of inputArray) {
        steps.push({
            description: `Inserting value: ${value}`,
            ...snapshot(root), // snapshot previous state
            code: 'Insert(Root, value)',
            lineIndex: 3
        });

        if (!root) {
            root = new TreeNode(value, `node-${nodeIdCounter++}`);
            root.isNew = true;
            steps.push({
                description: `Tree empty. Set Root to ${value}`,
                ...snapshot(root, root.id, 'new'),
                code: 'Root = Node(v)',
                lineIndex: 4
            });
            root.isNew = false; // Reset for next steps
            continue;
        }

        let current = root;
        let parent = null;

        while (true) {
            // Visualize visiting current
            steps.push({
                description: `Comparing ${value} with ${current.value}`,
                ...snapshot(root, current.id, 'visit'),
                code: value < current.value ? 'if v < Current.val' : 'if v > Current.val',
                lineIndex: 5
            });

            if (value < current.value) {
                if (current.left === null) {
                    current.left = new TreeNode(value, `node-${nodeIdCounter++}`);
                    // Visualize insertion
                    const insertedNode = current.left;
                    insertedNode.isNew = true;
                    steps.push({
                        description: `${value} < ${current.value}. Inserted ${value} to left.`,
                        ...snapshot(root, insertedNode.id, 'new'),
                        code: 'Current.left = Node(v)',
                        lineIndex: 7
                    });
                    insertedNode.isNew = false;
                    break;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = new TreeNode(value, `node-${nodeIdCounter++}`);
                    // Visualize insertion
                    const insertedNode = current.right;
                    insertedNode.isNew = true;
                    steps.push({
                        description: `${value} > ${current.value}. Inserted ${value} to right.`,
                        ...snapshot(root, insertedNode.id, 'new'),
                        code: 'Current.right = Node(v)',
                        lineIndex: 9
                    });
                    insertedNode.isNew = false;
                    break;
                }
                current = current.right;
            }
        }
    }

    // Final state
    steps.push({
        description: 'Tree Construction Complete',
        ...snapshot(root),
        complete: true,
        code: 'return Root',
        lineIndex: 11
    });

    return steps;
};
