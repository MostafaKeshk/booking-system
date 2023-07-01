const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.cloudName, 
  api_key: process.env.cloudKey, 
  api_secret: process.env.cloudSecret 
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === 'image' ? '/tmp/uploads/images' : '/tmp/uploads/files';
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const publicId = `file-${uniqueSuffix}`;
    cb(null, publicId + fileExtension);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/png'];
  const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.ms-excel'];

  if (file.fieldname === 'image' && allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === 'file' && allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type.'), false);
  }
};

const upload = multer({ storage, fileFilter }).single('image');

// Handle the file upload request
exports.upload = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      console.log({ error });
      return res.status(400).json({ error: 'File upload failed.' });
    }

    // File upload to Cloudinary
    if (req.file) {
      const { path } = req.file;
      cloudinary.uploader.upload(path, { public_id: req.file.filename }, (error, result) => {
        if (error) {
          console.log({ error });
          return res.status(400).json({ error: 'File upload to Cloudinary failed.' });
        }
        req.file.cloudinaryUrl = result.secure_url;
        next();
      });
    } else {
      next();
    }
  });
};
