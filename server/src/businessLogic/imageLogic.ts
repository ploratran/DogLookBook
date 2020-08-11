import * as uuid from 'uuid'; 
import { createLogger } from '../utils/logger'; 
import { ImageItem } from '../model-interface/ImageModel'; 
import { AccessLayer } from '../dataLayer/accessLayer'; 

const logger = createLogger('imageLogic.ts'); 

const accessLayer = new AccessLayer(); 

export async function getImages(jwtToken: string): Promise<ImageItem[]> {
    logger.info('get images in imageLogic.ts'); 

    
}