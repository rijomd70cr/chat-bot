import { Container, Card as MCard, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Helmet } from "react-helmet-async";
import { getConfig } from "../../Core/Utilities";

export default function Page(props) {

    const { actions = [], girdSet = { md: 12 }, customActions = "", headerName = "", padding = 10, children, container = false, card = false, containerMaxWidth = "md", title = "", goBack = "" } = props;
    const navigate = useNavigate();
    
    const titleBlock = () => {

        return title ? <div style={{marginBottom: goBack ? 5 : 5, fontSize: 14, fontWeight: 'bold', marginTop: '-10px'}}>
            {goBack ? <div style={{display: 'flex'}}>
                <span>
                    <ArrowBackIcon style={{cursor: 'pointer'}} 
                    onClick={event => {
                        if (typeof goBack === 'function') {
                            return goBack();
                        }
                        return navigate(-1);
                    }} />
                </span>
                <span style={{marginTop: 0, marginLeft: 3}}>{title}</span></div> :  <span>{title}</span>}
        </div> : null
    }

    const actionBlock = () => {

        if(customActions) {
            return <div style={{marginTop: -18}}>{customActions}</div>
        }

        return (
            <div style={{display: 'flex', justifyContent: 'end'}}>
                { actions.map((value, index) => {
                    return <div key={index}><Button onClick={event => {
                        if(value.action) return value.action(event)
                        return navigate(value.link)
                        
                    }} style={{marginTop: -18, marginLeft: 5}} {...value} /></div>
                })}
            </div>
        );
    }

    const containerBlock =  () => {
        return (
            <div>
                {titleAction()}
                <div>{children}</div>
            </div>
        )
    }

    const titleAction = () => (
        <div style={{display: 'flex'}}>
            <div style={{width: '70%'}}>{titleBlock()}</div>
            <div style={{width: '100%'}}>{actionBlock()}</div>
        </div>
    )

    

    const main = () => {
        if(card) {
            return <div>
                {titleAction()}
                <Grid container spacing={2}>
                    <Grid item {...girdSet}>                
                        <MCard>
                            <div style={{padding: padding}}>{children}</div>
                        </MCard>
                    </Grid>
                </Grid>
            </div>
        }
        if(container) return <Container maxWidth={containerMaxWidth}>
            <div>{containerBlock()}</div>
        </Container>

        return <div>{containerBlock()}</div>;
    }


    return <div>
            <Helmet>
                <title>{getConfig('APP_NAME')}::{title || headerName}</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
                <style type="text/css">{`
                    body {
                        background-color: ${props.backgroundColor};
                    }
                `}</style>
            </Helmet>
        {main()}
    </div>

}