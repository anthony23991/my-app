import { sendRawRequest } from "../request/axios";
import { User } from "../utils/types/user.type";

export default async function UpdateUser(input: User) {
  try {
    await sendRawRequest<User, any>("post", "/user/update", input);
    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
}
