const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const { param } = require('../app');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "empresas_icons",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
    }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Apenas imagens jpg/png/webp"), false);
  }
});

module.exports = upload;