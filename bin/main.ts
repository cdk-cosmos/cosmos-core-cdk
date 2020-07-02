#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import {
  CosmosCoreStack,
  GalaxyCoreStack,
  CiCdSolarSystemCoreStack,
  EcsSolarSystemCoreStack,
} from "@cdk-cosmos/core";

// Cdk App
const app = new App();

// Aws Env Config
const mgtEnvConfig = { account: "1111", region: "ap-southeast-2" };
const devEnvConfig = { account: "2222", region: "ap-southeast-2" };

// Create the Cosmos (Core)
const cosmos = new CosmosCoreStack(app, "Demo", {
  tld: "cosmos.com",
  env: mgtEnvConfig,
});

// Create an Mgt Galaxy with cidr
const mgtGalaxy = new GalaxyCoreStack(cosmos, "Mgt");

// Create the CiCd Solar System
const ciCd = new CiCdSolarSystemCoreStack(mgtGalaxy, {
  cidr: "10.0.0.0/24",
});

// Create an Dev Galaxy with cidr
const devGalaxy = new GalaxyCoreStack(cosmos, "Dev", {
  cidr: "10.0.1.0/24",
  env: devEnvConfig,
});
devGalaxy.addSharedVpc();

// TODO: Enable Solar Systems after bootstrap

// // Create an Dev Solar System which is Ecr capable
// const dev = new EcsSolarSystemCoreStack(devGalaxy, "Dev", {
//   vpc: devGalaxy.vpc,
// });

// // Create an Tst Solar System which is Ecr capable
// const tst = new EcsSolarSystemCoreStack(devGalaxy, "Tst", {
//   vpc: devGalaxy.vpc,
// });
