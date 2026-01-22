export const generateBinarySearchSteps = (arr, target) => {
    const steps = [];
    const array = [...arr].sort((a, b) => a - b); // Binary search requires sorted array
    let left = 0;
    let right = array.length - 1;

    steps.push({
        description: `Starting Binary Search for target: ${target}. Array must be sorted first.`,
        array: [...array],
        highlight: [],
        pointers: { left, right },
        target,
        code: 'let left = 0, right = arr.length - 1;',
        lineIndex: 1
    });

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        steps.push({
            description: `Checking middle element at index ${mid}: ${array[mid]}`,
            array: [...array],
            highlight: [mid],
            pointers: { left, right, mid },
            target,
            comparing: array[mid],
            code: `mid = Math.floor((${left} + ${right}) / 2) = ${mid}`,
            lineIndex: 3
        });

        if (array[mid] === target) {
            steps.push({
                description: `✓ Found target ${target} at index ${mid}!`,
                array: [...array],
                highlight: [mid],
                pointers: { left, right, mid },
                target,
                found: true,
                foundIndex: mid,
                code: `return ${mid}; // Found!`,
                lineIndex: 5
            });
            return steps;
        } else if (array[mid] < target) {
            steps.push({
                description: `${array[mid]} < ${target}, search right half`,
                array: [...array],
                highlight: [mid],
                pointers: { left, right, mid },
                target,
                searchDirection: 'right',
                code: `left = mid + 1 = ${mid + 1}`,
                lineIndex: 7
            });
            left = mid + 1;
        } else {
            steps.push({
                description: `${array[mid]} > ${target}, search left half`,
                array: [...array],
                highlight: [mid],
                pointers: { left, right, mid },
                target,
                searchDirection: 'left',
                code: `right = mid - 1 = ${mid - 1}`,
                lineIndex: 9
            });
            right = mid - 1;
        }
    }

    steps.push({
        description: `✗ Target ${target} not found in array`,
        array: [...array],
        highlight: [],
        pointers: { left, right },
        target,
        notFound: true,
        code: 'return -1; // Not found',
        lineIndex: 10
    });

    return steps;
};
