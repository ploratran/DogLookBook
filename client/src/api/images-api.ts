import { apiEndpoint } from '../config'; 
import axios from 'axios'; 
import CreateImageRequest from '../type-interfaces/CreateImageRequest'; 
import ImageModel from '../type-interfaces/ImageModel';

// GET images based on idToken
// return an array of images
export async function getImages(idToken: string): Promise<ImageModel[]> {
    const response = await axios.get(`${apiEndpoint}/images`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    }); 
    return response.data.items
}

// DELETE an image based on imageId: 
export async function deleteImage(idToken: string, imageId: string): Promise<void> {
    await axios.delete(`${apiEndpoint}/images/${imageId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
        }
    });
}

// GET S3 Presigned-URL: 
// return S3 presigned-url as string: 
export async function getUploadUrl(idToken: string, imageId: string): Promise<string> {
    const response = await axios.post(`${apiEndpoint}/images/s3/${imageId}`, '', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    });
    // return S3 presigned-url to upload image: 
    return response.data.uploadUrl;
}

// PUT an image based on S3 presigned-url:
export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
    await axios.put(uploadUrl, file); 
}

// POST to create new image
// return the newly created image: 
export async function createImage(idToken: string, newImage: CreateImageRequest): Promise<ImageModel> {
    const response = await axios.post(`${apiEndpoint}/images`, JSON.stringify(newImage), {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${idToken}`,
        }
    });
    // return the newly created image as a single ImageModel: 
    return response.data.item; 
}