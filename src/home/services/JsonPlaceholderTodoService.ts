import CrudService from "@/core/services/CrudService.ts";
import TodoModel from "@/modules/home/models/TodoModel.ts";
import { inject, injectable } from "tsyringe";
import HttpClient from "@/core/services/HttpClient.ts";

@injectable()
export default class JsonPlaceholderTodoService extends CrudService<TodoModel, unknown> {
  baseUrl = "todos";

  constructor(@inject(HttpClient) http: HttpClient) {
    super(http);
  }
}
