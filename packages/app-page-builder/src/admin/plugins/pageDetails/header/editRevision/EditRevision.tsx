import React, { useCallback, useMemo, useState } from "react";
import { IconButton } from "@webiny/ui/Button";
import { useRouter } from "@webiny/react-router";
import { Tooltip } from "@webiny/ui/Tooltip";
import { ReactComponent as EditIcon } from "@webiny/app-page-builder/admin/assets/edit.svg";
import { CREATE_PAGE } from "@webiny/app-page-builder/admin/graphql/pages";
import { useSnackbar } from "@webiny/app-admin/hooks/useSnackbar";
import { useSecurity } from "@webiny/app-security";
import { i18n } from "@webiny/app/i18n";
const t = i18n.ns("app-headless-cms/app-page-builder/page-details/header/edit");
import { useMutation } from "@apollo/react-hooks";

const EditRevision = props => {
    const { identity } = useSecurity();
    const { page } = props;
    const { history } = useRouter();
    const [inProgress, setInProgress] = useState<boolean>();
    const { showSnackbar } = useSnackbar();
    const [createPageFrom] = useMutation(CREATE_PAGE);

    const createFromAndEdit = useCallback(async () => {
        setInProgress(true);
        const response = await createPageFrom({
            variables: { from: page.id }
        });
        setInProgress(false);
        const { data, error } = response.data.pageBuilder.createPage;
        if (error) {
            return showSnackbar(error.message);
        }

        history.push(`/page-builder/editor/${encodeURIComponent(data.id)}`);
    }, [page]);

    const pbPagePermission = useMemo(() => identity.getPermission("pb.page"), []);
    if (!pbPagePermission) {
        return null;
    }

    if (pbPagePermission.own && page?.createdBy?.id !== identity.login) {
        return null;
    }

    if (typeof pbPagePermission.rwd === "string" && !pbPagePermission.rwd.includes("r")) {
        return null;
    }

    if (page.locked) {
        return (
            <Tooltip content={t`Edit`} placement={"top"}>
                <IconButton
                    disabled={inProgress}
                    icon={<EditIcon />}
                    onClick={createFromAndEdit}
                    data-testid={"pb-page-details-header-edit-revision"}
                />
            </Tooltip>
        );
    }

    return (
        <Tooltip content={t`Edit`} placement={"top"}>
            <IconButton
                disabled={inProgress}
                icon={<EditIcon />}
                onClick={() => history.push(`/page-builder/editor/${encodeURIComponent(page.id)}`)}
                data-testid={"pb-page-details-header-edit-revision"}
            />
        </Tooltip>
    );
};

export default EditRevision;
