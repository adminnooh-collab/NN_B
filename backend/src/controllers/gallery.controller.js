const Gallery = require("../models/Gallery");

exports.createGallery = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gallery image is required",
      });
    }

    const gallery = await Gallery.create({
      title: title || "",
      category: category || "",
      image: `/uploads/gallery/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGalleries = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const galleries = await Gallery.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: galleries.length,
      data: galleries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.category !== undefined) updateData.category = req.body.category;
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;
    if (req.file) updateData.image = `/uploads/gallery/${req.file.filename}`;

    const updated = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Gallery item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
