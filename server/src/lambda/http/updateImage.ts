import 'source-map-support/register'; 
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'; 
import { UpdateImageRequest } from '../../req-interface/UpdateImageRequest'; 
import { updateImage } from '../../businessLogic/imageLogic'; 
import { createLogger } from '../../utils/logger'; 

const logger = createLogger('Update Image');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info(`Process event: ${event}`); 

    // get image Id from request event: 
    // when user click on the image they want to update: 
    const imageId = event.pathParameters.imageId; 
    // get updated information from request body: 
    const updatedImage: UpdateImageRequest = JSON.parse(event.body); 

    // validate user
    const authorization = event.headers.Authorization; 
    const jwtToken = authorization.split(' ')[1]; 

    // update image item: 
    await updateImage(jwtToken, imageId, updatedImage); 

    return {
        statusCode: 200, 
        body: 'Update success',
    }
}