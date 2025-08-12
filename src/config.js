/* env */
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

/* multer */
import multer from 'multer';
import path from 'path';
import { fileFilter } from './utils/fileFilter.js';

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
export {
    PORT,
    upload
}