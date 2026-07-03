const express = require("express");
const router = express.Router();
const createUploader = require("../middlewere/genericUpload");
const upload = createUploader("products");
// authentication not required for public product endpoints

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", upload.array("images", 6), createProduct);
router.put("/:id", upload.array("images", 6), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
