//

import React from 'react';
import ReactDOM from 'react-dom';

import BotView from './index.jsx';
import Bot from './bot'

let gameState
const bot = new Bot();

const props = { bot: bot }
ReactDOM.render(
	<BotView {...props}/>,
	document.getElementById('root')
)

// bot.listen( (state) => {
// 	gameState = state
//
// 	ReactDOM.render(
// 		<BotView gameState={gameState} />,
// 		document.getElementById('root')
// 	)
// })
