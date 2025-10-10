import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ id: 1, item: "Sneakers", price: 2999 }]);
});

export default router;
