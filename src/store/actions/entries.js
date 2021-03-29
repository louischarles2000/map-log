import { history } from '../../index';

import * as api from '../../API';
import * as actionTypes from '../actionTypes';

//Auth action states
const authStart = () => ({ type: actionTypes.GET_AUTH_START});
const authSuccess = user => ({ type: actionTypes.GET_AUTH_SUCCESS, user });
const authFail = error => ({ type: actionTypes.GET_AUTH_FAIL, error });

const signinStart = () => ({ type: actionTypes.SIGN_IN_START});
const signinSuccess = user => ({ type: actionTypes.SIGN_IN_SUCCESS, user });
const signinFail = error => ({ type: actionTypes.SIGN_IN_FAIL, error });

//Fetch action states
const fetchEntriesStart = () => ({ type: actionTypes.FETCH_ENTRIES_START});
const fetchEntriesSuccess = entries => ({ type: actionTypes.FETCH_ENTRIES_SUCCESS, entries });
const fetchEntriesFail = error => ({ type: actionTypes.FETCH_ENTRIES_FAIL, error });

//Post action states
const postEntryStart = () => ({ type: actionTypes.POST_ENTRY_START });
const postEntrySuccess = () => ({ type: actionTypes.POST_ENTRY_SUCCESS });
const postEntryFail = error => ({ type: actionTypes.POST_ENTRY_FAIL, error});

//Edit action states
const editEntryStart = () => ({ type: actionTypes.POST_EDIT_START });
const editEntrySuccess = () => ({ type: actionTypes.POST_EDIT_SUCCESS });
const editEntryFail = error => ({ type: actionTypes.POST_EDIT_FAIL, error});

//Delete action states 
const deletePostStart = () => ({ type: actionTypes.DELETE_POST_START });
const deletePostSuccess = () => ({ type: actionTypes.DELETE_POST_SUCCESS });
const deletePostFail = error => ({ type: actionTypes.DELETE_POST_FAIL, error});

//Show popup state
const showPopupState = value => ({type: actionTypes.SHOW_POPUP, value});
//Toggle isEditing state
const setIsEditing = value => ({ type: actionTypes.SET_IS_EDITING, value });
//update viewport state
const updateViewportState = nextViewport => ({ type: actionTypes.UPDATE_VIEWPORT, nextViewport });
//Upate form data state
const updateFormData = (fieldName, newValue) => ({ type: actionTypes.UPDATE_FORM_DATA, fieldName, newValue });
//Set add entry location state
const addEntryLocationState = location => ({ type: actionTypes.SET_ADD_ENTRY_LOCATION, location });
//Clear form data
const clearFormData = () => ({ type: actionTypes.CLEAR_FORM_DATA });
//Close notification
const closeNotification = () => ({ type: actionTypes.CLOSE_NOTIFICATION });

//Show popup action handler 
export const showPopupHandler = value => dispatch => dispatch(showPopupState(value));

//Handle Drawer 
export const toggleDrawer = (open) => dispatch => dispatch({type: actionTypes.TOGGLE_USER_DRAWER, open});

//Set isEditing
export const setIsEditingAction = value => dispatch => dispatch(setIsEditing(value));

//Clear form field data
export const clearFormFeilds = () => dispatch => dispatch(clearFormData());

//Update viewport
export const updateViewport = nextViewport => dispatch => dispatch(updateViewportState(nextViewport)); 

//Update form fields
export const updateFormFieldValue = (fieldName, value) => dispatch => dispatch(updateFormData(fieldName, value));

//Set add entry locations 
export const setAddEntryLocation = location => dispatch => dispatch(addEntryLocationState(location));

//Close Notification action
export const handleCloseNotification = () => dispatch => dispatch(closeNotification());

//---ACTION CREATORS---
export const getAuth = () => dispatch => {
    dispatch(authStart());
    api.getAuth
    .then(({ data }) => {
        console.log(data);
        dispatch(authSuccess(data));
    })
    .catch(err => {
        console.log(err);
        dispatch(authFail(err));
    });
};

//Signin/Signout action creator
export const signInAndSignOutAction = (details, isSignup) => dispatch => {
    dispatch(signinStart());
    if(isSignup){
        return api.signUp(details)
        .then(({ data }) => {
            console.log(data)
            dispatch(signinSuccess(data));
        })
        .catch(err => {
            const errorMsg = err.response.data.msg
            console.log({...err});
            dispatch(signinFail(errorMsg));
        });
    }
    api.signIn(details)
    .then(({ data }) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        dispatch(signinSuccess(data));
    })
    .catch(err => {
        if(err.response){
            const errorMsg = err.response.data.msg
            console.log(errorMsg);
            dispatch(signinFail(errorMsg));
            return;
        }
        console.log({...err});
        dispatch(signinFail('An errorr occured!'));
    });
}

// Sign out action creator
export const signOutAction = () => dispatch => {
    dispatch(signinStart());
    api.signOut
    .then(({ data }) => {
        console.log(data);
        localStorage.removeItem('token');
        dispatch(signinSuccess(data));
    })
    .catch(err => {
        if(err.response){
            const errorMsg = err.response.data.msg
            console.log(errorMsg);
            dispatch(signinFail(errorMsg));
            return;
        }
        console.log({...err});
        dispatch(signinFail('An errorr occured!'));
    });
}

//Fetch action creator
export const fetchEntriesAction = () => {
    return dispatch => {
        console.log('FETCH HAS BEEN CALLED!');
        dispatch(fetchEntriesStart());
        //GET request to the api
        api.fetchLogEntries
        .then(({ data }) => {
            console.log(data);
            dispatch(fetchEntriesSuccess(data));
        })
        .catch(err => {
            dispatch(fetchEntriesFail(err));
        });
    };
};

//Post action creator
export const postEntryAction = entry => {
    return dispatch => {
        dispatch(postEntryStart());
        //POST request to the api
        api.postNewLogEntry(entry)
        .then(({ data }) => {
            console.log('Added new entry successfully');
            dispatch(postEntrySuccess());
            dispatch(fetchEntriesSuccess(data));
        })
        .catch(err => {
            console.log('IT IS SUPPOSED TO PASS!');
            console.log(err);
            dispatch(postEntryFail('Could not post entry!'));
            history.push('/home');
        });
    }
}

//Post Edit action creator
export const editEntryAction = editedEntry => {
    return dispatch => {
        dispatch(editEntryStart());
        api.editPost(editedEntry)
        .then(({ data }) => {
            console.log(data);
            dispatch(editEntrySuccess());
            dispatch(fetchEntriesSuccess(data));
        })
        .catch(err => {
            console.log(err);
            dispatch(editEntryFail('Failed to edit this post'));
        });
    }
}

//Delete action creator
export const deletePostAction = id => {
    return dispatch => {
        dispatch(deletePostStart());
        return api.deletePost(id)
        .then(({ data }) => {
            dispatch(deletePostSuccess());
            dispatch(fetchEntriesSuccess(data));
        })
        .catch(err => {
            console.log(err);
            dispatch(deletePostFail('Failed to delete post'));
        });
    }
}

//GO TO REDUCER