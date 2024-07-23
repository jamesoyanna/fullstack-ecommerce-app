import exp from "constants";
import { Model, Document } from "mongoose";

/**
 * Represents a user
 */
export interface Product {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  
}


export interface Reviews {
    user: string;
    name: string;
    rating: number;
    comment: string;
}
export interface ProductInDatabase extends Product{
    user:string;
    reviews: Reviews[];
}

export interface ProductDocument extends ProductInDatabase, Document{};

export interface ProductModel extends Model<ProductDocument>{};