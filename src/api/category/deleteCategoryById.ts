import { sendRawRequest } from "../request/axios";
import { Category } from "../utils/types/category.type";

interface Response<T> {
  data: T;
}

export async function deleteCategoryById(id: number) {
  return sendRawRequest<string, Response<Category>>(
    "post",
    `/category/delete/${id}`
  );
}
