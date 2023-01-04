import { Card } from '@mui/material';
import * as React from 'react';
import Page from '../../../Components/Page';
import Title from '../../../Components/Title/index';

export default function AuthLayout({ children }) {
    return (
        <Page container containerMaxWidth='xs' title="Login">
            <div style={{marginTop: '40%'}}>
                <Card style={{padding: 20}}>
                    <Title title="Sign In" subTitle="Lorem Ipsum is simply dummy." />
                    <div style={{marginTop: 10}}>
                        {children}
                    </div>
                </Card>
            </div>
        </Page>
    );
}