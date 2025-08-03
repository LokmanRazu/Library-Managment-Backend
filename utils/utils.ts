import { hashSync, compare } from "bcrypt";
import { Express } from 'express';
import * as fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';

export function hashPassword(text: string): string {
    return hashSync(text, 12)
}

export function comparePassword(hashPassword: string, plainPassword: string): Promise<boolean> {
    return compare(plainPassword, hashPassword);
}


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dljc0jtjj",
    api_key: process.env.CLOUDINARY_API_KEY || "355968732426459",
    api_secret: process.env.CLOUDINARY_API_SECRET ||  "wYf5LDhivuTj-aV9BBV4d60Y0Dw",
    
}); 
console.log('coldfdfdk', process.env.CLOUDINARY_API_SECRET);

export const uploadImageToCloudinary = async (localPath) => {
    try {
        if (!localPath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localPath,{resource_type:"auto"}); 
        console.log('File upload on cloudinary', response.url);
        return response 
    } catch (error) {
        fs.unlinkSync(localPath);
        console.log(error);
        return null
    }
    
}

