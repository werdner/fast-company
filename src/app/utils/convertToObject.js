export function convertToObject(array, key) {
    if (Array.isArray(array)) {
        const map = {};
        for (const item of array) {
            map[item[key]] = item;
        }
        return map;
    }

    return array;
};
