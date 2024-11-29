// Since this script is always run after a project deployment, we can be sure
// `getStackOutput` function is available and ready to use.
const { getStackOutput } = require("@webiny/cli-plugin-deploy-pulumi/utils");

const adminStackOutput = getStackOutput({
    folder: "apps/admin",
    env: "dev"
});

const websiteStackOutput = getStackOutput({
    folder: "apps/website",
    env: "dev"
});

console.log(`### Deployment Summary
| App | URL |
|-|----|
| Admin Area | [${adminStackOutput.appUrl}](${adminStackOutput.appUrl}) |
| Website | [${websiteStackOutput.appUrl}](${websiteStackOutput.appUrl}) |
`);
