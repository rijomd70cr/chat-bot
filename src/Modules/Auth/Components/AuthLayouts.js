import { Card } from '@mui/material';
import * as React from 'react';
import Page from '../../../Components/Page';
import Title from '../../../Components/Title/index';
import { getColors } from '../../../Core/Utilities';

export default function AuthLayout({ children }) {
    return (
        <Page container containerMaxWidth='xs' backgroundColor={getColors('appDefaultColor')}>
            <div style={{marginTop: '35%'}}>
                <Card style={{padding: 20}}>
                    <div style={{textAlign: 'center', marginBottom: 10}}>
                        {/* <img src={appLogo()} style={{width: 100}} /> */}
                    </div>
                    <Title title="Sign In" subTitle="Lorem Ipsum is simply dummy." />
                    <div style={{marginTop: 10}}>
                        {children}
                    </div>
                </Card>
            </div>
        </Page>
    );
}