// import bot from './bot.js'


// can have actions that do dispatch, as own equiv to react-redux\



// react-redux specific
export function sendChat( msg ) {
	bot.sendChat()
	Bot.sendChat()
	socket.emit('chat_message', chatRoom, 'test chat message');
	return { type: 'SEND_CHAT', payload: {msg} }
}

// thunk: add thunkware as middleware to store creation
export function fetchNetNum( ) {
	return function( dispatch ) {
		fetch.request('/netnum')
			.then( res ) {
				const num = JSON.parse(res)
				dispatch( { type: 'UPDATE_NUM', payload: {num} } )
			}
		}
	// return { type: 'NUM_PENDING', payload: 'pending' }
}

export function logDate( date ) {
	return { type: 'LOG_DATE', payload: {date} }
}

export default { logDate, sendChat }
