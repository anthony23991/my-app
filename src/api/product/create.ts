import { sendRawRequest } from "../request/axios";
import { ProductCreateInput } from "../utils/types/product.type";

export default async function createProduct(input: ProductCreateInput) {
  try {
    await sendRawRequest<ProductCreateInput, any>(
      "post",
      "/product/create",
      input
    );
    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
}
