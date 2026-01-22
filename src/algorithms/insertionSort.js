export const generateInsertionSortSteps = (arr) => {
    const steps = [];
    const array = [...arr];
    let swaps = 0;

    steps.push({
        description: 'Starting Insertion Sort - first element (index 0) is considered sorted',
        array: [...array],
        highlight: [0],
        sorted: [0],
        swaps: 0,
        code: 'for (let i = 1; i < n; i++) { ... }',
        lineIndex: 1
    });

    for (let i = 1; i < array.length; i++) {
        const key = array[i];

        steps.push({
            description: `Inserting ${key} into sorted portion`,
            array: [...array],
            highlight: [i],
            key,
            sorted: Array.from({ length: i }, (_, k) => k),
            swaps,
            code: `key = arr[${i}] = ${key}`,
            lineIndex: 2
        });

        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            steps.push({
                description: `${array[j]} > ${key}, shifting right`,
                array: [...array],
                highlight: [j, j + 1],
                comparing: [j, j + 1],
                swaps,
                code: `arr[${j + 1}] = arr[${j}]`,
                lineIndex: 4
            });

            array[j + 1] = array[j];
            swaps++;
            j--;
        }

        array[j + 1] = key;

        steps.push({
            description: `Placed ${key} at position ${j + 1}`,
            array: [...array],
            highlight: [j + 1],
            inserted: j + 1,
            sorted: Array.from({ length: i + 1 }, (_, k) => k),
            swaps,
            code: `arr[${j + 1}] = ${key}`,
            lineIndex: 7
        });
    }

    steps.push({
        description: '✓ Insertion Sort complete! Array is fully sorted.',
        array: [...array],
        highlight: [],
        sorted: array.map((_, i) => i),
        swaps,
        complete: true,
        code: 'return arr;',
        lineIndex: 8
    });

    return steps;
};
