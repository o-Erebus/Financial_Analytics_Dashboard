export const formatCurrency = (amount: number, minimumFractionDigits = 2) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits,
    }).format(amount);
};