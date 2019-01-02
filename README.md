# Basic Serverless Template 

## This is a template for a Serverless project.

### To use type the following commands in a terminal:

#### 1. Install via npm:

  ```bash
  npm install -g serverless
```

#### 2. Set-up your AWS Credentials:

  ```bash
  serverless config credentials --provider aws --key <ACCESS_KEY> --secret <ACCESS_SECRET>
```

For details on where to get your access_key and secret [click here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).
    
#### 3. Create a service:
  ```bash
  # Create a service from a template using your own <Service Name>
  serverless create -u https://github.com/devnuskin/aws-serverless --path myservice
```
#### 4. Install npm modules from package.json:
  ```bash
  # use path from above
  cd myservice
  npm install
```

#### 5. Start your service locally:
  ```bash
  serverless offline start
```


Your service is now available at: 
##### http://localhost:3000/

A Postman collection is available in the src/resources folder.

Customize your service to meet your needs including setting the Service name and The Base path in the serverless.yml file

#### 6. To deploy to dev

  ```bash
  serverless deploy
```

Your service will be available at https://devapi.cloud.nuskin.com/myservice

#### 7. To add to CI/CD

 **Create Git Repo and set origin:**
  ```bash
git init
git add .
git commit -m "Initial Commit"
git remote add origin ssh://git-codecommit.us-west-2.amazonaws.com/v1/repos/{service-name}
  ```
  **Login to the AWS Console and go to Service Catalog:**  

  Follow instructions in Confluence to create the Code Commit Repo and Serverless Pipeline Deployment.  
  https://confluence.nuskin.com/pages/viewpage.action?pageId=27904561

  Then push your code to Code Commit:
  ```bash
  git push -u origin master
  ```

#### 8. Environment Configuration in config/ directory
There are environmental files are in the config/ directory.  

Make sure you understand load order and don't have blank values in child files as they will overwrite default values.

[Config Module environment file info](https://github.com/lorenwest/node-config/wiki/Configuration-Files)
