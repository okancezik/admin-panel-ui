import { ProductResponseModel } from "../product/product-response-model";

export interface CategoryResponseModel{
    id:string,
    name:string,
    description:string,
    image:string,
    productList: ProductResponseModel[]
}