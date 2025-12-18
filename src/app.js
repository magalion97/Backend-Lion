import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import dotenv from "dotenv";
import { Server } from "socket.io";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/ProductManager.js";
import { connectMongo } from "./config/mongo.js";

// ENV
dotenv.config();

// __dirname ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Mongo
connectMongo();

// 👉 UNA SOLA INSTANCIA
const productManager = new ProductManager("./data/products.json");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", viewsRouter);

// Root
app.get("/", (req, res) => {
  res.redirect("/products");
});

// ✅ SERVER ÚNICO
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});

// ✅ SOCKET.IO SOBRE EL MISMO SERVER
const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("🟢 Cliente conectado");

  socket.emit("products", await productManager.getProducts());

  socket.on("addProduct", async (product) => {
    await productManager.addProduct(product);
    io.emit("products", await productManager.getProducts());
  });

  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    io.emit("products", await productManager.getProducts());
  });
});
