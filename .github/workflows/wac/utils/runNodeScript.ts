import path from "path";

export const runNodeScript = (name: string, params: string = "") => {
    //const scriptPath = `./path.join(__dirname, "runNodeScripts", `${name}.js`);
    const scriptPath = `\${{ github.workspace }}/.github/workflows/wac/utils/runNodeScripts/${name}.js`;
    return `node ${scriptPath} ${params}`;
};
