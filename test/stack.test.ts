import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Jubilance from '../lib/stack';

test('The Stack', () => {
    const app = new cdk.App();
    const stack = new Jubilance.default(app, 'MyTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Function', {
        Handler: 'index.main',
        Runtime: 'nodejs18.x',
    });
});
