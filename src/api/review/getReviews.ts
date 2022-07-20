import { sendRawRequest } from "../request/axios";
import { Review } from "../utils/types/review.type";

interface Response<T> {
  data: T;
}

export async function getReviews() {
  return sendRawRequest<never, Response<Review[]>>("get", "/review/list");
}
