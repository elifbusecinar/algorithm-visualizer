export const generateMoveZeroesSteps = (nums) => {
    const steps = [];
    const array = [...nums];
    let lastNonZeroFoundAt = 0;

    steps.push({
        description: 'Initialize lastNonZeroFoundAt = 0',
        array: [...array],
        highlight: [],
        pointers: { lastNonZero: 0 },
        code: 'lastNonZeroFoundAt = 0',
        lineIndex: 1
    });

    for (let cur = 0; cur < array.length; cur++) {
        steps.push({
            description: `Checking index ${cur}: value is ${array[cur]}`,
            array: [...array],
            highlight: [cur],
            pointers: { lastNonZero: lastNonZeroFoundAt, current: cur },
            code: `if nums[${cur}] != 0`,
            lineIndex: 3
        });

        if (array[cur] !== 0) {
            if (cur !== lastNonZeroFoundAt) {
                steps.push({
                    description: `Found non-zero ${array[cur]}. Swapping with index ${lastNonZeroFoundAt}`,
                    array: [...array],
                    highlight: [cur, lastNonZeroFoundAt],
                    swapped: [cur, lastNonZeroFoundAt],
                    pointers: { lastNonZero: lastNonZeroFoundAt, current: cur },
                    code: `swap(nums[${lastNonZeroFoundAt}], nums[${cur}])`,
                    lineIndex: 4
                });

                // Swap
                [array[lastNonZeroFoundAt], array[cur]] = [array[cur], array[lastNonZeroFoundAt]];

                steps.push({
                    description: `Swapped. Incrementing lastNonZeroFoundAt to ${lastNonZeroFoundAt + 1}`,
                    array: [...array],
                    highlight: [lastNonZeroFoundAt, cur],
                    pointers: { lastNonZero: lastNonZeroFoundAt + 1, current: cur },
                    code: `lastNonZeroFoundAt++`,
                    lineIndex: 5
                });
            } else {
                steps.push({
                    description: `Value ${array[cur]} is non-zero, but already at correct position. Increment ptr.`,
                    array: [...array],
                    highlight: [cur],
                    pointers: { lastNonZero: lastNonZeroFoundAt + 1, current: cur },
                    code: `lastNonZeroFoundAt++`,
                    lineIndex: 5
                });
            }
            lastNonZeroFoundAt++;
        }
    }

    steps.push({
        description: '✓ Complete! All zeroes moved to the end.',
        array: [...array],
        highlight: array.map((_, i) => i).filter(i => array[i] === 0),
        complete: true,
        code: 'return nums',
        lineIndex: 6
    });

    return steps;
};
