import React from "react";
import Page from "../Page";

export default function Form({ children, method="POST", title = "", onSubmit = () => {}, girdSet = {md: 12} }) {

    return (
        <Page
            padding={20} 
            title={title} 
            goBack
            card
            girdSet={girdSet}
            actions={[
                {
                    label: "Save",
                    visible: false,
                    action: () => {
                        onSubmit()
                    }
                }
            ]}
        >
            <form method={method} onSubmit={event => {
                event.preventDefault();
                onSubmit(event);
            }}>
                {children}
                <button type="submit" style={{display: 'none'}}></button>
            </form>
        </Page>
    )
}