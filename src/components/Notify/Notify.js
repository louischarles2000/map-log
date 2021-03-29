import React from 'react';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { handleCloseNotification } from '../../store/actions/entries';

const Notify = props => {
    const dispatch = useDispatch();
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        dispatch(handleCloseNotification());
    };
    return (
        <Snackbar open={props.open} autoHideDuration={props.duration} onClose={handleClose}>
            <MuiAlert 
                elevation={6} 
                variant="filled"
                severity={props.severity} >
                    {props.message}
                </MuiAlert>
        </Snackbar>
    );
}

export default Notify;