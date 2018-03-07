# Basic Serverless Template 

This is a template for a serviceless project.

To use type the following commands in a terminal:

1. **Install via npm:**
  ```bash
  npm install -g serverless
  ```

2. **Set-up your [Provider Credentials](https://github.com/serverless/serverless/blob/master/docs/providers/aws/guide/credentials.md)**. [Watch the video on setting up credentials](https://www.youtube.com/watch?v=HSd9uYj2LJA)
 
 
3. **Create a service:**
  ```bash
  # Create a service from a template using your own <Service Name>
  sls create -u https://github.com/devnuskin/microservice --path <Service Name>
  # Change into the newly created directory
  cd my-service
  ```

4. **Configure you locale enviroment to run service:**
  ```bash
  npm run config
  ```

5. **Start your service locally:**
  ```bash
  sls offline start
  ```

Your service is now available at: 
##### http://localhost:3000/

A Postman collection is available in the src/resources folder.