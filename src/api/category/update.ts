import { sendRawRequest } from "../request/axios";
import { Category, CategoryUpdateInput } from "../utils/types/category.type";

export default async function updateCategory(input: CategoryUpdateInput) {
  try {
    await sendRawRequest<CategoryUpdateInput, any>(
      "put",
      "/category/update",
      input
    );
    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
}
