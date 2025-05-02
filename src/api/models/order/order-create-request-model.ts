import { OrderItemCreateRequest } from "./order-item-create-request-model";

export interface OrderCreateRequestModel {
  customerId: string;
  orderItems: OrderItemCreateRequest[];
}
