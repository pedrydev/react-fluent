import { Lifecycle, scoped } from "tsyringe";

type ResponseType = "blob" | "json" | "text";

interface FetchOptions {
  init: Pick<RequestInit, "body" | "headers" | "method">;
  responseType?: ResponseType;
  url: string;
}

export interface HttpClientOptions {
  getToken?: () => Promise<string>;
  headers?: HeadersInit;
  url: string;
}

export interface HttpOptions {
  headers?: HeadersInit;
  responseType?: ResponseType;
  url: string;
}

export interface HttpGetOptions extends HttpOptions {
  query?: { [key: string]: any };
}

export type HttpPostData = Record<string, any>;

export interface HttpPostOptions extends HttpOptions {
  data: HttpPostData;
}

function assignObjectValues(path: string[], object: any, params: URLSearchParams) {
  Object.keys(object).forEach(key => {
    if (typeof object[key] === "object") assignObjectValues(path.concat(key), object[key], params);
    else if (object[key] !== "") params.append(path.join(".").concat("." + key), object[key]);
  });
}

@scoped(Lifecycle.ContainerScoped)
export default class HttpClient {
  private readonly headers: HeadersInit;
  private readonly getToken: (() => Promise<string>) | undefined;
  private readonly url: string;

  constructor({ getToken, headers = {}, url }: HttpClientOptions) {
    this.getToken = getToken;
    this.headers = headers;
    this.url = url;
  }

  async delete({ headers, responseType, url }: HttpOptions) {
    return this.fetch({
      init: {
        headers,
        method: "DELETE"
      },
      responseType,
      url
    });
  }

  async get({ headers = {}, responseType = "json", query, url }: HttpGetOptions) {
    let finalUrl = url;
    if (query !== undefined) {
      const params = new URLSearchParams();
      Object.keys(query).forEach(key => {
        if (query[key] !== undefined) {
          if (Array.isArray(query[key])) {
            (query[key] as any[]).forEach(item => params.append(key, item));
          } else if (typeof query[key] === "object") {
            assignObjectValues([key], query[key], params);
          } else {
            // @ts-ignore
            params.append(key, query[key]);
          }
        }
      });
      finalUrl += `?${params.toString()}`;
    }

    return this.fetch({
      init: {
        headers,
        method: "GET"
      },
      responseType,
      url: finalUrl
    });
  }

  async post({ data, headers = {}, responseType, url }: HttpPostData) {
    return this.postOrPut({ data, headers, responseType, url }, "POST");
  }

  async put({ data, headers = {}, responseType, url }: HttpPostData) {
    return this.postOrPut({ data, headers, responseType, url }, "PUT");
  }

  private async postOrPut(
    { data, headers = {}, responseType, url }: HttpPostOptions,
    method: "POST" | "PUT"
  ) {
    let body: FormData | string;
    let reqHeaders = Object.assign(this.headers, headers);

    if (!Object.keys(data).some(key => data[key] instanceof File)) {
      body = JSON.stringify(data);
      reqHeaders = {
        ...reqHeaders,
        "Content-Type": "application/json; charset=UTF-8"
      };
    } else {
      body = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          if (data[key] instanceof File) {
            (body as FormData).append(key, data[key]);
          } else if (typeof data[key] === "object") {
            (body as FormData).append(key, JSON.stringify(data[key]));
          } else {
            (body as FormData).append(key, data[key]);
          }
        }
      });
    }

    return this.fetch({
      init: {
        body,
        headers: reqHeaders,
        method
      },
      responseType,
      url
    });
  }

  private async fetch({ init, responseType, url }: FetchOptions) {
    let data = null;
    const { headers = {}, ...reqInit } = init;
    const response = await fetch(`${this.url}/${url}`, {
      cache: "no-cache", // Caching is done by @tanstack/react-query
      headers: Object.assign(this.headers, headers, {
        authorization: this.getToken ? "Bearer " + (await this.getToken()) : ""
      }),
      ...reqInit
    });
    if (response.ok) {
      if (responseType === "blob") data = await response.blob();
      if (responseType === "json") data = await response.json();
      if (responseType === "text") data = await response.text();
      return data;
    } else {
      const error = await response.json();
      throw error;
    }
  }
}
