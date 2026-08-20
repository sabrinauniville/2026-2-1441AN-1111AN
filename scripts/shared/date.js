export function toIsoDateValue(date) {
  const value = new Date(date);
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getDateOffset(days) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return toIsoDateValue(date);
}

export function getCurrentMonthStart() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(1);
  return toIsoDateValue(date);
}

export function getLastAvailableDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - 1);
  return toIsoDateValue(date);
}

export function parseDateValue(
  value,
  { maxDate = getLastAvailableDate() } = {},
) {
  if (!value || !value.trim()) {
    return "";
  }

  const isoDate = value.trim();
  const parsedDate = new Date(`${isoDate}T00:00:00Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Data inválida.");
  }

  const latestAllowedDate = new Date(`${maxDate}T00:00:00Z`);

  if (parsedDate > latestAllowedDate) {
    throw new Error(
      "A data selecionada deve ser anterior ou igual à data mais recente disponível.",
    );
  }

  return isoDate;
}

export function validateDateRange(startDate, endDate) {
  if (!startDate && !endDate) {
    return;
  }

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    throw new Error("A data inicial deve ser menor ou igual à data final.");
  }
}

export function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const value = new Date(
    dateString.includes("T") ? dateString : `${dateString}T00:00:00Z`,
  );

  if (Number.isNaN(value.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
    dateStyle: "short",
  }).format(value);
}

export function formatDayLabel(dateString) {
  if (!dateString) {
    return "Sem data";
  }

  const value = new Date(
    dateString.includes("T") ? dateString : `${dateString}T00:00:00Z`,
  );

  if (Number.isNaN(value.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(value);
}
