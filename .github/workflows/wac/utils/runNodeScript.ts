import jsesc from "jsesc";
import fs from "fs";
import path from "path";

export const runNodeScript = (name: string) => {
    const scriptPath = path.join(__dirname, "runNodeScripts", `${name}.js`);
    const rawCode = fs.readFileSync(scriptPath).toString();
    const escapedCode = jsesc(rawCode);
    return `node -e "${escapedCode}"`;
};
