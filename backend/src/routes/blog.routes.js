const express = require("express");
const router = express.Router();
const createUploader = require("../middlewere/genericUpload");
const upload = createUploader("blogs");
// authentication not required for public blog endpoints

const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", upload.single("image"), createBlog);
router.put("/:id", upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
