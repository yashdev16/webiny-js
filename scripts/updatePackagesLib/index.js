#!/usr/bin/env node
process.env.NODE_PATH = process.cwd();
require("ts-node").register({
    dir: __dirname
});

const { presets } = require("./presets");
const { updatePackages } = require("./updatePackages");
const { getUserInput } = require("./getUserInput");

module.exports = {
    updatePackages,
    getUserInput,
    presets
};
