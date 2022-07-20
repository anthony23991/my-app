import { sendRawRequest } from "../request/axios";
import { UserCreateInput } from "../utils/types/user.type";

export default async function createUser(input: UserCreateInput) {
  try {
    await sendRawRequest<UserCreateInput, any>("post", "/user/create", input);
    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
}
