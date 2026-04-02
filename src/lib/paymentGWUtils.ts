export async function pause(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const convertToSubcurrency = (amount: number, factor = 100) => {
    return Math.round(amount * factor);
}

export const convertFromSubcurrency = (amount: number, factor = 100) => {
    return amount / factor;
}