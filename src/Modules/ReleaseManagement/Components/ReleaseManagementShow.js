import { Grid } from "@mui/material";
import React, { useState } from "react";
import Button from "../../../Components/Button";
import SelectBox from "../../../Components/SelectBox";
import TextBadge from "../../../Components/TextBadge";
import { appDateFormat, getColors, getStaticData } from "../../../Core/Utilities";
import { useDispatch } from "react-redux";
import EventListBlock from "./EventListBlock";
import uuid from 'react-uuid';
import { applicationMerge, buildApplication } from "../Reducer/Actions";
import BuildInterViewComponent from "./BuildInterViewComponent";

export default function ReleaseManagementShow({ data }) {

    const dispatch = useDispatch();
    const [input, setInput] = useState({
        moreSelectedBranch: "",
        selectedBranches: []
    });

    const [events, setEvents] = useState([]);

    const handleAddMoreBranch = (label, d) => {
        setEvents([
            ...events,
            {
                id: uuid(),
                label,
                branch: d,
                type: 'branch',
                isClose: true
            }
        ])
    }


    const handleRemove = (value) => {
        let newFilterData = events.filter(i => i.id !== value.id);
        setEvents(newFilterData)
    }

    const updateEventState = (id, updateValue = {}) => {
        setEvents(p => {
            return p.map(i => {
                if(i.id === id) {
                    return {
                        ...i,
                        ...updateValue
                    }
                }
                return i;
            })
        });
    }

    const addEvent = (d, type = "") => {
        d.id = uuid();
        setEvents(p => ([...p.filter(i => i.type !== type), d]))
        return d
    }

    const mergeToStaging = (index = 0) => {
        let newFilterData = events.filter(i => i.type === 'branch');
        if(newFilterData.length > index){
            let dataSet = newFilterData[index];
            updateEventState(dataSet.id, { isLoading: true })
            dispatch(applicationMerge(data, {branch: dataSet.branch}))
            .then(res => {
                updateEventState(dataSet.id, { isLoading: false, isCompleted: true })
                mergeToStaging(index + 1)
            })
            .catch(error => {
                updateEventState(dataSet.id, { isLoading: false, isError: true })
                mergeToStaging(index + 1)
            })
        }else {
            if(newFilterData.length > 0) {
                let addEventData = addEvent({ label: 'Build application', isLoading: true, type: 'build' }, 'build')
                dispatch(buildApplication())
                .then(res => {
                    updateEventState(addEventData.id, { isLoading: false, isCompleted: true, isReceived: true })
                    addEvent({ label: <BuildInterViewComponent data={{
                        ...res.result,
                        ...data
                    }} />, isCompleted: true, type: 'build-download', isReceived: true }, 'build-download')
                })
            }
        } 
    }

    return (
        <div style={{marginTop: 0}}>
            <div style={{marginBottom: 10}}>
                <div style={{fontSize: 16, fontWeight: 600, display: 'flex'}}>
                    <span>{data.release_to} | {data.version}</span> 
                    <span style={{ marginTop: -3}}><TextBadge style={{marginLeft: 5}} label={data.is_live_release ? 'Production' : 'Development'} /></span>
                </div>
                <div style={{fontSize: 12}}>Created at: {appDateFormat(data.created_at)}</div>
            </div>
            <div style={{borderTop: '1px solid #d9d9d9'}}>
                <div style={{marginTop: 10}}>
                    <div style={{display: 'flex'}}>
                        <div style={{width: '100%', marginTop: 8}}>
                            <b>Current Branch: <span style={{color: getColors('blue'), textTransform: 'capitalize'}}>{data.release_to}</span></b>
                        </div>
                        <div style={{width: '100%', textAlign: 'right'}}>
                            <div style={{display: 'flex'}}>
                                <SelectBox style={{textAlign: 'left'}} value={input.moreSelectedBranch} options={getStaticData('branches')} 
                                onChange={event => setInput(p => ({...p, moreSelectedBranch: event.target.value}))}/>
                                <div style={{width: '75%', marginTop: 3}}><Button onClick={e => handleAddMoreBranch("Merge to " + input.moreSelectedBranch, input.moreSelectedBranch)} label="Add More Branch" /></div>
                            </div>
                        </div>
                    </div>
                    <div style={{fontSize: 13, marginTop: 10, background: getColors('#3a3a3a'), height: 400, overflow: 'auto', padding: 10}}>
                        {events.map((value, index) => {
                            return (
                                <div style={{marginBottom: 10, display: 'grid', width: '100%', gridGap: '0.6rem', maxWidth: '40rem'}} key={index}>
                                    <div style={{width: 260, textAlign: 'left', justifySelf: value.isReceived ? 'left' : 'right', alignContent: 'right', backgroundColor: '#A6E1FA'}}>
                                        <EventListBlock data={value} onRemove={event => handleRemove(value)} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <div style={{ marginTop: 10 }}>
                            <Button onClick={() => mergeToStaging()} label="Merge to staging" />
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}