import { createContext } from "react";
import ToastFunctions from "@/core/feedback/Toast/ToastFunctionsModel.ts";

const ToastFunctionsContext = createContext<ToastFunctions>(null!);

export default ToastFunctionsContext;
