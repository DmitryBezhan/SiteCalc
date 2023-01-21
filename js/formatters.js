export const percentFormatter = new Intl.NumberFormat('ru-Ru', 
    { 
    style: 'percent', 
    maximumFractionDigits: 3 
});

export const priceFormatter = new Intl.NumberFormat('ru-Ru', 
    { 
    style: 'currency',
    currency: 'RUB', 
    maximumFractionDigits: 0
});

export const priceFormatterDecimals = new Intl.NumberFormat('ru-Ru', 
    { 
    style: 'currency',
    currency: 'RUB', 
    maximumFractionDigits: 2
});