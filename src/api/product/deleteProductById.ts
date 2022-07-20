import { sendRawRequest } from "../request/axios";
import { Product } from "../utils/types/product.type";

interface Response<T> {
  data: T;
}

export async function deleteProductById(id: number) {
  return sendRawRequest<string, Response<Product>>(
    "post",
    `/product/delete/${id}`
  );
}
