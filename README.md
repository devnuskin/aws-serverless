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
  serverless create -u https://github.com/devnuskin/microservice --name myservice --path myservice
  ```

4. **Start your service locally:**
  ```bash
  serverless offline start
  ```


Your service is now available at: 
##### http://localhost:3000/

A Postman collection is available in the src/resources folder.

Customize your service to meet your needs including setting the Service name and The Base path in the serverless.yml file



#### To add to CI/CD

5. **Create Git Repo and clone:**
  ```bash
git init
git add .
git commit -m "Inital Commit"
git remote add origin https://url.to/repo
git push -u origin master
  ```

