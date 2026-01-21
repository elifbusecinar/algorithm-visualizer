import React from 'react';
import { ALGORITHMS } from '../utils/constants';

const ComplexityPanel = ({ algorithm }) => {
  const algoInfo = ALGORITHMS[algorithm];

  if (!algoInfo) {
    return (
      <div className="bg-gray-900 border border-fuchsia-500/20 rounded-2xl p-6">
        <p className="text-gray-400">Select an algorithm to view complexity details</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-fuchsia-500/20 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-fuchsia-400 mb-2">{algoInfo.name}</h3>
        <p className="text-gray-300">{algoInfo.description}</p>
      </div>

      {/* Time Complexity */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-cyan-400">Time Complexity</h4>
        <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Best Case:</span>
            <span className="font-mono text-fuchsia-300 font-bold">
              {algoInfo.timeComplexity?.best || algoInfo.complexity}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Average Case:</span>
            <span className="font-mono text-fuchsia-300 font-bold">
              {algoInfo.timeComplexity?.average || algoInfo.complexity}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Worst Case:</span>
            <span className="font-mono text-fuchsia-300 font-bold">
              {algoInfo.timeComplexity?.worst || algoInfo.complexity}
            </span>
          </div>
        </div>
      </div>

      {/* Space Complexity */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-cyan-400">Space Complexity</h4>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Auxiliary Space:</span>
            <span className="font-mono text-fuchsia-300 font-bold">
              {algoInfo.spaceComplexity}
            </span>
          </div>
        </div>
      </div>

      {/* Category */}
      <div>
        <span className="inline-block bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1 rounded-full text-sm">
          {algoInfo.category}
        </span>
      </div>

      {/* Pseudocode */}
      {algoInfo.pseudocode && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-cyan-400">Pseudocode</h4>
          <div className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto">
            <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap break-words">
              {algoInfo.pseudocode.trim()}
            </pre>
          </div>
        </div>
      )}

      {/* Complexity Explanation */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
        <p className="text-cyan-200 text-sm">
          <strong>💡 Tip:</strong> Understanding both time and space complexity helps you choose the right algorithm for your problem!
        </p>
      </div>
    </div>
  );
};

export default ComplexityPanel;
