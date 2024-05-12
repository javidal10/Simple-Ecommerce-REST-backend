import express from "express";
import { register, logIn, changePwd } from "../controllers/auth.controller";
import { createProduct, getAllProducts, getProductById, updateProductById } from "../controllers/product.controller";
import { getCartByUserId, updateCartByUserId } from "../controllers/cart.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);
router.post("/change-password", changePwd);

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProductById);

router.get("/cart/:userId", getCartByUserId);
router.put("/cart/:userId", updateCartByUserId);

export default router;