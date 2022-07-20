import { CartItem } from "./cartItem.type";
import { User } from "./user.type";

export interface Order {
  id: number;
  user: User;
  date: Date;
  items: CartItem[];
  total: number;
}

export interface OrderCreateInput {
  user: User;
  date: Date;
  items: CartItem[];
  total: number;
}
