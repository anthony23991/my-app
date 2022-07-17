export interface Product {
  id: number;
  brand: string;
  name: string;
  img: string;
  price: number;
  description: string;
  category?: Category;
}

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

export interface PageProp {
  withHeaderFooter: boolean;
}

export interface Review {
  authorName: string;
  img: string;
  text: string;
}

export interface Category {
  id: number;
  name: string;
  type: string;
  products: Product[];
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  user: User;
  date: Date;
  items: CartItem[];
  total: number;
}
