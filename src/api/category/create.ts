import { sendRawRequest } from "../request/axios";
import { CategoryCreateInput } from "../utils/types/category.type";

export default async function createCategory(input: CategoryCreateInput) {
  try {
    await sendRawRequest<CategoryCreateInput, any>(
      "post",
      "/category/create",
      input
    );
    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
}
