export const validateAmountInput = (value: string): string => {
  let filtered = value.replace(/,/g, '.');
  filtered = filtered.replace(/[^0-9.]/g, '');
  const parts = filtered.split('.');
  return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : filtered;
};

export const validateAmountInputWithLeadingZeros = (value: string): string => {
  let filtered = value.replace(/,/g, '.');
  filtered = filtered.replace(/[^0-9.]/g, '');
  const cleaned = filtered.replace(/^0+(?=\d)/, '');
  const parts = cleaned.split('.');
  return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleaned;
};
