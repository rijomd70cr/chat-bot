import React from "react";
import useRedirect from "../../../Core/Hooks/Redirect";

import Page from "../../../Components/Page";
import AdvanceSearch from '../Components/AdvanceSearch'
import NormalDataTable from "../../../Components/AppDataTable/NormalDataTable";

export default function List() {

    const { redirectTo } = useRedirect();
    const actions = [
        {
            label: "Create",
            action: () => {
                redirectTo('/deployments/create')
            }
        }
    ];

    return (
        <div>
            <Page
                title="Deployments"
                girdSet={{ xs: 12 }}
            // actions={actions}
            >
                <AdvanceSearch />

                <div style={{marginTop:"8px"}}>
                    <NormalDataTable data={[]} />
                </div>
            </Page>
        </div>

    )
}