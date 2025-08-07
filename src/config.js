/* env */
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

/* multer */
const multer = require('multer');
const path = require('path');
const fileFilter = require('./utils/fileFilter');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const docName = `${file.fieldname}-${Date.now()}${ext}`;
        cb(null, docName);
    }
});

const upload = multer({ storage, fileFilter });

/* module exports */
module.exports = {
    PORT,
    upload
}