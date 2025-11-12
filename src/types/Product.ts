export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  image: string;
  rating: Rating;
}


export interface Rating {
    rate: number;
    count: number;
}