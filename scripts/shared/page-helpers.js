export function hideInitialCard({ initialCard, resultsList }) {
  if (initialCard) {
    initialCard.classList.add("hidden");
  }

  if (resultsList) {
    resultsList.classList.add("hidden");
    resultsList.innerHTML = "";
  }
}

export function showInitialCard({ initialCard, resultsList }) {
  if (initialCard) {
    initialCard.classList.add("hidden");
  }

  if (resultsList) {
    resultsList.classList.add("hidden");
  }
}

export function setLoadingState({ button, resultsList, isLoading }) {
  if (button) {
    button.disabled = isLoading;
    if (isLoading) {
      button.setAttribute("aria-busy", "true");
    } else {
      button.removeAttribute("aria-busy");
    }
  }

  if (resultsList) {
    resultsList.setAttribute("aria-busy", String(isLoading));
  }
}

export function enforceDateBounds({ input, minDateValue, maxDateValue }) {
  if (!input || !input.value) {
    return;
  }

  const inputDate = new Date(`${input.value}T00:00:00Z`);
  const minDate = new Date(`${minDateValue}T00:00:00Z`);
  const maxDate = new Date(`${maxDateValue}T00:00:00Z`);

  if (inputDate < minDate) {
    input.value = minDateValue;
    return;
  }

  if (inputDate > maxDate) {
    input.value = maxDateValue;
  }
}

export function handleRequestError({
  error,
  resultsList,
  initialCard,
  fallbackMessage,
  logger,
}) {
  if (resultsList) {
    resultsList.innerHTML = "";
    resultsList.classList.add("hidden");
  }

  if (initialCard) {
    initialCard.classList.add("hidden");
  }

  alert(error?.message || fallbackMessage);

  if (logger) {
    console.error(logger, error);
  }
}
