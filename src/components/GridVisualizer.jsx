import React from 'react';
import { motion } from 'framer-motion';

const GridVisualizer = ({ stepData }) => {
    const { grid, startNode, endNode } = stepData;

    if (!grid) return <div className="text-white">Initialize Grid...</div>;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {/* Legend */}
            <div className="flex gap-4 mb-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-md shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div> Start
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-md shadow-[0_0_8px_rgba(248,113,113,0.5)]"></div> End
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-800 border border-gray-600 rounded-md"></div> Wall
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-cyan-500/40 rounded-md shadow-[0_0_6px_rgba(34,211,238,0.3)]"></div> Visited
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-br from-fuchsia-400 to-fuchsia-600 rounded-md shadow-[0_0_10px_rgba(232,121,249,0.6)]"></div> Path
                </div>
            </div>

            <div
                className="grid gap-[1px] bg-gray-800 border border-gray-700 p-1 rounded-lg"
                style={{
                    gridTemplateColumns: `repeat(${grid[0].length}, 24px)`
                }}
            >
                {grid.map((row, rowIdx) => (
                    row.map((node, colIdx) => {
                        const isStart = node.row === startNode?.row && node.col === startNode?.col;
                        const isEnd = node.row === endNode?.row && node.col === endNode?.col;
                        const isWall = node.isWall;
                        const isVisited = node.isVisited;
                        const isPath = node.isPath;

                        let bgColor = 'bg-gray-900';
                        let shadowEffect = '';

                        if (isStart) {
                            bgColor = 'bg-gradient-to-br from-green-400 to-green-600';
                            shadowEffect = 'shadow-[0_0_12px_rgba(74,222,128,0.6)]';
                        }
                        else if (isEnd) {
                            bgColor = 'bg-gradient-to-br from-red-400 to-red-600';
                            shadowEffect = 'shadow-[0_0_12px_rgba(248,113,113,0.6)]';
                        }
                        else if (isWall) {
                            bgColor = 'bg-gray-800 border border-gray-600';
                        }
                        else if (isPath) {
                            bgColor = 'bg-gradient-to-br from-fuchsia-400 to-fuchsia-600';
                            shadowEffect = 'shadow-[0_0_15px_rgba(232,121,249,0.7)] z-10';
                        }
                        else if (isVisited) {
                            bgColor = 'bg-cyan-500/40';
                            shadowEffect = 'shadow-[0_0_8px_rgba(34,211,238,0.3)]';
                        }

                        return (
                            <motion.div
                                key={`${rowIdx}-${colIdx}`}
                                className={`w-6 h-6 rounded-md ${bgColor} ${shadowEffect} transition-all duration-200`}
                                initial={false}
                                animate={{
                                    scale: isPath || isVisited ? [0.8, 1] : 1,
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        );
                    })
                ))}
            </div>
        </div>
    );
};

export default GridVisualizer;
