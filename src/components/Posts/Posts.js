import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Marker, Popup } from 'react-map-gl';
import Post from './Post/Post';
import Form from '../Forms/entryForm';
import PinIcon from '../../svg/PinIcon';
import { showPopupHandler, updateViewport } from '../../store/actions/entries';
import { initViewport } from '../../utility';

const Posts = props => {
    const state = useSelector(state => state.entriesState);
    const dispatch = useDispatch();
    let markers = null;

    const closePopup = () => {
        const view = {
          zoom: initViewport.zoom,
          longitude: initViewport.longitude,
          latitude: initViewport.latitude
        }
        dispatch(updateViewport(view));
        dispatch(showPopupHandler({}))
    }

    if(state.entries.length > 0){
        markers = (
            state.entries.map(entry => (
            <div key={entry._id} >
                <Marker
                latitude={entry.latitude} 
                longitude={entry.longitude}>
                    <PinIcon 
                    id={entry._id}
                    color="#f8c102"
                    />
                </Marker>
                {
                state.showPopup[entry._id] ?
                <Popup
                    latitude={entry.latitude} 
                    longitude={entry.longitude} 
                    closeButton={true}
                    sortByDepth
                    closeOnClick={false}
                    dynamicPosition
                    onClose={closePopup}
                    anchor="top" >
                    {state.isEditing ? 
                    <Form oldData={entry}/> 
                    : <Post postDetails={entry} />
                    }
                </Popup> :
                null
                }
                </div>
            ))
        );
    }
    return (
        <>
            {markers}
        </>
    );
};

export default Posts;