import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TreeVisualizer = ({ stepData }) => {
    const { nodes, edges, rootId } = stepData;

    // Render edges as SVG lines
    const renderEdges = () => {
        if (!edges || edges.length === 0) return null;

        return (
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
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
                            stroke="#4b5563" // gray-600
                            strokeWidth="2"
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
            let bgColor = 'bg-gray-800';
            let borderColor = 'border-gray-600';
            let textColor = 'text-gray-300';
            let boxShadow = '';

            if (node.isNew) {
                bgColor = 'bg-fuchsia-500';
                borderColor = 'border-fuchsia-400';
                textColor = 'text-white';
                boxShadow = '0 0 15px rgba(217, 70, 239, 0.6)';
            } else if (node.isVisited) {
                bgColor = 'bg-indigo-500';
                borderColor = 'border-indigo-400';
                textColor = 'text-white';
            } else if (node.isFound) {
                bgColor = 'bg-green-500';
                borderColor = 'border-green-400';
                textColor = 'text-white';
                boxShadow = '0 0 15px rgba(34, 197, 94, 0.6)';
            }

            return (
                <motion.div
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, x: node.x - 24, y: node.y - 24 }} // Center the node (48px / 2 = 24)
                    transition={{ duration: 0.4 }}
                    className={`absolute flex items-center justify-center w-12 h-12 rounded-full border-2 ${bgColor} ${borderColor} ${textColor} font-bold z-10`}
                    style={{ boxShadow }}
                >
                    {node.value}
                </motion.div>
            );
        });
    };

    return (
        <div className="relative w-full h-[500px] bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden flex items-center justify-center">
            <div className="absolute top-4 left-4 flex gap-4 text-xs text-gray-400 z-20">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-fuchsia-500"></div> New Node</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-indigo-500"></div> Visiting</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500"></div> Placed</div>
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
