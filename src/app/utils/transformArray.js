export function transformArray(arrayOfObjects, data) {
    return arrayOfObjects.map((name) => ({
        label: data[name].name,
        value: data[name]._id
    }));
}
