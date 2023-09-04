export const asISODateOnlyString = (date: Date) => {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;

    const actualDate = new Date(date.getTime() - userTimezoneOffset);

    return actualDate.toISOString();
}