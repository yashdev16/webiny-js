import { IDependencyTree } from "~/types";
import { DependencyTree } from "./DependencyTree";
import { PackageJson } from "type-fest";
import loadJsonFile from "load-json-file";

export interface IListAllDependenciesListParams {
    basePath: string;
    files: string[];
    ignore?: RegExp;
}
export class ListAllDependencies {
    public async list(params: IListAllDependenciesListParams): Promise<IDependencyTree> {
        const { basePath, files, ignore } = params;
        const tree = new DependencyTree();
        for (const file of files) {
            try {
                const json = loadJsonFile.sync<PackageJson>(file);
                tree.push({
                    file: file.replace(basePath, ""),
                    json,
                    ignore
                });
            } catch (ex) {
                console.log(`Failed to load "${file}".`);
            }
        }
        return tree;
    }
}
