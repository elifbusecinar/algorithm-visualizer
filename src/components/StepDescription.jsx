import React from 'react';

const StepDescription = ({ description }) => {
  return (
    <div className="bg-gray-900/40 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl p-6 h-full">
      <h3 className="text-sm font-semibold text-fuchsia-400 mb-3">Current Step</h3>
      <p className="text-lg text-white leading-relaxed">{description}</p>
    </div>
  );
};

export default StepDescription;