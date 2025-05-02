import axios from "axios";
import { ProductUpdateRequestModel } from "../../models/product/product-update-request-model";
import { OrderResponseModel } from "../../models/order/order-response-model";
import { OrderCreateRequestModel } from "../../models/order/order-create-request-model";

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

  public async Update(data: ProductUpdateRequestModel){
    return await axios.put("http://localhost:8080/api/v1/order",data);
  }

  public async Create(data: OrderCreateRequestModel){
    return await axios.post("http://localhost:8080/api/v1/order",data);
  }
}
