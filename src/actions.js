// import bot from './bot.js'

// can have actions that do dispatch, as own equiv to react-redux\

// react-redux specific
export function sendChat( msg ) {
	// bot.sendChat()
	// socket.emit('chat_message', chatRoom, 'test chat message');
	return { type: 'SEND_CHAT', payload: {msg} }
}

export function startCustomGame() {
	// socket.emit('chat_message', chatRoom, 'test chat message');
	return { type: 'START_GAME', payload: {} }
}

export function log( msg ) {
	console.log(msg)
	return { type: 'LOG', payload: {msg} }
}

export function logDate( date ) {
	return { type: 'LOG_DATE', payload: {date} }
}

export default { sendChat, startCustomGame, log, logDate }

// // thunk: add thunkware as middleware to store creation
// export function fetchNetNum() {
// 	return function( dispatch ) {
// 		fetch.request('/netnum')
// 			.then( res ) {
// 				const num = JSON.parse(res)
// 				dispatch( { type: 'UPDATE_NUM', payload: {num} } )
// 			}
// 		}
// 	// return { type: 'NUM_PENDING', payload: 'pending' }
// }
