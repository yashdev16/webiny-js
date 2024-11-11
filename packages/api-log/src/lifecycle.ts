import { createModifyFastifyPlugin } from "@webiny/handler";
import { Context } from "./types";

export const createLifecycle = () => {
    return createModifyFastifyPlugin(app => {
        const execute = async () => {
            // @ts-expect-error
            if (app.webiny.___flushedLogs) {
                return;
            }
            // @ts-expect-error
            app.webiny.___flushedLogs = true;
            const context = app.webiny as Context;
            try {
                await context.logger.log.flush();
            } catch (ex) {
                console.error("Error flushing logs.");
                console.log(ex);
            }
        };

        app.addHook("onTimeout", async () => {
            execute();
        });

        app.addHook("onResponse", async () => {
            execute();
        });
    });
};
