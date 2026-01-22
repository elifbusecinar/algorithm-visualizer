import React, { useState, useEffect } from 'react';
import { Info, X } from 'lucide-react';
import { complexityData } from '../data/complexityData';
import { PSEUDOCODE } from '../data/pseudocode';

import Header from './Header';
import ControlPanel from './ControlPanel';
import ArrayVisualizer from './ArrayVisualizer';
import DataStructurePanel from './DataStructurePanel';
import StepDescription from './StepDescription';
import CodeDisplay from './CodeDisplay';
import Controls from './Controls';
import { useAlgorithmLogic } from '../hooks/useAlgorithmLogic';
import { ALGORITHMS, SPEEDS, DEFAULT_ARRAYS, DEFAULT_INPUTS } from '../utils/constants';
import ComplexityPanel from './ComplexityPanel';
import ComparisonView from './ComparisonView';
import VisualizerCanvas from './VisualizerCanvas';

const AlgorithmVisualizer = () => {
  const [mode, setMode] = useState('single');
  const [activeTab, setActiveTab] = useState('visualization');
  const [algorithm, setAlgorithm] = useState('twoSum');
  const [inputArray, setInputArray] = useState(DEFAULT_ARRAYS.twoSum);
  const [target, setTarget] = useState(9);
  const [binarySearchTarget, setBinarySearchTarget] = useState(13);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('medium');
  const [parenString, setParenString] = useState('({[]})');
  const [longestSubString, setLongestSubString] = useState('abcabcbb');
  const [climbStairs, setClimbStairs] = useState(5);

  // Use custom hook for algorithm logic
  const {
    steps,
    currentStep,
    setCurrentStep,
    currentStepData
  } = useAlgorithmLogic({
    algorithm,
    inputArray,
    target,
    binarySearchTarget,
    parenString,
    longestSubString,
    climbStairs
  });

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
    if (DEFAULT_INPUTS[algorithm] && DEFAULT_INPUTS[algorithm].target !== undefined) {
      setTarget(DEFAULT_INPUTS[algorithm].target);
    }
  }, [algorithm]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };


  const algoInfo = ALGORITHMS[algorithm];

  if (mode === 'compare') {
    return (
      <ComparisonView
        inputArray={inputArray}
        setInputArray={setInputArray}
        speed={speed}
        setSpeed={setSpeed}
        onExit={() => setMode('single')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-fuchsia-950 to-gray-950 text-white">
      {/* Header */}
      <Header
        currentStep={currentStep}
        totalSteps={steps.length}
        onCompareMode={() => setMode('compare')}
        currentStepCode={currentStepData?.code}
      />

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
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('visualization')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === 'visualization'
              ? 'border-fuchsia-500 text-fuchsia-400'
              : 'border-transparent text-gray-400 hover:text-white'
              }`}
          >
            Visualization
          </button>
          <button
            onClick={() => setActiveTab('complexity')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === 'complexity'
              ? 'border-fuchsia-500 text-fuchsia-400'
              : 'border-transparent text-gray-400 hover:text-white'
              }`}
          >
            Complexity & Details
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'visualization' && (
          <>
            {/* Main Visualization Area */}
            <div className="mb-6">
              <VisualizerCanvas
                algorithm={algorithm}
                currentStepData={currentStepData}
              />
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
          </>
        )}

        {activeTab === 'complexity' && (
          <ComplexityPanel algorithm={algorithm} />
        )}
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;