import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/root';
import { Provider } from 'react-redux';
import configureStore from './redux/store/store';

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Root />
        </Provider>
    </React.StrictMode>
);
