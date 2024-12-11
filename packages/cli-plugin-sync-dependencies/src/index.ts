import { CliCommandPlugin } from "@webiny/cli-plugin-scaffold/types";
import path from "path";
import { listAllReferences } from "./references";
import { createReferenceFile } from "./references/createReferenceFile";
import { verifyDependencies } from "./references/verifyDependencies";

interface ISyncDependenciesArgs {
    write?: boolean;
    verify?: boolean;
}

const getDirname = (): string => {
    let name = __dirname;
    if (name.endsWith("/dist")) {
        name = name.replace("/dist", "");
    }

    return path.join(name, "/src/files/");
};

export default (): CliCommandPlugin[] => {
    return [
        {
            type: "cli-command",
            name: "cli-command-sync-dependencies",
            create({ yargs, context }) {
                yargs.command(
                    "sync-dependencies",
                    "Sync dependencies for all packages.",
                    (yargs: Record<string, any>) => {
                        yargs.example("$0 sync-dependencies");
                        yargs.example("$0 sync-dependencies --create-reference");

                        yargs.option("write", {
                            describe: `Write files.`,
                            type: "boolean"
                        });

                        yargs.option("verify", {
                            describe: `Verify dependencies.`,
                            type: "boolean"
                        });
                    },
                    async (args: ISyncDependenciesArgs) => {
                        const dirname = getDirname();
                        const tree = await listAllReferences({
                            context,
                            dirname
                        });

                        if (args.verify) {
                            await verifyDependencies({
                                tree,
                                dirname
                            });
                            return;
                        } else if (!args.write) {
                            console.log(JSON.stringify(tree));
                            return;
                        }
                        await createReferenceFile({
                            tree,
                            dirname,
                            context
                        });
                    }
                );
            }
        }
    ];
};
