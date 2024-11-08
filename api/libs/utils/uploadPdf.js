import multer from "multer";
import {fileURLToPath} from "url";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, '../../', 'uploads');

console.log("Upload Path: ", uploadPath);
// console.log("Directory Path: ", __dirname);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        return cb(null,
            `${Date.now()}-${file.originalname}`
         );
    }
});


const upload = multer({storage});

export default upload;