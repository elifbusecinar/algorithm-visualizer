export const complexityData = {
    bubbleSort: {
        name: "Bubble Sort",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
    },
    selectionSort: {
        name: "Selection Sort",
        timeComplexity: {
            best: "O(n²)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        description: "Divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items."
    },
    insertionSort: {
        name: "Insertion Sort",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        description: "Builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort."
    },
    mergeSort: {
        name: "Merge Sort",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
        },
        spaceComplexity: "O(n)",
        description: "Divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves."
    },
    quickSort: {
        name: "Quick Sort",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(log n)",
        description: "Divide and conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot."
    },
    binarySearch: {
        name: "Binary Search",
        timeComplexity: {
            best: "O(1)",
            average: "O(log n)",
            worst: "O(log n)"
        },
        spaceComplexity: "O(1)",
        description: "Search algorithm that finds the position of a target value within a sorted array. Binary search compares the target value to the middle element of the array."
    },
    twoSum: {
        name: "Two Sum",
        timeComplexity: {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)"
        },
        spaceComplexity: "O(n)",
        description: "Find two numbers in an array that add up to a specific target. Using a Hash Map allows for a single pass through the array."
    },
    containsDuplicate: {
        name: "Contains Duplicate",
        timeComplexity: {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)"
        },
        spaceComplexity: "O(n)",
        description: "Check if any value appears at least twice in the array. Using a Hash Set allows for O(1) average time complexity lookups."
    },
    maxSubarray: {
        name: "Maximum Subarray",
        timeComplexity: {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)"
        },
        spaceComplexity: "O(1)",
        description: "Find the contiguous subarray which has the largest sum. Kadane's Algorithm iterates through the array while maintaining the current max sum ending at that position."
    },
    longestSubstring: {
        name: "Longest Substring Without Repeating Characters",
        timeComplexity: {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)"
        },
        spaceComplexity: "O(min(n, m))",
        description: "Find the length of the longest substring without repeating characters. Uses a sliding window and a Hash Map to track characters and their indices."
    },
    reverseLinkedList: {
        name: "Reverse Linked List",
        timeComplexity: {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)"
        },
        spaceComplexity: "O(1)",
        description: "Reverse a singly linked list iteratively. Uses three pointers (prev, current, next) to reverse the direction of links in a single pass."
    },
    validParentheses: {
        name: "Valid Parentheses",
        timeComplexity: {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)"
        },
        spaceComplexity: "O(n)",
        description: "Determine if the input string has valid parentheses. Uses a Stack to keep track of opening brackets and ensures they match closing brackets in the correct order."
    },
    climbingStairs: {
        name: "Climbing Stairs",
        timeComplexity: {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)"
        },
        spaceComplexity: "O(n)",
        description: "Count distinct ways to climb n stairs. Dynamic Programming approach builds the solution from base cases (1 and 2 steps) up to n."
    },
    bestTimeToBuySellStock: {
        name: "Best Time to Buy and Sell Stock",
        timeComplexity: {
            best: "O(n)",
            average: "O(n)",
            worst: "O(n)"
        },
        spaceComplexity: "O(1)",
        description: "Maximize profit by choosing a single day to buy and a single day to sell. Iterates through prices, tracking the minimum price comparisons and maximum profit seen so far."
    }
};
