import axios from "axios";
import { ProductResponseModel } from "../../models/product/product-response-model";
import { CustomerResponseModel } from "../../models/customer/customer-response-model";
import { CustomerCreateRequestModel } from "../../models/customer/customer-create-request-model";

export default class CustomerApi {
  public async GetAll(): Promise<CustomerResponseModel[]> {
    const response = await axios.get<CustomerResponseModel[]>(
      "http://localhost:8080/api/v1/customer"
    );
    return response.data;
  }

  public async Delete(id:string) {
    return await axios.delete<ProductResponseModel[]>(
      `http://localhost:8080/api/v1/customer/${id}`
    );
  }

  public async Update(data: CustomerUpdateRequestModel){
    return await axios.put("http://localhost:8080/api/v1/customer",data);
  }

  public async Create(data: CustomerCreateRequestModel){
    return await axios.post("http://localhost:8080/api/v1/customer",data);
  }
}
