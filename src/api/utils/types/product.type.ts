import { Category } from "./category.type";

export interface Product {
  id: number;
  brand: string;
  name: string;
  img: string;
  price: number;
  description: string;
  category?: Category;
}

export interface ProductCreateInput {
  brand: string;
  name: string;
  img: string;
  price: number;
  description: string;
  categoryId?: number;
}
