import axios, { AxiosInstance, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import qs from 'qs'
import { Lifecycle, scoped } from "tsyringe";
import ApiResponseModel from '@/core/models/ApiResponseModel.ts';
import BaseHttpClient, {
  BaseHttpClientOptions,
  HttpGetOptions,
  HttpPostOptions,
} from '@/core/http/BaseHttpClient.ts';

export interface AxiosClientOptions extends Omit<BaseHttpClientOptions, 'getToken'> {
  headers?: CreateAxiosDefaults['headers'];
}

@scoped(Lifecycle.ContainerScoped)
export default class AxiosClient extends BaseHttpClient {
  private readonly axios: AxiosInstance;

  constructor({ headers = {}, timeout, baseUrl }: AxiosClientOptions) {
    super()
    this.axios = axios.create({
      baseURL: baseUrl,
      headers,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
      responseType: 'json',
      timeout
    })
  }

  addRequestInterceptor(interceptor: (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>) {
    this.axios.interceptors.request.use(interceptor)
  }

  addResponseInterceptor(interceptor: (value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) {
    this.axios.interceptors.response.use(interceptor)
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
