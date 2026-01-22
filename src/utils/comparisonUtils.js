/**
 * Determines which algorithms are comparable to a given algorithm
 * based on category and type compatibility.
 * 
 * @param {string} selectedAlgorithm - The key of the selected algorithm
 * @param {Object} allAlgorithms - The ALGORITHMS object from constants
 * @returns {Array} Array of [key, algorithmObject] pairs that are comparable
 */
export const getComparableAlgorithms = (selectedAlgorithm, allAlgorithms) => {
    if (!selectedAlgorithm || !allAlgorithms[selectedAlgorithm]) {
        return Object.entries(allAlgorithms);
    }

    const selectedCategory = allAlgorithms[selectedAlgorithm]?.category;
    const selectedType = allAlgorithms[selectedAlgorithm]?.type;

    // Define which categories can be meaningfully compared with each other
    const compatibilityMap = {
        'Sorting': ['Sorting', 'Array'],
        'Search': ['Search', 'Sorting'],
        'Hash Table': ['Hash Table'],
        'Stack': ['Stack'],
        'Dynamic Programming': ['Dynamic Programming'],
        'Sliding Window': ['Sliding Window'],
        'Linked List': ['Linked List'],
        'Two Pointers': ['Two Pointers', 'Array'],
        'Array': ['Array', 'Sorting', 'Two Pointers'],
        'Pathfinding': ['Pathfinding'],
        'Tree': ['Tree']
    };

    const compatibleCategories = compatibilityMap[selectedCategory] || [selectedCategory];

    // Filter algorithms based on compatibility
    return Object.entries(allAlgorithms).filter(([key, algo]) => {
        // Don't compare algorithm with itself
        if (key === selectedAlgorithm) {
            return false;
        }

        // Only show algorithms that are meant for comparison mode
        if (algo.comparableInMode !== true) {
            return false;
        }

        // Type compatibility is critical (array-based vs grid-based vs tree-based)
        // If both have types defined, they must match
        if (selectedType && algo.type) {
            if (selectedType !== algo.type) {
                return false;
            }
        }

        // Check category compatibility
        return compatibleCategories.includes(algo.category);
    });
};
