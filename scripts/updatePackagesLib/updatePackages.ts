import path from "path";
import { allWorkspaces } from "../../packages/project-utils/workspaces";
import { BasicPackages } from "./BasicPackages";
import { LatestVersionPackages } from "./LatestVersionPackages";
import { ResolutionPackages } from "./ResolutionPackages";
import { UpPackages } from "./UpPackages";

const getAllPackages = (): string[] => {
    const workspaces = allWorkspaces() as string[];
    const packages = workspaces.map(pkg => {
        return path.resolve(process.cwd(), pkg);
    });

    packages.push(path.resolve(process.cwd()));

    return packages;
};

interface IUpdatePackagesParams {
    dryRun: boolean;
    skipResolutions: boolean;
    matching: RegExp;
}

export const updatePackages = async (params: IUpdatePackagesParams) => {
    const { matching, skipResolutions, dryRun } = params;
    /**
     * Basic packages container with all packages that match the regex and their versions in the package.json files.
     */
    const packages = await BasicPackages.create({
        packages: getAllPackages(),
        matching
    });
    /**
     * Versioned packages container.
     * All packages with latest versions
     */
    const latestVersionPackages = await LatestVersionPackages.create();

    const updatable = await latestVersionPackages.getUpdatable({
        packages: packages.packages
    });
    if (updatable.length === 0) {
        console.log("All packages are up-to-date. Exiting...");
        return;
    }
    if (dryRun !== false) {
        console.log("Dry run mode enabled. Packages which will get updated:");
        for (const pkg of updatable) {
            console.log(`${pkg.name}: ${pkg.version.raw} -> ${pkg.latestVersion.raw}`);
        }
        return;
    }

    const resolutions = await ResolutionPackages.create({
        skip: skipResolutions,
        path: path.resolve(process.cwd(), "package.json"),
        packages: updatable
    });

    await resolutions.addToPackageJson();

    const updatePackages = await UpPackages.create({
        packages: updatable
    });

    await updatePackages.process();

    await resolutions.removeFromPackageJson();
};
