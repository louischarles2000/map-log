import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Marker, Popup } from 'react-map-gl';

import { setAddEntryLocation } from '../../store/actions/entries';
import PinIcon from '../../svg/PinIcon';
import Form from '../Forms/entryForm';

const AddMarker = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.entriesState);
    let addMarker = null;
    if(state.addEntryLocation){
        addMarker = (
        <>
            <Marker 
            latitude={state.addEntryLocation.latitude} 
            longitude={state.addEntryLocation.longitude}>
                <PinIcon 
                color="rgb(243, 99, 99)" 
                viewport={state.viewport} 
                isAddMarker/>
            </Marker>
            <Popup
                latitude={state.addEntryLocation.latitude} 
                longitude={state.addEntryLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition
                onClose={() => dispatch(setAddEntryLocation(null))}
                anchor="top" 
                >
                <Form 
                    latitude={state.addEntryLocation.latitude} 
                    longitude={state.addEntryLocation.longitude}
                />
            </Popup>
        </>
        );
    }
    return addMarker;
};

export default AddMarker;