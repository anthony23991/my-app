import { sendRawRequest } from "../request/axios";
import { LoginInput, User } from "../utils/types/user.type";

interface Response<T> {
  data: T;
}

export default async function login(input: LoginInput) {
  return await sendRawRequest<LoginInput, Response<User> | any>(
    "post",
    "/user/login",
    input
  );
}
