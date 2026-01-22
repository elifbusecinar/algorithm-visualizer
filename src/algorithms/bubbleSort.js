export const generateBubbleSortSteps = (arr) => {
  const steps = [];
  const array = [...arr];
  let swaps = 0;

  steps.push({
    description: 'Starting Bubble Sort - will compare adjacent elements',
    array: [...array],
    highlight: [],
    swaps: 0,
    sorted: [],
    code: 'for (let i = 0; i < n; i++) { ... }',
    lineIndex: 1
  });

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      steps.push({
        description: `Comparing: ${array[j]} and ${array[j + 1]}`,
        array: [...array],
        highlight: [j, j + 1],
        comparing: true,
        swaps,
        sorted: Array.from({ length: i }, (_, k) => array.length - 1 - k),
        code: `if (arr[${j}] > arr[${j + 1}]) { swap(); }`,
        lineIndex: 4
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
        steps.push({
          description: `Swapped: ${array[j + 1]} ↔ ${array[j]}`,
          array: [...array],
          highlight: [j, j + 1],
          swapped: true,
          swaps,
          sorted: Array.from({ length: i }, (_, k) => array.length - 1 - k),
          code: `[arr[${j}], arr[${j + 1}]] = [arr[${j + 1}], arr[${j}]];`,
          lineIndex: 5
        });
      }
    }
    steps.push({
      description: `Iteration ${i + 1} complete. Element at index ${array.length - 1 - i} is now sorted`,
      array: [...array],
      highlight: [],
      swaps,
      sorted: Array.from({ length: i + 1 }, (_, k) => array.length - 1 - k),
      code: `// ${array[array.length - 1 - i]} is in final position`,
      lineIndex: 2
    });
  }

  steps.push({
    description: `✓ Sorting complete! Total swaps: ${swaps}`,
    array: [...array],
    highlight: [],
    swaps,
    sorted: array.map((_, i) => i),
    complete: true,
    code: 'return arr;',
    lineIndex: 6
  });

  return steps;
};