import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';


test('Empty Stack', () => {
    const app = new cdk.App();
    // // WHEN
    // const stack = new TemplateCoreApp.TemplateCoreAppStack(app, 'MyTestStack');
    // // THEN
    // expectCDK(stack).to(matchTemplate({
    //   "Resources": {}
    // }, MatchStyle.EXACT))
});
