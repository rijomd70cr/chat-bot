import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Title from '../Title';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppModalPopUp({ title = "", backgroundClose = false, dialogContent = true, maxWidth = "sm", children, open = false, onClose, fullWidth = false }) {

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth={maxWidth}
            >

                {dialogContent ? <div style={{ padding: 10 }}>
                    {title || onClose ? <div style={{ display: 'flex' }}>
                        {title ? <div style={{ marginBottom: 10, width: '100%' }}><Title title={title} /></div> : null}
                        {!backgroundClose && onClose ? <div style={{ width: '100%', textAlign: 'right', cursor: 'pointer' }} onClick={onClose}>X</div> : null}
                    </div> : null}
                    <div>{children}</div>
                </div>
                    : children
                }
            </Dialog>
        </div>
    );
}
