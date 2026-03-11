// src/types/index.ts

export type User = {
  id: string;
  name: string;
  email: string;
  role: "producer" | "consumer";
  location: string;
  createdAt: Date;
};

export type ProducerProfile = {
  id: string;
  userId: string;
  farmName: string;
  farmLocation: string;
  phoneNumber: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  producerId: string;
  createdAt: Date;
};

export type Order = {
  id: string;
  consumerId: string;
  totalPrice: number;
  status: "pending" | "paid" | "shipped" | "delivered";
  createdAt: Date;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
};
