const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, shortDescription, price, category, collectionId, isFeatured } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Product name is required" });
    }

    const images = req.files && req.files.length ? req.files.map((f) => `/uploads/products/${f.filename}`) : [];

    const product = await Product.create({
      name: name.trim(),
      description: description || "",
      shortDescription: shortDescription || "",
      price: price || 0,
      category: category || undefined,
      collectionId: collectionId || undefined,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
      images,
      image: images[0] || "",
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "Product already exists" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.collectionId) filter.collectionId = req.query.collectionId;
    if (req.query.isFeatured !== undefined) filter.isFeatured = req.query.isFeatured === "true";

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .populate("collectionId", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name slug")
      .populate("collectionId", "name slug");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const updateData = {};
    ["name", "description", "shortDescription", "price", "category", "collectionId", "isFeatured", "isActive"].forEach(
      (field) => {
        if (req.body[field] !== undefined) updateData[field] = req.body[field];
      }
    );

    if (req.files && req.files.length) {
      const images = req.files.map((f) => `/uploads/products/${f.filename}`);
      updateData.images = images;
      updateData.image = images[0];
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
