export default (state = {}, action) => {
	let chats
	let logs
	console.log('reducer??', action.type)
	switch (action.type) {
		case 'LOG':
			console.log(action.payload)
			({ logs = [] } = state)
			logs.push(action.payload.msg)
			return { ...state, logs: logs }
		case 'LOG_DATE':
			({ logs = [] } = state)
			// logs.push(action.payload.date)
			// state.logs.concat(action.payload.date)
			logs = logs.concat( action.payload.date )
			// console.log('logdate called', logs)
			return { ...state, logs: logs } // { logs }
			// return state.logs.concat(action.payload.date)
		case 'SEND_CHAT':
			({ chats = [] } = state)
			chats = chats.concat( action.payload.message )
			return { ...state, chats: chats } // { chats}
		case 'RECEIVE_CHAT':
			({ chats = [] } = state)
			chats = chats.concat( action.payload.message )
			return { ...state, chats: chats } // { chats}

		case undefined:

		default:
			return state
	}
}


// spreadinbvalue as object

// test value on root, vs object encapsulate,
export function r2(value) {
	state
}

// subreducers
// export default (state = 0, action) => {
// 	switch (action.type) {
// 		case 'TEST':
// 			return state + 1
// 		case 'DECREMENT':
// 			return state - 1
// 		default:
// 			return state
// 	}
// }
