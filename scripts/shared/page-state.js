export function createPageStatus({ statusOutput, updateOutput }) {
  function updateStatus(message) {
    statusOutput.textContent = message;
  }

  function setErrorState() {
    statusOutput.classList.add("status-error");
    updateOutput.classList.add("status-error");
  }

  function clearErrorState() {
    statusOutput.classList.remove("status-error");
    updateOutput.classList.remove("status-error");
  }

  return { updateStatus, setErrorState, clearErrorState };
}
