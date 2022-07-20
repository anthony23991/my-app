import { sendRawRequest } from "../request/axios";
import { User } from "../utils/types/user.type";

interface Response<T> {
  data: T;
}

export async function getUserById(id: number) {
  return sendRawRequest<string, Response<User>>("get", `/user/get/${id}`);
}
