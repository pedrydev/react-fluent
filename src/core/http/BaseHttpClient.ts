export interface HttpOptions {
  url: string;
}

export interface HttpGetOptions extends HttpOptions {
  query?: { [key: string]: any };
}

export type HttpPostData = { [key: string]: string | number | boolean | Date | File | null};

export interface HttpPostOptions extends HttpOptions {
  data: HttpPostData;
}

export interface BaseHttpClientOptions {
  getToken: () => Promise<string>;
  timeout: number
  baseUrl: string;
}

abstract class BaseHttpClient {
  static readonly InjectionToken = 'BaseHttpClient'

  abstract delete(url: string): Promise<void>

  abstract get<T>({ query, url }: HttpGetOptions): Promise<T>

  abstract post<T>({ data, url }: HttpPostOptions): Promise<T>

  abstract put<T>({ data, url }: HttpPostOptions): Promise<T>

  protected createBody(data: HttpPostData) {
    if (!Object.keys(data).some(key => data[key] instanceof File))
      return JSON.stringify(data)

    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        if (data[key] instanceof File) {
          formData.append(key, data[key] as File);
        } else if (typeof  data[key] === 'number') {
          formData.append(key, (data[key] as number).toString());
        } else if (typeof  data[key] === 'boolean') {
          formData.append(key, (data[key] as boolean).toString());
        } else if (typeof  data[key] === 'string' && data[key] !== '') {
          formData.append(key, data[key] as string);
        } else if (typeof data[key] === "object") {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          throw new Error('Unsupported type: ' + typeof data[key])
        }
      }
    });
    return formData
  }
}

export default BaseHttpClient
