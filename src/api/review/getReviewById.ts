import { sendRawRequest } from "../request/axios";
import { Review } from "../utils/types/review.type";

interface Response<T> {
  data: T;
}

export async function getReviewById(id: number) {
  return sendRawRequest<string, Response<Review>>("get", `/review/get/${id}`);
}
