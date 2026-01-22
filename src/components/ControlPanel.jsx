import React, { useState, useEffect } from 'react';
import { Zap, BarChart3, TrendingUp, Sparkles } from 'lucide-react';
import { ALGORITHMS, SPEEDS, DEFAULT_ARRAYS } from '../utils/constants';
import { getEdgeCasesForAlgorithm } from '../utils/edgeCases';

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
  const currentPresets = getEdgeCasesForAlgorithm(algorithm);

  // Update local state when inputArray prop changes
  useEffect(() => {
    setArrayInput(inputArray.join(', '));
  }, [inputArray]);

  const handlePresetChange = (e) => {
    const selectedIndex = e.target.value;
    if (selectedIndex === "") return;

    const index = parseInt(selectedIndex);
    const selectedPreset = currentPresets?.presets[index];

    if (!selectedPreset) return;

    let val = selectedPreset.value;

    // Handle "random" generation
    if (val === 'random') {
      if (algorithm === 'validParentheses') {
        const len = 8;
        let res = '';
        const chars = '()[]{}';
        for (let i = 0; i < len; i++) res += chars[Math.floor(Math.random() * chars.length)];
        setParenString(res);
      } else if (algorithm === 'longestSubstring') {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let res = '';
        const len = 10;
        for (let i = 0; i < len; i++) res += chars[Math.floor(Math.random() * chars.length)];
        setLongestSubString(res);
      } else {
        const len = Math.floor(Math.random() * 5) + 5; // 5-10 elements
        const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 50) - 10);
        setInputArray(arr);
        setArrayInput(arr.join(', '));
      }
      return;
    }

    // Handle "default" value
    if (val === 'default') {
      // Use DEFAULT_ARRAYS or specific defaults
      if (algorithm === 'longestSubstring') val = 'abcabcbb';
      else if (algorithm === 'validParentheses') val = '({[]})';
      else if (DEFAULT_ARRAYS[algorithm]) val = DEFAULT_ARRAYS[algorithm];
      else val = [1, 2, 3, 4, 5]; // Fallback
    }

    // Apply the value
    if (algorithm === 'validParentheses') {
      setParenString(val);
    } else if (algorithm === 'longestSubstring') {
      setLongestSubString(val);
    } else if (algorithm === 'climbingStairs') {
      setClimbStairs(val);
    } else if (algorithm === 'binarySearch') {
      setInputArray(val);
      setArrayInput(val.join(', '));
      if (selectedPreset.target !== undefined) {
        setTarget(selectedPreset.target);
      }
    } else {
      setInputArray(val);
      if (Array.isArray(val)) {
        setArrayInput(val.join(', '));
      }
    }
  };

  const PresetSelector = () => (
    currentPresets && (
      <div className="mb-4">
        <label className="flex items-center gap-2 text-xs font-semibold text-fuchsia-300/70 mb-1.5 uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          Quick Presets
        </label>
        <select
          className="w-full bg-gray-800/40 text-sm text-gray-300 rounded-lg px-3 py-2 border border-fuchsia-500/20 focus:outline-none focus:border-fuchsia-500/40 focus:bg-gray-800 transition-all hover:border-fuchsia-500/30"
          onChange={handlePresetChange}
          defaultValue=""
        >
          <option value="" disabled>Load a preset...</option>
          {currentPresets.presets.map((preset, idx) => (
            <option key={idx} value={idx}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>
    )
  );

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
          {Object.entries(
            Object.entries(ALGORITHMS).reduce((acc, [key, algo]) => {
              const category = algo.category || 'Other';
              if (!acc[category]) acc[category] = [];
              acc[category].push({ key, ...algo });
              return acc;
            }, {})
          ).map(([category, algos]) => (
            <optgroup key={category} label={category} className="bg-gray-800 text-fuchsia-300 font-semibold">
              {algos.map((algo) => (
                <option key={algo.key} value={algo.key} className="bg-gray-800 text-white font-normal">
                  {algo.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="mt-3 text-xs text-fuchsia-300/50">
          Complexity: <span className="text-fuchsia-400 font-mono">{algoInfo.complexity}</span>
        </div>
      </div>

      {/* Input Panel - Dynamic based on algorithm */}
      {algorithm === 'validParentheses' ? (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-5">
          <div className="flex justify-between items-start mb-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
              <BarChart3 className="w-4 h-4" />
              Parentheses String
            </label>
          </div>
          <PresetSelector />
          <input
            type="text"
            value={parenString}
            onChange={(e) => setParenString(e.target.value)}
            className="w-full bg-gray-800/60 text-white rounded-xl px-4 py-3 border border-fuchsia-500/30 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all font-mono text-xl text-center"
            placeholder="({[]})"
          />
          <div className="mt-3 text-xs text-fuchsia-300/50">
            Enter brackets: ( ) &#123; &#125; [ ]
          </div>
        </div>
      ) : algorithm === 'longestSubstring' ? (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-5">
          <div className="flex justify-between items-start mb-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
              <BarChart3 className="w-4 h-4" />
              Input String
            </label>
          </div>
          <PresetSelector />
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
          <div className="flex justify-between items-start mb-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
              <BarChart3 className="w-4 h-4" />
              Number of Stairs
            </label>
          </div>
          <PresetSelector />
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
          <div className="flex justify-between items-start mb-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
              <BarChart3 className="w-4 h-4" />
              Input Array
            </label>
          </div>
          <PresetSelector />
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