const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.cloudName, 
  api_key: process.env.cloudKey, 
  api_secret: process.env.cloudSecret 
});

const storage = multer.memoryStorage();

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

exports.upload = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      console.log({ error });
      return res.status(400).json({ error: 'File upload failed.' });
    }

    if (req.file) {
      cloudinary.uploader.upload_stream({ public_id: req.file.filename }, (error, result) => {
        if (error) {
          console.log({ error });
          return res.status(400).json({ error: 'File upload to Cloudinary failed.' });
        }
        req.file.cloudinaryUrl = result.secure_url;
        next();
      }).end(req.file.buffer);
    } else {
      next();
    }
  });
};
