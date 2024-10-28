import React from "react";
import { ButtonRendererWithVariables } from "~/render/variables/button";
import { ParagraphRendererWithVariables } from "~/render/variables/paragraph";
import { HeadingRendererWithVariables } from "~/render/variables/heading";
import { IconRendererWithVariables } from "~/render/variables/icon";

export const InjectElementVariables = () => {
    return (
        <>
            <ButtonRendererWithVariables />
            <ParagraphRendererWithVariables />
            <HeadingRendererWithVariables />
            <IconRendererWithVariables />
        </>
    );
};
