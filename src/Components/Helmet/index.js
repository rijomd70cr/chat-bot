import React from "react";
import { Helmet } from 'react-helmet-async';

export default function AppHelmet({ title, children}) {

    return (
        <Helmet>
            <title>PM | {title}</title>
            {children}
        </Helmet>
    )
}