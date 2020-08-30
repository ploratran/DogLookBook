import { APIGatewayProxyEvent } from 'aws-lambda'; 
import { parseUserId } from './parseUserId'; 

/**
 * Get userId from API event
 * @param event an event from API Gateway
 * @return user id from JWT token
*/

export const getUserId = (event: APIGatewayProxyEvent): string => {
    // get Jwt token from event header
    const authorization = event.headers.Authorization; 
    const jwtToken = authorization.split(' ')[1]; // return the token, not 'Bearer' 

    // decode jwt token from API Gateway event
    return parseUserId(jwtToken); 
}