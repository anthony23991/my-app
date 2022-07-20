import { sendRawRequest } from "../request/axios";
import { Order } from "../utils/types/order.type";

interface Response<T> {
  data: T;
}

export async function getOrderById(id: number) {
  return sendRawRequest<string, Response<Order>>("get", `/order/get/${id}`);
}
