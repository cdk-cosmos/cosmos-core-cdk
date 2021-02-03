// import { SynthUtils } from '@aws-cdk/assert';
import * as fs from 'fs';
import * as path from 'path';
import { Stack } from '@aws-cdk/core';
import { app } from '../bin/main';

describe('Entire App', () => {
  const stacks = app.node.findAll().filter(Stack.isStack);
  const synth = app.synth({ force: true });
  for (const stack of stacks) {
    test(`Stack ${stack.node.path}`, () => {
      const stackSynth = JSON.parse(fs.readFileSync(path.join(synth.directory, stack.templateFile)).toString('utf-8'));
      expect(stackSynth).toMatchSnapshot();
    });
  }
});
