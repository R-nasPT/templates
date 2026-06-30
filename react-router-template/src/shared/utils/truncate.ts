export const truncate = (text: string, length: number): string => {
  if (length < 1) return '...';
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
};
