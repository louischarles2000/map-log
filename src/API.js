import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? process.env.API_URL : process.env.DEV_API;

export const getAuth = axios.get(`${API_URL}/get-user`, {
    headers: {
        "x-access-token": localStorage.getItem('token')
    }
});

export const signIn = credentials => axios.post(`${API_URL}/sign-in`, credentials);

export const signUp = credentials => axios.post(`${API_URL}/sign-up`, credentials);

export const signOut = axios.post(`${API_URL}/sign-out`);

export const fetchLogEntries = axios.get(`${API_URL}/logs`, {
    headers: {
        "x-access-token": localStorage.getItem('token')
    }
});

export const postNewLogEntry = entry => axios.post(`${API_URL}/logs`, entry, {
    headers: {
        "x-access-token": localStorage.getItem('token')
    }
});

export const editPost = entry => axios.post(`${API_URL}/logs/edit`, entry, {
    headers: {
        "x-access-token": localStorage.getItem('token')
    }
});

export const deletePost = id => axios.post(`${API_URL}/logs/delete`, {_id: id}, {
    headers: {
        "x-access-token": localStorage.getItem('token')
    }
});