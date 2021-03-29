import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import Map from './Map';
import FloatingUser from '../components/UserInfo/FloatingUser';
import Typography from '@material-ui/core/Typography';
import UserInfo from '../components/UserInfo/UserInfo';
import BackDrop from '@material-ui/core/Backdrop';
import { toggleDrawer } from '../store/actions/entries';

const Home = () => { 
    const { openDrawer, loading } = useSelector(state => state.entriesState);
    const dispatch = useDispatch();
    const backHandler = () => {
        if(loading){
            return;
        }
        dispatch(toggleDrawer(openDrawer));
    }
    return (
        <>
            <Map />
            <FloatingUser />
            <UserInfo />
            <BackDrop open={openDrawer || loading} style={{zIndex: 1000}} onClick={backHandler}>
                {loading ? <Typography variant="h4">Loading...</Typography> : null}
            </BackDrop>
        </>
    );
}

export default withRouter(Home);