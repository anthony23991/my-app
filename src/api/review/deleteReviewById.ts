import { sendRawRequest } from "../request/axios";
import { Review } from "../utils/types/review.type";

interface Response<T> {
  data: T;
}

export async function deleteReviewById(id: number) {
  return sendRawRequest<string, Response<Review>>(
    "post",
    `/review/delete/${id}`
  );
}
