import {
  Button,
  Spinner,
  Toast,
  Toaster,
  ToastIntent,
  ToastTitle,
  ToastTrigger,
  useId,
  useToastController
} from "@fluentui/react-components";
import { Dismiss20Regular } from "@fluentui/react-icons";
import { createContext, PropsWithChildren, useContext } from "react";

export interface ToastFunctions {
  close: () => void;
  open: (content: string, intent: ToastIntent) => void;
}

const ToastFunctionsContext = createContext<ToastFunctions>(null!);

const TOAST_LIMIT = 1;

export function ToastProvider({ children }: PropsWithChildren) {
  const toastId = useId();
  const toasterId = useId();
  const { dispatchToast, dismissAllToasts } = useToastController(toasterId);
  const functions: ToastFunctions = {
    close: () => {
      dismissAllToasts();
    },
    open: (content, intent) => {
      dismissAllToasts();
      dispatchToast(
        <Toast>
          <ToastTitle
            action={intent === "info" ? <Spinner size="tiny" /> : (
              <ToastTrigger>
                <Button appearance="transparent" shape="circular" size="small" icon={<Dismiss20Regular />} />
              </ToastTrigger>
            )}
          >
            {content}
          </ToastTitle>
        </Toast>,
        { intent, timeout: intent === "info" ? Number.MAX_VALUE : 3000 });
    }
  };

  return (
    <ToastFunctionsContext.Provider value={functions}>
      {children}
      <Toaster id={toastId} toasterId={toasterId} limit={TOAST_LIMIT} />
    </ToastFunctionsContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastFunctionsContext);
}
