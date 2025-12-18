import { Router } from "express";
import {
  createCartService,
  getCartByIdService,
  addProductToCartService,
  deleteProductFromCartService,
  updateCartService,
  updateProductQuantityService,
  clearCartService
} from "../services/cart.service.js";

const router = Router();

// Crear carrito
router.post("/", async (req, res) => {
  const cart = await createCartService();
  res.json({ status: "success", payload: cart });
});

// Obtener carrito con populate
router.get("/:cid", async (req, res) => {
  const cart = await getCartByIdService(req.params.cid);
  res.json({ status: "success", payload: cart });
});

// Agregar producto
router.post("/:cid/products/:pid", async (req, res) => {
  const cart = await addProductToCartService(
    req.params.cid,
    req.params.pid
  );
  res.json({ status: "success", payload: cart });
});

// ❌ ELIMINAR PRODUCTO
router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await deleteProductFromCartService(
    req.params.cid,
    req.params.pid
  );
  res.json({ status: "success", payload: cart });
});

// 🔁 ACTUALIZAR TODO EL CARRITO
router.put("/:cid", async (req, res) => {
  const cart = await updateCartService(
    req.params.cid,
    req.body.products
  );
  res.json({ status: "success", payload: cart });
});

// 🔢 ACTUALIZAR CANTIDAD
router.put("/:cid/products/:pid", async (req, res) => {
  const cart = await updateProductQuantityService(
    req.params.cid,
    req.params.pid,
    req.body.quantity
  );
  res.json({ status: "success", payload: cart });
});

// 🧹 VACIAR CARRITO
router.delete("/:cid", async (req, res) => {
  const cart = await clearCartService(req.params.cid);
  res.json({ status: "success", payload: cart });
});

export default router;
