import { useContext } from "react";
import ToastFunctionsContext from "@/core/feedback/Toast/ToastFunctionsContex.ts";

export default function useToast() {
  return useContext(ToastFunctionsContext);
}
