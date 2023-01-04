import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import Page from "../../../Components/Page";
import AppTabs from "../../../Components/AppTabs";
import AppSnackBar from "../../../Components/SnackBar";

import { fetchClientDetails } from "../Reducer/Actions";
import { notification } from "../../../Core/Services/Redux/AppAction";

import { appDateFormat } from "../../../Core/Utilities";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ApplicationSettings from "../Components/Tabs/ApplicationSettings";
import { ClientApplications } from "../Components/Tabs/ClientApplications";
import Overview from "../Components/Tabs/Overview";


export default function Show() {

    const dispatch = useDispatch();
    const { id } = useParams();

    const { data } = useSelector(state => ({
        data: state?.clients?.data?.find(i => i.id === id)
    }));

    const fetchData = useCallback(() => {
        dispatch(fetchClientDetails(id))
    }, [dispatch, id])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    if (!data) return <div>Loading...</div>

    const copyToClipboard = () => {
        navigator.clipboard.writeText(data.secret_key);
        dispatch(notification("Item Copied", true))
    }

    return (
        <Page title={`${data?.register_no} | ${data?.name}`} card goBack>
            <div style={{ display: 'flex' }}>
                <div style={{ width: "60%" }}>
                    <div style={{ fontSize: 16, fontWeight: 'bold' }}>{data.name}</div>
                    <div style={{ fontSize: 12 }}>Created at {appDateFormat(data.created_at)}, Location: {data.location}</div>
                </div>
                <div style={{ width: "40%", textAlign: 'right', marginTop: 10, fontSize: 13 }}>
                    <span>Secret Key: {data.secret_key}</span>
                    <ContentCopyIcon style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => copyToClipboard()} />
                </div>
            </div>
            <div style={{ marginTop: 10 }}>
                <AppTabs
                    sections={[
                        {
                            label: "Overview",
                            component: <Overview data={data} />
                        },
                        {
                            label: "Application settings",
                            component: <ApplicationSettings
                                onsubmit={event => fetchData()}
                                dataKey={'application_settings'}
                                title="Application environment"
                                data={[
                                    {
                                        label: "Application url",
                                        key: "application_url",
                                        description: "Hosted server application URL.",
                                        type: "string",
                                        value: "",
                                    },
                                    {
                                        label: "Notification url",
                                        key: "notification_url",
                                        description: "Hosted server notification URL.",
                                        type: "string",
                                        value: "",
                                    },
                                    {
                                        label: "Peer server url",
                                        key: "peer_connection",
                                        description: "Hosted server peer server URL for exe.",
                                        type: "string",
                                        value: "",
                                    }
                                ]}
                                id={id}
                                settings={data?.application_settings}
                            />
                        },
                        {
                            label: "Desktop settings",
                            component: <ApplicationSettings
                                title="Desktop environment"
                                onsubmit={event => fetchData()}
                                dataKey={'desktop_settings'}
                                data={[
                                    {
                                        label: "Application url",
                                        key: "application_url",
                                        description: "Hosted server application URL.",
                                        type: "string",
                                        value: data?.desktop_settings?.application_url,
                                    },
                                    {
                                        label: "Peer server url",
                                        key: "peer_connection",
                                        description: "Hosted server peer server URL for exe.",
                                        type: "string",
                                        value: data?.desktop_settings?.peer_connection,
                                    },
                                    {
                                        label: "Max install count",
                                        key: "max_install_count",
                                        description: "Application max install count.",
                                        type: "number",
                                        value: 0,
                                    }
                                ]}
                                id={id}
                                settings={data.desktop_settings}
                            />
                        },
                        {
                            label: "Client applications",
                            component: <ClientApplications
                                title="Client environment"
                            />
                        }
                    ]}
                />
            </div>
            <AppSnackBar />
        </Page>
    )
}