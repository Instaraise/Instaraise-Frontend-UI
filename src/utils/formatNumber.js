var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 4, // (causes 2500.99 to be printed as $2,501)
});

export const midusdformatter = (value) => {
    return formatter.format(value);
};
