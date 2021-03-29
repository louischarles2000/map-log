import { initFormData, initViewport } from '../../utility';

import * as changes from './changes';

import * as actionTypes from '../actionTypes';
const initialState = {
    isAuthenticated: false,
    user: null,
    entries: [],
    openDrawer: false,
    isEditing: false,
    loading: true,
    error: null,
    notification: {
        severity: null,
        open: false,
        message: '',
        duration: 0
    },
    addEntryLocation: null,
    viewport: { ...initViewport },
    displayViewport: {...initViewport},
    showPopup: {},
    formEntryData: { ...initFormData }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Toggle
        case actionTypes.TOGGLE_USER_DRAWER: return changes.toggleDrawer(state, action);
        case actionTypes.SHOW_POPUP: return changes.showPopupState(state, action);
        case actionTypes.SET_IS_EDITING: return changes.setIsEditing(state, action);
        case actionTypes.CLEAR_FORM_DATA: return changes.clearFormFeilds(state, action);
        case actionTypes.UPDATE_VIEWPORT: return changes.updateViewport(state, action);
        case actionTypes.UPDATE_FORM_DATA: return changes.updateFormData(state, action);
        case actionTypes.CLOSE_NOTIFICATION: return changes.closeNotification(state, action);
        case actionTypes.SET_ADD_ENTRY_LOCATION: return changes.setAddEntryLocation(state, action);
        //Auth
        case actionTypes.GET_AUTH_START: return changes.authStart(state, action);
        case actionTypes.GET_AUTH_SUCCESS: return changes.authSuccess(state, action);
        case actionTypes.GET_AUTH_FAIL: return changes.authFail(state, action);
        //Signin/ signup
        case actionTypes.SIGN_IN_START: return changes.signinStart(state, action);
        case actionTypes.SIGN_IN_SUCCESS: return changes.signinSuccess(state, action);
        case actionTypes.SIGN_IN_FAIL: return changes.signinFail(state, action);
        //Fetch entries 
        case actionTypes.FETCH_ENTRIES_START: return changes.fetchEntriesStart(state, action);
        case actionTypes.FETCH_ENTRIES_SUCCESS: return changes.fetchEntriesSuccess(state, action);
        case actionTypes.FETCH_ENTRIES_FAIL: return changes.fetchEntriesFail(state, action);
        //Post new entry
        case actionTypes.POST_ENTRY_START: return changes.postEntryStart(state, action);
        case actionTypes.POST_ENTRY_SUCCESS: return changes.postEntrySuccess(state, action);
        case actionTypes.POST_ENTRY_FAIL: return changes.postEntryFail(state, action);
        //Edit entry
        case actionTypes.POST_EDIT_START: return changes.editPostStart(state, action);
        case actionTypes.POST_EDIT_SUCCESS: return changes.editPostSuccess(state, action);
        case actionTypes.POST_EDIT_FAIL: return changes.editPostFail(state, action);
        //Delete entry
        case actionTypes.DELETE_POST_START: return changes.deletePostStart(state, action);
        case actionTypes.DELETE_POST_SUCCESS: return changes.deletePostSuccess(state, action);
        case actionTypes.DELETE_POST_FAIL: return changes.deletePostFail(state, action);
        default: return state;
    }
}

export default reducer;