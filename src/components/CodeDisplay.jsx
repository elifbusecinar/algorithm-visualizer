import React from 'react';

const CodeDisplay = ({ code, pseudocode, highlightedLine }) => {
  return (
    <div className="bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-6 flex flex-col h-full">
      <h3 className="text-sm font-semibold text-fuchsia-400 mb-3">
        {pseudocode ? 'Pseudocode Execution' : 'Code Execution'}
      </h3>
      <div className="bg-gray-950/60 rounded-lg p-4 font-mono text-sm border border-fuchsia-500/10 overflow-auto flex-1">
        {pseudocode ? (
          <div className="flex flex-col gap-1">
            {pseudocode.map((line, idx) => (
              <div
                key={idx}
                className={`px-2 py-0.5 rounded transition-colors duration-200 ${idx === highlightedLine
                  ? 'bg-fuchsia-500/20 text-fuchsia-300 border-l-2 border-fuchsia-500'
                  : 'text-gray-400 border-l-2 border-transparent'
                  }`}
              >
                {line}
              </div>
            ))}
          </div>
        ) : (
          <code className="text-green-400">{code}</code>
        )}
      </div>
    </div>
  );
};

export default CodeDisplay;