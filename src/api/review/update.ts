import { sendRawRequest } from "../request/axios";
import { Review } from "../utils/types/review.type";

export default async function updateReview(input: Review) {
  try {
    await sendRawRequest<Review, any>("put", "/review/update", input);
    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
}
