export interface ProductCreateRequestModel {
  name: string;
  description: string;
  stock: number;
  price: number;
  image:string;
  categoryId: string;
}
