import React from "react";
import AppDataTable from "../../../Components/AppDataTable";
import Title from "../../../Components/Title";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { getColors } from "../../../Core/Utilities";

export default function ReleaseManagement() {

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Version',
            selector: row => row.version,
            width: "90px"
        },
        {
            name: 'Date',
            selector: row => row.date,
            width: "120px"
        },
        {
            name: 'Build Time',
            selector: row => row.build_time,
            width: "95px"
        },
        {
            name: 'Status',
            selector: row => row.status,
            width: "100px",
            cell: () => {
                return <div style={{color: getColors('green')}}>
                    <CheckCircleOutlineIcon style={{fontSize: 13}} />Finished
                </div>
            }
        },
        {
            name: 'Action',
            selector: row => row.action,
            width: "80px",
            
        },
    ];

    const data = [
        {
            id: 1,
            title: 'New release for multi-net',
            version: '1.0.1',
            date: '01, Mar 2022',
            build_time: '10:00:00',
            action: 'Start',
            status: 'Finished',
        },
        {
            id: 2,
            title: 'New release for multi-net',
            version: '1.0.1',
            date: '01, Mar 2022',
            build_time: '10:00:00',
            action: 'Start',
            status: 'Finished',
        },
        {
            id: 3,
            title: 'New release for multi-net',
            version: '1.0.1',
            date: '01, Mar 2022',
            build_time: '10:00:00',
            action: 'Start',
            status: 'Finished',
        },
        {
            id: 4,
            title: 'New release for multi-net',
            version: '1.0.1',
            date: '01, Mar 2022',
            build_time: '10:00:00',
            action: 'Start',
            status: 'Finished',
        }
    ]

    return (
        <div>
            <Title title="Releases" />
            <AppDataTable 
                offline
                data={data}
                columns={columns}
            />
        </div>
    )
}