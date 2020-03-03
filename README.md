# Template Core App

This repo serves as a starting point for creating the core infra, that will be later used by consumer apps.

# Bootstrapping

Bootstrapping is a term use to get the core infra initially deployed manually so that it can take over and deploy its self. This can also be referred to as the chicken and egg situation.

As mentioned we will have to bootstrap the core infra once manually, then the CiCd stack will take over with the CdkPipeline (called DeployProject).

Steps:

1. Clone this repo (https://github.com/timpur/cosmos-core-cdk.git).
2. Run `npm install`
3. Open `bin/main.ts` and change the project name from `DemoCore` to your core project name.
   - Also change cidr ranges for galaxies (Accounts)
   - Also Change anything else as needed.
   - Though We recommend you leave any solar system disabled during bootstrap (Enabled later).
4. Aws Cli Login.
5. Bootstrap Ci/Cd, run `npx cdk deploy Cosmos-Core-Galaxy-${Account}-SolarSystem-CiCd` (Please change to your account name).
6. Bootstrap Accounts, run `npx cdk deploy Cosmos-Core-Galaxy-${Account}` for each account that you have (you will need to change credentials).
7. Update git remote url `git remote set-url origin "https://git-codecommit.ap-southeast-2.amazonaws.com/v1/repos/core-cdk-repo"` (Please change region etc as required).
8. Enable your Solar Systems, commit, push and then deploy your changes using the pipeline (`git push`, run Pipeline `Core-Cdk-Pipeline`).
9. Your Done: Now use the core cdk pipeline to deploy any further changes to your app cdk code.

# Whats included

TODO:
