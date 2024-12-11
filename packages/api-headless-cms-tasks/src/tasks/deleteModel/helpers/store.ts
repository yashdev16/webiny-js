import { CmsIdentity, CmsModel } from "@webiny/api-headless-cms/types";
import { IStoreValue } from "~/tasks/deleteModel/types";
import { StorageKey } from "@webiny/db/types";

export interface ICreateStoreValueParams {
    model: Pick<CmsModel, "modelId">;
    identity: CmsIdentity;
    task: string;
}

export const createStoreKey = (model: Pick<CmsModel, "modelId">): StorageKey => {
    return `deletingCmsModel#${model.modelId}`;
};

export const createStoreValue = (params: ICreateStoreValueParams): IStoreValue => {
    return {
        modelId: params.model.modelId,
        task: params.task,
        identity: params.identity
    };
};
