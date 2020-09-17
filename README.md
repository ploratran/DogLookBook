# Udacity Cloud Developer Nanodegree Capstone

> Option 2:  A **Serverless** Application

## Table of Contents
1. [Description](#description)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
4. [Endpoints](#endpoints)
5. [Image Model](#image-model)
6. [Capstone Requirements](#capstone-requirements)
7. [Demo](#demo)

## Description:
A capstone project called **Dogram** to graduate Udacity Cloud Developer Nanodegree. It is a simple Instagram-cloned app using Serverless with Auth0.js for authentication. 

## Technologies: 
- Serverless Framework
- React.js
- AWS DynamoDB, Cloudwatch, Lambda, API Gateway, Cloudformation, S3, X-Ray, SDK
- Auth0 using RS256 Algorithm

## Getting Started:
### Backend
### Frontend

## Endpoints: 
| **Method** | **endpoint** |
| ---------- | ------------ |
| **GET**    | `https://stzf6sj4g6.execute-api.us-east-2.amazonaws.com/dev/images`|
| **POST**   | `https://stzf6sj4g6.execute-api.us-east-2.amazonaws.com/dev/images`|
| **PATCH**  | `https://stzf6sj4g6.execute-api.us-east-2.amazonaws.com/dev/images/{imageId}`|
| **DELETE** | `https://stzf6sj4g6.execute-api.us-east-2.amazonaws.com/dev/images/{imageId}`|
| **POST**   | `https://stzf6sj4g6.execute-api.us-east-2.amazonaws.com/dev/images/s3/{imageId}`|

## Image Model
Each Image item has the following fields: 

* `userId` (string) - unique ID of current user
* `imageId` (string) - unique id for an image
* `name` (string) - name of an Image item
* `description` (string) - description of the image
* `createdAt` (boolean) - date and time when an image was created
* `imageUrl` (string) - a URL pointing to an image using S3

## Capstone Requirements
1. **Functionalities:** 
- Application can be able to CREATE, UPDATE, DELETE, POST an item.
- User can click on "pencil" button to select and UPLOAD an item. 
- Application can be login/logout and show contents of the current user. 
- User needs to be authenticated
2. **Codebase:** 
- Lambda function codes has to split into multiple files/classes. 
- Business logic is seperated from code for database access, file storage, etc. 
- Using `async/await` contructs instead of passing `callbacks`. 
3. **Best Practices:**
- All resources needed to be defined in `serverless.yml`. 
- All permissions are defined per function in `serverless.yml`.
- Application has distributed tracing enabled, log statements, or level metrics
- Incoming HTTP requests are validated in Lambda handlers or using request validation via API Gateway using `serverless-reqvalidator-plugin`. 
4. **Architecure:** 
- Has 1:M relationship between users and items modeled using DynamoDB. 
- Has a composite key with both partition and sort keys. 
```
KeySchema: 
    - AttributeName: partitionKey
      KeyType: HASH
    - AttributeName: sortKey
      KeyType: RANGE
```
- Items are fetched using `.query()` instead of `.scan()` method. 

## Demo: 