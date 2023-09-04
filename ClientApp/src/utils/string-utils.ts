export const isNullOrWhitespace = (value: string): boolean => {
  return !value || !value.trim();
}

export const toTitleCase = (value: string): string => {
  if (isNullOrWhitespace(value)) {
    return '';
  }

  return value.replace(/\w\S*/g,
    (txt: string) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
};
