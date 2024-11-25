import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { Bind } from "@webiny/form";
import { CmsModel } from "@webiny/app-headless-cms-common/types";
import { Fields } from "~/admin/components/ContentEntryForm/Fields";

export interface DefaultLayoutProps {
    model: CmsModel;
}

export const DefaultLayout = makeDecoratable("DefaultLayout", ({ model }: DefaultLayoutProps) => {
    return (
        <Fields
            contentModel={model}
            fields={model.fields || []}
            layout={model.layout || []}
            /**
             * TODO @ts-refactor
             * Figure out type for Bind.
             */
            // @ts-expect-error
            Bind={Bind}
        />
    );
});
