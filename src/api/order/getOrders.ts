import { sendRawRequest } from "../request/axios";
import { Order } from "../utils/types/order.type";

interface Response<T> {
  data: T;
}

export async function getOrders() {
  return sendRawRequest<never, Response<Order[]>>("get", "/order/list");
}
