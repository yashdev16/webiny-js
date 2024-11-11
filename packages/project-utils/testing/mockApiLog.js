export const createMockApiLog = () => {
    const logging = {
        notice: () => {
            return;
        },
        debug: () => {
            return;
        },
        info: () => {
            return;
        },
        warn: () => {
            return;
        },
        error: () => {
            return;
        }
    };
    return {
        async flush() {
            return [];
        },
        withSource: () => {
            return logging;
        },
        ...logging
    };
};
