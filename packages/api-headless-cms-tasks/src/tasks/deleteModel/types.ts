import { CmsIdentity } from "@webiny/api-headless-cms/types";
import { ITaskResponseDoneResultOutput } from "@webiny/tasks";

export interface IDeleteModelTaskInput {
    modelId: string;
    lastDeletedId?: string;
}

export interface IDeleteModelTaskOutput extends ITaskResponseDoneResultOutput {
    total?: number;
    deleted?: number;
}

export enum DeleteCmsModelTaskStatus {
    RUNNING = "running",
    DONE = "done",
    ERROR = "error",
    ABORTED = "aborted"
}

export interface IDeleteCmsModelTask {
    id: string;
    status: DeleteCmsModelTaskStatus;
    total: number;
    deleted: number;
    message?: string;
}

export interface IStoreValue {
    modelId: string;
    task: string;
    identity: CmsIdentity;
}
