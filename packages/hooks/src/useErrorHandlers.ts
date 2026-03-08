type ErrorHandlerParams = {
  showToast: (msg: string) => void;
  setErrorMsg: (msg: string) => void;
  setCurrentState: (state: "FAILED" | string) => void;
  baseLogValues: Record<string, any>;
};

type ErrorParams = {
  action?: string;
  page?: string;
  toast?: boolean;
  code?: string;
  ex?: any;
  param?: Record<string, any>;
};

export function useErrorHandlers({
  showToast,
  setErrorMsg,
  setCurrentState,
  baseLogValues,
}: ErrorHandlerParams) {
  const errorNoConnection = ({
    action = "",
    page = "",
    toast = false,
    param = {},
  }: ErrorParams) => {
    if (toast) showToast("No internet connection");
    else {
      setErrorMsg("No internet connection");
      setCurrentState("FAILED");
    }
    console.error("No Connection", {
      action,
      page,
      ...baseLogValues,
      ...param,
    });
  };

  const errorFailed = ({
    action = "",
    page = "",
    toast = false,
    code = "",
    param = {},
  }: ErrorParams) => {
    if (toast) showToast("Request failed");
    else {
      setErrorMsg("Request failed");
      setCurrentState("FAILED");
    }
    console.error("Request Failed", {
      action,
      page,
      code,
      ...baseLogValues,
      ...param,
    });
  };

  const errorFailedException = ({
    action = "",
    page = "",
    toast = false,
    ex = {},
    param = {},
  }: ErrorParams) => {
    if (toast) showToast("Request failed");
    else {
      setErrorMsg("Request failed");
      setCurrentState("FAILED");
    }
    console.error("Request Exception", {
      action,
      page,
      ex,
      ...baseLogValues,
      ...param,
    });
  };

  return { errorNoConnection, errorFailed, errorFailedException };
}
