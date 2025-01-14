import React from "react";
import get from "lodash/get";
import { CmsModelFieldRendererPlugin } from "~/types";
import { Input } from "@webiny/ui/Input";
import { i18n } from "@webiny/app/i18n";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange";

const t = i18n.ns("app-headless-cms/admin/fields/text");

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-long-text-textarea",
    renderer: {
        rendererName: "long-text-text-area",
        name: t`Text Area`,
        description: t`Renders a simple text area, suitable for larger amounts of text.`,
        canUse({ field }) {
            return (
                field.type === "long-text" &&
                !field.multipleValues &&
                !get(field, "predefinedValues.enabled")
            );
        },
        render({ field, getBind }) {
            const Bind = getBind();

            return (
                <Bind>
                    {bind => (
                        <DelayedOnChange
                            value={bind.value}
                            onChange={bind.onChange}
                            onBlur={bind.validate}
                        >
                            <Input
                                rows={5}
                                label={field.label}
                                placeholder={field.placeholderText}
                                description={field.helpText}
                                data-testid={`fr.input.longtext.${field.label}`}
                                validation={bind.validation}
                            />
                        </DelayedOnChange>
                    )}
                </Bind>
            );
        }
    }
};

export default plugin;
