import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import Main from './components/Main';

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter> ,
    document.getElementById('root')
);


