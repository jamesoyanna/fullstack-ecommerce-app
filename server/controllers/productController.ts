import asyncHandler from "express-async-handler";
import products from "../data/products";
import {Product}  from "../models";
import { Response, Request } from "../types/express";

/**
 * Fetch all products
 * @route GET /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    // Get search keyword from request and search for partial match
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          } as any,
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  });

  /**
   * Create a new product
   * @route POST /api/products
   * @access Private/Admin
   */

  const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = new Product({
      name: "Sample Name",
      price: 0,
      user: req.user?._id,
      image: "/images/sample.jpg",
      brand: "Sample Brand",
      category: "Sample Category",
      countInStock: 0,
      numReviews: 0,
      description: "Same Description",
    });

const createdProduct = await product.save();
    res.status(201).json(product);
});

export {
    createProduct,
};