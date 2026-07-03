const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, content, shortDescription, author, category, tags, isPublished } = req.body;

    if (!title || !title.trim() || !content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const blog = await Blog.create({
      title: title.trim(),
      content,
      shortDescription: shortDescription || "",
      author: author || "Admin",
      category: category || "",
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(",").map((t) => t.trim())) : [],
      isPublished: isPublished !== undefined ? isPublished : true,
      image: req.file ? `/uploads/blogs/${req.file.filename}` : "",
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "Blog with similar title already exists" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.isPublished !== undefined) filter.isPublished = req.query.isPublished === "true";

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { slug: req.params.id }],
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    const updateData = {};
    ["title", "content", "shortDescription", "author", "category", "isPublished"].forEach((field) => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });
    if (req.body.tags) {
      updateData.tags = Array.isArray(req.body.tags) ? req.body.tags : req.body.tags.split(",").map((t) => t.trim());
    }
    if (req.file) updateData.image = `/uploads/blogs/${req.file.filename}`;

    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
