// **** WORK WITH MANY USER ACCOUNTS **** //
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'
import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger' // winston logger
import axios from 'axios'
import { Jwt } from '../../auth/Jwt' // interface of JWT
import { JwtPayload } from '../../auth/JwtPayload' // return type of verified token

const logger = createLogger('auth')

// You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
// Go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
const jwksUrl = 'https://dev-a6-tsbmc.us.auth0.com/.well-known/jwks.json' // JWKS endpoint

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)

  try {
    // verified passed in token from event Auth Header
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub, // user id
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

// verify token with event.authorizationToken:
async function verifyToken(authHeader: string): Promise<JwtPayload> {

  // 2. Extract the JWT from the request's authorization header.
  const token = getToken(authHeader) // get JWT token from event.authorizationToken
  const jwt: Jwt = decode(token, { complete: true }) as Jwt

  if (!jwt) {
    logger.error('Invalid token')
    throw new Error('401 error invalid token')
  }

  const { header } = jwt;

  // 3. Decode the JWT and grab the kid property from the header.
  let key = await getSigningKey(jwksUrl, header.kid)

  // verify with token and certificate
  return verify(token, key.publicKey, { algorithms: ['RS256'] }) as JwtPayload
}


const getToken = (authHeader: string): string => {

  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1] // get token from Auth Header passed into event

  return token
}


// 3. Decode the JWT and grab the kid property from the header.
const getSigningKey = async (jwkurl, kid) => {

  // 1. Retrieve the JWKS and filter for potential signature verification keys.
  let res = await axios.get(jwkurl, {
    // set Headers to allow CORS: 
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Credentials': true,
    }
  });

  // JSON Web Key object has 'keys' property which is an array of JWKs:
  let keys  = res.data.keys;

  // 4. Find the signature verification key in the filtered JWKS with a matching kid property: 
  const signingKeys = keys
    .filter(key =>
        key.alg === 'RS256' // has algorithm as RS256s
        && key.kty === 'RSA' // supporting RSA key type
        && key.use === 'sig' // JWK property `use` determines the JWK is for signing
        && key.kid  // has 'kid' for unique key id
        // has x5c property for public certificate
        && ((key.x5c && key.x5c.length)) 
    )
    .map(key => {
      // return key with properties: kid, nbf and publicKey
      return { 
        kid: key.kid, // unique key id
        nbf: key.nbf, // this not be logged?
        publicKey: certToPEM(key.x5c[0]) // certificate
      };
    });

  if (!signingKeys.length) {
    logger.error("No signing keys found")
    throw new Error('Invalid signing keys')
  }

  // Finding the exact signature verification key: 
  const signingKey = signingKeys.find(key => key.kid === kid); 

  if (!signingKey || !signingKeys.length) {
    logger.error("No signing keys found")
    throw new Error('Invalid signing keys')
  }

  logger.info("Signing keys created successfully ", signingKey)

  return signingKey
};

// 5. Using the x5c property build a certificate which will be used to verify the JWT signature. 
const certToPEM = (cert) => {
  // cert = cert.match(/.{1,64}/g).join('\n');
  cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

  return cert;
}
