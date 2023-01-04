import React, { useCallback, useEffect, useState } from "react";
import AppDataTable from "../../../Components/AppDataTable";
import Title from "../../../Components/Title";
import Button from "../../../Components/Button";
import AppModalPopUp from "../../../Components/AppModalPopUp";
import FormBuilder from "../../../Components/FormBuilder";
import { useDispatch } from "react-redux";
import { createRelease, getAllReleases } from "../Reducer/Actions";
import moment from "moment/moment";
import { capitalize } from "@mui/material";
import TextBadge from "../../../Components/TextBadge";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreMenu from "../../../Components/MoreMenu";
import ReleaseManagementShow from "./ReleaseManagementShow";
import { getStaticData } from "../../../Core/Utilities";

export default function ReleaseManagement() {

    const columns = [
        {
            name: 'Version',
            width: '80px',
            selector: row => <b style={{cursor: 'pointer'}}>{row.version}</b>,
        },
        {
            name: 'Date',
            width: '150px',
            selector: row => moment(row.created_at).format('DD, MMM YY | h:m A'),
        },
        {
            name: 'Release',
            selector: row => capitalize(row.release_to),
        },
        {
            name: 'Type',
            cell: (row) => {
                return <TextBadge label={row.is_live_release ? "Production" : "Development"} />
            }
        },
        {
            name: 'Time',
            selector: row => row.status,
            cell: (row) => {
                return '00:59:00'
            }
        },
        {
            name: 'Status',
            width: '100px',
            selector: row => row.status,
            cell: (row) => {
                return <TextBadge label={"Completed"} type="success"/>
            }
        }
    ];

    
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const [formModal, setFormModal] = useState({ open: false })
    const [showModal, setShowModal] = useState({ open: false, data: '' })

    const fetchReleases = useCallback(() => {
        dispatch(getAllReleases())
        .then(res => {
            setData(res.result)
        })
    }, [dispatch]);

    useEffect(() => {
        fetchReleases()
    }, [fetchReleases])

    return (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{width: '50%'}}><Title title="Releases" /></div>
                <div style={{width: '50%',justifyContent: 'end', display: 'flex', marginBottom: 5}}>
                    <Button onClick={event => setFormModal({open: true})} label="Create Release" style={{textAlign: 'right'}} />
                </div>
            </div>
            <AppDataTable 
                onRowClicked={event => {
                    console.log(event)
                }}
                offline
                data={data}
                columns={columns}
            />
            <AppModalPopUp open={showModal.open} backgroundClose onClose={event => {}}>
                <ReleaseManagementShow data={showModal.data} />
            </AppModalPopUp>
            <AppModalPopUp onClose={event => setFormModal({open: false})} open={formModal.open} title="Release">
                <FormBuilder 
                    onSubmit={(event, data, setErrorCallBack, resetForm) => {
                        dispatch(createRelease(data))
                        .then(res => {
                            fetchReleases();
                            resetForm({});
                            setFormModal({open: false});
                            setShowModal({open: true, data: res.result})
                        })
                        .catch(error => {
                            setErrorCallBack(error.errors)
                        })
                    }}
                    formElements={[
                        {
                            name: "release_to",
                            label: "Release To",
                            type: "select",
                            column: 6,
                            options: getStaticData('homeBoardApps')
                        },
                        {
                            name: "version",
                            label: "Version",
                            type: "text",
                            column: 6
                        },
                        {
                            name: "release_note",
                            label: "Release To",
                            type: "text",
                            column: 12,
                            multiline: true,
                            rows: 5,
                            placeholder: "Application release note."
                        }
                    ]}
                />
            </AppModalPopUp>
        </div>
    )
}