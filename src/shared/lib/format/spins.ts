export const getSpinsWord = (count: number): string => {
    // Обрабатываем особые случаи для чисел от 11 до 19
    if (count % 100 >= 11 && count % 100 <= 19) {
        return 'Вращений';
    }
    
    // Для остальных чисел смотрим на последнюю цифру
    switch (count % 10) {
        case 1:
            return 'Вращение';
        case 2:
        case 3:
        case 4:
            return 'Вращения';
        default:
            return 'Вращений';
    }
};

export const formatSpinsCount = (count: number): string => {
    return `${count} ${getSpinsWord(count)}`;
};

export const getSplitSpinsCount = (count: number) => {
    return {
        number: count,
        word: getSpinsWord(count)
    };
};