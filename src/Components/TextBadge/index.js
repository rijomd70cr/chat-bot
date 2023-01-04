import React from "react";

export default function TextBadge({ type = "primary", label = "", style = {} }) {

    let styleSet = {
        backgroundColor: '#4caf50',
        color: '#fff',
        ...style
    }
    if(type === 'warning') styleSet = { ...styleSet, backgroundColor: '#ff5722' } 
    if(type === 'danger') styleSet = { ...styleSet, backgroundColor: '#ff5722' } 
    if(type === 'primary') styleSet = { ...styleSet, backgroundColor: '#3f51b5' } 

    return <div style={{
        padding: '2px 5px 2px 5px',
        fontSize: 10,
        borderRadius: 3,
        display: 'initial',
        ...styleSet
    }}>{label}</div>
}