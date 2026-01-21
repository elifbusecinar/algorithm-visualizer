export const generateValidParenthesesSteps = (str) => {
    const steps = [];
    const stack = [];
    const chars = str.split('');
    const matchingBrackets = { ')': '(', '}': '{', ']': '[' };

    steps.push({
        description: 'Starting Valid Parentheses check using Stack',
        chars: [...chars],
        stack: [],
        currentIndex: -1,
        code: 'const stack = [];'
    });

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];

        steps.push({
            description: `Processing character: '${char}' at index ${i}`,
            chars: [...chars],
            stack: [...stack],
            currentIndex: i,
            highlight: [i],
            code: `char = str[${i}] = '${char}'`
        });

        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
            steps.push({
                description: `Opening bracket '${char}' - push to stack`,
                chars: [...chars],
                stack: [...stack],
                currentIndex: i,
                highlight: [i],
                operation: 'push',
                pushedChar: char,
                code: `stack.push('${char}')`
            });
        } else if (char === ')' || char === '}' || char === ']') {
            if (stack.length === 0) {
                steps.push({
                    description: `✗ Closing bracket '${char}' but stack is empty - Invalid!`,
                    chars: [...chars],
                    stack: [...stack],
                    currentIndex: i,
                    highlight: [i],
                    valid: false,
                    code: 'return false; // No matching opening bracket'
                });
                return steps;
            }

            const top = stack.pop();
            if (top !== matchingBrackets[char]) {
                steps.push({
                    description: `✗ Mismatched brackets: '${top}' and '${char}' - Invalid!`,
                    chars: [...chars],
                    stack: [...stack],
                    currentIndex: i,
                    highlight: [i],
                    valid: false,
                    operation: 'mismatch',
                    poppedChar: top,
                    code: `return false; // '${top}' != '${matchingBrackets[char]}'`
                });
                return steps;
            }

            steps.push({
                description: `Matching pair found: '${top}' and '${char}' - pop from stack`,
                chars: [...chars],
                stack: [...stack],
                currentIndex: i,
                highlight: [i],
                operation: 'pop',
                poppedChar: top,
                matchedWith: char,
                code: `stack.pop() // Matched '${top}' with '${char}'`
            });
        }
    }

    const isValid = stack.length === 0;
    steps.push({
        description: isValid
            ? '✓ All brackets matched - Valid!'
            : `✗ Stack not empty: ${stack.join('')} - Invalid!`,
        chars: [...chars],
        stack: [...stack],
        currentIndex: chars.length,
        valid: isValid,
        complete: true,
        code: `return ${isValid}; // ${stack.length === 0 ? 'Stack empty' : 'Unmatched brackets remain'}`
    });

    return steps;
};
