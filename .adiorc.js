const get = require("lodash.get");

module.exports = {
    parser: {
        plugins: ["jsx", "classProperties", "dynamicImport", "throwExpressions", "typescript"]
    },
    traverse: ({ path, push }) => {
        const { node } = path;
        if (node.type === "CallExpression") {
            if (
                get(node, "callee.property.name") === "resolve" &&
                get(node, "callee.object.name") === "require"
            ) {
                const possiblePackage = get(node, "arguments.0.value");
                if (typeof possiblePackage === "string") {
                    return push(possiblePackage);
                }
            }
        }
    },
    ignore: {
        src: ["path", "os", "fs", "util", "events", "crypto", "aws-sdk", "url"],
        dependencies: [
            "@babel/runtime",
            // Packages below are defined as peerDependencies in many 3rd party packages
            // and make yarn go crazy with warnings. We define these packages as "dependencies"
            // in our own packages, but we don't directly use them:
            "@emotion/core",
            "@svgr/webpack",
            "@types/react",
            "prop-types",
            "apollo-cache",
            "apollo-client",
            "apollo-link",
            "apollo-utilities",
            "graphql",
            "react-dom"
        ],
        devDependencies: true,
        peerDependencies: true
    },
    ignoreDirs: ["node_modules/", "dist/", "build/"],
    packages: ["packages/*", "api/code/api", "apps/admin/code", "apps/website/code"]
};
