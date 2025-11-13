import type { CartItem } from "./Cart";

export interface Order {
  id: string; 
  userId: string;
  userName: string;

  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };

  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date; 
  updatedAt: Date;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderSummary {
  orderId: string;
  date: Date;
  totalAmount: number;
  status: OrderStatus;
  itemCount: number;
}
