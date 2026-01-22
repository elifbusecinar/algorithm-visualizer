import React from 'react';
import { Code2 } from 'lucide-react';

const Header = ({ currentStep, totalSteps, onCompareMode }) => {
  return (
    <div className="border-b border-fuchsia-500/20 bg-black/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Algorithm Visualizer
              </h1>
              <p className="text-fuchsia-300/60 text-sm">Master algorithms through interactive visualization</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={onCompareMode}
              className="px-4 py-1.5 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400 hover:text-fuchsia-300 border border-fuchsia-500/20 rounded-lg transition-colors font-medium flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              Compare Algorithms
            </button>
            <div className="px-3 py-1.5 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/20">
              <span className="text-fuchsia-400">Step {currentStep + 1}</span>
              <span className="text-fuchsia-300/40"> / {totalSteps}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;