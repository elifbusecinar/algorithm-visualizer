import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TreeVisualizer = ({ stepData }) => {
    const { nodes, edges, rootId } = stepData;
    console.log('TreeVisualizer Render:', { stepData, nodes });


    // Render edges as SVG lines
    const renderEdges = () => {
        if (!edges || edges.length === 0) return null;

        return (
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="28"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" /> {/* Cyan-500 */}
                    </marker>
                    {/* Glow filter for edges */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {edges.map((edge, idx) => {
                    const source = nodes.find(n => n.id === edge.source);
                    const target = nodes.find(n => n.id === edge.target);

                    if (!source || !target) return null;

                    return (
                        <motion.line
                            key={`edge-${source.id}-${target.id}`}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke="#06b6d4" // Cyan-500
                            strokeWidth="2.5"
                            markerEnd="url(#arrowhead)"
                            filter="url(#glow)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    );
                })}
            </svg>
        );
    };

    // Render nodes as Divs
    const renderNodes = () => {
        if (!nodes || nodes.length === 0) return null;

        return nodes.map((node) => {
            // Determine color based on state
            let baseClasses = "bg-gradient-to-br border-2 text-white shadow-lg";
            let colorClasses = "from-slate-700 to-slate-900 border-slate-600";
            let shadowColor = "";

            if (node.isNew) {
                // New: Pink/Fuchsia Glow
                colorClasses = "from-fuchsia-500 to-pink-600 border-fuchsia-300";
                shadowColor = "shadow-fuchsia-500/50";
            } else if (node.isVisited) {
                // Visiting: Cyan/Blue Glow
                colorClasses = "from-cyan-400 to-blue-600 border-cyan-300";
                shadowColor = "shadow-cyan-500/50";
            } else if (node.isFound) {
                // Placed/Found: Emerald/Teal Glow
                colorClasses = "from-emerald-400 to-teal-600 border-emerald-300";
                shadowColor = "shadow-emerald-500/50";
            } else {
                // Default: Slate
                shadowColor = "shadow-black/40";
            }

            return (
                <motion.div
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, x: node.x - 24, y: node.y - 24 }} // Center the node
                    transition={{ duration: 0.4 }}
                    className={`absolute flex items-center justify-center w-12 h-12 rounded-full font-bold z-10 transition-all duration-500 ease-in-out ${baseClasses} ${colorClasses} ${shadowColor}`}
                >
                    <span className="drop-shadow-md">{node.value}</span>
                </motion.div>
            );
        });
    };

    return (
        <div className="relative w-full h-[500px] bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden flex items-center justify-center">
            <div className="absolute top-4 left-4 flex gap-4 text-xs text-gray-300 z-20 font-medium">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-600 shadow-sm shadow-fuchsia-500/50"></div>
                    New Node
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-sm shadow-cyan-500/50"></div>
                    Visiting
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-sm shadow-emerald-500/50"></div>
                    Placed
                </div>
            </div>

            {/* Container for tree - we'll assume coordinates are relative to this container */}
            <div className="relative w-full h-full">
                {renderEdges()}
                {renderNodes()}
            </div>
        </div>
    );
};

export default TreeVisualizer;
