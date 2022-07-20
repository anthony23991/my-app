import { Product } from "./product.type";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
