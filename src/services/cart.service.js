import { CartModel } from "../models/cart.model.js";

export const createCartService = async () => {
  return await CartModel.create({ products: [] });
};

export const getCartByIdService = async (cid) => {
  return await CartModel.findById(cid).populate("products.product");
};

export const addProductToCartService = async (cid, pid) => {
  const cart = await CartModel.findById(cid);
  if (!cart) return null;

  const productIndex = cart.products.findIndex(
    p => p.product.toString() === pid
  );

  if (productIndex !== -1) {
    cart.products[productIndex].quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  return await cart.save();
};

export const deleteProductFromCartService = async (cid, pid) => {
  const cart = await CartModel.findById(cid);
  if (!cart) return null;

  cart.products = cart.products.filter(
    p => p.product.toString() !== pid
  );

  return await cart.save();
};

export const updateCartService = async (cid, products) => {
  return await CartModel.findByIdAndUpdate(
    cid,
    { products },
    { new: true }
  );
};

export const updateProductQuantityService = async (cid, pid, quantity) => {
  const cart = await CartModel.findById(cid);
  if (!cart) return null;

  const product = cart.products.find(
    p => p.product.toString() === pid
  );

  if (!product) return null;

  product.quantity = quantity;
  return await cart.save();
};

export const clearCartService = async (cid) => {
  return await CartModel.findByIdAndUpdate(
    cid,
    { products: [] },
    { new: true }
  );
};
