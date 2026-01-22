import React from 'react';
import ArrayVisualizer from './ArrayVisualizer';
import DataStructurePanel from './DataStructurePanel';
import StepDescription from './StepDescription';
import GridVisualizer from './GridVisualizer';
import TreeVisualizer from './TreeVisualizer'; // [NEW]
import CodeDisplay from './CodeDisplay';
import { PSEUDOCODE } from '../data/pseudocode';
import { ALGORITHMS } from '../utils/constants';

const VisualizerCanvas = ({
    algorithm,
    currentStepData,
    title // Optional title for Comparison Mode headers
}) => {
    const isGridAlgorithm = ALGORITHMS[algorithm]?.type === 'grid';
    const isTreeAlgorithm = ALGORITHMS[algorithm]?.type === 'tree'; // [NEW]

    return (
        <div className="flex flex-col gap-6">
            {title && (
                <h3 className="text-xl font-bold text-fuchsia-400 border-b border-gray-700 pb-2">
                    {title}
                </h3>
            )}

            {/* Main Visualization Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visualizer (Array, Grid, or Tree) */}
                <div className="lg:col-span-2 flex flex-col min-h-[400px]">
                    {isGridAlgorithm ? (
                        <GridVisualizer stepData={currentStepData} />
                    ) : isTreeAlgorithm ? (
                        <TreeVisualizer stepData={currentStepData} />
                    ) : (
                        <ArrayVisualizer stepData={currentStepData} />
                    )}
                </div>
                {/* Info Panel takes less space */}
                <div className="lg:col-span-1 flex flex-col">
                    <DataStructurePanel stepData={currentStepData} />
                </div>
            </div>

            {/* Description & Code */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                    <StepDescription description={currentStepData.description} />
                    {currentStepData.code && (
                        <div className="bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-fuchsia-400 mb-3">Code Execution</h3>
                            <div className="bg-black/80 border border-gray-800 rounded-lg p-4 font-mono text-sm text-emerald-400 shadow-inner">
                                {currentStepData.code}
                            </div>
                        </div>
                    )}
                </div>
                <CodeDisplay
                    code={currentStepData.code}
                    pseudocode={PSEUDOCODE[algorithm]}
                    highlightedLine={currentStepData?.lineIndex}
                />
            </div>
        </div>
    );
};

export default VisualizerCanvas;
