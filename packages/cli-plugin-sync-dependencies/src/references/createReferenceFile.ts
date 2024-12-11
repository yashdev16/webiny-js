import { CliContext } from "@webiny/cli/types";
import writeJsonFile from "write-json-file";
import { IDependencyTree } from "~/types";
import path from "path";

export interface ICreateReferenceFileParams {
    context: CliContext;
    tree: IDependencyTree;
    dirname: string;
    target?: string;
}

export const createReferenceFile = async (params: ICreateReferenceFileParams): Promise<void> => {
    const { context, dirname, tree, target } = params;

    const referencesPath = path.join(dirname, target || "", "references.json");
    const duplicatesPath = path.join(dirname, target || "", "duplicates.json");

    if (tree.references.length === 0) {
        context.log("No references found.");
        return;
    }

    writeJsonFile.sync(
        referencesPath,
        {
            dependencies: tree.dependencies,
            devDependencies: tree.devDependencies,
            peerDependencies: tree.peerDependencies,
            resolutions: tree.resolutions,
            references: tree.references
        },
        {
            indent: 2
        }
    );

    writeJsonFile.sync(duplicatesPath, tree.duplicates, {
        indent: 2
    });
};
