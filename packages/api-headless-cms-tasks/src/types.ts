import { HcmsBulkActionsContext } from "@webiny/api-headless-cms-bulk-actions/types";
import { AcoContext } from "@webiny/api-aco/types";

export interface HcmsTasksContext extends HcmsBulkActionsContext, AcoContext {}
