import {
    CmsModelFieldConverterPlugin,
    ConvertParams
} from "~/plugins/CmsModelFieldConverterPlugin";
import { GenericRecord } from "@webiny/api/types";

export class CmsModelDefaultFieldConverterPlugin extends CmsModelFieldConverterPlugin {
    public override name = "cms.field.converter.default";

    public override getFieldType(): string {
        return "*";
    }

    public override convertToStorage({ field, value }: ConvertParams): GenericRecord {
        /**
         * Do not convert if no value was passed.
         */
        if (value === undefined) {
            return {};
        }
        /**
         * A single and multiple values field conversion;
         */
        return {
            [field.storageId]: value
        };
    }

    public override convertFromStorage({ field, value }: ConvertParams): GenericRecord {
        /**
         * Do not convert if no value was passed.
         */
        if (value === undefined) {
            return {};
        }
        /**
         * A single and multiple values field conversion;
         */
        return {
            [field.fieldId]: value
        };
    }
}
