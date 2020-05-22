import adminTemplate from "@webiny/app-template-admin";
import headlessCmsPlugins from "@webiny/app-headless-cms/admin/plugins";
import "./App.scss";

export default adminTemplate({
    cognito: {
        region: process.env.REACT_APP_USER_POOL_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
    },
    plugins: [headlessCmsPlugins()]
});
