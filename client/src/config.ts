// Auth0 and AWS configuration for frontend: 
const apiId = 'stzf6sj4g6';
const regions = 'execute-api.us-east-2'
// 'https://{{apiId}}.{{regions}}.amazonaws.com/dev'
export const apiEndpoint = `https://${apiId}.${regions}.amazonaws.com/dev`; 

// get info from auth0.com
export const authConfig = {
    domain: 'dev-a6-tsbmc.us.auth0.com',
    clientId: 'Y1ZqPHnXRe6VHsBGzq6I0a1oFovFXAVc', 
    callbackUrl: 'http://localhost:3000/callback', 
}