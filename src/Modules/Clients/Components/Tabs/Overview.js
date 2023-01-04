import React from "react";
import ViewTable from "../../../../Components/ViewTable";
import { getColors } from "../../../../Core/Utilities";

export default function Overview({ data }) {

    return (
        <div>
            <ViewTable 
                data={data}
                hideColumns={['id']}
                reOrder={['name', 'email', 'created_at', 'updated_at', 'location', 'environment']}
                changeData={[
                    {
                        name: "environment",
                        style: {
                            background: getColors('#1976d2'),
                            padding: '2px 6px',
                            borderRadius: 3,
                            color: getColors('white'),
                            fontSize: 12,
                            textTransform: 'capitalize'
                        }
                    },
                ]}
            />
        </div>
    )
}