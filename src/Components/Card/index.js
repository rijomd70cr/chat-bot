import React from "react";
import MCard from '@mui/material/Card';

export default function Card({children, padding = 10, ...props}) {
    
    return (
        <MCard>
            <div style={{padding: padding}}>{children}</div>
        </MCard>
    )
}