export const ALGORITHMS = {
  twoSum: {
    name: 'Two Sum',
    complexity: 'O(n)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(n)',
    description: 'Find two numbers that add up to target using HashMap',
    category: 'Hash Table',
    pseudocode: `
1. Create empty HashMap
2. For each number in array:
   a. Calculate complement = target - number
   b. If complement exists in map, return [index of complement, current index]
   c. Add number to map with its index
3. Return empty array (no solution found)
    `
  },
  containsDuplicate: {
    name: 'Contains Duplicate',
    complexity: 'O(n)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(n)',
    description: 'Check if array contains any duplicates using Set',
    category: 'Hash Table',
    pseudocode: `
1. Create empty Set
2. For each number in array:
   a. If number exists in Set, return true
   b. Add number to Set
3. Return false (no duplicates found)
    `
  },
  bubbleSort: {
    name: 'Bubble Sort',
    complexity: 'O(n²)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    description: 'Sort array by repeatedly swapping adjacent elements',
    category: 'Sorting',
    pseudocode: `
1. For i = 0 to n-1:
   a. For j = 0 to n-i-2:
      i. If arr[j] > arr[j+1]:
         - Swap arr[j] and arr[j+1]
2. Return sorted array
    `
  },
  selectionSort: {
    name: 'Selection Sort',
    complexity: 'O(n²)',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    description: 'Sort by finding minimum element in each iteration',
    category: 'Sorting',
    pseudocode: `
1. For i = 0 to n-1:
   a. Find minimum element in arr[i..n-1]
   b. Swap minimum with arr[i]
2. Return sorted array
    `
  },
  binarySearch: {
    name: 'Binary Search',
    complexity: 'O(log n)',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    description: 'Search for target in sorted array using divide and conquer',
    category: 'Search',
    pseudocode: `
1. Set left = 0, right = n-1
2. While left <= right:
   a. mid = (left + right) / 2
   b. If arr[mid] == target, return mid
   c. Else if arr[mid] < target, left = mid + 1
   d. Else right = mid - 1
3. Return -1 (not found)
    `
  },
  mergeSort: {
    name: 'Merge Sort',
    complexity: 'O(n log n)',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    description: 'Efficient sorting using divide and conquer strategy',
    category: 'Sorting',
    pseudocode: `
1. If array length <= 1, return array
2. Find middle point
3. Recursively sort left half
4. Recursively sort right half
5. Merge the sorted halves
6. Return merged array
    `
  },
  validParentheses: {
    name: 'Valid Parentheses',
    complexity: 'O(n)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(n)',
    description: 'Check if brackets are balanced using Stack',
    category: 'Stack',
    pseudocode: `
1. Create empty Stack
2. For each character in string:
   a. If opening bracket, push to stack
   b. If closing bracket:
      i. If stack empty, return false
      ii. If top doesn't match, return false
      iii. Pop from stack
3. Return stack is empty
    `
  },
  maxSubarray: {
    name: 'Maximum Subarray',
    complexity: 'O(n)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)',
    description: "Find contiguous subarray with largest sum (Kadane's Algorithm)",
    category: 'Dynamic Programming',
    pseudocode: `
1. Initialize max_sum = arr[0], current_sum = arr[0]
2. For i = 1 to n-1:
   a. current_sum = max(arr[i], current_sum + arr[i])
   b. max_sum = max(max_sum, current_sum)
3. Return max_sum
    `
  },
  quickSort: {
    name: 'Quick Sort',
    complexity: 'O(n log n)',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    description: 'Fast sorting using pivot-based partitioning',
    category: 'Sorting',
    pseudocode: `
1. If array length <= 1, return array
2. Choose pivot element
3. Partition array into 3 parts:
   - Less than pivot
   - Equal to pivot
   - Greater than pivot
4. Recursively sort left and right
5. Concatenate and return
    `
  },
  insertionSort: {
    name: 'Insertion Sort',
    complexity: 'O(n²)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    description: 'Build sorted array by inserting elements one at a time',
    category: 'Sorting',
    pseudocode: `
1. For i = 1 to n-1:
   a. key = arr[i]
   b. j = i - 1
   c. While j >= 0 and arr[j] > key:
      - arr[j+1] = arr[j]
      - j = j - 1
   d. arr[j+1] = key
2. Return sorted array
    `
  },
  bestTimeToBuySellStock: {
    name: 'Best Time to Buy/Sell Stock',
    complexity: 'O(n)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)',
    description: 'Find maximum profit from stock prices array',
    category: 'Dynamic Programming',
    pseudocode: `
1. If array length < 2, return 0
2. min_price = arr[0], max_profit = 0
3. For i = 1 to n-1:
   a. max_profit = max(max_profit, arr[i] - min_price)
   b. min_price = min(min_price, arr[i])
4. Return max_profit
    `
  },
  longestSubstring: {
    name: 'Longest Substring',
    complexity: 'O(n)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(min(n, m))',
    description: 'Find longest substring without repeating characters',
    category: 'Sliding Window',
    pseudocode: `
1. Create HashMap and left pointer = 0
2. For right = 0 to n-1:
   a. If char at right is in map:
      - Move left to max(left, map[char] + 1)
   b. Update map[char] = right
   c. Update max length
3. Return longest substring
    `
  },
  reverseLinkedList: {
    name: 'Reverse Linked List',
    complexity: 'O(n)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)',
    description: 'Reverse a singly linked list iteratively',
    category: 'Linked List',
    pseudocode: `
1. Initialize prev = null, current = head
2. While current is not null:
   a. next = current.next
   b. current.next = prev
   c. prev = current
   d. current = next
3. Return prev (new head)
    `
  },
  climbingStairs: {
    name: 'Climbing Stairs',
    complexity: 'O(n)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(n)',
    description: 'Count ways to climb n stairs (1 or 2 steps at a time)',
    category: 'Dynamic Programming',
    pseudocode: `
1. If n <= 2, return n
2. Create dp array of size n
3. dp[0] = 1, dp[1] = 2
4. For i = 2 to n-1:
   a. dp[i] = dp[i-1] + dp[i-2]
5. Return dp[n-1]
    `
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