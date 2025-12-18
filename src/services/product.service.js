import { ProductModel } from "../models/product.model.js";

export const getProductsService = async (queryParams) => {
  const {
    limit = 10,
    page = 1,
    sort,
    query
  } = queryParams;

  const filter = query
    ? { category: query }
    : {};

  const options = {
    page,
    limit,
    lean: true,
    sort: sort
      ? { price: sort === "asc" ? 1 : -1 }
      : undefined
  };

  return await ProductModel.paginate(filter, options);
};

export const getProductByIdService = async (pid) => {
  return await ProductModel.findById(pid).lean();
};
