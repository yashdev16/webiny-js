export const runNodeScript = (name: string, params: string = "") => {
    const scriptPath = `.github/workflows/wac/utils/runNodeScripts/${name}.js`;
    return `node ${scriptPath} '${params}'`;
};
