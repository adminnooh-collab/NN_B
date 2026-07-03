const express = require("express");
const router = express.Router();
const createUploader = require("../middlewere/genericUpload");
const upload = createUploader("blogs");
const authenticateAdmin = require("../middlewares/auth.middleware");

const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", authenticateAdmin, upload.single("image"), createBlog);
router.put("/:id", authenticateAdmin, upload.single("image"), updateBlog);
router.delete("/:id", authenticateAdmin, deleteBlog);

module.exports = router;
