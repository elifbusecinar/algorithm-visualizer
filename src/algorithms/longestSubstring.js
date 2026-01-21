export const generateLongestSubstringSteps = (str) => {
    const steps = [];
    const chars = str.split('');
    const charMap = new Map();
    let maxLength = 0;
    let start = 0;
    let maxStart = 0;
    let maxEnd = 0;

    steps.push({
        description: 'Starting Longest Substring Without Repeating Characters - using sliding window',
        chars,
        highlight: [],
        window: [],
        maxLength: 0,
        charMap: {},
        code: 'const charMap = new Map(); let start = 0;'
    });

    for (let end = 0; end < chars.length; end++) {
        const char = chars[end];

        steps.push({
            description: `Processing character '${char}' at index ${end}`,
            chars,
            highlight: [end],
            window: Array.from({ length: end - start + 1 }, (_, k) => start + k),
            currentChar: char,
            maxLength,
            charMap: Object.fromEntries(charMap),
            code: `char = str[${end}] = '${char}'`
        });

        if (charMap.has(char) && charMap.get(char) >= start) {
            const oldStart = start;
            start = charMap.get(char) + 1;

            steps.push({
                description: `Duplicate '${char}' found! Move window start from ${oldStart} to ${start}`,
                chars,
                highlight: [charMap.get(char), end],
                window: Array.from({ length: end - start + 1 }, (_, k) => start + k),
                duplicate: true,
                maxLength,
                charMap: Object.fromEntries(charMap),
                code: `start = charMap.get('${char}') + 1 = ${start}`
            });
        }

        charMap.set(char, end);
        const currentLength = end - start + 1;

        if (currentLength > maxLength) {
            maxLength = currentLength;
            maxStart = start;
            maxEnd = end;

            steps.push({
                description: `✓ New max length ${maxLength}: "${chars.slice(start, end + 1).join('')}"`,
                chars,
                highlight: Array.from({ length: end - start + 1 }, (_, k) => start + k),
                window: Array.from({ length: end - start + 1 }, (_, k) => start + k),
                newMax: true,
                maxLength,
                maxSubstring: chars.slice(start, end + 1).join(''),
                charMap: Object.fromEntries(charMap),
                code: `maxLength = ${maxLength}`
            });
        } else {
            steps.push({
                description: `Current window: "${chars.slice(start, end + 1).join('')}" (length ${currentLength})`,
                chars,
                highlight: Array.from({ length: end - start + 1 }, (_, k) => start + k),
                window: Array.from({ length: end - start + 1 }, (_, k) => start + k),
                maxLength,
                charMap: Object.fromEntries(charMap),
                code: `charMap.set('${char}', ${end})`
            });
        }
    }

    steps.push({
        description: `✓ Complete! Longest substring: "${chars.slice(maxStart, maxEnd + 1).join('')}" with length ${maxLength}`,
        chars,
        highlight: Array.from({ length: maxEnd - maxStart + 1 }, (_, k) => maxStart + k),
        window: Array.from({ length: maxEnd - maxStart + 1 }, (_, k) => maxStart + k),
        maxLength,
        maxSubstring: chars.slice(maxStart, maxEnd + 1).join(''),
        complete: true,
        charMap: Object.fromEntries(charMap),
        code: `return ${maxLength};`
    });

    return steps;
};
