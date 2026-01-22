# Algorithm Visualizer

An interactive, step-by-step algorithm visualization platform that brings algorithms to life through dynamic visual representations. Perfect for students, educators, and developers looking to understand how algorithms work under the hood.

## 🌐 Live Demo
Experience the visualizer live: [Algorithm Visualizer](https://algorithm-visualizer-blush-nine.vercel.app/)

## ✨ Current Features

- **Step-by-Step Visualization**: Watch algorithms execute line by line with animated visual feedback
- **Interactive Controls**: Play, pause, step forward/backward through algorithm execution
- **Customizable Inputs**: Modify array values and algorithm parameters in real-time
- **Beautiful Dark Mode UI**: Modern, fuchsia-themed interface with smooth animations
- **Speed Control**: Adjust animation speed to match your learning pace
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Complexity Analysis Panel**: View detailed Time and Space complexity (Best/Avg/Worst) for each algorithm
- **Edge Case Testing Mode**: Quickly load preset inputs (e.g., Sorted, Reverse Sorted) to test algorithm behavior
- **Interactive Pseudocode Viewer**: View and track algorithm pseudocode execution in real-time
- **Recursive Call Stack Visualization**: Visualizes the call stack growth and shrinkage for recursive algorithms (Merge Sort, Quick Sort)
- **Linked List Visualization**: Dynamic, arrow-based visualization for linked list operations
- **Pathfinding Visualizer (Grid)**: Visualize Dijkstra's Algorithm on a 2D grid with walls and weighted nodes
- **Smart Algorithm Comparison Mode**: Side-by-side comparison with intelligent filtering - only shows comparable algorithms
- **Tree Visualization**: Visual representation of Binary Search Tree construction with node positioning

## 🛠️ Technologies Used

- **React** - Component-based UI architecture
- **Tailwind CSS** - Utility-first styling with custom fuchsia theme
- **Vite** - Fast development environment and optimized builds
- **Lucide React** - Beautiful, consistent icon system
- **Framer Motion** - Smooth animations for grid interactions

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd algorithm-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎯 Algorithms Implemented

### Sorting Algorithms
- [x] **Bubble Sort** - Simple comparison-based sorting
- [x] **Selection Sort** - In-place comparison sorting
- [x] **Insertion Sort** - Builds sorted array one element at a time
- [x] **Merge Sort** - Divide-and-conquer sorting (O(n log n))
- [x] **Quick Sort** - Efficient partition-based sorting

### Searching Algorithms
- [x] **Binary Search** - Logarithmic search on sorted arrays

### Pathfinding Algorithms
- [x] **Dijkstra's Algorithm** - Shortest path in a weighted graph
- [x] **A* Search Algorithm** - Heuristic-based pathfinding (Manhattan Distance)
- [x] **Breadth First Search (BFS)** - Shortest path in unweighted graph (Level-by-level)
- [x] **Depth First Search (DFS)** - Exhaustive path exploration (Backtracking)

### Tree Data Structures
- [x] **Binary Search Tree (BST)** - Tree insertion with step-by-step visualization
- [x] **In-Order Traversal** - Left-Root-Right traversal (sorted order for BST)
- [x] **Pre-Order Traversal** - Root-Left-Right traversal
- [x] **Post-Order Traversal** - Left-Right-Root traversal
- [x] **Level-Order Traversal (BFS)** - Breadth-first, level-by-level traversal
- [x] **BST Search** - Search for value in Binary Search Tree
- [x] **BST Delete** - Delete node with 3 cases (leaf, one child, two children)

### Problem-Solving Algorithms
- [x] **Two Sum** - Hash map approach for pair finding
- [x] **Container With Most Water** - Two pointer optimization
- [x] **Move Zeroes** - In-place array manipulation
- [x] **Contains Duplicate** - Efficient duplicate detection
- [x] **Maximum Subarray** - Kadane's algorithm
- [x] **Longest Substring Without Repeating** - Sliding window technique
- [x] **Reverse Linked List** - Pointer manipulation
- [x] **Valid Parentheses** - Stack-based validation
- [x] **Climbing Stairs** - Dynamic programming
- [x] **Best Time to Buy and Sell Stock** - Single-pass optimization

## 🎉 Summary

**Total Algorithms**: 26+ algorithms across multiple categories
- **Sorting**: 5 algorithms
- **Searching**: 2 algorithms (Binary Search, BFS/DFS)
- **Tree**: 7 algorithms (BST + Traversals + Operations)
- **Pathfinding**: 2 algorithms (Dijkstra, A*)
- **Problem-Solving**: 10+ algorithms

All algorithms feature:
- Step-by-step visualization
- Interactive controls
- Complexity analysis
- Pseudocode display
- Real-time statistics

## 🚀 Planned Features

### 1. **Live Complexity Growth Chart 📈**
- Real-time graphing of Comparisons, Swaps, and Recursive Calls
- Visualize O(n log n) vs O(n²) behavior as array size increases
- Dynamic chart updates during execution

### 2. **Advanced Memory Visualization 🧠**
- Real-time Stock & Heap memory tracking
- Visual Call Stack growth/shrinkage for recursive algorithms
- Detailed view of memory allocation per step

### 3. **Worst Case Generator ⚠️**
- One-click generation of pathological inputs
- Examples: Quick Sort (sorted array), BST (skewed tree), Hash Table (collisions)
- Educational focus on "Why this input breaks the algorithm"

### 4. **Public Algorithm Gallery 🌍**
- Community platform for sharing custom inputs and algorithms
- User-submitted challenges and test cases
- Like/Star system for popular content

### 5. **"What You Learned" & Analytics Panel 🎓**
- Contextual guide: When to use (and NOT use) the current algorithm
- Alternatives and Trade-offs section
- **Performance Dashboard**: Side-by-side comparison table of Comparisons, Swaps, and Execution Time

### 6. **User-Written Code Execution 👨‍💻**
- Code editor for users to write their own algorithms
- Syntax checking and error highlighting
- Execute custom code with the same visualization system
- Compare user solutions with optimal implementations

### 7. **Enhanced Tree Data Structures 🌳**
- AVL Tree with rotation visualization
- Red-Black Tree visualization

### 8. **Interactive Quiz Mode ❓**
- Predict-the-next-step challenges
- Complexity estimation questions
- Algorithm selection for given problems
- Score tracking and learning progress

### 9. **Backend Integration & User Accounts 🔐**
- **User Authentication**: Login/Register, Progress tracking, Favorites
- **Persistent State**: Save and resume visualization sessions
- **Tech Stack**: Node.js + Express + PostgreSQL/MongoDB

### 10. **Shareable Visualization Links 🔗**
- Generate unique URLs for specific algorithm states (e.g., `/share/quick-sort/abc123`)
- Share custom inputs, execution speeds, and visualization settings with peers
- "Deep Link" directly to a specific step in the algorithm

### 11. **Platform Analytics & Insights 📊**
- Track most popular algorithms and average session times
- User interaction heatmaps to identify where learners get stuck
- **Monetization Potential**: Premium features based on advanced analytics

### 12. **Community Content Hub 🏘️**
- Save and publish user-created algorithms and test cases
- Community voting and filtering for best educational examples
- Transform from a simple tool into a comprehensive **Educational Platform**



## 📝 License

This project is developed for educational and portfolio purposes.

---

**Built with ❤️ for algorithm learners everywhere**


