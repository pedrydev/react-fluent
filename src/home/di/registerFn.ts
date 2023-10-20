import { DependencyContainer } from 'tsyringe';
import HttpClient from '@/core/services/HttpClient.ts';
import JsonPlaceholderTodoService from '@/home/services/JsonPlaceholderTodoService.ts';

const httpClient = new HttpClient({
  url: 'https://jsonplaceholder.typicode.com',
});

const registerFn = (container: DependencyContainer) => {
  container
    .registerInstance<HttpClient>(HttpClient, httpClient)
    .registerSingleton<JsonPlaceholderTodoService>(JsonPlaceholderTodoService);
};

export default registerFn;
