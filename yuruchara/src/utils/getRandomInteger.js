export const maxId = 1008;

export const getRandomInteger = (min, max) => {
    // minからmaxまでの整数を含む範囲の乱数を生成する
    return Math.floor(Math.random() * (max - min + 1)) + min;
}