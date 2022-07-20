import { sendRawRequest } from "../request/axios";
import { Product } from "../utils/types/product.type";

interface Response<T> {
  data: T;
}

export async function getProductById(id: number) {
  return sendRawRequest<string, Response<Product>>("get", `/review/get/${id}`);
}
