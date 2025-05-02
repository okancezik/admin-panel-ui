import axios from "axios";
import { OrderResponseModel } from "../../models/order/order-response-model";
import { OrderCreateRequestModel } from "../../models/order/order-create-request-model";
import { OrderUpdateRequestModel } from "../../models/order/order-update-request-model";

export default class OrderApi {
  public async GetAll(): Promise<OrderResponseModel[]> {
    const response = await axios.get<OrderResponseModel[]>(
      "http://localhost:8080/api/v1/order"
    );
    return response.data;
  }

  public async Delete(id:string) {
    return await axios.delete<OrderResponseModel[]>(
      `http://localhost:8080/api/v1/order/${id}`
    );
  }

  public async Update(data: OrderUpdateRequestModel){
    return await axios.put("http://localhost:8080/api/v1/order",data);
  }

  public async Create(data: OrderCreateRequestModel){
    return await axios.post("http://localhost:8080/api/v1/order",data);
  }
}
