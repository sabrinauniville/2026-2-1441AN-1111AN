export function toLocaleNumber(value, { maximumFractionDigits = 2 } = {}) {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return "N/D";
  }

  return numericValue.toLocaleString("pt-BR", {
    maximumFractionDigits,
  });
}

export function safeValue(value, fallback = "N/D") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return value;
}
