# razzle-turbo-aws-cdk

Make sure docker is installed 

```shell
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
 curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
 sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Make sure you have access to docker


```shell
sudo usermod -aG docker $USER 
newgrp docker
```

Set aws credentials and region

```shell
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_DEFAULT_REGION=eu-north-1
```

Install dependencies

```shell
yarn install
```

Build cdk stack

```shell
cd deploy
yarn cdk synth
```

Bootstrap cdk

```shell
yarn cdk bootstrap
```

Deploy stack

```shell
yarn cdk deploy
```

https://aws.amazon.com/blogs/infrastructure-and-automation/use-aws-cdk-to-initialize-amazon-rds-instances/

https://aws.amazon.com/premiumsupport/knowledge-center/api-gateway-cloudfront-distribution/

https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-api

https://aws.amazon.com/blogs/devops/building-apps-with-aws-cdk/

https://serverlessland.com/patterns/cloudfront-s3-lambda-cdk

https://docs.aws.amazon.com/cdk/api/v1/docs/aws-lambda-nodejs-readme.html