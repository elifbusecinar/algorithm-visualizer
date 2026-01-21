import React, { useState, useEffect } from 'react';
import { Info, X } from 'lucide-react';
import { complexityData } from '../data/complexityData';

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
  const [binarySearchTarget, setBinarySearchTarget] = useState(13);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState([]);
  const [speed, setSpeed] = useState('medium');
  const [parenString, setParenString] = useState('({[]})');
  const [longestSubString, setLongestSubString] = useState('abcabcbb');
  const [climbStairs, setClimbStairs] = useState(5);
  const [showComplexity, setShowComplexity] = useState(false);


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
        generatedSteps = generateBestTimeToBuySellStockSteps(inputArray);
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
      default:
        generatedSteps = [];
    }

    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm, inputArray, target, binarySearchTarget, parenString, longestSubString, climbStairs]);

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
          target={algorithm === 'binarySearch' ? binarySearchTarget : target}
          setTarget={algorithm === 'binarySearch' ? setBinarySearchTarget : setTarget}
          speed={speed}
          setSpeed={setSpeed}
          parenString={parenString}
          setParenString={setParenString}
          longestSubString={longestSubString}
          setLongestSubString={setLongestSubString}
          climbStairs={climbStairs}
          setClimbStairs={setClimbStairs}
        />

        {/* Algorithm Info Banner */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-500/20 rounded-2xl p-4 mb-6">
          <p className="text-fuchsia-200 flex-1">{algoInfo.description}</p>
          <button
            onClick={() => setShowComplexity(true)}
            className="flex items-center gap-2 px-4 py-2 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 border border-fuchsia-500/30 rounded-lg transition-colors text-fuchsia-300 font-medium"
          >
            <Info className="w-5 h-5" />
            <span className="hidden sm:inline">Complexity Info</span>
          </button>
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

      {/* Complexity Info Modal */}
      {showComplexity && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-fuchsia-500/30 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/50">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Info className="w-6 h-6 text-fuchsia-400" />
                Complexity Analysis
              </h2>
              <button
                onClick={() => setShowComplexity(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Time Complexity */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-fuchsia-300">Time Complexity</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                      <div className="text-sm text-green-400 mb-1">Best Case</div>
                      <div className="text-xl font-mono font-bold text-white">
                        {complexityData[algorithm]?.timeComplexity.best || "N/A"}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                      <div className="text-sm text-yellow-400 mb-1">Average Case</div>
                      <div className="text-xl font-mono font-bold text-white">
                        {complexityData[algorithm]?.timeComplexity.average || "N/A"}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                      <div className="text-sm text-red-400 mb-1">Worst Case</div>
                      <div className="text-xl font-mono font-bold text-white">
                        {complexityData[algorithm]?.timeComplexity.worst || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Space Complexity & Description */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-4">Space Complexity</h3>
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                      <div className="text-sm text-cyan-400 mb-1">Worst Case</div>
                      <div className="text-xl font-mono font-bold text-white">
                        {complexityData[algorithm]?.spaceComplexity || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">How it works</h3>
                    <p className="text-gray-300 text-sm leading-relaxed bg-gray-800/30 p-4 rounded-xl border border-gray-700/30">
                      {complexityData[algorithm]?.description || algoInfo.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmVisualizer;