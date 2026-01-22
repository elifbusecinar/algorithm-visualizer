import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';
import VisualizerCanvas from './VisualizerCanvas';
import { useAlgorithmLogic } from '../hooks/useAlgorithmLogic';
import { ALGORITHMS, SPEEDS } from '../utils/constants';
import { getComparableAlgorithms } from '../utils/comparisonUtils';

const ComparisonView = ({
    inputArray,
    setInputArray,
    speed,
    setSpeed,
    onExit
}) => {
    // Two algorithms
    const [algo1, setAlgo1] = useState('bubbleSort');
    const [algo2, setAlgo2] = useState('quickSort');

    // Available algorithms for second dropdown (filtered based on algo1)
    const [availableAlgo2, setAvailableAlgo2] = useState([]);

    // Playback state
    const [isPlaying, setIsPlaying] = useState(false);

    // Logic Hooks
    // We pass minimal inputs for now, can expand later
    const logic1 = useAlgorithmLogic({
        algorithm: algo1,
        inputArray,
        // Default values for other inputs as they might not be relevant for sorting comparison yet
        target: 9,
        binarySearchTarget: 13,
        parenString: '({[]})',
        longestSubString: 'abcabcbb',
        climbStairs: 5
    });

    const logic2 = useAlgorithmLogic({
        algorithm: algo2,
        inputArray,
        target: 9,
        binarySearchTarget: 13,
        parenString: '({[]})',
        longestSubString: 'abcabcbb',
        climbStairs: 5
    });

    // Update available algorithms for algo2 when algo1 changes
    useEffect(() => {
        const comparable = getComparableAlgorithms(algo1, ALGORITHMS);
        setAvailableAlgo2(comparable);

        // If current algo2 is not in the comparable list, reset to first available
        const isAlgo2Valid = comparable.some(([key]) => key === algo2);
        if (!isAlgo2Valid && comparable.length > 0) {
            setAlgo2(comparable[0][0]);
        }
    }, [algo1]);

    // Derived max steps
    const maxSteps = Math.max(logic1.steps.length, logic2.steps.length);
    const finished = logic1.currentStep >= logic1.steps.length - 1 && logic2.currentStep >= logic2.steps.length - 1;

    // Auto-play Effect
    useEffect(() => {
        let interval;
        if (isPlaying && !finished) {
            interval = setInterval(() => {
                // Advance algo 1 if not finished
                if (logic1.currentStep < logic1.steps.length - 1) {
                    logic1.setCurrentStep(prev => prev + 1);
                }
                // Advance algo 2 if not finished
                if (logic2.currentStep < logic2.steps.length - 1) {
                    logic2.setCurrentStep(prev => prev + 1);
                }
            }, SPEEDS[speed].delay);
        } else if (finished) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, finished, logic1.currentStep, logic2.currentStep, logic1.steps.length, logic2.steps.length, speed]);

    const handleReset = () => {
        logic1.setCurrentStep(0);
        logic2.setCurrentStep(0);
        setIsPlaying(false);
    };

    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8 bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onExit}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Single Mode
                    </button>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                        Algorithm Comparison
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Speed Control (Simplified) */}
                    <select
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5"
                    >
                        {Object.entries(SPEEDS).map(([key, val]) => (
                            <option key={key} value={key}>{val.name}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleReset}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
                        title="Reset"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>

                    <button
                        onClick={handleTogglePlay}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${isPlaying
                            ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                            : 'bg-fuchsia-600 text-white hover:bg-fuchsia-500 shadow-lg shadow-fuchsia-900/20'
                            }`}
                    >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        {isPlaying ? 'Pause' : 'Compare'}
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Left Side - Algo 1 */}
                <div className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800/50">
                    <div className="mb-4 flex justify-between items-center">
                        <select
                            value={algo1}
                            onChange={(e) => setAlgo1(e.target.value)}
                            className="bg-gray-800 text-fuchsia-100 border-gray-700 rounded-lg p-2 w-full max-w-xs"
                        >
                            {Object.entries(ALGORITHMS)
                                .filter(([key, val]) => val.comparableInMode === true)
                                .map(([key, val]) => (
                                    <option key={key} value={key}>{val.name}</option>
                                ))}
                        </select>
                        <div className="text-sm font-mono text-gray-400">
                            Step: {logic1.currentStep} / {logic1.steps.length - 1}
                        </div>
                    </div>

                    <VisualizerCanvas
                        algorithm={algo1}
                        currentStepData={logic1.currentStepData}
                        title="Algorithm 1"
                    />
                </div>

                {/* Right Side - Algo 2 */}
                <div className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800/50">
                    <div className="mb-4 flex justify-between items-center">
                        <select
                            value={algo2}
                            onChange={(e) => setAlgo2(e.target.value)}
                            className="bg-gray-800 text-cyan-100 border-gray-700 rounded-lg p-2 w-full max-w-xs"
                        >
                            {availableAlgo2.map(([key, val]) => (
                                <option key={key} value={key}>{val.name}</option>
                            ))}
                        </select>
                        <div className="text-sm font-mono text-gray-400">
                            Step: {logic2.currentStep} / {logic2.steps.length - 1}
                        </div>
                    </div>

                    <VisualizerCanvas
                        algorithm={algo2}
                        currentStepData={logic2.currentStepData}
                        title="Algorithm 2"
                    />
                </div>
            </div>
        </div>
    );
};

export default ComparisonView;
