import React from "react";
import AppDataTable from "../../../Components/AppDataTable";
import useRedirect from "../../../Core/Hooks/Redirect";
import { getApiConst } from "../../../Core/Utilities";

export default function List() {

    const { redirectTo } = useRedirect();

    return (
        <AppDataTable 
            title="Clients"
            module="clients"
            apiUrl={getApiConst('DATA_TABLE_CLIENTS')} 
            hideColumns={['id', 'secret_key']}
            onRowClicked={event => {
                redirectTo('/clients/' + event.id)
            }}
            headerReorder={[
                'register_no', 'name', 'email', 'location', 'created_at'
            ]}
            
        >
        </AppDataTable>
    )
}