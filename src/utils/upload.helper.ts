import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

export const imageFileFilter = (req: any, file: any, callback: any) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req: any, file: any, callback: any) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};

export const storageOptions = (folderName: string) =>
    diskStorage({
        destination: (req, file, callback) => {
            const uploadPath = `./public/uploads/${folderName}`;
            // Create the directory if it does not exist
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            callback(null, uploadPath);
        },
        filename: editFileName,
    });
