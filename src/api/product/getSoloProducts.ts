import { sendRawRequest } from "../request/axios";
import { Product } from "../utils/types/product.type";

interface Response<T> {
  data: T;
}

export async function getSoloProducts() {
  return sendRawRequest<never, Response<Product[]>>("get", "/product/soloList");
}
