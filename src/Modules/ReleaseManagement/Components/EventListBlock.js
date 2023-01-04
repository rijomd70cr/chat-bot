import { CircularProgress } from '@mui/material';
import React from 'react';
import { getColors } from '../../../Core/Utilities';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import GppBadIcon from '@mui/icons-material/GppBad';
import CloseIcon from '@mui/icons-material/Close';

export default function EventListBlock({ data = "", onRemove = () =>{} }) {

    const labelBlock = () => <div>{data.label}</div>; 

    const actions = () => {
        if(data.isLoading) return <CircularProgress size={14} />
        if(data.isCompleted) return <TaskAltIcon style={{color: getColors('green'), fontSize: 15}} />
        if(data.isError) return <GppBadIcon style={{color: getColors('red'), fontSize: 15}} />
        if(data.isClose) return <CloseIcon onClick={onRemove} style={{color: getColors('black'), fontSize: 15}} />
    }; 

    return (
        <div style={{background: getColors('white'), padding: 5, borderRadius: 4, fontSize: 13, position: 'relative'}}>
            <div style={{display: 'flex'}}>
                <div style={{width: '95%'}}>{labelBlock()}</div>
                <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '7px',
                    cursor: 'pointer'
                }}>{actions()}</div>
            </div>  
        </div>
    )
}