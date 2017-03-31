import React from 'react';
import ReactDOM from 'react-dom';

import BotView from './index.jsx';
import Bot from './bot'

import { Provider } from 'react-redux'

import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

import reducer from './reducers.js'

// const rootReducer = combineReducers({
// 		chats: reducer,
// 		stuff
// })

const rootReducer = reducer

const store = createStore( reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

// const store = createStore( rootReducer, applyMiddleware(thunk),
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

// connect( store )
// '/users': <UsersPage>

const bot = new Bot()

const props = {
	bot: bot
}

ReactDOM.render(
	<Provider store={store}>
		<BotView bot={bot}></BotView>
	</Provider>,
	document.getElementById('root')
)
