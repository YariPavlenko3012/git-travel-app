/**
 * external libs
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
/**
 * components
 */
import Routes from './components/Routes';
/**
 * styles
 */
import 'antd/dist/antd.css';
import 'react-phone-input-2/lib/style.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './general.css';
/**
 * helpers
 */
import './helpers/axios';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);
