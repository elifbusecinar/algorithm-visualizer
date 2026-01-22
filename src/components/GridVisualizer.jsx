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
                    <div className="w-4 h-4 bg-green-500 rounded"></div> Start
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div> End
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-800 border border-gray-600"></div> Wall
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500/50"></div> Visited
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400"></div> Path
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
                        if (isStart) bgColor = 'bg-green-500';
                        else if (isEnd) bgColor = 'bg-red-500';
                        else if (isWall) bgColor = 'bg-gray-800 border border-gray-600';
                        else if (isPath) bgColor = 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)] z-10';
                        else if (isVisited) bgColor = 'bg-blue-500/50';

                        return (
                            <motion.div
                                key={`${rowIdx}-${colIdx}`}
                                className={`w-6 h-6 ${bgColor} transition-colors duration-200`}
                                initial={false}
                                animate={{
                                    scale: isPath || isVisited ? [0.8, 1] : 1,
                                    backgroundColor: isPath ? '#facc15' : isVisited ? 'rgba(59, 130, 246, 0.5)' : undefined
                                }}
                                transition={{ duration: 0.2 }}
                            />
                        );
                    })
                ))}
            </div>
        </div>
    );
};

export default GridVisualizer;
