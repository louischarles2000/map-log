import React from 'react';
import { useEffect } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import { withRouter } from 'react-router';

import Posts from '../components/Posts/Posts';
import { fetchEntriesAction, updateViewport, setAddEntryLocation, clearFormFeilds } from '../store/actions/entries';
import AddMarker from '../components/Markers/AddMarker';
import Notify from '../components/Notify/Notify';

const Map = ({ children }) => { 
    const state = useSelector(state => state.entriesState);
    const [ longitudeState, setLongitudeState ] = React.useState(-100.508201);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!state.isAuthenticated){
            return setInterval(() => {
               setLongitudeState(longitudeState => {
                   if(longitudeState < 160.00){
                       return longitudeState + 0.05
                   }else {
                       return -100.508201;
                   }
               })
            }, 50);
        }
        console.log('FETCHED....');
        dispatch(fetchEntriesAction());
        return () => {
            clearInterval();
        }
    }, []);
    
    const getViewPort = nextViewport => {
        const view = {
            zoom: nextViewport.zoom,
            latitude: nextViewport.latitude,
            longitude: nextViewport.longitude
        }
        setLongitudeState(nextViewport.longitude);
        dispatch(updateViewport(view));
    }

    const showAddMarkerPopup = event => {
        const [ longitude, latitude ] = event.lngLat;
        if(!state.isAuthenticated){
            return;
        }
        dispatch(clearFormFeilds());
        dispatch(setAddEntryLocation({ longitude, latitude }));
    }

    let loading = null;
    let notification = null;
    if(state.notification.open){
        notification = (
            <Notify {...state.notification}/>
        );
    }
    
    if(state.loading){
        loading = <LinearProgress color={'secondary'} style={{backgroundColor: '#f8c102', color: '#e7cf78', zIndex: 1020}}/>;
    }

    return (
        <ReactMapGL
        {...state.viewport }
        longitude={!state.isAuthenticated ? longitudeState : state.viewport.longitude}
        mapStyle="mapbox://styles/loucharl/ckju0bzij0gd419qn94vjiiqy"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={nextViewport => getViewPort(nextViewport)}
        onDblClick={event => showAddMarkerPopup(event)} dragPan
        >
        {loading}
        {notification}
        <div style={{position: 'absolute', right: 0, backgroundColor: '#555'}}>
          <NavigationControl showCompass={true}/>
        </div>
        { children }
        <Posts />
        <AddMarker />
    </ReactMapGL>
    );
}

export default withRouter(Map);