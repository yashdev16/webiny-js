import React from "react";
import styled from "@emotion/styled";
import ImageSettings from "./ImageSettings";
import Image from "./Image";
import { imageCreatedEditorAction } from "./imageCreatedEditorAction";
import { CreateElementActionEvent } from "@webiny/app-page-builder/editor/recoil/actions";
import { ReactComponent as ImageIcon } from "./round-image-24px.svg";
import {
    PbEditorPageElementPlugin,
    PbEditorPageElementStyleSettingsPlugin,
    PbEditorEventActionPlugin
} from "@webiny/app-page-builder/types";
import { Plugin } from "@webiny/plugins/types";

const PreviewBox = styled("div")({
    textAlign: "center",
    height: 50,
    svg: {
        height: 50,
        width: 50
    }
});

export default (): Plugin[] => {
    return [
        {
            name: "pb-editor-page-element-image",
            type: "pb-editor-page-element",
            elementType: "image",
            toolbar: {
                title: "Image",
                group: "pb-editor-element-group-basic",
                preview() {
                    return (
                        <PreviewBox>
                            <ImageIcon />
                        </PreviewBox>
                    );
                }
            },
            settings: [
                "pb-editor-page-element-style-settings-image",
                ["pb-editor-page-element-style-settings-background", { image: false }],
                "pb-editor-page-element-style-settings-link",
                "pb-editor-page-element-style-settings-border",
                "pb-editor-page-element-style-settings-shadow",
                [
                    "pb-editor-page-element-style-settings-horizontal-align",
                    { alignments: ["left", "center", "right"] }
                ],
                "pb-editor-page-element-style-settings-padding",
                "pb-editor-page-element-style-settings-margin",
                "pb-editor-page-element-settings-clone",
                "pb-editor-page-element-settings-delete"
            ],
            target: ["cell", "block"],
            create(options) {
                return {
                    type: "image",
                    elements: [],
                    data: {
                        settings: {
                            horizontalAlign: "center",
                            margin: {
                                desktop: { all: "0px" },
                                mobile: { top: "0px", left: "0px", right: "0px", bottom: "15px" },
                                advanced: true
                            },
                            padding: {
                                desktop: { all: "0px" },
                                mobile: { all: "0px" }
                            }
                        }
                    },
                    ...options
                };
            },
            render({ element }) {
                return <Image element={element} />;
            }
        } as PbEditorPageElementPlugin,
        {
            name: "pb-editor-page-element-style-settings-image",
            type: "pb-editor-page-element-style-settings",
            render() {
                return <ImageSettings />;
            }
        } as PbEditorPageElementStyleSettingsPlugin,
        {
            name: "pb-editor-event-action-image-created",
            type: "pb-editor-event-action-plugin",
            onEditorMount(handler) {
                return handler.on(CreateElementActionEvent, imageCreatedEditorAction);
            }
        } as PbEditorEventActionPlugin
    ];
};
