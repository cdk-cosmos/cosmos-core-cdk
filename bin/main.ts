#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import {
  CosmosStack,
  GalaxyStack,
  CiCdSolarSystemStack,
  EcsSolarSystemStack,
} from "@cdk-cosmos/core";

// Cdk App
const app = new App();

// Aws Env Config
const mgtEnvConfig = { account: "1111", region: "ap-southeast-2" };
const devEnvConfig = { account: "2222", region: "ap-southeast-2" };

// Create the Cosmos (Core)
const cosmos = new CosmosStack(app, "Demo", {
  tld: "cosmos.com",
  env: mgtEnvConfig,
});

// Create an Mgt Galaxy with cidr
const mgtGalaxy = new GalaxyStack(cosmos, "Mgt");

// Create the CiCd Solar System
const ciCd = new CiCdSolarSystemStack(mgtGalaxy, {
  cidr: "10.0.0.0/24",
});

// Create an Dev Galaxy with cidr
const devGalaxy = new GalaxyStack(cosmos, "Dev", {
  cidr: "10.0.1.0/24",
  env: devEnvConfig,
});
const devGalaxySharedVpc = devGalaxy.AddSharedVpc();

// TODO: Enable Solar Systems after bootstrap

// // Create an Dev Solar System which is Ecr capable
// const dev = new EcsSolarSystemStack(devGalaxy, "Dev", {
//   vpc: devGalaxySharedVpc,
// });

// // Create an Tst Solar System which is Ecr capable
// const tst = new EcsSolarSystemStack(devGalaxy, "Tst", {
//   vpc: devGalaxySharedVpc,
// });
