import React from 'react';
import { BarChart3, TrendingUp, CheckCircle, Layers } from 'lucide-react';

const DataStructurePanel = ({ stepData }) => {
  const hasMap = stepData.map !== undefined;
  const hasSet = stepData.set !== undefined;
  const hasStack = stepData.stack !== undefined;
  const hasSwaps = stepData.swaps !== undefined;
  const hasSorted = stepData.sorted && stepData.sorted.length > 0;
  const hasPointers = stepData.pointers !== undefined;
  const hasMaxSum = stepData.maxSum !== undefined;
  const hasNodes = stepData.nodes !== undefined;
  const hasDP = stepData.dp !== undefined;
  const isComplete = stepData.complete;

  return (
    <div className="bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-fuchsia-300 mb-4">
        {hasMap ? 'HashMap' : hasSet ? 'Set' : hasStack ? 'Stack' : hasNodes ? 'Linked List Info' : hasDP ? 'Dynamic Programming Info' : 'Algorithm Info'}
      </h3>

      {/* HashMap Display */}
      {hasMap && (
        <div className="space-y-2">
          {Object.entries(stepData.map).length === 0 ? (
            <div className="text-fuchsia-400/40 text-sm italic">Empty HashMap</div>
          ) : (
            Object.entries(stepData.map).map(([key, value]) => (
              <div key={key} className="bg-fuchsia-500/10 px-3 py-2 rounded-lg border border-fuchsia-500/20 flex justify-between items-center">
                <span className="text-fuchsia-300 font-mono">{key}</span>
                <span className="text-fuchsia-400">→</span>
                <span className="text-white font-bold">{value}</span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Set Display */}
      {hasSet && (
        <div className="space-y-2">
          {stepData.set.size === 0 ? (
            <div className="text-fuchsia-400/40 text-sm italic">Empty Set</div>
          ) : (
            Array.from(stepData.set).map((val, idx) => (
              <div key={idx} className="bg-cyan-500/10 px-3 py-2 rounded-lg border border-cyan-500/20 text-center">
                <span className="text-white font-bold font-mono">{val}</span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Stack Display */}
      {hasStack && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-semibold">
              Size: {stepData.stack.length}
            </span>
          </div>
          {stepData.stack.length === 0 ? (
            <div className="text-fuchsia-400/40 text-sm italic">Empty Stack</div>
          ) : (
            <div className="space-y-1">
              {stepData.stack.slice().reverse().map((item, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-2 rounded-lg border text-center font-mono text-lg ${idx === 0
                    ? 'bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-200 font-bold'
                    : 'bg-cyan-500/10 border-cyan-500/20 text-white'
                    }`}
                >
                  {item}
                  {idx === 0 && <div className="text-xs text-fuchsia-400 mt-1">← top</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Algorithm Statistics */}
      {!hasMap && !hasSet && !hasStack && (
        <div className="space-y-3">
          {/* Binary Search Pointers */}
          {hasPointers && (
            <div className="space-y-2">
              <div className="bg-cyan-500/10 px-4 py-3 rounded-lg border border-cyan-500/20">
                <div className="text-sm text-cyan-300 font-semibold mb-2">Pointers</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Left:</span>
                    <span className="text-white font-mono">{stepData.pointers.left}</span>
                  </div>
                  {stepData.pointers.mid !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mid:</span>
                      <span className="text-white font-mono font-bold">{stepData.pointers.mid}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Right:</span>
                    <span className="text-white font-mono">{stepData.pointers.right}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Maximum Subarray Info */}
          {hasMaxSum && (
            <>
              <div className="bg-fuchsia-500/10 px-4 py-3 rounded-lg border border-fuchsia-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-fuchsia-400" />
                  <span className="text-sm text-fuchsia-300 font-semibold">Max Sum</span>
                </div>
                <div className="text-2xl font-bold text-white">{stepData.maxSum}</div>
              </div>
              {stepData.currentSum !== undefined && (
                <div className="bg-cyan-500/10 px-4 py-3 rounded-lg border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-cyan-300 font-semibold">Current Sum</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stepData.currentSum}</div>
                </div>
              )}
            </>
          )}

          {/* Longest Substring Info */}
          {stepData.maxLength !== undefined && !hasMaxSum && (
            <>
              <div className="bg-fuchsia-500/10 px-4 py-3 rounded-lg border border-fuchsia-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-fuchsia-400" />
                  <span className="text-sm text-fuchsia-300 font-semibold">Max Length</span>
                </div>
                <div className="text-2xl font-bold text-white">{stepData.maxLength}</div>
                {stepData.maxSubstring && (
                  <div className="text-xs text-fuchsia-300/70 mt-2 font-mono">"{stepData.maxSubstring}"</div>
                )}
              </div>
              {stepData.window && stepData.window.length > 0 && (
                <div className="bg-cyan-500/10 px-4 py-3 rounded-lg border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-cyan-300 font-semibold">Window Size</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stepData.window.length}</div>
                </div>
              )}
            </>
          )}

          {/* Linked List Info */}
          {hasNodes && (
            <div className="space-y-3">
              <div className="bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700/50">
                <div className="text-sm text-gray-400 font-semibold mb-2">Pointers</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-mono">Prev:</span>
                    <span className="text-white font-bold">
                      {stepData.prev !== null && stepData.nodes[stepData.prev]
                        ? stepData.nodes[stepData.prev].value
                        : 'null'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400 font-mono">Current:</span>
                    <span className="text-white font-bold">
                      {stepData.current !== null && stepData.nodes[stepData.current]
                        ? stepData.nodes[stepData.current].value
                        : 'null'}
                    </span>
                  </div>
                  {stepData.next !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-purple-400 font-mono">Next:</span>
                      <span className="text-white font-bold">
                        {stepData.next !== null && stepData.nodes[stepData.next]
                          ? stepData.nodes[stepData.next].value
                          : 'null'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {stepData.newHead !== undefined && (
                <div className="bg-green-500/10 px-4 py-3 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-300 font-semibold">New Head</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stepData.newHead !== null && stepData.nodes[stepData.newHead]
                      ? stepData.nodes[stepData.newHead].value
                      : 'null'}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* DP Info */}
          {hasDP && (
            <div className="space-y-3">
              <div className="bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700/50">
                <div className="text-sm text-gray-400 font-semibold mb-2">Calculation</div>
                <div className="space-y-2 text-sm">
                  {stepData.computing ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400 font-mono">Step {stepData.computing - 1}:</span>
                        <span className="text-white font-bold">{stepData.dp[stepData.computing - 1]} ways</span>
                      </div>
                      <div className="text-center text-gray-500 text-xs">+</div>
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 font-mono">Step {stepData.computing - 2}:</span>
                        <span className="text-white font-bold">{stepData.dp[stepData.computing - 2]} ways</span>
                      </div>
                    </>
                  ) : stepData.result ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400 font-mono">Step {stepData.highlight[1]}:</span>
                        <span className="text-white font-bold">{stepData.fromPrev} ways</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 font-mono">Step {stepData.highlight[2]}:</span>
                        <span className="text-white font-bold">{stepData.fromTwoSteps} ways</span>
                      </div>
                      <div className="border-t border-gray-600 my-1 pt-1 flex justify-between items-center">
                        <span className="text-green-400 font-mono">Result:</span>
                        <span className="text-white font-bold">{stepData.result} ways</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-500 italic text-center">Initializing...</div>
                  )}
                </div>
              </div>

              {stepData.totalWays !== undefined && (
                <div className="bg-green-500/10 px-4 py-3 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-300 font-semibold">Total Ways</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stepData.totalWays}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Swap Counter */}
          {hasSwaps && !hasMaxSum && (
            <div className="bg-fuchsia-500/10 px-4 py-3 rounded-lg border border-fuchsia-500/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-fuchsia-400" />
                <span className="text-sm text-fuchsia-300 font-semibold">Total Swaps</span>
              </div>
              <div className="text-2xl font-bold text-white">{stepData.swaps}</div>
            </div>
          )}

          {/* Sorted Elements */}
          {hasSorted && !hasMaxSum && (
            <div className="bg-green-500/10 px-4 py-3 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300 font-semibold">Sorted Elements</span>
              </div>
              <div className="text-2xl font-bold text-white">{stepData.sorted.length}</div>
            </div>
          )}

          {/* Array Size */}
          {stepData.array && !hasPointers && !hasMaxSum && (
            <div className="bg-cyan-500/10 px-4 py-3 rounded-lg border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300 font-semibold">Array Size</span>
              </div>
              <div className="text-2xl font-bold text-white">{stepData.array.length}</div>
            </div>
          )}

          {/* Completion Status */}
          {isComplete && (
            <div className="bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 px-4 py-3 rounded-lg border border-fuchsia-500/30 text-center">
              <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <span className="text-green-300 font-semibold text-sm">✓ Complete!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataStructurePanel;