# Basic Serverless Template 

This is a template for a serviceless project.

To use type the following commands in a terminal:


1. **Create your service directory:**
  ```bash
  mkdir MyService
  # or
  git clone http://url.to/codeRepo
  ```

1. **Install via npm:**
  ```bash
  cd MyService
  npm install -g serverless
  ```
2. **Set-up your [Provider Credentials](https://github.com/serverless/serverless/blob/master/docs/providers/aws/guide/credentials.md)**. [Watch the video on setting up credentials](https://www.youtube.com/watch?v=HSd9uYj2LJA)
 
 
3. **Create a service:**
  ```bash
  # Create a service from a template using your own <Service Name>
  sls create -u https://github.com/devnuskin/microservice
  ```

5. **Start your service locally:**
  ```bash
  sls offline start
  ```

Your service is now available at: 
##### http://localhost:3000/

A Postman collection is available in the src/resources folder.

Customize your service to meet your needs including setting the Service name and The Base path in the serverless.yml file


