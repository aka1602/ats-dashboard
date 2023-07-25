import multer, { Options } from 'multer';
import path from 'path';

const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'uploads');
		},
		filename: function (req, file, cb) {
			cb(null, new Date().valueOf() + path.extname(file.originalname));
		},
	}),
} as Options);

export default upload;
