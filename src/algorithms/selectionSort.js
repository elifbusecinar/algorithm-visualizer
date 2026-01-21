export const generateSelectionSortSteps = (arr) => {
  const steps = [];
  const array = [...arr];
  
  steps.push({
    description: 'Starting Selection Sort - will find minimum in each iteration',
    array: [...array],
    highlight: [],
    sorted: [],
    code: 'for (let i = 0; i < n-1; i++) { ... }'
  });

  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    
    steps.push({
      description: `Finding minimum element in unsorted portion (index ${i} to ${array.length-1})`,
      array: [...array],
      highlight: [i],
      minIdx: i,
      sorted: Array.from({length: i}, (_, k) => k),
      code: `let minIdx = ${i};`
    });

    for (let j = i + 1; j < array.length; j++) {
      steps.push({
        description: `Comparing: ${array[minIdx]} (current min) with ${array[j]}`,
        array: [...array],
        highlight: [minIdx, j],
        comparing: true,
        minIdx,
        sorted: Array.from({length: i}, (_, k) => k),
        code: `if (arr[${j}] < arr[${minIdx}]) { minIdx = ${j}; }`
      });

      if (array[j] < array[minIdx]) {
        minIdx = j;
        steps.push({
          description: `New minimum found: ${array[minIdx]} at index ${minIdx}`,
          array: [...array],
          highlight: [minIdx],
          minIdx,
          sorted: Array.from({length: i}, (_, k) => k),
          code: `minIdx = ${minIdx};`
        });
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      steps.push({
        description: `Swapping: arr[${i}] ↔ arr[${minIdx}] (${array[minIdx]} ↔ ${array[i]})`,
        array: [...array],
        highlight: [i, minIdx],
        swapped: true,
        sorted: Array.from({length: i+1}, (_, k) => k),
        code: `swap(arr[${i}], arr[${minIdx}]);`
      });
    }

    steps.push({
      description: `Element at index ${i} is now in correct position`,
      array: [...array],
      highlight: [i],
      sorted: Array.from({length: i+1}, (_, k) => k),
      code: `// arr[${i}] = ${array[i]} is sorted`
    });
  }

  steps.push({
    description: '✓ Sorting complete! Array is now fully sorted',
    array: [...array],
    highlight: [],
    sorted: array.map((_, i) => i),
    complete: true,
    code: 'return arr;'
  });

  return steps;
};