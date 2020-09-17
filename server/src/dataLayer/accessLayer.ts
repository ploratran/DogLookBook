import * as AWS from 'aws-sdk'; 
import * as AWSXRay from 'aws-xray-sdk'; 
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ImageItem } from '../model-interface/ImageItem'; 
import { ImageUpdate } from '../model-interface/ImageUpdate'; 
import { createLogger } from '../utils/logger'; 

const XAWS = AWSXRay.captureAWS(AWS); // enabled X-Ray tracing

// log in AWS Cloudwatch 
const logger = createLogger('Access Layer'); 

// create a class for CRUD methods: 
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
        // query images based on userId:  
        const result = await this.docClient.query({
            TableName: this.imagesTable, // base table
            IndexName: this.indexTable,  // LSIndex table for faster query
            KeyConditionExpression: 'userId = :userId', 
            ExpressionAttributeValues: { ':userId': userId }, 
            ScanIndexForward: false, // get result with latest item on top
        }).promise(); 

        // return images as an array of objects
        return result.Items as ImageItem[];
    }

    // CREATE image (use PUT)
    // insert new image into Images Table
    // return as a single ImageItem
    async createImage(image: ImageItem): Promise<ImageItem> {
        logger.info(`Save new ${image.description} into ${this.imagesTable}`); 

        // insert newly created image into base table
        await this.docClient.put({
            TableName: this.imagesTable, 
            Item: image, 
        }).promise(); 

        return image as ImageItem; 
    }

    // UPDATE image item based on userId and imageId: 
    // based on ImageUpdate Interface (description)
    async updateImage(userId: string, imageId: string, image: ImageUpdate) {
        logger.info(`Updating image: ${imageId}`); 

        await this.docClient.update({
            TableName: this.imagesTable, 
            Key: { // update based on key userId and imageId: 
                userId, 
                imageId, 
            }, 
            UpdateExpression: 
                'set #description = :description', 
            ExpressionAttributeValues: {
                ':description': image.description,
            },
            ExpressionAttributeNames: {
                '#description': 'description', 
            }
        }).promise();
    }
    
    // DELETE image item based on userId and imageId
    async deleteImage(userId: string, imageId: string) {
        logger.info(`Deleting image ${imageId}`); 

        await this.docClient.delete({
            TableName: this.imagesTable, 
            Key: {
                userId, 
                imageId, 
            }
        }).promise(); 
    }
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