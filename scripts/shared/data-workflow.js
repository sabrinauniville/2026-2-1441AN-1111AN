import { createPageStatus } from "./page-state.js";
import {
  hideInitialCard,
  setLoadingState,
  handleRequestError,
} from "./page-helpers.js";

export function createDataPageController({
  requestDataOutput,
  updateDataOutput,
  button,
  resultsList,
  initialCard,
  loggerLabel,
}) {
  const { updateStatus, clearErrorState } = createPageStatus({
    statusOutput: requestDataOutput,
    updateOutput: updateDataOutput,
  });

  return {
    updateStatus,
    clearErrorState,
    async runLoad({
      beforeRequest,
      loadData,
      renderResult,
      fallbackMessage,
      onFinally,
    }) {
      try {
        clearErrorState();
        updateStatus("");
        setLoadingState({ button, resultsList, isLoading: true });
        hideInitialCard({ initialCard, resultsList });

        if (beforeRequest) {
          beforeRequest();
        }

        const data = await loadData();
        renderResult(data);
      } catch (error) {
        handleRequestError({
          error,
          resultsList,
          initialCard,
          fallbackMessage,
          logger: loggerLabel,
        });
      } finally {
        setLoadingState({ button, resultsList, isLoading: false });

        if (onFinally) {
          onFinally();
        }
      }
    },
  };
}
