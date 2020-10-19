# Core Template

This template is the boilerplate code for a Cosmos Core.


## The Big Bang: Bootstrapping the Cosmos

This section describes the steps involved in bootstrapping a Cosmos Core.

The Core template includes a CI/CD stack responsible for building and deploying your CDK and code, including any changes to the Core itself. However, before this CI/CD stack can deploy anything, it needs to be deployed itself. This is where the bootstrapping process comes in.

Once the CI/CD stack and the other essential resources of a Core are deployed, further resources may be created by adding CDK or Cosmos constructs, or uncommenting the helper code included with this Core in `bin/main.ts`. It may then be deployed using the Core's own CDK CodePipeline.

## Steps

1. Clone the this repository to your workstation (https://github.com/cdk-cosmos/cosmos-core-cdk.git)

2. In the base directory of this project, run `npm install`.

3. In `bin/main.ts`, complete the configuration objects with your account numbers and regions. You may also wish to add a `prdEnvConfig` object, or any that works with your particular multi-account pattern.

```ts
// AWS Env Config
const mgtEnvConfig = { account: '<your management AWS account number here>', region: '<your preferred region here' };
const devEnvConfig = { account: '<your dev AWS account number here>', region: '<your preferred region here' };
```

4. In `bin/main.ts`, change the project name from `Demo` to the name of your Core.

```ts
// Create the Cosmos (Core)
const cosmos = new CosmosCoreStack(app, 'Demo', {
  tld: 'cosmos.com',
  env: mgtEnvConfig,
});
```

5. Add the appropriate CIDR ranges to your CI/CD Solar System and Dev Galaxy:

```ts
// Create the CiCd Solar System
const ciCd = new SolarSystemCoreStack(mgtGalaxy, 'CiCd', {
  cidr: '<your-cicd-cidr-range-here>',
});
ciCd.addCiCd();

// Create an Dev Galaxy with cidr
const devGalaxy = new GalaxyCoreStack(cosmos, 'Dev', {
  cidr: '<your-dev-galaxy-cidr-range-here>',
  env: devEnvConfig,
});
devGalaxy.addSharedVpc();
```

At this point you have reached the minimal requirements to bootstrap your Cosmos Core. We don't recommend adding any further resources until the bootstrapping process below is complete.

5. Follow the instructions [here](https://github.com/cdk-cosmos/cosmos/tree/develop/packages/%40cosmos-building-blocks/common#the-cosmos-cdk-toolkit) to deploy the Cosmos CDK Toolkit. 

6. Using the credentials of your AWS master account, log in to the AWS CLI.

7. Run `npx cdk --app “node_modules/@cosmos-building-blocks/common/lib/cdk-toolkit/bootstrap-app.js” deploy`. 

This will archive this Core and pass it as an asset to the Cosmos CDK Toolkit s3 bucket in your master account, and trigger the CodeBuild job to bootstrap your Core.

8. A CodeCommit repository to house this newly customised Core was created as part of the bootstrapping process above. Update the git repository in this Core to point to the new CodeCommit repository. Replacing the `<your-region>` section with the region you selected in `Step 3`, run the following command:

`git remote set-url origin "https://git-codecommit.<your-region>.amazonaws.com/v1/repos/core-cdk-repo"` 

9. Add the changes made to this template by running `git add .`, commit the changes by running `git commit -m "inital commit"`, and push the changes to CodeCommit by running `git push`

Your Core is bootstrapped. Any further changes may be deployed using the Core's own CDK CodePipeline.
