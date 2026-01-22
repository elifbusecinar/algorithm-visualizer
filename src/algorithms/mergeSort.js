export const generateMergeSortSteps = (arr) => {
    const steps = [];
    const array = [...arr];

    steps.push({
        description: 'Starting Merge Sort - will divide array and merge sorted halves',
        array: [...array],
        highlight: [],
        code: 'function mergeSort(arr) { ... }',
        lineIndex: 0
    });

    let stack = [];

    const mergeSort = (arr, start = 0, end = arr.length - 1, depth = 0) => {
        // Push to stack
        stack.push({ name: 'mergeSort', args: `[${start}..${end}]` });

        if (start >= end) {
            steps.push({
                description: start === end
                    ? `Base case reached: Single element [${arr[start]}] is already sorted`
                    : `Base case: Empty range`,
                array: [...array],
                highlight: [start],
                code: 'if (start >= end) return;',
                lineIndex: 1,
                callStack: [...stack] // Snapshot of stack
            });
            stack.pop();
            return;
        }

        const mid = Math.floor((start + end) / 2);

        steps.push({
            description: `Dividing array from index ${start} to ${end} at mid ${mid}`,
            array: [...array],
            highlight: Array.from({ length: end - start + 1 }, (_, i) => start + i),
            dividing: { start, mid, end },
            depth,
            code: `mid = (${start} + ${end}) / 2 = ${mid}`,
            lineIndex: 2,
            callStack: [...stack]
        });

        mergeSort(arr, start, mid, depth + 1);
        mergeSort(arr, mid + 1, end, depth + 1);

        merge(arr, start, mid, end, depth);

        // Pop from stack when function returns
        stack.pop();
    };

    const merge = (arr, start, mid, end, depth) => {
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);

        // Merge is technically a helper, we can maybe show it in stack or just keep mergeSort in stack
        // Let's keep just mergeSort in stack for clarity, or add 'merge' temporarily
        stack.push({ name: 'merge', args: `[${start}..${end}]` });

        steps.push({
            description: `Merging subarrays [${left.join(', ')}] and [${right.join(', ')}]`,
            array: [...array],
            highlight: Array.from({ length: end - start + 1 }, (_, i) => start + i),
            merging: { start, mid, end, left, right },
            depth,
            code: `merge(left, right)`,
            lineIndex: 7,
            callStack: [...stack]
        });

        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                array[k] = left[i];
                i++;
            } else {
                array[k] = right[j];
                j++;
            }

            steps.push({
                description: `Placed ${array[k]} at index ${k}`,
                array: [...array],
                highlight: [k],
                merging: { start, mid, end },
                depth,
                code: `arr[${k}] = ${array[k]}`,
                lineIndex: 12,
                callStack: [...stack]
            });
            k++;
        }

        while (i < left.length) {
            array[k] = left[i];
            steps.push({
                description: `Copying remaining: ${array[k]} at index ${k}`,
                array: [...array],
                highlight: [k],
                depth,
                code: `arr[${k}] = ${array[k]}`,
                lineIndex: 16,
                callStack: [...stack]
            });
            i++;
            k++;
        }

        while (j < right.length) {
            array[k] = right[j];
            steps.push({
                description: `Copying remaining: ${array[k]} at index ${k}`,
                array: [...array],
                highlight: [k],
                depth,
                code: `arr[${k}] = ${array[k]}`,
                lineIndex: 16,
                callStack: [...stack]
            });
            j++;
            k++;
        }

        steps.push({
            description: `Merged section [${start}..${end}] complete`,
            array: [...array],
            highlight: Array.from({ length: end - start + 1 }, (_, i) => start + i),
            sorted: Array.from({ length: end - start + 1 }, (_, i) => start + i),
            depth,
            code: '// Merge complete',
            lineIndex: 6,
            callStack: [...stack]
        });

        stack.pop(); // Pop 'merge'
    };

    mergeSort(array, 0, array.length - 1, 0);

    steps.push({
        description: '✓ Merge Sort complete! Array is fully sorted.',
        array: [...array],
        highlight: [],
        sorted: array.map((_, i) => i),
        complete: true,
        code: 'return arr;',
        lineIndex: 16
    });

    return steps;
};
