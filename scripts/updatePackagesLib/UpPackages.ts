import { IVersionedPackage } from "./types";
import execa from "execa";

export interface IUpPackagesParams {
    packages: IVersionedPackage[];
}

export class UpPackages {
    private readonly packages: IVersionedPackage[];

    private constructor(params: IUpPackagesParams) {
        this.packages = params.packages;
    }

    public static async create(params: IUpPackagesParams): Promise<UpPackages> {
        return new UpPackages(params);
    }

    public async process(): Promise<void> {
        for (const pkg of this.packages) {
            await execa("yarn", ["up", `${pkg.name}@^${pkg.latestVersion.raw}`]);
            console.log(`${pkg.name}: ${pkg.version.raw} -> ${pkg.latestVersion.raw}`);
        }
    }
}
