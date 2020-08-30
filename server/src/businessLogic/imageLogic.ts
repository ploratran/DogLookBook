import * as uuid from 'uuid'; 
import { createLogger } from '../utils/logger'; 
import { ImageItem } from '../model-interface/ImageItem'; 
import { AccessLayer } from '../dataLayer/accessLayer'; 
import { parseUserId } from '../utils/parseUserId'; 
import { CreateImageRequest } from '../req-interface/CreateImageRequest'; 

const logger = createLogger('imageLogic.ts'); 

const accessLayer = new AccessLayer(); 

//query all images from the given JWT token:
export async function getAllImages(jwtToken: string): Promise<ImageItem[]> {
    logger.info('get images in imageLogic.ts'); 

    const userId = parseUserId(jwtToken); 
    logger.info(`userId: ${userId} `); 
    
    return await accessLayer.getImages(userId); 
}

// create new image with corresponding userId: 
export async function createImage(
    newImage: CreateImageRequest, 
    jwtToken: string
): Promise<ImageItem> {

    logger.info(`Insert new image`); 

    const imageId = uuid.v4(); // generate unique image id: 
    const userId = parseUserId(jwtToken); 

    logger.info(`Create image for user ${userId}`); 

    return await accessLayer.createImage({
        userId, 
        imageId, 
        createdAt: new Date().toISOString(), 
        ...newImage, 
    }) as ImageItem;  
}