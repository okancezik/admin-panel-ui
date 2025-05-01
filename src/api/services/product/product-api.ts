import axios from "axios";
import { ProductResponseModel } from "../../models/product/product-response-model";
import { ProductUpdateRequestModel } from "../../models/product/product-update-request-model";
import { ProductCreateRequestModel } from "../../models/product/product-create-request-model";

export default class ProductApi {
  public async GetAll(): Promise<ProductResponseModel[]> {
    const response = await axios.get<ProductResponseModel[]>(
      "http://localhost:8080/api/v1/product"
    );
    return response.data;
  }

  public async Delete(id:string) {
    return await axios.delete<ProductResponseModel[]>(
      `http://localhost:8080/api/v1/product/${id}`
    );
  }

  public async Update(data: ProductUpdateRequestModel){
    return await axios.put("http://localhost:8080/api/v1/product",data);
  }

  public async Create(data: ProductCreateRequestModel){
    return await axios.post("http://localhost:8080/api/v1/product",data);
  }
}
