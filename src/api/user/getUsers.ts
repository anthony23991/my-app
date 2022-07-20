import { sendRawRequest } from "../request/axios";
import { User } from "../utils/types/user.type";

interface Response<T> {
  data: T;
}

export async function getUsers() {
  return sendRawRequest<never, Response<User[]>>("get", "/user/list");
}
