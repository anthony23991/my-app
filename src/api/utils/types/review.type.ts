export interface Review {
  id: number;
  authorName: string;
  img: string;
  imgRef: string;
  text: string;
}

export interface ReviewCreateInput {
  authorName: string;
  img: string;
  imgRef: string;
  text: string;
}
