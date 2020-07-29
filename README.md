# Udacity Cloud Developer Nanodegree Capstone

> Option 2:  A **Serverless** Application

## Table of Contents
1. [Capstone Requirements](#capstone-requirements)
2. [Technologies](#technologies)
3. [Demo](#demo)


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

## Technologies: 
- Serverless Framework
- React.js
- AWS DynamoDB, Cloudwatch, Lambda, API Gateway, Cloudformation, S3, X-Ray, SDK
- Auth0 using RS256 Algorithm

## Demo: 