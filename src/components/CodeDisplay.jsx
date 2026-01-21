import React from 'react';

const CodeDisplay = ({ code }) => {
  return (
    <div className="bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-fuchsia-400 mb-3">Code Execution</h3>
      <div className="bg-gray-950/60 rounded-lg p-4 font-mono text-sm border border-fuchsia-500/10">
        <code className="text-green-400">{code}</code>
      </div>
    </div>
  );
};

export default CodeDisplay;