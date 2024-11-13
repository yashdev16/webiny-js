import { IPreset } from "./createPreset";
import inquirer from "inquirer";

export interface IGetUserInputParams {
    presets: IPreset[];
}

export interface IUserInputParams {
    dryRun: boolean;
    skipResolutions: boolean;
    matching: RegExp;
}

export const getUserInput = async ({
    presets
}: IGetUserInputParams): Promise<IUserInputParams | null> => {
    const prompt = inquirer.createPromptModule();

    const { dryRun } = await prompt({
        name: "dryRun",
        type: "confirm",
        default: true,
        message: "First, is this a dry run?"
    });

    const { preset } = await prompt({
        name: "preset",
        message: "Do you want to use a preset?",
        default: null,
        type: "list",
        choices: [
            { name: "I will write my own custom matching", value: null },

            ...presets.map(p => {
                return {
                    name: p.name,
                    value: p.name
                };
            })
        ]
    });
    if (preset) {
        const matching = presets.find(p => p.name === preset);
        if (!matching) {
            throw new Error(`Preset not found: ${preset}`);
        }
        return {
            ...matching,
            dryRun
        };
    }

    const { matching } = await prompt({
        name: "matching",
        type: "input",
        message: "Enter a regex to match package names.",
        validate(input: string) {
            try {
                if (!input || input.length < 3) {
                    return "Please enter a regex.";
                }
                new RegExp(input);
                return true;
            } catch (e) {
                return `Invalid regex: ${input}`;
            }
        }
    });

    const { skipResolutions } = await prompt({
        name: "skipResolutions",
        type: "list",
        default: null,
        message: "Skip adding packages to main package.json resolutions?",
        choices: [
            { name: "No", value: false },
            { name: "Yes", value: true }
        ]
    });

    const { confirm } = await prompt({
        name: "confirm",
        default: false,
        type: "list",
        message: `Confirm settings: matching - ${matching}, dry run - ${
            dryRun ? "yes" : "no"
        }, skip resolutions - ${skipResolutions ? "yes" : "no"})`,
        choices: [
            { name: "Not correct, exit.", value: false },
            { name: "Correct, continue.", value: true }
        ]
    });
    if (!confirm) {
        return null;
    }

    return {
        matching,
        dryRun,
        skipResolutions
    };
};
