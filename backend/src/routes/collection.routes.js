const express = require("express");
const router = express.Router();
const createUploader = require("../middlewere/genericUpload");
const upload = createUploader("collections");
const authenticateAdmin = require("../middlewares/auth.middleware");

const {
  createCollection,
  getCollections,
  getCollection,
  updateCollection,
  deleteCollection,
} = require("../controllers/collection.controller");

router.get("/", getCollections);
router.get("/:id", getCollection);
router.post("/", authenticateAdmin, upload.single("image"), createCollection);
router.put("/:id", authenticateAdmin, upload.single("image"), updateCollection);
router.delete("/:id", authenticateAdmin, deleteCollection);

module.exports = router;
