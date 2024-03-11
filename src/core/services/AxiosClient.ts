import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import qs from 'qs'
import { Lifecycle, scoped } from "tsyringe";
import ApiResponseModel from '@/core/models/ApiResponseModel.ts';
import BaseHttpClient, {
  BaseHttpClientOptions,
  HttpGetOptions,
  HttpPostOptions,
} from '@/core/services/BaseHttpClient.ts';

export interface AxiosClientOptions extends BaseHttpClientOptions {
  headers?: CreateAxiosDefaults['headers'];
}

@scoped(Lifecycle.ContainerScoped)
export default class AxiosClient extends BaseHttpClient {
  private readonly axios: AxiosInstance;

  constructor({ getToken, headers = {}, timeout, baseUrl }: AxiosClientOptions) {
    super()
    this.axios = axios.create({
      baseURL: baseUrl,
      headers,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
      responseType: 'json',
      timeout
    })
    this.axios.interceptors.request.use(async config => {
      config.headers.set('Authorization', await getToken())
      return config
    })
  }

  async delete(url: string) {
    const response = await this.axios.delete<ApiResponseModel<unknown>>(url)
    if (response.status >= 400)
      throw response.data.error
  }

  async get<T>({ query, url }: HttpGetOptions) {
    const response = await this.axios.get<ApiResponseModel<T>>(url, { params: query })
    if (response.status >= 400)
      throw response.data.error
    return response.data.data as T
  }

  async post<T>({ data, url }: HttpPostOptions) {
    const body = this.createBody(data)
    const response = await this.axios.post<ApiResponseModel<T>>(url, body)
    if (response.status >= 400)
      throw response.data.error
    return response.data.data as T
  }

  async put<T>({ data, url }: HttpPostOptions) {
    const body = this.createBody(data)
    const response = await this.axios.put<ApiResponseModel<T>>(url, body)
    if (response.status >= 400)
      throw response.data.error
    return response.data.data as T
  }
}
