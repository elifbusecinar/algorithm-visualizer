import React, { useState, useEffect } from 'react';
import Header from './Header';
import ControlPanel from './ControlPanel';
import ArrayVisualizer from './ArrayVisualizer';
import DataStructurePanel from './DataStructurePanel';
import StepDescription from './StepDescription';
import CodeDisplay from './CodeDisplay';
import Controls from './Controls';
import { ALGORITHMS, SPEEDS, DEFAULT_ARRAYS } from '../utils/constants';
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

const AlgorithmVisualizer = () => {
  const [algorithm, setAlgorithm] = useState('twoSum');
  const [inputArray, setInputArray] = useState(DEFAULT_ARRAYS.twoSum);
  const [target, setTarget] = useState(9);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState([]);
  const [speed, setSpeed] = useState('medium');

  // Generate steps when algorithm or inputs change
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
        generatedSteps = generateBinarySearchSteps(inputArray, target);
        break;
      case 'mergeSort':
        generatedSteps = generateMergeSortSteps(inputArray);
        break;
      case 'validParentheses':
        generatedSteps = generateValidParenthesesSteps('({[]})');
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
        generatedSteps = generateBestTimeToBuySellStockSteps(inputArray);
        break;
      case 'longestSubstring':
        generatedSteps = generateLongestSubstringSteps('abcabcbb');
        break;
      case 'reverseLinkedList':
        generatedSteps = generateReverseLinkedListSteps(inputArray);
        break;
      case 'climbingStairs':
        generatedSteps = generateClimbingStairsSteps(5);
        break;
      default:
        generatedSteps = [];
    }

    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm, inputArray, target]);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, SPEEDS[speed].delay);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length, speed]);

  // Change default array when algorithm changes
  useEffect(() => {
    if (DEFAULT_ARRAYS[algorithm]) {
      setInputArray(DEFAULT_ARRAYS[algorithm]);
    }
  }, [algorithm]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const currentStepData = steps[currentStep] || {};
  const algoInfo = ALGORITHMS[algorithm];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-fuchsia-950 to-gray-950 text-white">
      {/* Header */}
      <Header currentStep={currentStep} totalSteps={steps.length} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Control Panel */}
        <ControlPanel
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          inputArray={inputArray}
          setInputArray={setInputArray}
          target={target}
          setTarget={setTarget}
          speed={speed}
          setSpeed={setSpeed}
        />

        {/* Algorithm Info Banner */}
        <div className="bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-500/20 rounded-2xl p-4 mb-6">
          <p className="text-fuchsia-200">{algoInfo.description}</p>
        </div>

        {/* Main Visualization Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ArrayVisualizer stepData={currentStepData} />
          <DataStructurePanel stepData={currentStepData} />
        </div>

        {/* Description & Code */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <StepDescription description={currentStepData.description} />
          <CodeDisplay code={currentStepData.code} />
        </div>

        {/* Control Panel */}
        <Controls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          totalSteps={steps.length}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;