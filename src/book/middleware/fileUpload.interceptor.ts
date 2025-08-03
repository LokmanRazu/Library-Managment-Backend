
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multer from 'multer';

export function FileUploadInterceptor(fieldName: string) {
  const storage = multer.diskStorage({
    destination: './public/temp',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  });

//   const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'), false);
//     }
//   };

  return FileInterceptor(fieldName, {
    storage,
    // fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
}
