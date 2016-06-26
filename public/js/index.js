/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'

const store = createStore( () => {}, {}) //WAT ;)

render(
	<Provider store={store}>
	    <h1>Test</h1>
  	</Provider>,
  	document.getElementById('root')
)