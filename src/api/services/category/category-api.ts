import axios from "axios";
import { CategoryResponseModel } from "../../models/category/category-response-model";
import { CategoryCreateRequestModel } from "../../models/category/category-create-request-model";
import { CategoryUpdateRequestModel } from "../../models/category/category-update-request-model";

export default class CategoryApi {
  public async GetAll(): Promise<CategoryResponseModel[]> {
    const response = await axios.get<CategoryResponseModel[]>(
      "http://localhost:8080/api/v1/category"
    );
    return response.data;
  }

  public async Delete(id: string) {
    return await axios.delete(`http://localhost:8080/api/v1/category/${id}`);
  }

  public async Create(data: CategoryCreateRequestModel) {
    return await axios.post("http://localhost:8080/api/v1/category", data);
  }

  public async Update(data: CategoryUpdateRequestModel) {
    return await axios.put("http://localhost:8080/api/v1/category", data);
  }
}
