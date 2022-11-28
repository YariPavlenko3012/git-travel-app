/**
 * external libs
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
/**
 * styles
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import 'react-phone-input-2/lib/style.css'
import 'react-date-range/dist/styles.css'; // main style file.jpeg
import 'react-date-range/dist/theme/default.css'; // theme css file.jpeg
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './general.css';
/**
 * helpers
 */
import './helpers/axios';
/**
 * components
 */
import Routes from './components/Routes';

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<Routes />
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);
