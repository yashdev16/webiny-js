import { createTaskDefinition } from "@webiny/tasks";
import { HcmsTasksContext } from "~/types";
import { IDeleteModelTaskInput, IDeleteModelTaskOutput } from "./types";
import { createDeleteModelRunner } from "~/tasks/deleteModel/DeleteModelRunner";
import { DELETE_MODEL_TASK } from "./constants";
import { createDeleteModelGraphQl } from "~/tasks/deleteModel/graphql";

const createDefinition = () => {
    return createTaskDefinition<HcmsTasksContext, IDeleteModelTaskInput, IDeleteModelTaskOutput>({
        id: DELETE_MODEL_TASK,
        disableDatabaseLogs: true,
        title: "Delete model and all of the entries",
        maxIterations: 50,
        isPrivate: true,
        async run(params) {
            try {
                const deleteModelRunner = createDeleteModelRunner({
                    taskId: params.store.getTask().id,
                    context: params.context,
                    response: params.response
                });
                return await deleteModelRunner.execute({
                    input: params.input,
                    isCloseToTimeout: params.isCloseToTimeout,
                    isAborted: params.isAborted
                });
            } catch (ex) {
                return params.response.error(ex);
            }
        },
        createInputValidation: ({ validator }) => {
            return {
                modelId: validator.string(),
                lastDeletedId: validator.string().optional()
            };
        }
    });
};

export const createDeleteModelTask = () => {
    return [createDefinition(), createDeleteModelGraphQl()];
};
