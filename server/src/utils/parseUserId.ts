import { decode } from 'jsonwebtoken'; 
import { JwtPayload } from '../auth/JwtPayload'; 

// parse JWT token and return userId
// @params jwtToken
// @return userId from JWT token]

export function parseUserId(jwtToken: string): string {
    const decodedJwt = decode(jwtToken) as JwtPayload;
    return decodedJwt.sub; 
}
  