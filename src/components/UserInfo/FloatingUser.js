import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Fab } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { toggleDrawer } from '../../store/actions/entries';

const FloatingUser = () => {
    const { openDrawer, loading } = useSelector(state => state.entriesState);
    const dispatch = useDispatch();
    const btn = (
        <div style={{ position: 'absolute', left: 10, top: 10 }}>
            <Fab variant="extended" onClick={() => dispatch(toggleDrawer(openDrawer))} style={{padding: '0px 15px'}}>
                <AccountCircle />
                Account
            </Fab>
        </div>
    );

    return loading ? null : btn;
}

export default FloatingUser;