import React from 'react';
import ArrayVisualizer from './ArrayVisualizer';
import DataStructurePanel from './DataStructurePanel';
import StepDescription from './StepDescription';
import CodeDisplay from './CodeDisplay';
import { PSEUDOCODE } from '../data/pseudocode';

const VisualizerCanvas = ({
    algorithm,
    currentStepData,
    title // Optional title for Comparison Mode headers
}) => {
    return (
        <div className="flex flex-col gap-6">
            {title && (
                <h3 className="text-xl font-bold text-fuchsia-400 border-b border-gray-700 pb-2">
                    {title}
                </h3>
            )}

            {/* Main Visualization Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Array Visualizer takes more space */}
                <div className="lg:col-span-2 flex flex-col">
                    <ArrayVisualizer stepData={currentStepData} />
                </div>
                {/* Info Panel takes less space */}
                <div className="lg:col-span-1 flex flex-col">
                    <DataStructurePanel stepData={currentStepData} />
                </div>
            </div>

            {/* Description & Code */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StepDescription description={currentStepData.description} />
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
