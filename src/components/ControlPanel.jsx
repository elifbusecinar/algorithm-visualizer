import React, { useState, useEffect } from 'react';
import { Zap, BarChart3, TrendingUp } from 'lucide-react';
import { ALGORITHMS, SPEEDS } from '../utils/constants';

const ControlPanel = ({
  algorithm,
  setAlgorithm,
  inputArray,
  setInputArray,
  target,
  setTarget,
  speed,
  setSpeed,
  parenString,
  setParenString,
  longestSubString,
  setLongestSubString,
  climbStairs,
  setClimbStairs
}) => {
  const [arrayInput, setArrayInput] = useState(inputArray.join(', '));
  const algoInfo = ALGORITHMS[algorithm];

  // Update local state when inputArray prop changes (e.g., when algorithm changes)
  useEffect(() => {
    setArrayInput(inputArray.join(', '));
  }, [inputArray]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      {/* Algorithm Selector */}
      <div className="bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-fuchsia-300 mb-3">
          <Zap className="w-4 h-4" />
          Select Algorithm
        </label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="w-full bg-gray-800/60 text-white rounded-xl px-4 py-3 border border-fuchsia-500/30 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all"
        >
          {Object.entries(ALGORITHMS).map(([key, algo]) => (
            <option key={key} value={key}>{algo.name}</option>
          ))}
        </select>
        <div className="mt-3 text-xs text-fuchsia-300/50">
          Complexity: <span className="text-fuchsia-400 font-mono">{algoInfo.complexity}</span>
        </div>
      </div>

      {/* Input Panel - Dynamic based on algorithm */}
      {algorithm === 'validParentheses' ? (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-indigo-300 mb-3">
            <BarChart3 className="w-4 h-4" />
            Parentheses String
          </label>
          <input
            type="text"
            value={parenString}
            onChange={(e) => setParenString(e.target.value)}
            className="w-full bg-gray-800/60 text-white rounded-xl px-4 py-3 border border-fuchsia-500/30 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all font-mono text-2xl text-center"
            placeholder="({[]})"
          />
          <div className="mt-3 text-xs text-fuchsia-300/50">
            Enter brackets: ( ) &#123; &#125; [ ]
          </div>
        </div>
      ) : algorithm === 'longestSubstring' ? (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-indigo-300 mb-3">
            <BarChart3 className="w-4 h-4" />
            Input String
          </label>
          <input
            type="text"
            value={longestSubString}
            onChange={(e) => setLongestSubString(e.target.value)}
            className="w-full bg-gray-800/60 text-white rounded-xl px-4 py-3 border border-fuchsia-500/30 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all font-mono"
            placeholder="abcabcbb"
          />
          <div className="mt-3 text-xs text-fuchsia-300/50">
            Any string of characters
          </div>
        </div>
      ) : algorithm === 'climbingStairs' ? (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-indigo-300 mb-3">
            <BarChart3 className="w-4 h-4" />
            Number of Stairs
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={climbStairs}
            onChange={(e) => setClimbStairs(parseInt(e.target.value) || 1)}
            className="w-full bg-gray-800/60 text-white rounded-xl px-4 py-3 border border-fuchsia-500/30 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all font-mono text-2xl text-center"
          />
          <div className="mt-3 text-xs text-fuchsia-300/50">
            Number of steps to climb (1-20)
          </div>
        </div>
      ) : (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-indigo-300 mb-3">
            <BarChart3 className="w-4 h-4" />
            Input Array
          </label>
          <input
            type="text"
            value={arrayInput}
            onChange={(e) => {
              setArrayInput(e.target.value);
            }}
            onBlur={(e) => {
              const arr = e.target.value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
              if (arr.length > 0) {
                setInputArray(arr);
                setArrayInput(arr.join(', '));
              } else {
                // Revert to previous valid array if input is invalid
                setArrayInput(inputArray.join(', '));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.target.blur(); // Trigger onBlur to update
              }
            }}
            className="w-full bg-gray-800/60 text-white rounded-xl px-4 py-3 border border-fuchsia-500/30 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all font-mono"
            placeholder="2, 7, 11, 15"
          />
          <div className="mt-3 text-xs text-fuchsia-300/50">
            Separate values with commas
          </div>
        </div>
      )}

      {/* Target Input or Speed Control */}
      {(algorithm === 'twoSum' || algorithm === 'binarySearch') ? (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-fuchsia-300 mb-3">
            <TrendingUp className="w-4 h-4" />
            Target Value
          </label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value))}
            className="w-full bg-gray-800/60 text-white rounded-xl px-4 py-3 border border-fuchsia-500/30 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all font-mono text-2xl"
          />
          <div className="mt-3 mb-5 text-xs text-fuchsia-300/50">
            {algorithm === 'twoSum' ? 'Find two numbers that sum to this value' : 'Value to search for in the array'}
          </div>

          {/* Speed Control for algorithms with target */}
          <label className="flex items-center gap-2 text-sm font-semibold text-fuchsia-300 mb-3">
            <Zap className="w-4 h-4" />
            Animation Speed
          </label>
          <div className="flex gap-2">
            {Object.entries(SPEEDS).map(([key, speedObj]) => (
              <button
                key={key}
                onClick={() => setSpeed(key)}
                className={`flex-1 px-3 py-2 rounded-xl font-medium text-sm transition-all ${speed === key
                  ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/50'
                  : 'bg-gray-800/60 text-fuchsia-300 hover:bg-gray-800 border border-fuchsia-500/20'
                  }`}
              >
                {speedObj.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-fuchsia-300 mb-3">
            <Zap className="w-4 h-4" />
            Animation Speed
          </label>
          <div className="flex gap-2">
            {Object.entries(SPEEDS).map(([key, speedObj]) => (
              <button
                key={key}
                onClick={() => setSpeed(key)}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${speed === key
                  ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/50'
                  : 'bg-gray-800/60 text-fuchsia-300 hover:bg-gray-800 border border-fuchsia-500/20'
                  }`}
              >
                {speedObj.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;