```
uploads

    01725620371
        - nid_1.png
        - nid_2.png
        - p1.png
        - p2.png
        - user.png
        - vechile_1.png
        - vechile_2.png
       
    01725620372
        - nid_1.png
        - nid_2.png
        - p1.png
        - p2.png
        - user.png
        - vechile_1.png
        - vechile_2.png

```

- https://www.npmjs.com/package/ical-generator
- 

## Steps to run this project in development:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` or `npm run dev` command for development


## Steps to run this project in production: 
1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm build` command and
4. finally `npm run prod` command for production
5. Run `pm2 start dist/src/index.js` command and



# Create new Nodejs TypeScript and TypeORM project

```
npm install --save express 
npm install --save-dev @types/node @types/express typescript nodemon ts-node
```

# Setup Testing Environment

    
    npm i --save-dev jest
    npm i --save-dev ts-jest
    npm i @types/jest --save-dev
    npm i log4js
    npm i --save-dev supertest



# References
- [jwt-in-node-js-implementing](https://kettan007.medium.com/json-web-token-jwt-in-node-js-implementing-using-refresh-token-90e24e046cf8)
- [token-authentication-in-node](https://developer.okta.com/blog/2019/02/14/modern-token-authentication-in-node-with-express)
- [typescript-express-postgresql](https://www.velotio.com/engineering-blog/set-up-production-ready-rest-nodejs-api-server-using-typescript-express-postgresql)
- [Testing Guide](https://javascript.plainenglish.io/beginners-guide-to-testing-jest-with-node-typescript-1f46a1b87dad)