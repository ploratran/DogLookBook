# Server Side:

> Using **Serverless Framework:**

### To use Serverless Framework, install: 
``` serverless create --template aws-nodejs-typescript --path server```

### Directory Layout: 
```
.
├── .dynamodb
├── .serverless
├── node_modules
├── package.json
├── serverless.yml
├── tsconfig.json
├── webpack.config.js
├── README.md
├── model-validator (JSON Schema)
    ├── create-post-request.json
    ├── update-post-request.json
├── src 
    ├── auth
        ├── jwtInterface.js
        ├── jwtPayloadInterface.ts
    ├── businessLogic
        ├── postLogic.ts
    ├── dataLayer
        ├── postLayer.ts
    ├── lambda
        ├── auth
            ├── authOAuthorizer.ts
        ├── http
            ├── createPost.ts
            ├── getPost.ts
            ├── deletePost.ts
            ├── updatePost.ts
            ├── generateUploadUrl.ts
    ├── model-interfaces
        ├── PostItem.ts
        ├── PostUpdateItem.ts
    ├── request-interfaces
        ├── CreatePostRequest.ts
        ├── UpdatePostRequest.ts
``` 