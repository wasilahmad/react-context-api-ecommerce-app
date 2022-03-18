import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { CourseProvider } from './context';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <CourseProvider>
        <Router>
            <App />
        </Router>
    </CourseProvider>
    , document.getElementById('root'));
    
registerServiceWorker();


