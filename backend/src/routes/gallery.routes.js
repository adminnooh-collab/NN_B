const express = require("express");
const router = express.Router();
const createUploader = require("../middlewere/genericUpload");
const upload = createUploader("gallery");
const authenticateAdmin = require("../middlewares/auth.middleware");

const {
  createGallery,
  getGalleries,
  getGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/gallery.controller");

router.get("/", getGalleries);
router.get("/:id", getGallery);
router.post("/", authenticateAdmin, upload.single("image"), createGallery);
router.put("/:id", authenticateAdmin, upload.single("image"), updateGallery);
router.delete("/:id", authenticateAdmin, deleteGallery);

module.exports = router;
