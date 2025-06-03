const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { ensureUploadsDir } = require('../utils/fileUtils');

// Ensure uploads directory exists when this module is loaded
ensureUploadsDir();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename with original extension
    const fileExt = path.extname(file.originalname);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`;
    cb(null, fileName);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WEBP files are allowed.'), false);
  }
};

// Export configured multer instance
const uploadHandler = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max size
  }
});

/**
 * Deletes an image from the uploads directory
 * @param {string} filename - The filename to delete
 * @returns {Promise<boolean>} - Whether the file was successfully deleted
 */
const deleteImage = async (filename) => {
  if (!filename) return false;

  const filePath = path.join(__dirname, '../uploads', filename);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

module.exports = {
  upload: uploadHandler,
  deleteImage
};
