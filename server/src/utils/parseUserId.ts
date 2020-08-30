import { decode } from 'jsonwebtoken'; 
import { JwtPayload } from '../auth/JwtPayload'; 
import { createLogger } from '../utils/logger'; 
/**
 * parse JWT token and return userId
 * @param jwtToken 
 * @return userId from JWT token
*/

const logger = createLogger('parseUserId.ts'); 

export const parseUserId = (jwtToken: string): string => {
    logger.info(`jwt token ${jwtToken}`);
    const decodedJwt = decode(jwtToken) as JwtPayload;
    logger.info(`decodedJwt ${decodedJwt}`); 
    if (decodedJwt.sub !== null) {
        return decodedJwt.sub ; // user id from Auth0
    }
}
  
  