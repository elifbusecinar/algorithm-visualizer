export const generateContainsDuplicateSteps = (arr) => {
  const steps = [];
  const seen = new Set();
  
  steps.push({
    description: 'Initialize empty Set to track seen values',
    array: arr,
    highlight: [],
    set: new Set(),
    current: -1,
    found: false,
    code: 'const seen = new Set();'
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      description: `Checking nums[${i}] = ${arr[i]}`,
      array: arr,
      highlight: [i],
      set: new Set(seen),
      current: i,
      found: false,
      code: `if (seen.has(${arr[i]})) { ... }`
    });

    if (seen.has(arr[i])) {
      steps.push({
        description: `✓ Duplicate found! ${arr[i]} already exists in the set`,
        array: arr,
        highlight: [i],
        set: new Set(seen),
        current: i,
        found: true,
        code: 'return true;'
      });
      break;
    }

    seen.add(arr[i]);
    steps.push({
      description: `Added ${arr[i]} to set`,
      array: arr,
      highlight: [i],
      set: new Set(seen),
      current: i,
      found: false,
      code: `seen.add(${arr[i]});`
    });
  }

  if (!steps[steps.length - 1].found) {
    steps.push({
      description: '✗ No duplicates found in array',
      array: arr,
      highlight: [],
      set: new Set(seen),
      current: -1,
      found: false,
      code: 'return false;'
    });
  }

  return steps;
};