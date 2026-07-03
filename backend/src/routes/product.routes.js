const express = require("express");
const router = express.Router();
const createUploader = require("../middlewere/genericUpload");
const upload = createUploader("products");
const authenticateAdmin = require("../middlewares/auth.middleware");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", authenticateAdmin, upload.array("images", 6), createProduct);
router.put("/:id", authenticateAdmin, upload.array("images", 6), updateProduct);
router.delete("/:id", authenticateAdmin, deleteProduct);

module.exports = router;
