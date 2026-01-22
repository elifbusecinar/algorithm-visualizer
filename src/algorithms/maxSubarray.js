export const generateMaxSubarraySteps = (arr) => {
    const steps = [];
    const array = [...arr];
    let maxSum = array[0];
    let currentSum = array[0];
    let maxStart = 0, maxEnd = 0;
    let currentStart = 0;

    steps.push({
        description: "Starting Maximum Subarray (Kadane's Algorithm)",
        array: [...array],
        highlight: [],
        maxSum,
        currentSum,
        maxSubarray: [0],
        code: 'let maxSum = arr[0], currentSum = arr[0];',
        lineIndex: 1
    });

    steps.push({
        description: `Initialize: currentSum = ${currentSum}, maxSum = ${maxSum}`,
        array: [...array],
        highlight: [0],
        maxSum,
        currentSum,
        currentStart: 0,
        maxSubarray: [0],
        code: `currentSum = ${currentSum}`,
        lineIndex: 1
    });

    for (let i = 1; i < array.length; i++) {
        const prevCurrentSum = currentSum;

        steps.push({
            description: `At index ${i}: comparing ${array[i]} vs ${currentSum + array[i]}`,
            array: [...array],
            highlight: [i],
            maxSum,
            currentSum,
            comparing: { standalone: array[i], withPrevious: currentSum + array[i] },
            maxSubarray: Array.from({ length: maxEnd - maxStart + 1 }, (_, k) => maxStart + k),
            code: `currentSum + arr[${i}] = ${currentSum} + ${array[i]} = ${currentSum + array[i]}`,
            lineIndex: 3
        });

        if (currentSum + array[i] < array[i]) {
            currentSum = array[i];
            currentStart = i;
            steps.push({
                description: `Starting new subarray at index ${i} (${array[i]} > ${prevCurrentSum} + ${array[i]})`,
                array: [...array],
                highlight: [i],
                maxSum,
                currentSum,
                newStart: i,
                maxSubarray: Array.from({ length: maxEnd - maxStart + 1 }, (_, k) => maxStart + k),
                code: `currentSum = arr[${i}] = ${array[i]}`,
                lineIndex: 3
            });
        } else {
            currentSum = currentSum + array[i];
            steps.push({
                description: `Extending current subarray: currentSum = ${currentSum}`,
                array: [...array],
                highlight: Array.from({ length: i - currentStart + 1 }, (_, k) => currentStart + k),
                maxSum,
                currentSum,
                extending: true,
                maxSubarray: Array.from({ length: maxEnd - maxStart + 1 }, (_, k) => maxStart + k),
                code: `currentSum += arr[${i}] = ${currentSum}`,
                lineIndex: 3
            });
        }

        if (currentSum > maxSum) {
            maxSum = currentSum;
            maxStart = currentStart;
            maxEnd = i;
            steps.push({
                description: `✓ New maximum found! maxSum = ${maxSum}`,
                array: [...array],
                highlight: Array.from({ length: i - currentStart + 1 }, (_, k) => currentStart + k),
                maxSum,
                currentSum,
                newMax: true,
                maxSubarray: Array.from({ length: maxEnd - maxStart + 1 }, (_, k) => maxStart + k),
                code: `maxSum = ${maxSum}`,
                lineIndex: 4
            });
        }
    }

    const maxSubarrayIndices = Array.from({ length: maxEnd - maxStart + 1 }, (_, k) => maxStart + k);
    const maxSubarrayValues = maxSubarrayIndices.map(i => array[i]);

    steps.push({
        description: `✓ Complete! Maximum subarray: [${maxSubarrayValues.join(', ')}] with sum ${maxSum}`,
        array: [...array],
        highlight: maxSubarrayIndices,
        maxSum,
        currentSum,
        maxSubarray: maxSubarrayIndices,
        complete: true,
        code: `return ${maxSum}; // Indices [${maxStart}..${maxEnd}]`,
        lineIndex: 5
    });

    return steps;
};
