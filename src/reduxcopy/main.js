// import Hello from './hello.jsx';
// import World from './index.jsx';

import React from 'react';
import ReactDOM from 'react-dom';

import BotView from './index.jsx';
import './bot.js'
import init from './bot.js'



import { Provider } from 'react-redux'

// import Redux from 'redux'
import { createStore } from 'redux'

import reducer from './reducers.js'

const store = createStore( reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

// function rerender() {
//
// }

init( store )

// '/users': <UsersPage>

ReactDOM.render(
	<Provider store={store}>
		<BotView />
	</Provider>,
	document.getElementById('root')
)


// ReactDOM.render(<App gameState={gameState} />, document.getElementById('root'));
