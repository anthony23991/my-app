import { sendRawRequest } from "../request/axios";
import { ReviewCreateInput } from "../utils/types/review.type";

export default async function createReview(input: ReviewCreateInput) {
  try {
    await sendRawRequest<ReviewCreateInput, any>(
      "post",
      "/review/create",
      input
    );
    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
}
