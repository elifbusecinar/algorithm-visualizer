export const generateQuickSortSteps = (arr) => {
    const steps = [];
    const array = [...arr];
    let swaps = 0;

    steps.push({
        description: 'Starting Quick Sort - will use divide and conquer with pivot',
        array: [...array],
        highlight: [],
        swaps: 0,
        code: 'function quickSort(arr, low, high) { ... }',
        lineIndex: 0
    });

    let stack = [];

    const partition = (low, high) => {
        const pivot = array[high];

        stack.push({ name: 'partition', args: `[${low}..${high}]` });

        steps.push({
            description: `Selected pivot: ${pivot} at index ${high}`,
            array: [...array],
            highlight: [high],
            pivot: high,
            swaps,
            code: `pivot = arr[${high}] = ${pivot}`,
            lineIndex: 7,
            callStack: [...stack]
        });

        let i = low - 1;

        for (let j = low; j < high; j++) {
            steps.push({
                description: `Comparing ${array[j]} with pivot ${pivot}`,
                array: [...array],
                highlight: [j, high],
                comparing: [j, high],
                swaps,
                code: `if (arr[${j}] <= ${pivot})`,
                lineIndex: 9,
                callStack: [...stack]
            });

            if (array[j] <= pivot) {
                i++;
                if (i !== j) {
                    [array[i], array[j]] = [array[j], array[i]];
                    swaps++;
                    steps.push({
                        description: `Swapped ${array[i]} and ${array[j]}`,
                        array: [...array],
                        highlight: [i, j],
                        swapped: [i, j],
                        swaps,
                        code: `swap(arr[${i}], arr[${j}])`,
                        lineIndex: 10,
                        callStack: [...stack]
                    });
                }
            }
        }

        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        swaps++;
        steps.push({
            description: `Placed pivot ${array[i + 1]} at correct position ${i + 1}`,
            array: [...array],
            highlight: [i + 1],
            pivotPlaced: i + 1,
            swaps,
            code: `swap(arr[${i + 1}], arr[${high}])`,
            lineIndex: 11,
            callStack: [...stack]
        });

        stack.pop(); // Pop partition

        return i + 1;
    };

    const quickSort = (low, high) => {
        stack.push({ name: 'quickSort', args: `[${low}..${high}]` });

        if (low < high) {
            steps.push({
                description: `Partitioning range [${low}..${high}]`,
                array: [...array],
                highlight: Array.from({ length: high - low + 1 }, (_, k) => low + k),
                code: `if (low < high)`,
                lineIndex: 1,
                callStack: [...stack]
            });

            const pi = partition(low, high);

            steps.push({
                description: `Partition complete. Sorting left [${low}..${pi - 1}] and right [${pi + 1}..${high}]`,
                array: [...array],
                highlight: Array.from({ length: pi - low }, (_, k) => low + k).concat(
                    Array.from({ length: high - pi }, (_, k) => pi + 1 + k)
                ),
                sorted: [pi],
                swaps,
                code: `quickSort(${low}, ${pi - 1}), quickSort(${pi + 1}, ${high})`,
                lineIndex: 3,
                callStack: [...stack]
            });

            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        } else {
            steps.push({
                description: `Base case: Range [${low}..${high}] too small`,
                array: [...array],
                code: `if (low < high)`,
                lineIndex: 1,
                callStack: [...stack]
            });
        }

        stack.pop(); // Pop quickSort
    };

    if (array.length > 0) {
        quickSort(0, array.length - 1);
    }

    steps.push({
        description: '✓ Quick Sort complete! Array is fully sorted.',
        array: [...array],
        highlight: [],
        sorted: array.map((_, i) => i),
        swaps,
        complete: true,
        code: 'return arr;',
        lineIndex: 12,
        callStack: []
    });

    return steps;
};
