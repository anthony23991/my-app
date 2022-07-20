import { sendRawRequest } from "../request/axios";
import { Category } from "../utils/types/category.type";

interface Response<T> {
  data: T;
}

export async function getCategories() {
  return sendRawRequest<never, Response<Category[]>>("get", "/category/list");
}
