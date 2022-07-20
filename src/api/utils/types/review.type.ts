export interface Review {
  id: number;
  authorName: string;
  img: string;
  text: string;
}

export interface ReviewCreateInput {
  authorName: string;
  img: string;
  text: string;
}
