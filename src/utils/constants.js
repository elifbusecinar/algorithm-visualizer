export const ALGORITHMS = {
  twoSum: {
    name: 'Two Sum',
    complexity: 'O(n)',
    description: 'Find two numbers that add up to target using HashMap',
    category: 'Hash Table'
  },
  containsDuplicate: {
    name: 'Contains Duplicate',
    complexity: 'O(n)',
    description: 'Check if array contains any duplicates using Set',
    category: 'Hash Table'
  },
  bubbleSort: {
    name: 'Bubble Sort',
    complexity: 'O(n²)',
    description: 'Sort array by repeatedly swapping adjacent elements',
    category: 'Sorting'
  },
  selectionSort: {
    name: 'Selection Sort',
    complexity: 'O(n²)',
    description: 'Sort by finding minimum element in each iteration',
    category: 'Sorting'
  },
  binarySearch: {
    name: 'Binary Search',
    complexity: 'O(log n)',
    description: 'Search for target in sorted array using divide and conquer',
    category: 'Search'
  },
  mergeSort: {
    name: 'Merge Sort',
    complexity: 'O(n log n)',
    description: 'Efficient sorting using divide and conquer strategy',
    category: 'Sorting'
  },
  validParentheses: {
    name: 'Valid Parentheses',
    complexity: 'O(n)',
    description: 'Check if brackets are balanced using Stack',
    category: 'Stack'
  },
  maxSubarray: {
    name: 'Maximum Subarray',
    complexity: 'O(n)',
    description: "Find contiguous subarray with largest sum (Kadane's Algorithm)",
    category: 'Dynamic Programming'
  },
  quickSort: {
    name: 'Quick Sort',
    complexity: 'O(n log n)',
    description: 'Fast sorting using pivot-based partitioning',
    category: 'Sorting'
  },
  insertionSort: {
    name: 'Insertion Sort',
    complexity: 'O(n²)',
    description: 'Build sorted array by inserting elements one at a time',
    category: 'Sorting'
  },
  bestTimeToBuySellStock: {
    name: 'Best Time to Buy/Sell Stock',
    complexity: 'O(n)',
    description: 'Find maximum profit from stock prices array',
    category: 'Dynamic Programming'
  },
  longestSubstring: {
    name: 'Longest Substring',
    complexity: 'O(n)',
    description: 'Find longest substring without repeating characters',
    category: 'Sliding Window'
  },
  reverseLinkedList: {
    name: 'Reverse Linked List',
    complexity: 'O(n)',
    description: 'Reverse a singly linked list iteratively',
    category: 'Linked List'
  },
  climbingStairs: {
    name: 'Climbing Stairs',
    complexity: 'O(n)',
    description: 'Count ways to climb n stairs (1 or 2 steps at a time)',
    category: 'Dynamic Programming'
  }
};

export const SPEEDS = {
  slow: { name: 'Slow', delay: 1500 },
  medium: { name: 'Medium', delay: 800 },
  fast: { name: 'Fast', delay: 300 }
};

export const DEFAULT_ARRAYS = {
  twoSum: [2, 7, 11, 15],
  containsDuplicate: [1, 2, 3, 4, 5, 2],
  bubbleSort: [64, 34, 25, 12, 22, 11, 90],
  selectionSort: [64, 25, 12, 22, 11],
  binarySearch: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
  mergeSort: [38, 27, 43, 3, 9, 82, 10],
  maxSubarray: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
  quickSort: [10, 7, 8, 9, 1, 5],
  insertionSort: [12, 11, 13, 5, 6],
  bestTimeToBuySellStock: [7, 1, 5, 3, 6, 4],
  reverseLinkedList: [1, 2, 3, 4, 5]
};

export const DEFAULT_INPUTS = {
  binarySearch: { target: 7 },
  validParentheses: { input: '({[]})' },
  longestSubstring: { input: 'abcabcbb' },
  climbingStairs: { n: 5 }
};