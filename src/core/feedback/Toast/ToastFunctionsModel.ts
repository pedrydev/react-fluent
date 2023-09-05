import { ToastIntent } from "@fluentui/react-components";

export default interface ToastFunctions {
  close: () => void;
  open: (content: string, intent: ToastIntent) => void;
}
