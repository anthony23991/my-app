import { CartItem } from "./cartItem.type";
import { User } from "./user.types";

export interface Order {
  id: number;
  user: User;
  date: Date;
  items: CartItem[];
  total: number;
}
