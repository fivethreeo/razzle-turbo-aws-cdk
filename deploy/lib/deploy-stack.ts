import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as path from "path";
import * as cdk from "@aws-cdk/core";
import { CfnOutput, Duration, Stack, Token } from "@aws-cdk/core";
import { CdkResourceInitializer } from "../lib/resource-initializer";
import * as lambda from "@aws-cdk/aws-lambda";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  Port,
  SubnetType,
  Vpc,
} from "@aws-cdk/aws-ec2";
import { RetentionDays } from "@aws-cdk/aws-logs";
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  DatabaseSecret,
  PostgresEngineVersion,
} from "@aws-cdk/aws-rds";
import * as s3_deployment from "@aws-cdk/aws-s3-deployment";

export class RdsInitStackExample extends Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new lambda.Function(this, "MyGoFunction", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'main',
      code: lambda.Code.fromAsset(
        path.join(__dirname, "folder-containing-source-code"),
        {
          bundling: {
            image: lambda.Runtime.NODEJS_12_X.bundlingImage,
            command: [],
            local: {
              tryBundle(outputDir: string) {
                return true;
              },
            },
          },
        }
      ),
    });
    /*
    const instanceIdentifier = 'postres-01'
    const credsSecretName = `/${id}/rds/creds/${instanceIdentifier}`.toLowerCase()
    const creds = new DatabaseSecret(this, 'PostgresRdsCredentials', {
      secretName: credsSecretName,
      username: 'admin'
    })

    const vpc = new Vpc(this, 'MyVPC', {
      subnetConfiguration: [{
        cidrMask: 24,
        name: 'ingress',
        subnetType: SubnetType.PUBLIC,
      },{
        cidrMask: 24,
        name: 'compute',
        subnetType: SubnetType.PRIVATE_WITH_NAT,
      },{
        cidrMask: 28,
        name: 'rds',
        subnetType: SubnetType.PRIVATE_ISOLATED,
      }]
    })

    const dbServer = new DatabaseInstance(this, 'PostgresRdsInstance', {
      vpcSubnets: {
        onePerAz: true,
        subnetType: SubnetType.PRIVATE_ISOLATED
      },
      credentials: Credentials.fromSecret(creds),
      vpc: vpc,
      port: 3306,
      databaseName: 'main',
      allocatedStorage: 20,
      instanceIdentifier,
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_13_4
      }),
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.LARGE)
    })
    // potentially allow connections to the RDS instance...
    // dbServer.connections.allowFrom ...

     const initializer = new CdkResourceInitializer(this, 'MyRdsInit', {
      config: {
        credsSecretName
      },
      fnLogRetention: RetentionDays.FIVE_MONTHS,
      fnCode: DockerImageCode.fromImageAsset(`${__dirname}/rds-init-fn-code`, {}),
      fnTimeout: Duration.minutes(2),
      fnSecurityGroups: [],
      vpc,
      subnetsSelection: vpc.selectSubnets({
        subnetType: SubnetType.PRIVATE_WITH_NAT
      })
    })
    // manage resources dependency
    initializer.customResource.node.addDependency(dbServer)

    // allow the initializer function to connect to the RDS instance
    dbServer.connections.allowFrom(initializer.function, Port.tcp(3306))

    // allow initializer function to read RDS instance creds secret
    creds.grantRead(initializer.function)
    new CfnOutput(this, 'RdsInitFnResponse', {
      value: Token.asString(initializer.response)
    })
    */
  }
}
