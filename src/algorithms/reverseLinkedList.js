export const generateReverseLinkedListSteps = (arr) => {
    const steps = [];
    // Convert array to linked list representation
    const nodes = arr.map((val, idx) => ({
        value: val,
        next: idx < arr.length - 1 ? idx + 1 : null,
        id: idx
    }));

    steps.push({
        description: 'Starting Reverse Linked List - will reverse pointers iteratively',
        nodes: JSON.parse(JSON.stringify(nodes)),
        highlight: [],
        prev: null,
        current: 0,
        code: 'let prev = null, current = head;'
    });

    let prev = null;
    let current = 0;

    while (current !== null) {
        const next = nodes[current].next;

        steps.push({
            description: `At node ${nodes[current].value}: Save next pointer`,
            nodes: JSON.parse(JSON.stringify(nodes)),
            highlight: [current],
            prev,
            current,
            next,
            code: `next = current.next = ${next !== null ? nodes[next].value : 'null'}`
        });

        nodes[current].next = prev;

        steps.push({
            description: `Reverse pointer: ${nodes[current].value} now points to ${prev !== null ? nodes[prev].value : 'null'}`,
            nodes: JSON.parse(JSON.stringify(nodes)),
            highlight: [current],
            reversing: current,
            prev,
            current,
            next,
            code: `current.next = prev`
        });

        prev = current;
        current = next;

        steps.push({
            description: `Move forward: prev = ${prev !== null ? nodes[prev].value : 'null'}, current = ${current !== null ? nodes[current].value : 'null'}`,
            nodes: JSON.parse(JSON.stringify(nodes)),
            highlight: current !== null ? [current] : [],
            prev,
            current,
            code: `prev = current; current = next;`
        });
    }

    steps.push({
        description: '✓ Reversal complete! New head is ' + (prev !== null ? nodes[prev].value : 'null'),
        nodes: JSON.parse(JSON.stringify(nodes)),
        highlight: prev !== null ? [prev] : [],
        prev,
        current: null,
        newHead: prev,
        complete: true,
        code: `return prev; // New head`
    });

    return steps;
};
