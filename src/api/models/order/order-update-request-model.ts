import { OrderItemCreateRequest } from "./order-item-create-request-model";

export interface OrderUpdateRequestModel {
  id: string;
  customerId: string;
  orderItems: OrderItemCreateRequest[];
}
