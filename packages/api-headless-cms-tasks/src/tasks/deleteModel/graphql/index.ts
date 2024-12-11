import zod from "zod";
import { ContextPlugin } from "@webiny/api";
import { CmsGraphQLSchemaPlugin } from "@webiny/api-headless-cms";
import { validateConfirmation } from "../helpers/confirmation";
import { HcmsTasksContext } from "~/types";
import { resolve } from "@webiny/handler-graphql";
import { fullyDeleteModel } from "~/tasks/deleteModel/graphql/fullyDeleteModel";
import { createZodError } from "@webiny/utils";
import { IDeleteCmsModelTask } from "~/tasks/deleteModel/types";
import { abortDeleteModel } from "~/tasks/deleteModel/graphql/abortDeleteModel";
import { getDeleteModelProgress } from "~/tasks/deleteModel/graphql/getDeleteModelProgress";

const deleteValidation = zod
    .object({
        modelId: zod.string(),
        confirmation: zod.string()
    })
    .superRefine((value, context) => {
        if (validateConfirmation(value)) {
            return;
        }
        context.addIssue({
            code: zod.ZodIssueCode.custom,
            message: `Confirmation input does not match.`,
            fatal: true,
            path: ["confirmation"]
        });
    })
    .readonly();

const abortValidation = zod
    .object({
        modelId: zod.string()
    })
    .readonly();

const getValidation = zod
    .object({
        modelId: zod.string()
    })
    .readonly();

export const createDeleteModelGraphQl = <T extends HcmsTasksContext = HcmsTasksContext>() => {
    const contextPlugin = new ContextPlugin<T>(async context => {
        const plugin = new CmsGraphQLSchemaPlugin<T>({
            typeDefs: /* GraphQL */ `
                enum DeleteCmsModelTaskStatus {
                    running
                    done
                    error
                    aborted
                }
                type DeleteCmsModelTask {
                    id: ID!
                    status: DeleteCmsModelTaskStatus!
                    deleted: Int!
                    total: Int!
                }

                type GetDeleteCmsModelProgressResponse {
                    data: DeleteCmsModelTask
                    error: CmsError
                }

                type FullyDeleteCmsModelResponse {
                    data: DeleteCmsModelTask
                    error: CmsError
                }

                type AbortDeleteCmsModelResponse {
                    data: DeleteCmsModelTask
                    error: CmsError
                }

                extend type Query {
                    getDeleteModelProgress(modelId: ID!): GetDeleteCmsModelProgressResponse!
                }

                extend type Mutation {
                    fullyDeleteModel(
                        modelId: ID!
                        confirmation: String!
                    ): FullyDeleteCmsModelResponse!
                    abortDeleteModel(modelId: ID!): AbortDeleteCmsModelResponse!
                }
            `,
            resolvers: {
                Query: {
                    getDeleteModelProgress: async (_, args, ctx) => {
                        return resolve<IDeleteCmsModelTask>(async () => {
                            const input = getValidation.safeParse(args);
                            if (input.error) {
                                throw createZodError(input.error);
                            }
                            return await getDeleteModelProgress({
                                context: ctx,
                                modelId: input.data.modelId
                            });
                        });
                    }
                },
                Mutation: {
                    fullyDeleteModel: async (_, args, ctx) => {
                        return resolve<IDeleteCmsModelTask>(async () => {
                            const input = deleteValidation.safeParse(args);
                            if (input.error) {
                                throw createZodError(input.error);
                            }
                            return await fullyDeleteModel({
                                context: ctx,
                                modelId: input.data.modelId
                            });
                        });
                    },
                    abortDeleteModel: async (_, args, ctx) => {
                        return resolve<IDeleteCmsModelTask>(async () => {
                            const input = abortValidation.safeParse(args);
                            if (input.error) {
                                throw createZodError(input.error);
                            }
                            return await abortDeleteModel({
                                context: ctx,
                                modelId: input.data.modelId
                            });
                        });
                    }
                }
            }
        });
        plugin.name = "headless-cms.graphql.fullyDeleteModel";
        context.plugins.register(plugin);
    });
    contextPlugin.name = "headless-cms.context.createDeleteModelGraphQl";
    return contextPlugin;
};
