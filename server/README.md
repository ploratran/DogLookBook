# Server Side

> Using **Serverless Framework:**

### To use Serverless with Nodejs, AWS and Typescript, install: 
``` serverless create --template aws-nodejs-typescript --path server```

### Dependencies and Dev Denpendencies: 
``` npm install aws-xray-sdk cors elasticsearch http-aws-es jsonwebtoken middy uuid winston -S```

``` npm install @types/jsonwebtoken @types/elasticsearch aws-sdk serverless-aws-documentation serverless-dynamodb-local serverless-iam-roles-per-function serverless-reqvalidator-plugin serverless-plugin-tracing --save-dev```

### How to run DynamoDB Locally: 
1. Install Serverless Offline: ```npm install serverless-offline --save-dev```
2. Run DynamoDB locally: ```sls dynamodb install```, then ```sls dynamodb start```
3. Run a web server locally: ```sls offline```


### DynamoDB Table Schema: 

| PK            | SK            | attributes
| ------------- | :-----------: | -------------------------------- |
| `userId`      | `imageId`     | createdAt, imageUrl, description |

#### **Global Index Table Schema:**


| PK            | SK            | attributes
| ------------- | :-----------: | ------------------------------ |
|   `userId`    | `createdAt`   | imageId, imageUrl, description |

### Models: 

1. **Image Item Model:**

Each Image item has the following fields: 

* `userId` (string) - unique id of an user
* `imageId` (string) - unique id of an image
* `description` (boolean) - description of an image
* `createdAt` (string) - date and time when an image was created
* `imageUrl` (boolean) - a URL pointing to an image using S3

2. **Image Update Item Model:**

Each image item requires the following fields when updating: 

* `description` (string) - description of an image

3. **Create Request Model:**

Field(s) required when make a request to create a new image: 

* `description` (string) - description of an image

4. **Update Request Model:**

Field(s) required when make a request to update an image: 

* `description` (string) - description of an image


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
├── req-validator (JSON Schema)
    ├── create-post-request.json
    ├── update-post-request.json
├── src 
    ├── auth
        ├── Jwt.ts
        ├── JwtPayload.ts
    ├── businessLogic
        ├── imageLogic.ts
    ├── dataLayer
        ├── accessLayer.ts
    ├── lambda
        ├── auth
            ├── authOAuthorizer.ts
        ├── http
            ├── createImage.ts
            ├── deleteImage.ts
            ├── generateUpload.ts
            ├── getImages.ts
            ├── updateImage.ts
    ├── model-interface
        ├── ImageItem.ts
        ├── ImageUpdate.ts
    ├── request-interfaces
        ├── CreateImageRequest.ts
        ├── UpdateImageRequest.ts
    ├── utils
        ├── getAuthorization.ts
        ├── logger.ts
        ├── parseUserId.ts
        
``` 