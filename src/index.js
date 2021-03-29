import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import entriesReducer from './store/reducers/entries';
import { ThemeProvider } from '@material-ui/core/styles';
import './index.css';
import theme from './theme';

export const history = require('history').createBrowserHistory();

const reducers = combineReducers({
    entriesState: entriesReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
// const composeEnhancers = compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);

ReactDom.render(app, document.getElementById('root'))