import ApiResponseModel from "@/core/models/ApiResponseModel.ts";
import PaginatedResponseModel from "@/core/models/PaginatedResponseModel.ts";
import HttpClient from "@/core/services/HttpClient.ts";

export default class CrudService<TModel, TCreationModel> {
  protected baseUrl = ""; // Must be defined

  constructor(protected readonly http: HttpClient) {
  }

  create(data: TCreationModel): Promise<ApiResponseModel<unknown>> {
    return this.http.post({ data, url: this.baseUrl });
  }

  delete(id: string): Promise<ApiResponseModel<unknown>> {
    return this.http.delete({ url: `${this.baseUrl}/${id}` });
  }

  getAll(query: any): Promise<PaginatedResponseModel<TModel>> {
    return this.http.get({ query, url: `${this.baseUrl}` });
  }

  getByIds(ids: string[]): Promise<ApiResponseModel<TModel[]>> {
    const idsParam = ids.map(id => `id=${id}`).join("&");
    return this.http.get({ url: `${this.baseUrl}/ids/${idsParam}` });
  }

  getOne(id: string): Promise<ApiResponseModel<TModel>> {
    return this.http.get({ url: `${this.baseUrl}/${id}` });
  }

  update(id: string, data: TCreationModel): Promise<ApiResponseModel<unknown>> {
    return this.http.put({ data, url: `${this.baseUrl}/${id}` });
  }
}
