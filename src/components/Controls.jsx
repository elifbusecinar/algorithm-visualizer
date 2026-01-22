import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

const Controls = ({
  isPlaying,
  setIsPlaying,
  currentStep,
  setCurrentStep,
  totalSteps,
  handleReset
}) => {
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-6">
      <div className="flex flex-col gap-6">
        {/* Control Buttons */}
        <div className="flex justify-center gap-3 flex-wrap">
          <button
            onClick={handleReset}
            className="bg-gray-800/60 hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all border border-fuchsia-500/20 hover:border-fuchsia-500/40 flex items-center gap-2"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="bg-fuchsia-600/20 hover:bg-fuchsia-600/30 disabled:bg-gray-800/30 disabled:opacity-40 text-white px-6 py-3 rounded-xl transition-all border border-fuchsia-500/30 flex items-center gap-2"
            title="Previous Step"
          >
            <SkipBack className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <button
            onClick={() => {
              if (currentStep >= totalSteps - 1) {
                setCurrentStep(0);
                setIsPlaying(true);
              } else {
                setIsPlaying(!isPlaying);
              }
            }}
            className="bg-gradient-to-r from-fuchsia-500 to-cyan-600 hover:from-fuchsia-600 hover:to-cyan-700 text-white px-8 py-3 rounded-xl transition-all shadow-lg shadow-fuchsia-500/30 flex items-center gap-2 font-semibold"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep >= totalSteps - 1}
            className="bg-fuchsia-600/20 hover:bg-fuchsia-600/30 disabled:bg-gray-800/30 disabled:opacity-40 text-white px-6 py-3 rounded-xl transition-all border border-fuchsia-500/30 flex items-center gap-2"
            title="Next Step"
          >
            <span className="hidden sm:inline">Next</span>
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-fuchsia-400/60 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800/60 rounded-full h-3 overflow-hidden border border-fuchsia-500/20">
            <div
              className="bg-gradient-to-r from-fuchsia-500 to-cyan-600 h-3 rounded-full transition-all duration-300 shadow-lg shadow-fuchsia-500/50"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;