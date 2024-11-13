import execa from "execa";
import semver from "semver";
import { IBasicPackage, IVersionedPackage } from "./types";

export interface IGetUpdatableParams {
    packages: IBasicPackage[];
}

export class LatestVersionPackages {
    private readonly cache: WeakMap<IBasicPackage[], IVersionedPackage[]> = new WeakMap();

    public async getUpdatable(params: IGetUpdatableParams): Promise<IVersionedPackage[]> {
        const cache = this.cache.get(params.packages);
        if (cache) {
            return cache;
        }

        const results: IVersionedPackage[] = [];

        for (const localPackage of params.packages) {
            try {
                const result = await execa("npm", ["show", localPackage.name, "version"]);
                if (!result.stdout) {
                    console.log(`Could not find "${localPackage.name}" latest version on npm.`);
                    continue;
                }
                const npmPackageVersion = semver.coerce(result.stdout);
                if (!npmPackageVersion) {
                    console.log(
                        `Could not coerce "${localPackage.name}" latest version "${result.stdout}" from npm.`
                    );
                    continue;
                }
                if (semver.gte(localPackage.version, npmPackageVersion)) {
                    continue;
                }

                results.push({
                    ...localPackage,
                    version: localPackage.version,
                    latestVersion: npmPackageVersion
                });
            } catch (ex) {
                console.error(`Could not find "${localPackage}" latest version on npm.`, ex);
            }
        }

        this.cache.set(params.packages, results);
        return results;
    }

    public static async create() {
        return new LatestVersionPackages();
    }
}
