import { apiEndpoint } from '../config'; 
import ImageModel from '../type-interfaces/ImageModel';
import axios from 'axios'; 

// GET images based on idToken
// return an array of images
export async function getImages(idToken: string): Promise<ImageModel[]> {
    console.log(`Fetching images from ${idToken}`); 

    const response = await axios.get(`${apiEndpoint}/images`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    }); 
    console.log('Images:', response.data)
    return response.data.items
}