import { DependencyContainer } from 'tsyringe';
import BaseHttpClient from '@/core/services/BaseHttpClient.ts';
import AxiosClient from '@/core/services/AxiosClient.ts';

const httpClient: BaseHttpClient = new AxiosClient({
  getToken: () => Promise.resolve('fakewotoken'),
  timeout: 3000,
  baseUrl: 'https://jsonplaceholder.typicode.com',
});

const registerFn = (container: DependencyContainer) => {
  container
    .registerInstance(BaseHttpClient.InjectionToken, httpClient)
};

export default registerFn;
