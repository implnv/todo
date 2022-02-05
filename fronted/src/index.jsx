import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import Store from './store/store'

const rootElement = document.getElementById('root');

if (module.hot)
    module.hot.accept()

render (
    <Provider store={ Store }>
        <App />
    </Provider>,
    rootElement
);
