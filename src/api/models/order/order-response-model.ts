import { OrderItemResponse } from "./order-item-response-model";

export interface OrderResponseModel {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItemResponse[];
  totalAmount: number;
}
