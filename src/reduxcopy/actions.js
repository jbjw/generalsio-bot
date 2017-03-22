import bot from './bot.js'


export function sendChat( msg ) {
	bot.sendChat
	socket.emit('chat_message', chatRoom, 'test chat message');
	return { type: 'SEND_CHAT', payload: {msg} }
}

export function logDate( date ) {
	return { type: 'LOG_DATE', payload: {date} }
}

export default { logDate, sendChat }
