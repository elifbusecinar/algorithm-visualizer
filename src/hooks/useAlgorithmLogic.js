import { useState, useEffect } from 'react';
import { generateTwoSumSteps } from '../algorithms/twoSum';
import { generateContainsDuplicateSteps } from '../algorithms/containsDuplicate';
import { generateBubbleSortSteps } from '../algorithms/bubbleSort';
import { generateSelectionSortSteps } from '../algorithms/selectionSort';
import { generateBinarySearchSteps } from '../algorithms/binarySearch';
import { generateMergeSortSteps } from '../algorithms/mergeSort';
import { generateValidParenthesesSteps } from '../algorithms/validParentheses';
import { generateMaxSubarraySteps } from '../algorithms/maxSubarray';
import { generateQuickSortSteps } from '../algorithms/quickSort';
import { generateInsertionSortSteps } from '../algorithms/insertionSort';
import { generateBestTimeToBuySellStockSteps } from '../algorithms/bestTimeToBuySellStock';
import { generateLongestSubstringSteps } from '../algorithms/longestSubstring';
import { generateReverseLinkedListSteps } from '../algorithms/reverseLinkedList';
import { generateClimbingStairsSteps } from '../algorithms/climbingStairs';
import { generateContainerWithMostWaterSteps } from '../algorithms/containerWithMostWater';
import { generateMoveZeroesSteps } from '../algorithms/moveZeroes';
import { generateDijkstraSteps } from '../algorithms/dijkstra';
import { generateAStarSteps } from '../algorithms/aStar';
import { generateBFSSteps } from '../algorithms/bfs';
import { generateDFSSteps } from '../algorithms/dfs';
import { generateDFSTreeSteps } from '../algorithms/dfsTree';
import { generateBSTSteps } from '../algorithms/bst';
import { generateInOrderSteps } from '../algorithms/inOrderTraversal';
import { generatePreOrderSteps } from '../algorithms/preOrderTraversal';
import { generatePostOrderSteps } from '../algorithms/postOrderTraversal';
import { generateLevelOrderSteps } from '../algorithms/levelOrderTraversal';
import { generateBSTSearchSteps } from '../algorithms/bstSearch';
import { generateBSTDeleteSteps } from '../algorithms/bstDelete';

export const useAlgorithmLogic = ({
    algorithm,
    inputArray,
    target,
    binarySearchTarget,
    parenString,
    longestSubString,
    climbStairs,
    prices
}) => {
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        let generatedSteps = [];

        switch (algorithm) {
            case 'twoSum':
                generatedSteps = generateTwoSumSteps(inputArray, target);
                break;
            case 'containsDuplicate':
                generatedSteps = generateContainsDuplicateSteps(inputArray);
                break;
            case 'bubbleSort':
                generatedSteps = generateBubbleSortSteps(inputArray);
                break;
            case 'selectionSort':
                generatedSteps = generateSelectionSortSteps(inputArray);
                break;
            case 'binarySearch':
                generatedSteps = generateBinarySearchSteps(inputArray, binarySearchTarget);
                break;
            case 'mergeSort':
                generatedSteps = generateMergeSortSteps(inputArray);
                break;
            case 'validParentheses':
                generatedSteps = generateValidParenthesesSteps(parenString);
                break;
            case 'maxSubarray':
                generatedSteps = generateMaxSubarraySteps(inputArray);
                break;
            case 'quickSort':
                generatedSteps = generateQuickSortSteps(inputArray);
                break;
            case 'insertionSort':
                generatedSteps = generateInsertionSortSteps(inputArray);
                break;
            case 'bestTimeToBuySellStock':
                generatedSteps = generateBestTimeToBuySellSteps(inputArray);
                break;
            case 'longestSubstring':
                generatedSteps = generateLongestSubstringSteps(longestSubString);
                break;
            case 'reverseLinkedList':
                generatedSteps = generateReverseLinkedListSteps(inputArray);
                break;
            case 'climbingStairs':
                generatedSteps = generateClimbingStairsSteps(climbStairs);
                break;
            case 'containerWithMostWater':
                generatedSteps = generateContainerWithMostWaterSteps(inputArray);
                break;
            case 'moveZeroes':
                generatedSteps = generateMoveZeroesSteps(inputArray);
                break;
            case 'dijkstra':
                generatedSteps = generateDijkstraSteps();
                break;
            case 'aStar':
                generatedSteps = generateAStarSteps();
                break;
            case 'bfs':
                generatedSteps = generateBFSSteps();
                break;
            case 'dfs':
                generatedSteps = generateDFSSteps();
                break;
            case 'dfsTree':
                generatedSteps = generateDFSTreeSteps(inputArray);
                break;
            case 'binarySearchTree':
                generatedSteps = generateBSTSteps(inputArray);
                break;
            case 'inOrderTraversal':
                generatedSteps = generateInOrderSteps(inputArray);
                break;
            case 'preOrderTraversal':
                generatedSteps = generatePreOrderSteps(inputArray);
                break;
            case 'postOrderTraversal':
                generatedSteps = generatePostOrderSteps(inputArray);
                break;
            case 'levelOrderTraversal':
                generatedSteps = generateLevelOrderSteps(inputArray);
                break;
            case 'bstSearch':
                generatedSteps = generateBSTSearchSteps(inputArray, target);
                break;
            case 'bstDelete':
                generatedSteps = generateBSTDeleteSteps(inputArray, target);
                break;
            default:
                generatedSteps = [];
        }

        setSteps(generatedSteps);
        setCurrentStep(0);
    }, [algorithm, inputArray, target, binarySearchTarget, parenString, longestSubString, climbStairs, prices]);

    const currentStepData = steps[currentStep] || {};

    return {
        steps,
        currentStep,
        setCurrentStep,
        currentStepData
    };
};
