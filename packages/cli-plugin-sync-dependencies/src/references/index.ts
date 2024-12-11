import path from "path";
import { CliContext } from "@webiny/cli/types";
import { IDependencyTree } from "~/types";
import { ListAllPackages } from "~/references/ListAllPackages";
import { ListAllPackageJsonFiles } from "./ListAllPackageJsonFiles";
import { ListAllDependencies } from "./ListAllDependencies";

export interface IListAllReferencesParams {
    context: CliContext;
    dirname: string;
}

export const listAllReferences = async (
    params: IListAllReferencesParams
): Promise<IDependencyTree> => {
    const { context } = params;
    const basePath = context.project.root;
    const target = path.join(basePath, "packages");

    const listAllPackages = new ListAllPackages();
    const listAllPackageJsonFiles = new ListAllPackageJsonFiles();
    const listAllDependencies = new ListAllDependencies();

    const allPackages = await listAllPackages.list(target);

    const allPackageJsonFiles = await listAllPackageJsonFiles.list({
        targets: allPackages
    });

    const files = [path.join(basePath, "package.json"), ...allPackageJsonFiles];

    return await listAllDependencies.list({
        basePath,
        files,
        ignore: /^@webiny\//
    });
};
