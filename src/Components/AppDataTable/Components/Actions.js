import React from "react";

export default function Actions({ children, classes, ...props }) {
    
    return (
        <div>
            <div className={classes.toggledElement}>Edit | Delete | Show</div>
        </div>
    )
}