export const edgeCases = {
    sorting: {
        label: "Sorting Presets",
        presets: [
            { label: "Random (Default)", value: "random" },
            { label: "Sorted (Best Case)", value: [1, 2, 3, 4, 5, 6, 7, 8] },
            { label: "Reverse Sorted (Worst Case)", value: [8, 7, 6, 5, 4, 3, 2, 1] },
            { label: "Nearly Sorted", value: [1, 2, 4, 3, 5, 6, 8, 7] },
            { label: "Many Duplicates", value: [5, 1, 5, 2, 5, 3, 5, 4] },
            { label: "Few Unique", value: [1, 1, 1, 2, 2, 2, 1, 1] }
        ]
    },
    arrays: {
        label: "Array Presets",
        presets: [
            { label: "Default", value: "default" },
            { label: "All Positive", value: [10, 20, 30, 40, 50] },
            { label: "All Negative", value: [-5, -1, -10, -3, -8] },
            { label: "Mixed Signs", value: [-5, 10, -3, 8, -1, 5] },
            { label: "Zeros Included", value: [0, 5, -2, 0, 10, 0] },
            { label: "Small Input", value: [5, -2] },
            { label: "Large Input", value: [1, -5, 10, 20, -15, 3, 8, -2, 6, 12, -8, 4] }
        ]
    },
    searching: {
        label: "Searching Presets (Sorted)",
        presets: [
            { label: "Default", value: "default" },
            { label: "Target at Start", value: [1, 5, 10, 15, 20, 25], target: 1 },
            { label: "Target at End", value: [1, 5, 10, 15, 20, 25], target: 25 },
            { label: "Target in Middle", value: [1, 5, 10, 15, 20, 25], target: 10 },
            { label: "Target Not Found", value: [1, 5, 10, 15, 20, 25], target: 7 },
            { label: "Large Range", value: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], target: 12 }
        ]
    },
    strings: {
        label: "String Presets",
        presets: [
            { label: "Default", value: "default" },
            { label: "No Repeats", value: "abcdefg" },
            { label: "All Same", value: "aaaaaaa" },
            { label: "Repeating Pattern", value: "abcabcabc" },
            { label: "Palindrome-ish", value: "abcba" },
            { label: "Empty String", value: "" }
        ]
    },
    parentheses: {
        label: "Parentheses Presets",
        presets: [
            { label: "Default", value: "({[]})" },
            { label: "Nested Deep", value: "((({[]})))" },
            { label: "Unbalanced Left", value: "(((" },
            { label: "Unbalanced Right", value: ")))" },
            { label: "Mismatched", value: "([)]" },
            { label: "Complex Valid", value: "{[]}()()" }
        ]
    },
    stairs: {
        label: "Stairs Presets",
        presets: [
            { label: "Default (5)", value: 5 },
            { label: "Small (2)", value: 2 },
            { label: "Medium (8)", value: 8 },
            { label: "Large (15)", value: 15 }
        ]
    },
    stock: {
        label: "Stock Prices Presets",
        presets: [
            { label: "Default", value: [7, 1, 5, 3, 6, 4] },
            { label: "Profit Possible", value: [1, 2, 3, 4, 5] },
            { label: "Price Drop Only", value: [7, 6, 4, 3, 1] },
            { label: "Volatile", value: [1, 10, 1, 10, 1] },
            { label: "Single Peak", value: [1, 2, 100, 2, 1] }
        ]
    }
};

export const getEdgeCasesForAlgorithm = (algo) => {
    const sortingAlgos = ['bubbleSort', 'selectionSort', 'insertionSort', 'mergeSort', 'quickSort'];
    const arrayAlgos = ['twoSum', 'maxSubarray', 'containsDuplicate', 'reverseLinkedList']; // Generic array inputs

    if (sortingAlgos.includes(algo)) return edgeCases.sorting;
    if (arrayAlgos.includes(algo)) return edgeCases.arrays;
    if (algo === 'binarySearch') return edgeCases.searching;
    if (algo === 'validParentheses') return edgeCases.parentheses;
    if (algo === 'longestSubstring') return edgeCases.strings;
    if (algo === 'climbingStairs') return edgeCases.stairs;
    if (algo === 'bestTimeToBuySellStock') return edgeCases.stock;

    return null;
};
