import React from 'react';

const ArrayVisualizer = ({ stepData }) => {
  return (
    <div className="lg:col-span-2 bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-fuchsia-300 mb-6">Visual Representation</h2>

      {/* Array Elements */}
      <div className="flex justify-center items-end gap-3 mb-8 flex-wrap min-h-[200px] items-center">
        {stepData.array?.map((num, idx) => {
          const isHighlighted = stepData.highlight?.includes(idx);
          const isSorted = stepData.sorted?.includes(idx);
          const isFound = stepData.found && isHighlighted;

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div
                className={`
                  w-20 h-20 flex items-center justify-center rounded-2xl text-2xl font-bold
                  transition-all duration-500 transform relative
                  ${isFound
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 scale-110 shadow-2xl shadow-green-500/50 border-2 border-green-300'
                    : isHighlighted
                      ? 'bg-gradient-to-br from-fuchsia-500 to-cyan-600 scale-110 shadow-2xl shadow-fuchsia-500/50 border-2 border-fuchsia-300'
                      : isSorted
                        ? 'bg-gradient-to-br from-green-600/30 to-emerald-600/30 border-2 border-green-500/40'
                        : 'bg-gray-800/60 border-2 border-fuchsia-500/20'
                  }
                `}
              >
                <span className={isHighlighted || isSorted ? 'text-white' : 'text-fuchsia-300'}>
                  {num}
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
        })}
      </div>

      {/* Status Display */}
      {(stepData.swaps !== undefined || stepData.checking !== undefined) && (
        <div className="flex gap-4 justify-center">
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
        </div>
      )}
    </div>
  );
};

export default ArrayVisualizer;