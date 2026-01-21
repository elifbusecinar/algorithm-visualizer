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
  const isComplete = stepData.complete;

  return (
    <div className="bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-fuchsia-300 mb-4">
        {hasMap ? 'HashMap' : hasSet ? 'Set' : hasStack ? 'Stack' : 'Algorithm Info'}
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