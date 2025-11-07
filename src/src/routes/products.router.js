import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

// GET /api/products
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET /api/products/:pid
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(pid);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

// POST /api/products
router.post("/", async (req, res) => {
  const newProduct = req.body;
  const product = await productManager.addProduct(newProduct);
  res.status(201).json(product);
});

// PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updates = req.body;
  const updatedProduct = await productManager.updateProduct(pid, updates);
  if (!updatedProduct) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(updatedProduct);
});

// DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const result = await productManager.deleteProduct(pid);
  if (!result) return res.status(404).json({ error: "Producto no encontrado" });
  res.json({ message: "Producto eliminado correctamente" });
});

export default router;
