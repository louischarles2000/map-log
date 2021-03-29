import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { showPopupHandler } from '../store/actions/entries';

const PinIcon = props => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.entriesState);
    // console.log(state.viewport);
    const showPopup = () => {
        if(props.isAddMarker){
            return;
        }
        if(state.showPopup[props.id]){
            // console.log(state.showPopup);
            return dispatch(showPopupHandler({}));
        }
        dispatch(showPopupHandler({[props.id]: true}));
    }
    const size = state.viewport.zoom < 4 ? `20px` : '40px';
    return (
        <div 
            onClick={showPopup} >
            <svg 
            style={{
                width: size,
                height: size,
                stroke: props.color,
                transform: 'translate(-50%, -100%)'
                }}
            viewBox="0 0 24 24" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        </div>
    );
}

// ${8 * state.viewport.zoom}
export default PinIcon;