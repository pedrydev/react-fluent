import AppError from "@/core/models/AppError.ts";

export default class ApiResponseModel<T> {
  data?: T;
  error?: AppError;
}
