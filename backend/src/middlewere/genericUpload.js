const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Generic multer factory: pass a folder name (e.g. "gallery", "blogs", "collections", "products")
const createUploader = (folder) => {
  const uploadDir = path.resolve(__dirname, `../../uploads/${folder}`);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + Math.round(Math.random() * 1e6) + path.extname(file.originalname));
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed"), false);
      }
    },
  });
};

module.exports = createUploader;
