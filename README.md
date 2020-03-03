# Template Core App

This repo serves as a starting point for creating the core infra, that will be later used by consumer apps.

# Bootstrapping

Bootstrapping is a term use to get the core infra initially deployed manually so that it can take over and deploy its self. This can also be referred to as the chicken and egg situation.

As mentioned we will have to bootstrap the core infra once manually, then the CiCd stack will take over with the CdkPipeline (called DeployProject).

Steps:

1. Clone this repo (https://github.com/carnivalofthecosmos/template-core-app.git).
2. Run `npm install`
3. Open `bin/main.ts` and change the project name from `TemplateCore` to your core project name. Also change cidr ranges for accounts
4. Aws Cli Login.
5. Bootstrap, run `npx cdk deploy Core-${AccountName}-CiCd` (Please change to your account name).
6. Update git remote url `git remote set-url origin "https://git-codecommit.ap-southeast-2.amazonaws.com/v1/repos/core-cdk-repo"` (Please change region etc as required).
7. Push your custom version of the template to your core cdk repo, `git push`
8. Done: Now use the core cdk pipeline to deploy any further changes to your app cdk code (Pipeline Named `Core-Cdk-Pipeline`)

# Whats included

TODO:
