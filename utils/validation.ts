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

export const sanitizeNumericInput = (value: string): string => {
  let sanitized = value.replace(/[^0-9.,-]/g, '');

  sanitized = sanitized.replace(',', '.');

  const dotCount = (sanitized.match(/\./g) || []).length;
  if (dotCount > 1) {
    const parts = sanitized.split('.');
    sanitized = parts[0] + '.' + parts.slice(1).join('');
  }

  if (sanitized.includes('-')) {
    const minusRemoved = sanitized.replace(/-/g, '');
    sanitized = value.startsWith('-') ? '-' + minusRemoved : minusRemoved;
  }

  return sanitized;
};
