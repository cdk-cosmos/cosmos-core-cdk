#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import {
  CosmosStack,
  GalaxyStack,
  CiCdSolarSystemStack,
  EcsSolarSystemStack
} from "@cdk-cosmos/core";

const app = new App();

const mgtEnvConfig = { account: "583682874749", region: "ap-southeast-2" };
const devEnvConfig = { account: "855215228333", region: "ap-southeast-2" };

// Project Infra
const cosmos = new CosmosStack(app, "DemoCore", {
  tld: "cosmos.com",
  env: mgtEnvConfig
});

// Mgt Account Infra
const mgtGalaxy = new GalaxyStack(cosmos, "Mgt", {
  cidr: "10.0.0.0/22"
});

// CiCd Infra
const ciCd = new CiCdSolarSystemStack(mgtGalaxy, {
  cidr: mgtGalaxy.NetworkBuilder.addSubnet(24)
});

// Dev Account Infra
const devGalaxy = new GalaxyStack(cosmos, "Dev", {
  cidr: "10.0.1.0/22",
  env: devEnvConfig
});

// Dev App Env Infra
const dev = new EcsSolarSystemStack(devGalaxy, "Dev", {
  cidr: mgtGalaxy.NetworkBuilder.addSubnet(24)
});

// Tst App Env Infra
const tst = new EcsSolarSystemStack(devGalaxy, "Tst");
