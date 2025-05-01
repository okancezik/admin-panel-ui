import { ProductResponseModel } from "../product/product-response-model";

export interface CategoryResponseModel{
    id:string,
    name:string,
    description:string,
    productList: ProductResponseModel[]
}