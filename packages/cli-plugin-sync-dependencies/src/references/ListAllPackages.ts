// @ts-expect-error
import getPackages from "get-yarn-workspaces";

export class ListAllPackages {
    public async list(path: string): Promise<string[]> {
        return await getPackages(path);
    }
}
