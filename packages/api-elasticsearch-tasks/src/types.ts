import { ElasticsearchContext } from "@webiny/api-elasticsearch/types";
import { Entity } from "@webiny/db-dynamodb/toolbox";
import {
    Context as TasksContext,
    IIsCloseToTimeoutCallable,
    ITaskResponseDoneResultOutput
} from "@webiny/tasks/types";
import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { Client } from "@webiny/api-elasticsearch";
import { createTable } from "~/definitions";
import { ITaskResponse } from "@webiny/tasks/response/abstractions";
import { ITaskManagerStore } from "@webiny/tasks/runner/abstractions";
import { BatchWriteItem, BatchWriteResult } from "@webiny/db-dynamodb";
import { ITimer } from "@webiny/handler-aws";
import { Context as LoggerContext } from "@webiny/api-log/types";

export interface Context extends ElasticsearchContext, TasksContext, LoggerContext {}

export interface IElasticsearchTaskConfig {
    documentClient?: DynamoDBDocument;
    elasticsearchClient?: Client;
}

export interface IElasticsearchIndexingTaskValuesKeys {
    PK: string;
    SK: string;
}

export interface IIndexSettingsValues {
    numberOfReplicas: number;
    refreshInterval: string;
}

export interface IElasticsearchIndexingTaskValuesSettings {
    [key: string]: IIndexSettingsValues;
}

export interface IElasticsearchIndexingTaskValues {
    matching?: string;
    limit?: number;
    keys?: IElasticsearchIndexingTaskValuesKeys;
    settings?: IElasticsearchIndexingTaskValuesSettings;
}

export interface AugmentedError extends Error {
    data?: Record<string, any>;
    [key: string]: any;
}

export interface IDynamoDbElasticsearchRecord {
    PK: string;
    SK: string;
    index: string;
    _et?: string;
    entity: string;
    data: Record<string, any>;
    modified: string;
}

export interface IManager<
    T,
    O extends ITaskResponseDoneResultOutput = ITaskResponseDoneResultOutput
> {
    readonly documentClient: DynamoDBDocument;
    readonly elasticsearch: Client;
    readonly context: Context;
    readonly table: ReturnType<typeof createTable>;
    readonly isCloseToTimeout: IIsCloseToTimeoutCallable;
    readonly isAborted: () => boolean;
    readonly response: ITaskResponse<T, O>;
    readonly store: ITaskManagerStore<T>;
    readonly timer: ITimer;

    getEntity: (name: string) => Entity<any>;

    write: (items: BatchWriteItem[]) => Promise<BatchWriteResult>;
}
