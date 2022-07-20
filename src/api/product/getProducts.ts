import { sendRawRequest } from "../request/axios";
import { Product } from "../utils/types/product.type";

interface Response<T> {
  data: T;
}

export async function getProducts() {
  return sendRawRequest<never, Response<Product[]>>("get", "/product/list");
}
