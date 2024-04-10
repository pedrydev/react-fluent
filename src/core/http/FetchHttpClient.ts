import { injectable } from 'tsyringe';
import qs from 'qs'
import BaseHttpClient, {
  BaseHttpClientOptions,
  HttpGetOptions,
  HttpPostOptions,
} from '@/core/http/BaseHttpClient.ts';
import ApiResponseModel from '../models/ApiResponseModel.ts';

export interface FetchHttpClientOptions extends BaseHttpClientOptions {
  headers?: HeadersInit
}

@injectable()
export default class FetchHttpClient extends BaseHttpClient {
    private readonly baseUrl: string;
    private readonly getToken: () => Promise<string>
    private readonly headers: HeadersInit;
    private readonly timeout: number

    constructor(options: FetchHttpClientOptions) {
      super();
      this.baseUrl = options.baseUrl
      this.getToken = options.getToken
      this.headers = options.headers ?? {}
      this.timeout = options.timeout
    }

    delete(url: string) {
      return this.send<void>(url, {
        method: 'DELETE'
      })
    }

    get<T>({ query, url }: HttpGetOptions) {
      const querystring = qs.stringify(query, { arrayFormat: 'repeat', skipNulls: true })
      return this.send<T>(`${url}?${querystring}`, {
        method: 'GET'
      })
    }

    post<T>({ data, url }: HttpPostOptions) {
      return this.send<T>(url, {
        body: this.createBody(data),
        method: 'POST'
      })
    }

     put<T>({ data, url }: HttpPostOptions) {
      return this.send<T>(url, {
        body: this.createBody(data),
        method: 'PUT'
      })
    }

    private async send<T>(url: string, init: Partial<RequestInit>): Promise<T> {
      const finalUrl = `${this.baseUrl}/${url}`
      const token = await this.getToken()
      try {
        const response = await fetch(finalUrl, {
          ...init,
          cache: 'no-cache',
          headers: {
            ...this.headers,
            authorization: `Bearer ${token}`
          },
          signal: AbortSignal.timeout(this.timeout)
        })
          .then(res => res.json() as ApiResponseModel<T>)
          .catch(res => { throw res.error })
        return response.data as T
      } catch (err) {
        const errorCode = err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : 'ERRORS.UNKNOWN'
        return Promise.reject({ error: errorCode })
      }
    }
}