import { Router } from "express";
import { getProductsService } from "../services/product.service.js";

const router = Router();

router.get("/", async (req, res) => {
  const result = await getProductsService(req.query);

  res.json({
    status: "success",
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage
      ? `/api/products?page=${result.prevPage}`
      : null,
    nextLink: result.hasNextPage
      ? `/api/products?page=${result.nextPage}`
      : null
  });
});

export default router;
