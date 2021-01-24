import 'source-map-support/register'; 
import { createLogger } from '../../utils/logger'; 
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'; 
import { getAllImages } from '../../businessLogic/imageLogic'; 
import { getAuthorization } from '../../utils/getAuthorization';
// import * as middy from 'middy'; 
// import { cors } from 'middy/middlewares'; 

const logger = createLogger('Get All Images'); 

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event: ', event); 

    const jwtToken = getAuthorization(event);  
    logger.info('jwt token ', jwtToken); 

    let nextKey; // Next key to continue scan operation if necessary
    let limit; // Maximum number of elements to return

    try {
        // Parse query parameters
        limit = parseLimitParameter(event) || 2;
        nextKey = parseNextKeyParameter(event);
    } catch (e) {
        console.log('Failed to parse query parameters: ', e.message)
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Invalid parameters'
            })
        }
    }

    // get all images using .query from DynamoDB Table: 
    const result = await getAllImages(jwtToken, limit, nextKey); 

    const items = result.Items;

    logger.info(`Images list: ${result}`); 

    return {
        statusCode: 200, 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            items: items, 
            nextKey: encodeNextKey(result.LastEvaluatedKey),
        })
    }
}; 

function parseLimitParameter(event) {
    const limitStr = getQueryParameter(event, 'limit')
    if (!limitStr) {
      return undefined
    }
  
    const limit = parseInt(limitStr, 10)
    if (limit <= 0) {
      throw new Error('Limit should be positive')
    }
  
    return limit
}

function parseNextKeyParameter(event) {
    const nextKeyStr = getQueryParameter(event, 'nextKey')
    if (!nextKeyStr) {
      console.log("nextKeyStr returns null. No more item to fetch")
      return undefined
    }
  
    const uriDecoded = decodeURIComponent(nextKeyStr)
    return JSON.parse(uriDecoded)
}
  
function getQueryParameter (event, name) {
    const queryParams = event.queryStringParameters; 

    if (!queryParams) {
        return undefined; 
    }

    return queryParams[name]; 
}

function encodeNextKey(lastEvaluatedKey) {
    if (!lastEvaluatedKey) {
      console.log("lastEvaluatedKye is null. No more item to fetch");
      return null;
    }
  
    return encodeURIComponent(JSON.stringify(lastEvaluatedKey))
}