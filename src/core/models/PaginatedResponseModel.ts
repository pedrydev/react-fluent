import ApiResponseModel from "@/core/models/ApiResponseModel.ts";
import PaginatedModel from "@/core/models/PaginatedModel.ts";

export default class PaginatedResponseModel<T> extends ApiResponseModel<PaginatedModel<T>> {
}
