import React from 'react';
import { getColors } from './../../Core/Utilities/index';

export default function Title({title, subTitle = ""}) {

    return (
        <div>
            <div style={{fontSize: 13, fontWeight: 500}}>{title}</div>
            {subTitle ? <div style={{fontSize: 12, color: getColors('secondary')}}>{subTitle}</div> : null}
        </div>
    )
}