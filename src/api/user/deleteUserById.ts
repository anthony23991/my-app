import { sendRawRequest } from "../request/axios";
import { User } from "../utils/types/user.type";

interface Response<T> {
  data: T;
}

export async function deleteUserById(id: number) {
  return sendRawRequest<string, Response<User>>("post", `/user/delete/${id}`);
}
