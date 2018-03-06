# Basic Serverless Template 

This is a template for a serviceless project.

To use type the following commands in a terminal:





##### npm install serverless -g

##### sls login 
 
 instructions for setting up an [AWS Account Setup](https://www.youtube.com/watch?v=bFHmgqbAh4M)

##### sls create -u https://github.com/devnuskin/microservice --path MyService 


In the serverless.yml file change *basePath: 'item'*  to  *basePath: 'MyService'*

##### sls deploy

Your service is now available at:
http://api.nuskin.io/MyService