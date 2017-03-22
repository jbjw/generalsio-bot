//

import React from 'react';
import ReactDOM from 'react-dom';

import BotView from './index.jsx';
import bot from './bot.js'

let gameState;

ReactDOM.render(
	<BotView />,
	document.getElementById('root')
)

bot.listen( (state) => {
	gameState = state

	ReactDOM.render(
		<BotView gameState={gameState} />,
		document.getElementById('root')
	)
})
