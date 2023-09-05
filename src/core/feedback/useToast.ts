import { useContext } from "react";
import ToastFunctionsContext from "@/core/feedback/ToastFunctionsContex.ts";

export default function useToast() {
  return useContext(ToastFunctionsContext);
}
