import { IDependencyTree } from "~/types";
import loadJsonFile from "load-json-file";
import { getDuplicatesFilePath, getReferencesFilePath } from "~/references/files";
import fs from "fs";

export interface IVerifyDependenciesParams {
    tree: IDependencyTree;
    dirname: string;
}

export const verifyDependencies = async (params: IVerifyDependenciesParams): Promise<void> => {
    const { tree, dirname } = params;

    const referencesFile = getReferencesFilePath({
        dirname
    });
    const duplicatesFile = getDuplicatesFilePath({
        dirname
    });

    const references = {
        dependencies: tree.dependencies,
        devDependencies: tree.devDependencies,
        peerDependencies: tree.peerDependencies,
        resolutions: tree.resolutions,
        references: tree.references
    };

    if (fs.existsSync(referencesFile)) {
        const json = await loadJsonFile(referencesFile);
        if (JSON.stringify(references) !== JSON.stringify(json)) {
            throw new Error("References are not in sync.");
        }
    } else {
        throw new Error("References file does not exist.");
    }

    if (fs.existsSync(duplicatesFile)) {
        const json = await loadJsonFile(duplicatesFile);
        if (JSON.stringify(tree.duplicates) !== JSON.stringify(json)) {
            throw new Error("Duplicates are not in sync.");
        }
    } else {
        throw new Error("Duplicates file does not exist.");
    }

    console.log("All package reference files are in sync in sync.");
};
