const fs = require('fs');
const path = require('path');

/**
 * Ensures that the uploads directory exists
 */
const ensureUploadsDir = () => {
  const uploadsDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory');
  }
};

/**
 * Gets the full URL for an uploaded file
 * @param {string} filename - The filename of the uploaded file
 * @param {object} req - The request object
 * @param {string} [folder] - The optional folder name
 * @returns {string} The full URL to access the file
 */
const getFileUrl = (filename, req, folder = '') => {
  if (!filename) return null;

  const protocol = req.protocol;
  const host = req.get('host');
  const folderSegment = folder ? `/${folder}` : '';
  return `${protocol}://${host}/uploads${folderSegment}/${filename}`;
};

module.exports = {
  ensureUploadsDir,
  getFileUrl
};
