import { decode } from 'jsonwebtoken'; 
import { JwtPayload } from '../auth/JwtPayload'; 
import { createLogger } from './logger'; 

// parse JWT token and return userId
// @params jwtToken
// @return userId from JWT token

const logger = createLogger('parseUserId.ts'); 

export function parseUserId(jwtToken: string): string {
    const decodedJwt = decode(jwtToken) as JwtPayload;
    logger.info('sub ', decodedJwt.sub);  
    return decodedJwt.sub; 
}
  