import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router';
import history from './history.js'

import Main from './routes/Main'
import Product from './routes/Product'

import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

let store = createStore(
	reducer,
	applyMiddleware(thunkMiddleware)
)

desktop()
function desktop(){
	render(
		<Provider store={store}>
			<Router history={history}><div>
				<Route exact path='/' component={Main} />
				<Route exact path='/product' component={Product} />
			</div></Router>
		</Provider>,
		document.getElementById('app')
	)
}
