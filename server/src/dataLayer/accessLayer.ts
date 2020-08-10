import * as AWS from 'aws-sdk'; 
import * as AWSXRay from 'aws-xray-sdk'; 
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ImageModel } from '../model-interface/ImageModel'; 
import { ImageUpdate } from '../model-interface/ImageUpdate'; 
import { createLogger } from '../utils/logger'; 

const XAWS = AWSXRay.captureAWS(AWS); 

const logger = createLogger('Access Layer'); 

export class AccessLayer {
    constructor (
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(), 
        private readonly imagesTable = process.env.IMAGES_TABLE, 
    ) {}

    // GET images based on userId

    // CREATE image
    // insert new image into Images Table: 

    // UPDATE image item based on userId and imageId: 
    // based on ImageModel interface (description)
    
    // DELETE image item based on userId and imageId
}