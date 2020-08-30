import * as AWS from 'aws-sdk'; 
import * as AWSXRay from 'aws-xray-sdk'; 
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ImageItem } from '../model-interface/ImageItem'; 
import { createLogger } from '../utils/logger'; 

const XAWS = AWSXRay.captureAWS(AWS); // X-Ray tracing

const logger = createLogger('Access Layer'); 

export class AccessLayer {
    constructor (
        // create document client of AWS DynamoDB: 
        private readonly docClient: DocumentClient = createDynamoDBClient(), 
        // define name of tables used
        private readonly imagesTable = process.env.IMAGES_TABLE, 
        private readonly indexTable = process.env.IMAGE_INDEX, 
    ) {}

    // GET images based on userId
    // return an array of ImageItem[]
    async getImages(userId: string): Promise<ImageItem[]> {
        logger.info(`Fetching images item from user ${userId}`); 

        // use .query() with userId as key: 
        const result = await this.docClient.query({
            TableName: this.imagesTable, // base table
            IndexName: this.indexTable,  // LSIndex table for faster query
            KeyConditionExpression: 'userId = :userId', 
            ExpressionAttributeValues: { ':userId': userId }, 
            ScanIndexForward: false, // get result with latest item on top
        }).promise(); 

        // return images as an array of objects
        const images = result.Items; 
        return images as ImageItem[]; 
    }

    // CREATE image
    // insert new image into Images Table
    async createImage(image: ImageItem): Promise<ImageItem> {
        logger.info(`Save new ${image.description} into ${this.imagesTable}`); 

        await this.docClient.put({
            // insert newly created image into base table
            TableName: this.imagesTable, 
            Item: image, 
        }).promise(); 

        return image as ImageItem; 
    }

    // UPDATE image item based on userId and imageId: 
    // based on ImageModel interface (description)
    
    // DELETE image item based on userId and imageId
}

const createDynamoDBClient = () => {
    if (process.env.IS_OFFLINE) {
        console.log(`Create local DynamoDB instance`); 
        logger.info(`Create local DynamoDB instance`); 

        return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost', 
            endpoint: 'http://localhost:8000', 
        });
    }
    return new XAWS.DynamoDB.DocumentClient(); 
};