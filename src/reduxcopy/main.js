// import Hello from './hello.jsx';
// import World from './index.jsx';

import React from 'react';
import ReactDOM from 'react-dom';

import BotView from './index.jsx';
import './bot.js'
import init from './bot.js'



import { Provider } from 'react-redux'

// import Redux from 'redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers.js'
import stuff from './reducers/stuff.js'

const rootReducer = combineReducers({
		chats: reducer,
		stuff
})

const store = createStore( rootReducer, applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

// function rerender() {
//
// }

init( store )

connect( store )
// '/users': <UsersPage>

ReactDOM.render(
	<Provider store={store}>
		<BotView/>
	</Provider>,
	document.getElementById('root')
)


// ReactDOM.render(<App gameState={gameState} />, document.getElementById('root'));
