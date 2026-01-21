import React from 'react';
import { ArrowDown, MoveRight, MoveLeft } from 'lucide-react';

const ArrayVisualizer = ({ stepData }) => {
  const pointers = stepData.pointers || {};
  const hasPointers = Object.keys(pointers).length > 0;

  // Support both array and chars (for string-based algorithms like Valid Parentheses)
  const displayArray = stepData.chars || stepData.array;
  const isChars = stepData.chars !== undefined;

  return (
    <div className="lg:col-span-2 bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-fuchsia-300 mb-6">Visual Representation</h2>

      {/* Target Display for Binary Search */}
      {stepData.target !== undefined && (
        <div className="mb-4 flex justify-center">
          <div className="bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 border border-fuchsia-500/40 px-6 py-3 rounded-xl">
            <span className="text-fuchsia-300 text-sm">Searching for: </span>
            <span className="text-white font-bold text-2xl ml-2">{stepData.target}</span>
          </div>
        </div>
      )}

      {/* Linked List or Array Elements */}
      <div className="flex justify-center items-end gap-3 mb-8 flex-wrap min-h-[200px] items-center">
        {stepData.nodes ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {stepData.nodes.map((node, idx) => {
              const isCurrent = stepData.current === idx;
              const isPrev = stepData.prev === idx;
              const isNext = stepData.next === idx; // Assuming 'next' might be tracked in stepData
              const isHighlighted = stepData.highlight?.includes(idx);
              const isNewHead = stepData.newHead === idx;

              return (
                <div key={node.id} className="flex items-center">
                  {/* Arrow to Previous Node (Reverse link) */}
                  {node.next !== null && node.next < idx && (
                    <div className="relative mx-4">
                      <MoveLeft className={`w-10 h-10 ${stepData.reversing === idx ? 'text-red-500 animate-pulse' : 'text-cyan-500'}`} />
                      {stepData.reversing === idx && (
                        <div className="absolute -top-4 w-full text-center text-[10px] text-red-400 font-bold">REVERSING</div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-2 relative">
                    {/* Node Labels */}
                    {(isCurrent || isPrev || isNext || isNewHead) && (
                      <div className="flex flex-col items-center mb-1 absolute -top-12 w-32">
                        <div className="flex gap-1">
                          {isPrev && <span className="text-xs font-bold text-yellow-400">PREV</span>}
                          {isCurrent && <span className="text-xs font-bold text-cyan-400">CURR</span>}
                          {isNext && <span className="text-xs font-bold text-purple-400">NEXT</span>}
                          {isNewHead && <span className="text-xs font-bold text-green-400">HEAD</span>}
                        </div>
                        <ArrowDown
                          className={`w-5 h-5 ${isCurrent ? 'text-cyan-400' :
                            isPrev ? 'text-yellow-400' :
                              isNewHead ? 'text-green-400' : 'text-purple-400'
                            }`}
                        />
                      </div>
                    )}

                    <div
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2
                        transition-all duration-500 relative z-10
                        ${isCurrent
                          ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                          : isPrev
                            ? 'bg-yellow-500/20 border-yellow-500 text-white shadow-[0_0_15px_rgba(234,179,8,0.5)]'
                            : isHighlighted
                              ? 'bg-fuchsia-500/20 border-fuchsia-500 text-white'
                              : 'bg-gray-800 border-gray-600 text-gray-400'
                        }
                      `}
                    >
                      {node.value}
                    </div>
                    <div className="absolute -bottom-6 w-full text-center text-xs text-gray-500 font-mono">
                      {node.next === null ? 'NULL' : ''}
                    </div>
                  </div>

                  {/* Arrow to Next Node (Forward link) */}
                  {node.next !== null && node.next > idx && (
                    <div className="relative mx-4">
                      <MoveRight className={`w-10 h-10 ${stepData.reversing === idx ? 'text-red-500 animate-pulse' : 'text-gray-600'}`} />
                      {stepData.reversing === idx && (
                        <div className="absolute -top-4 w-full text-center text-[10px] text-red-400 font-bold">REVERSING</div>
                      )}
                    </div>
                  )}
                  {/* Special case for pointing to null/end of list visually if needed, but usually imply by no arrow or explicit NULL text above */}
                </div>
              );
            })}
          </div>
        ) : stepData.dp ? (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-end justify-center gap-4 min-h-[300px] w-full px-4 border-b border-gray-700/50 pb-0">
              {stepData.dp.map((count, idx) => {
                let colorClass = 'bg-gray-700/50 border-gray-600 text-gray-500';

                // Highlight logic for DP
                if (stepData.highlight && stepData.highlight.includes(idx)) {
                  if (stepData.result && idx === stepData.highlight[0]) {
                    // Current step being calculated (result)
                    colorClass = 'bg-green-500/20 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]';
                  } else if (stepData.computing === idx) {
                    // Currently computing this step
                    colorClass = 'bg-fuchsia-500/20 border-fuchsia-500 text-white animate-pulse';
                  } else if (idx === stepData.highlight[1]) {
                    // Previous step (n-1)
                    colorClass = 'bg-yellow-500/20 border-yellow-500 text-white';
                  } else if (idx === stepData.highlight[2]) {
                    // Two steps back (n-2)
                    colorClass = 'bg-cyan-500/20 border-cyan-500 text-white';
                  }
                }

                // Base cases visualization
                if (idx < 2 && !stepData.highlight?.includes(idx)) {
                  colorClass = 'bg-blue-500/10 border-blue-500/30 text-blue-300';
                }

                // Calculate height for stairs effect (min 60px, max 240px)
                const height = 60 + (idx * 25);

                return (
                  <div key={idx} className="flex flex-col items-center gap-2 group relative justify-end h-full">
                    {/* Way Count Label */}
                    <div className="mb-2 font-bold text-xl transition-all">
                      <span className={colorClass.includes('text-white') || colorClass.includes('text-blue') ? 'text-white' : 'text-gray-600'}>
                        {count > 0 ? count : '?'}
                      </span>
                    </div>

                    {/* Stair Bar */}
                    <div
                      className={`w-14 rounded-t-lg border-2 border-b-0 flex items-end justify-center pb-2 transition-all duration-500 ${colorClass}`}
                      style={{ height: `${height}px` }}
                    >
                      <span className="text-xs font-mono opacity-70">Step {idx}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <span className="text-gray-400 text-sm bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
                ℹ️ Numbers above bars represent <strong>distinct ways</strong> to reach that step
              </span>
            </div>
          </div>
        ) : (
          displayArray?.map((item, idx) => {
            const isHighlighted = stepData.highlight?.includes(idx);
            const isSorted = stepData.sorted?.includes(idx);
            const isFound = stepData.found && isHighlighted;
            const isNotFound = stepData.notFound;
            const isCurrent = stepData.currentIndex === idx;

            // Binary Search pointers
            const isLeftPointer = pointers.left === idx;
            const isRightPointer = pointers.right === idx;
            const isMidPointer = pointers.mid === idx;

            // Check if element is in search range
            const inSearchRange = hasPointers &&
              pointers.left !== undefined &&
              pointers.right !== undefined &&
              idx >= pointers.left &&
              idx <= pointers.right;

            return (
              <div key={idx} className="flex flex-col items-center gap-2 relative">
                {/* Pointer Labels Above */}
                {(isLeftPointer || isRightPointer || isMidPointer) && (
                  <div className="flex flex-col items-center mb-1">
                    <ArrowDown
                      className={`w-5 h-5 animate-bounce ${isMidPointer ? 'text-yellow-400' :
                        isLeftPointer ? 'text-blue-400' :
                          'text-red-400'
                        }`}
                    />
                    <span className={`text-xs font-bold ${isMidPointer ? 'text-yellow-400' :
                      isLeftPointer ? 'text-blue-400' :
                        'text-red-400'
                      }`}>
                      {isMidPointer ? 'MID' : isLeftPointer ? 'LEFT' : 'RIGHT'}
                    </span>
                  </div>
                )}

                <div
                  className={`
                  ${isChars ? 'w-16 h-16 rounded-full' : 'w-20 h-20 rounded-2xl'} 
                  flex items-center justify-center text-2xl font-bold
                  transition-all duration-500 transform relative
                  ${isFound
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 scale-110 shadow-2xl shadow-green-500/50 border-2 border-green-300'
                      : isNotFound && isHighlighted
                        ? 'bg-gradient-to-br from-red-500/50 to-orange-600/50 border-2 border-red-400/60'
                        : isMidPointer
                          ? 'bg-gradient-to-br from-yellow-500 to-amber-600 scale-105 shadow-xl shadow-yellow-500/50 border-2 border-yellow-300'
                          : isCurrent || isHighlighted
                            ? 'bg-gradient-to-br from-fuchsia-500 to-cyan-600 scale-110 shadow-2xl shadow-fuchsia-500/50 border-2 border-fuchsia-300'
                            : isSorted
                              ? 'bg-gradient-to-br from-green-600/30 to-emerald-600/30 border-2 border-green-500/40'
                              : inSearchRange && !isNotFound
                                ? 'bg-gray-800/80 border-2 border-cyan-500/40'
                                : 'bg-gray-800/60 border-2 border-fuchsia-500/20 opacity-50'
                    }
                `}
                >
                  <span className={
                    isHighlighted || isSorted || isMidPointer || inSearchRange || isCurrent
                      ? 'text-white'
                      : 'text-fuchsia-300'
                  }>
                    {typeof item === 'object' && item !== null ? JSON.stringify(item) : item}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-fuchsia-400/60 text-xs font-mono">[{idx}]</span>
                  {isSorted && !isHighlighted && (
                    <span className="text-green-400 text-xs">✓</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Status Display */}
      {(stepData.swaps !== undefined ||
        stepData.checking !== undefined ||
        stepData.comparisons !== undefined ||
        stepData.comparing !== undefined ||
        stepData.searchDirection !== undefined) && (
          <div className="flex gap-4 justify-center flex-wrap">
            {stepData.swaps !== undefined && (
              <div className="bg-fuchsia-500/10 px-4 py-2 rounded-lg border border-fuchsia-500/20">
                <span className="text-fuchsia-400 text-sm">Swaps: </span>
                <span className="text-white font-bold">{stepData.swaps}</span>
              </div>
            )}
            {stepData.checking !== undefined && (
              <div className="bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/20">
                <span className="text-cyan-400 text-sm">Looking for: </span>
                <span className="text-white font-bold">{stepData.checking}</span>
              </div>
            )}
            {stepData.comparisons !== undefined && (
              <div className="bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/20">
                <span className="text-purple-400 text-sm">Comparisons: </span>
                <span className="text-white font-bold">{stepData.comparisons}</span>
              </div>
            )}
            {stepData.comparing !== undefined && (
              <div className="bg-yellow-500/10 px-4 py-2 rounded-lg border border-yellow-500/20">
                <span className="text-yellow-400 text-sm">Comparing: </span>
                <span className="text-white font-bold">
                  {Array.isArray(stepData.comparing)
                    ? stepData.comparing.map(idx => displayArray?.[idx]).join(' vs ')
                    : typeof stepData.comparing === 'object' && stepData.comparing !== null
                      ? stepData.comparing.standalone !== undefined
                        ? `${stepData.comparing.standalone} vs ${stepData.comparing.withPrevious}`
                        : stepData.comparing.current !== undefined
                          ? `Price: ${stepData.comparing.current}, Min: ${stepData.comparing.min}, Profit: ${stepData.comparing.profit}`
                          : JSON.stringify(stepData.comparing)
                      : stepData.comparing}
                </span>
              </div>
            )}
            {stepData.searchDirection && (
              <div className={`px-4 py-2 rounded-lg border ${stepData.searchDirection === 'right'
                ? 'bg-blue-500/10 border-blue-500/20'
                : 'bg-orange-500/10 border-orange-500/20'
                }`}>
                <span className={stepData.searchDirection === 'right' ? 'text-blue-400' : 'text-orange-400'}>
                  Searching {stepData.searchDirection === 'right' ? '→' : '←'} {stepData.searchDirection.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default ArrayVisualizer;