import React from "react";

export default function NoScreenData({ label = "No data found"}) {

    return (
        <div style={{marginTop: '20%', textAlign: 'center'}}>
            <div>{label}</div>
        </div>
    )
}