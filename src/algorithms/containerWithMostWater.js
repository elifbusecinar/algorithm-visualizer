export const generateContainerWithMostWaterSteps = (height) => {
    const steps = [];
    const array = [...height];
    let left = 0;
    let right = array.length - 1;
    let maxArea = 0;

    steps.push({
        description: 'Initialize maxArea = 0, left = 0, right = n - 1',
        array: [...array],
        highlight: [left, right],
        pointers: { left, right },
        maxArea,
        code: 'left = 0, right = height.length - 1',
        lineIndex: 1
    });

    while (left < right) {
        const width = right - left;
        const currentHeight = Math.min(array[left], array[right]);
        const currentArea = width * currentHeight;

        steps.push({
            description: `Calculate Area: min(${array[left]}, ${array[right]}) * (${right} - ${left}) = ${currentHeight} * ${width} = ${currentArea}`,
            array: [...array],
            highlight: [left, right],
            pointers: { left, right },
            maxArea,
            currentArea,
            comparing: { left, right, area: currentArea },
            code: `current_area = min(${array[left]}, ${array[right]}) * (${right} - ${left})`,
            lineIndex: 4
        });

        if (currentArea > maxArea) {
            maxArea = currentArea;
            steps.push({
                description: `✓ New Max Area found: ${maxArea}`,
                array: [...array],
                highlight: [left, right],
                pointers: { left, right },
                maxArea,
                currentArea,
                newMax: true,
                code: `max_area = ${maxArea}`,
                lineIndex: 5
            });
        }

        if (array[left] < array[right]) {
            steps.push({
                description: `Height[left] (${array[left]}) < Height[right] (${array[right]}), moving left pointer`,
                array: [...array],
                highlight: [left],
                pointers: { left, right },
                maxArea,
                code: 'left++',
                lineIndex: 7
            });
            left++;
        } else {
            steps.push({
                description: `Height[left] (${array[left]}) >= Height[right] (${array[right]}), moving right pointer`,
                array: [...array],
                highlight: [right],
                pointers: { left, right },
                maxArea,
                code: 'right--',
                lineIndex: 9
            });
            right--;
        }
    }

    steps.push({
        description: `✓ Complete! Max Area = ${maxArea}`,
        array: [...array],
        highlight: [],
        maxArea,
        complete: true,
        code: `return ${maxArea}`,
        lineIndex: 10
    });

    return steps;
};
