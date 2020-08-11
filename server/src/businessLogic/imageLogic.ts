// import * as uuid from 'uuid'; 
import { createLogger } from '../utils/logger'; 
import { ImageItem } from '../model-interface/ImageModel'; 
import { AccessLayer } from '../dataLayer/accessLayer'; 
import { parseUserId } from '../utils/parseUserId'; 

const logger = createLogger('imageLogic.ts'); 

const accessLayer = new AccessLayer(); 

export async function getAllImages(jwtToken: string): Promise<ImageItem[]> {
    logger.info('get images in imageLogic.ts'); 

    const userId = parseUserId(jwtToken); 
    logger.info(`userId: ${userId} `); 
    
    return accessLayer.getImages(userId); 
}