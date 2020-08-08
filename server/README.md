# Server Side

> Using **Serverless Framework:**

### To use Serverless with Nodejs, AWS and Typescript, install: 
``` serverless create --template aws-nodejs-typescript --path server```

### Dependencies and Dev Denpendencies: 
``` npm install aws-xray-sdk cors elasticsearch http-aws-es jsonwebtoken middy uuid winston -S```

``` npm install @types/jsonwebtoken @types/elasticsearch aws-sdk serverless-aws-documentation serverless-dynamodb-local serverless-iam-roles-per-function serverless-reqvalidator-plugin --save-dev```

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
        ├── accessLayer.ts
    ├── lambda
        ├── auth
            ├── authOAuthorizer.ts
        ├── http
            ├── createPost.ts
            ├── getPost.ts
            ├── deletePost.ts
            ├── updatePost.ts
            ├── generateUpload.ts
    ├── model-interfaces
        ├── ImageModel.ts
        ├── UpdateItem.ts
    ├── request-interfaces
        ├── CreateImageRequest.ts
        ├── UpdateImageRequest.ts
``` 