import React from 'react';
import { Provider } from 'react-redux';
import setAuthenticationToken from './components/setAuthenticationToken.js';
import { setCurrentUser, logoutUser, setCurrentAdmin, logoutAdmin } from './redux';
import jwt from 'jsonwebtoken';
import store from './redux/store';
import './App.css';
import Examigo from './components/Examigo';
import { BrowserRouter } from 'react-router-dom';

if (localStorage.jwtToken) {
	setAuthenticationToken(localStorage.jwtToken);
	jwt.verify(localStorage.jwtToken, 'secret', function(err, decode) {
		if (err) {
			store.dispatch(logoutUser());
		} else {
			store.dispatch(setCurrentUser(decode));
		}
	});
}

if (localStorage.Admintoken) {
	setAuthenticationToken(localStorage.Admintoken);
	jwt.verify(localStorage.Admintoken, 'secret', function(err, decode) {
		if (err) {
			store.dispatch(logoutAdmin());
		} else {
			store.dispatch(setCurrentAdmin(decode));
		}
	});
}

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<Examigo />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
