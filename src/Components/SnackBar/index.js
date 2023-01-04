import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';

export default function AppSnackBar() {

    const { notification } = useSelector(state => ({
        notification: state.app.notification
    }));

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    console.log(notification, 'notification')

    return (
        <div>
            <Snackbar
                anchorOrigin={notification.anchorOrigin}
                open={notification.open}
                onClose={handleClose}
                message={notification.message}
                key={vertical + horizontal}
            />
        </div>
    );
}
