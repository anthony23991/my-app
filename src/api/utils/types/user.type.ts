import { CartItem } from "./cartItem.type";
import { Order } from "./order.type";

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  connected: boolean;
  cart: CartItem[];
  history: Order[];
}

export interface UserCreateInput {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  // connected: boolean;
  // cart: CartItem[];
  // history: Order[];
}

export interface LoginInput {
  email: string;
  password: string;
}
