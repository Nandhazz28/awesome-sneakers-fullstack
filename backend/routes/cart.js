import express from "express";
import jwt from "jsonwebtoken";
import Cart from "../models/Cart.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.get("/", authMiddleware, async (req, res) => {
  let cart = await Cart.findOne({ user: req.userId });
  if (!cart) cart = new Cart({ user: req.userId, items: [] });
  res.json(cart);
});

router.post("/add", authMiddleware, async (req, res) => {
  const { productId, name, price, quantity, image } = req.body;
  let cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    cart = new Cart({ user: req.userId, items: [] });
  }

  const itemIndex = cart.items.findIndex((i) => i.productId === productId);
  if (itemIndex >= 0) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, quantity, image });
  }

  await cart.save();
  res.json(cart);
});

router.put("/update", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ user: req.userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((i) => i.productId === productId);
  if (item) item.quantity = quantity;

  await cart.save();
  res.json(cart);
});

router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((i) => i.productId !== productId);
  await cart.save();
  res.json(cart);
});

export default router;
