import { objectUpdate, initViewport, initFormData } from '../../utility';

//Pre-sign in state
//Show Popup state
export const showPopupState = (state, action) => objectUpdate(state, {showPopup: action.value, isEditing: false});

//Toggle Drawer
export const toggleDrawer = (state, action) => objectUpdate(state, { openDrawer: !action.open });

//Set isEditing 
export const setIsEditing = (state, action) => objectUpdate(state, { isEditing: action.value });

//Clear form data fields 
export const clearFormFeilds = (state, action) => objectUpdate(state, { formEntryData: objectUpdate(state.formEntryData, initFormData) })

//Update Viewport 
export const updateViewport = (state, action) => objectUpdate(state, { viewport: objectUpdate(state.viewport, action.nextViewport) });

//Close Notification
export const closeNotification = (state, action) => {
    return objectUpdate(state, {
        notification: objectUpdate(state.notification, {
            severity: null,
            open: false,
            message: '',
            duration: 0
        })
    });
}

// update from state
export const updateFormData = (state, action) => {
    // console.log(action.fieldName + ': ' + action.newValue);
    return objectUpdate(state, { 
        formEntryData: objectUpdate(state.formEntryData, {
            [action.fieldName]: action.newValue
        })
    });
};

//Set add location state
export const setAddEntryLocation = (state, action) => objectUpdate(state, { addEntryLocation: action.location });

//Auth state changes
export const authStart = (state, action) => objectUpdate(state, { loading: true });
export const authSuccess = (state, action) => objectUpdate(state, { loading: false, ...action.user });
export const authFail = (state, action) => {
    return objectUpdate(state, { 
        loading: false,
        notification : objectUpdate(state.notification, { 
            severity: 'error',
            open: true, 
            message: 'Check your internet connection!',
            duration: 600000
        })
    });
};

//Sign in state
export const signinStart = (state, action) => objectUpdate(state, {loading: true});
export const signinSuccess = (state, action) => {
    return objectUpdate(state, {
        loading: false, 
        notification: objectUpdate(state.notification, { 
            open: true, 
            message: `Success` ,
            severity: 'success',
            duration: 1000
        }), 
        ...action.user
    });
}
export const signinFail = (state, action) => {
    return objectUpdate(state, { 
        loading: false,
        notification : objectUpdate(state.notification, { 
            severity: 'error',
            open: true, 
            message: action.error,
            duration: 600000
        })
    });
}

//Fetch Entries state changes
export const fetchEntriesStart = (state, action) => objectUpdate(state, {loading: true, addEntryLocation: null, entries: []});
export const fetchEntriesSuccess = (state, action) => {
    return objectUpdate(state, {
        loading: false, 
        notification: objectUpdate(state.notification, { 
            open: true, 
            message: 'Fetched data successfully..' ,
            severity: 'success',
            duration: 1000
        }), 
        entries: [...action.entries],
        openDrawer: true
    });
}
export const fetchEntriesFail = (state, action) => {
    return objectUpdate(state, { 
        loading: false,
        notification : objectUpdate(state.notification, { 
            severity: 'error',
            open: true, 
            message: 'Faild to load data, please check your network connection and try again',
            duration: 600000
        })
    });
}

//Post Entry state changes
export const postEntryStart = (state, action) => objectUpdate(state, {loading: true});
export const postEntrySuccess = (state, action) => {
    return objectUpdate(state, {
        addEntryLocation: null,
        notification: objectUpdate(state.notification, { 
            open: true, 
            message: 'Posted new Entry successfully..' ,
            severity: 'success',
            duration: 2000
        })
    });
}
export const postEntryFail = (state, action) => {
    return objectUpdate(state, {
        loading: false, 
        notification: objectUpdate(state.notification, { 
            open: true, 
            message: action.error,
            severity: 'error',
            duration: 2000
        })
    });
}

//Edit post state changes 
export const editPostStart = (state, action) => objectUpdate(state, { loading: true });
export const editPostSuccess = (state, action) => {
    return objectUpdate(state, {
        isEditing: false,
        notification: objectUpdate(state.notification, {
            open: true,
            message: 'Edited post successfully..',
            severity: 'success',
            duration: 2000
        })
    });
}
export const editPostFail = (state, action)  => {
    return objectUpdate(state, {
        loading: false,
        notification: objectUpdate(state.notification, {
            open: true,
            message: action.error,
            severity: 'error',
            duration: 3000
        })
    });
}

//Delete post state changes 
export const deletePostStart = (state, action) => objectUpdate(state, { loading: true });
export const deletePostSuccess = (state, action) => {
    return objectUpdate(state, {
        showPopup: {},
        viewport: { ...initViewport },
        notification: objectUpdate(state.notification, {  
            open: true,
            message: 'Deleted post successfully..',
            severity: 'warning',
            duration: 3000
        })
    });
}
export const deletePostFail = (state, action) => {
    return objectUpdate(state, {
        loading: false,
        notification: objectUpdate(state.notification, {  
            open: true,
            message: 'Failed to delete post',
            severity: 'error',
            duration: 4000
        })
    })
}
