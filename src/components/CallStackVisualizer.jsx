import React from 'react';
import { Layers } from 'lucide-react';

const CallStackVisualizer = ({ callStack }) => {
    if (!callStack || callStack.length === 0) {
        return (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 h-full flex flex-col items-center justify-center text-gray-500 gap-2 min-h-[200px]">
                <Layers className="w-8 h-8 opacity-20" />
                <p className="text-sm">Call stack empty</p>
            </div>
        );
    }

    // Reverse call stack to show top-of-stack at top of UI
    const reversedStack = [...callStack].reverse();

    return (
        <div className="bg-gray-900 border border-fuchsia-500/20 rounded-xl overflow-hidden flex flex-col h-full shadow-lg shadow-black/40">
            <div className="bg-gray-800/50 p-3 border-b border-gray-700/50 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-fuchsia-300 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Call Stack
                </h3>
                <span className="text-xs bg-fuchsia-500/20 text-fuchsia-200 px-2 py-0.5 rounded-full border border-fuchsia-500/30">
                    Depth: {callStack.length}
                </span>
            </div>

            <div className="p-4 space-y-2 overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {reversedStack.map((frame, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg border flex items-center justify-between transition-all duration-300 animate-in slide-in-from-top-2 ${index === 0
                                ? 'bg-fuchsia-500/20 border-fuchsia-500/50 shadow-[0_0_15px_-5px_rgba(217,70,239,0.3)] scale-[1.02]'
                                : 'bg-gray-800/40 border-gray-700 text-gray-400 opacity-80'
                            }`}
                    >
                        <div className="flex flex-col">
                            <span className={`font-mono text-sm font-bold ${index === 0 ? 'text-white' : ''}`}>
                                {frame.name}
                            </span>
                            <span className="text-xs font-mono opacity-70">
                                args: {frame.args}
                            </span>
                        </div>
                        {index === 0 && (
                            <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse shadow-[0_0_8px_rgba(232,121,249,0.8)]" />
                        )}
                    </div>
                ))}

                {/* Visual helper for stack base */}
                <div className="border-t-2 border-dashed border-gray-800 mt-4 pt-2 text-center">
                    <span className="text-[10px] text-gray-600 uppercase tracking-widest">Stack Base</span>
                </div>
            </div>
        </div>
    );
};

export default CallStackVisualizer;
