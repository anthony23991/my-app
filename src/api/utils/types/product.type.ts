import { Category } from "./category.type";

export interface Product {
  id: number;
  brand: string;
  name: string;
  img: string;
  imgRef: string;
  price: number;
  description: string;
  Category?: Category;
}

export interface ProductCreateInput {
  brand: string;
  name: string;
  img: string;
  imgRef: string;
  price: number;
  description: string;
  categoryId?: number;
}

export interface ProductUpdateInput {
  id: number;
  brand: string;
  name: string;
  img: string;
  imgRef: string;
  price: number;
  description: string;
  categoryId?: number;
}
