import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import { extname } from 'path';

// You can configure disk or memory storage
const storage = multer.diskStorage({
  destination: './public/temp', // you can customize the path
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
  },
});

// File filter (optional)
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Set file size limit, etc.
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const multerMiddleware = upload.single('file'); // or .array(), .fields(), etc.

export function MulterUploadMiddleware(req: Request, res: Response, next: NextFunction) {
  multerMiddleware(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}