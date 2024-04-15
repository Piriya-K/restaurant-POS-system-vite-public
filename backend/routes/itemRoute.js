import express from "express";
import createItem from "../operations/item/createItem.js";
import getAllItems from "../operations/item/getAllItems.js";
import getItemById from "../operations/item/getItemById.js";
import updateItem from "../operations/item/updateItem.js";
import deleteItemById from "../operations/item/deleteItemById.js";

const router = express.Router();

//Route to save an item
router.post("/", createItem);

//Route to get all items
router.get("/", getAllItems);

//Route to get a single item by item id
router.get("/:id", getItemById);

//Route to update an item
router.put("/:id", updateItem);

//Route to delete an item by id
router.delete("/:id", deleteItemById);

export default router;

// //Route to save an item
// app.post("/items", createItem);

// //Route to get all items
// app.get("/items", getAllItems);

// //Route to get a single item by item id
// app.get("/items/:id", getItemById);

// //Route to update an item
// app.put("/items/:id", updateItem);

// //Route to delete an item by id
// app.delete("/items/:id", deleteItemById);
