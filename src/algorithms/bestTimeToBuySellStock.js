export const generateBestTimeToBuySellStockSteps = (prices) => {
    const steps = [];
    let minPrice = prices[0];
    let maxProfit = 0;
    let buyDay = 0;
    let sellDay = 0;

    steps.push({
        description: 'Starting Best Time to Buy and Sell Stock - find maximum profit',
        array: prices,
        highlight: [],
        minPrice,
        maxProfit,
        code: 'let minPrice = prices[0], maxProfit = 0;'
    });

    steps.push({
        description: `Initialize: Buy on day 0 at price ${prices[0]}`,
        array: prices,
        highlight: [0],
        minPrice,
        maxProfit,
        buyDay: 0,
        code: `minPrice = ${prices[0]}`
    });

    for (let i = 1; i < prices.length; i++) {
        const profit = prices[i] - minPrice;

        steps.push({
            description: `Day ${i}: Price = ${prices[i]}, Potential profit = ${profit}`,
            array: prices,
            highlight: [i, buyDay],
            comparing: { current: prices[i], min: minPrice, profit },
            minPrice,
            maxProfit,
            buyDay,
            sellDay,
            code: `profit = prices[${i}] - minPrice = ${prices[i]} - ${minPrice} = ${profit}`
        });

        if (prices[i] < minPrice) {
            minPrice = prices[i];
            buyDay = i;
            steps.push({
                description: `Found new minimum price ${minPrice} on day ${i}`,
                array: prices,
                highlight: [i],
                newMin: true,
                minPrice,
                maxProfit,
                buyDay: i,
                sellDay,
                code: `minPrice = ${minPrice}, buyDay = ${i}`
            });
        } else if (profit > maxProfit) {
            maxProfit = profit;
            sellDay = i;
            steps.push({
                description: `✓ New maximum profit ${maxProfit}! Buy day ${buyDay}, Sell day ${i}`,
                array: prices,
                highlight: [buyDay, i],
                newMax: true,
                minPrice,
                maxProfit,
                buyDay,
                sellDay: i,
                code: `maxProfit = ${maxProfit}, sellDay = ${i}`
            });
        }
    }

    steps.push({
        description: maxProfit > 0
            ? `✓ Complete! Max profit: ${maxProfit} (Buy day ${buyDay} at ${prices[buyDay]}, Sell day ${sellDay} at ${prices[sellDay]})`
            : '✓ Complete! No profitable transaction possible',
        array: prices,
        highlight: maxProfit > 0 ? [buyDay, sellDay] : [],
        minPrice,
        maxProfit,
        buyDay,
        sellDay,
        complete: true,
        code: `return ${maxProfit};`
    });

    return steps;
};
