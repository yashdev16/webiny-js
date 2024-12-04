import { createPreset } from "../createPreset";

export const jest = createPreset(() => {
    return {
        name: "jest",
        matching: /^@jest\/|^jest/,
        skipResolutions: true
    };
});
