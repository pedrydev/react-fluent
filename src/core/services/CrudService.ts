import BaseHttpClient, { HttpPostData } from '@/core/http/BaseHttpClient.ts';

export default class CrudService<T> {
  protected baseUrl = ""; // Must be defined

  constructor(protected readonly http: BaseHttpClient) {
  }

  create<TPost extends HttpPostData>(data: TPost) {
    return this.http.post<T>({ data, url: this.baseUrl });
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAll(query: any) {
    return this.http.get({ query, url: `${this.baseUrl}` });
  }

  getByIds(ids: string[]) {
    const idsParam = ids.map(id => `id=${id}`).join("&");
    return this.http.get({ url: `${this.baseUrl}/ids/${idsParam}` });
  }

  getOne(id: string) {
    return this.http.get({ url: `${this.baseUrl}/${id}` });
  }

  update<TPut extends HttpPostData>(id: string, data: TPut) {
    return this.http.put({ data, url: `${this.baseUrl}/${id}` });
  }
}
