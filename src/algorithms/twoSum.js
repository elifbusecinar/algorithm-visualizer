export const generateTwoSumSteps = (arr, target) => {
  const steps = [];
  const map = {};

  steps.push({
    description: 'Initialize empty HashMap to store values and indices',
    array: arr,
    highlight: [],
    map: {},
    current: -1,
    found: false,
    code: 'const map = new Map();',
    lineIndex: 1
  });

  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];

    steps.push({
      description: `Checking index ${i}: value = ${arr[i]}, looking for complement = ${complement}`,
      array: arr,
      highlight: [i],
      map: { ...map },
      current: i,
      found: false,
      checking: complement,
      code: `const complement = ${target} - ${arr[i]} = ${complement};`,
      lineIndex: 3
    });

    if (map.hasOwnProperty(complement)) {
      steps.push({
        description: `✓ Found! nums[${map[complement]}] + nums[${i}] = ${arr[map[complement]]} + ${arr[i]} = ${target}`,
        array: arr,
        highlight: [map[complement], i],
        map: { ...map },
        current: i,
        found: true,
        result: [map[complement], i],
        code: `return [${map[complement]}, ${i}];`,
        lineIndex: 5
      });
      break;
    }

    map[arr[i]] = i;
    steps.push({
      description: `Added to map: ${arr[i]} → index ${i}`,
      array: arr,
      highlight: [i],
      map: { ...map },
      current: i,
      found: false,
      code: `map.set(${arr[i]}, ${i});`,
      lineIndex: 6
    });
  }

  return steps;
};