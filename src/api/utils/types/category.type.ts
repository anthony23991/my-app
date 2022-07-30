import { Product } from "./product.type";

export interface Category {
  id: number;
  name: string;
  type: string;
  products: Product[];
}

export interface CategoryCreateInput {
  name: string;
  type: string;
  products: number[];
}

export interface CategoryUpdateInput {
  id: number;
  name: string;
  type: string;
  products: number[];
}
