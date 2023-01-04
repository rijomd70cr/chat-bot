import React from 'react';
import Button from '../../../Components/Button';

export default function BuildInterViewComponent({ data }) {
    return (
        <div>
            Build Ready to <a href={data?.buildUrl} target="_blank">Download</a>
            <div style={{marginTop: 5}}>Direct deploy to {data.release_to}</div>
            <div style={{textAlign: 'right'}}><Button size="small" label="Deploy" /></div>
        </div>
    )
}