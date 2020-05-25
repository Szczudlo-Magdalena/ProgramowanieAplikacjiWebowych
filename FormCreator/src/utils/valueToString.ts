export function valueToString(value: any) {
    if (typeof value === 'boolean') {
        return value ? "Tak" : "Nie";
    }

    return value;
}