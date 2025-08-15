/* env */
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

/* multer */
import multer from 'multer';
import path from 'path';
import { fileFilter } from './utils/fileFilter.js';
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const docName = `${file.fieldname}-${uuidv4()}${ext}`;
        cb(null, docName);
    }
});

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

/* module exports */
export {
    PORT,
    upload
}