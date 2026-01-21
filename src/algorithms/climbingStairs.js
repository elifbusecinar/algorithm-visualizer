export const generateClimbingStairsSteps = (n) => {
    const steps = [];
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    steps.push({
        description: `Climbing Stairs (${n} steps) - count distinct ways using Dynamic Programming`,
        n,
        dp: [...dp],
        highlight: [],
        code: 'dp[0] = 1, dp[1] = 1;'
    });

    steps.push({
        description: 'Base cases: 0 steps = 1 way, 1 step = 1 way',
        n,
        dp: [...dp],
        highlight: [0, 1],
        code: 'dp[0] = 1 (no steps), dp[1] = 1 (one 1-step)'
    });

    for (let i = 2; i <= n; i++) {
        steps.push({
            description: `Computing ways to reach step ${i}`,
            n,
            dp: [...dp],
            highlight: [i],
            computing: i,
            code: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}]`
        });

        dp[i] = dp[i - 1] + dp[i - 2];

        steps.push({
            description: `Step ${i}: ${dp[i]} ways (from step ${i - 1}: ${dp[i - 1]} + from step ${i - 2}: ${dp[i - 2]})`,
            n,
            dp: [...dp],
            highlight: [i, i - 1, i - 2],
            result: dp[i],
            fromPrev: dp[i - 1],
            fromTwoSteps: dp[i - 2],
            code: `dp[${i}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`
        });
    }

    steps.push({
        description: `✓ Complete! There are ${dp[n]} distinct ways to climb ${n} stairs`,
        n,
        dp: [...dp],
        highlight: [n],
        complete: true,
        totalWays: dp[n],
        code: `return dp[${n}] = ${dp[n]};`
    });

    return steps;
};
