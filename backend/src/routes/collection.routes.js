const express = require("express");
const router = express.Router();
const createUploader = require("../middlewere/genericUpload");
const upload = createUploader("collections");
// authentication not required for public collection endpoints

const {
  createCollection,
  getCollections,
  getCollection,
  updateCollection,
  deleteCollection,
} = require("../controllers/collection.controller");

router.get("/", getCollections);
router.get("/:id", getCollection);
router.post("/", upload.single("image"), createCollection);
router.put("/:id", upload.single("image"), updateCollection);
router.delete("/:id", deleteCollection);

module.exports = router;
