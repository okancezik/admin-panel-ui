import axios from "axios";
import { CategoryResponseModel } from "../../models/category/category-response-model";

export default class CategoryApi {
  public async GetAll(): Promise<CategoryResponseModel[]> {
    const response = await axios.get<CategoryResponseModel[]>(
      "http://localhost:8080/api/v1/category"
    );
    return response.data;
  }
}
