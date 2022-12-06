import express from "express";
import {
  getShoppingList,
  postListItem,
  clearList,
  markItem,
} from "../models/shoppingList.js";

const router = express.Router();

/* GET shopping list. */
router.get("/", async (req, res) => {
  const data = await getShoppingList();
  res.json({ success: true, payload: data });
});

router.post("/", async (req, res) => {
  const { listItem } = req.body;
  const result = await postListItem(listItem);
  res.status(201).json({ success: true, payload: result });
});

router.delete("/", async (req, res) => {
  await clearList();
  res.json({ success: true });
});

router.patch("/:id", async (req, res) => {
  const result = await markItem(req.params.id, req.body);
  res.json({ success: true, payload: result });
});

export default router;
