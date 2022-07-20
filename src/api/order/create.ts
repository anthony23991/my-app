import { sendRawRequest } from "../request/axios";
import { OrderCreateInput } from "../utils/types/order.type";

export default async function createOrder(input: OrderCreateInput) {
  try {
    await sendRawRequest<OrderCreateInput, any>("post", "/order/create", input);
    return { success: true };
  } catch (error: unknown) {
    return { success: false };
  }
}
