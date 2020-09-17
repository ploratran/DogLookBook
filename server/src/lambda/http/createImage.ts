import 'source-map-support/register'; 
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'; 
import { CreateImageRequest } from '../../req-interface/CreateImageRequest'; 
import { createImage } from '../../businessLogic/imageLogic'; 
import { createLogger } from '../../utils/logger'; 
import { getAuthorization } from '../../utils/getAuthorization';

const logger = createLogger('Create Image'); 

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const newImage: CreateImageRequest = JSON.parse(event.body); 

    // const jwtToken = event.headers.Authorization.split(' ')[1]; 
    const jwtToken = getAuthorization(event); 

    const newItem = await createImage(newImage, jwtToken); 

    logger.info(`New Image ${Object.values(newItem)}`);  

    return {
        statusCode: 201, 
        body: JSON.stringify({
            item: newItem, // return the newly created image
        }), 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        }
    }
}