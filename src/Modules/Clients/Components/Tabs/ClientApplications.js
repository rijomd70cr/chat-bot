import React, { useState, } from 'react';

import Title from "../../../../Components/Title";
import Button from "../../../../Components/Button";
import AppModalPopUp from "../../../../Components/AppModalPopUp";
import NormalDataTable from "../../../../Components/AppDataTable/NormalDataTable";

import SettingsIcon from '@mui/icons-material/Settings';

export const ClientApplications = ({ title, }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [openItem, setOpenItem] = useState({});

    let data = [
        { registerNo: "1", macAddress: "0011", os: "Mac", status: "active", settings: "Empty", },
        { registerNo: "2", macAddress: "123", os: "Windows", status: "active", settings: "Empty", },
    ];

    const handleSaveSettings = () => {
        setIsSubmit(true);
        setTimeout(() => { setIsSubmit(false) }, 2000);
    }

    const openModal = (data, method) => {
        if (method === "open") {
            setOpen(!isOpen)
            setOpenItem(data)
        }
        else {
            setOpen(!isOpen)
            setOpenItem({})
        }
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '100%' }}><Title title={`${title} (${data.length})`} /></div>
                <div style={{ width: '100%', textAlign: 'right', marginBottom: 5, marginTop: -5 }}>
                    <Button label="Save" loading={isSubmit} onClick={handleSaveSettings} />
                </div>
            </div>
            <NormalDataTable
                data={data}
                changeData={
                    [
                        {
                            name: 'settings',
                            width: '350px',
                            selector: row => row.settings,
                            cell: (row) => {
                                return <div style={{ display: "flex", width: "100%" }}> <p style={{ flex: 1 }}>{row.settings}</p> <p style={{ flex: 2 }} onClick={() => openModal(row, "open")}><SettingsIcon /></p> </div>;
                            }
                        }
                    ]
                }

            />
            <AppModalPopUp open={isOpen} onClose={() => openModal({}, "close")} title={openItem.macAddress} />
        </div >
    )
}
