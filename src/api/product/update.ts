import { sendRawRequest } from "../request/axios";
import { ProductUpdateInput } from "../utils/types/product.type";

export default async function updateProduct(input: ProductUpdateInput) {
  let productInput: ProductUpdateInput;
  if (input.categoryId == 0) {
    productInput = {
      id: input.id,
      brand: input.brand,
      name: input.name,
      img: input.img,
      imgRef: input.imgRef,
      price: input.price,
      description: input.description,
    };
  } else {
    productInput = input;
  }
  try {
    await sendRawRequest<ProductUpdateInput, any>(
      "put",
      "/product/update",
      productInput
    );
    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
}
