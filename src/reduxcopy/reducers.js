export default (state = {}, action) => {
	switch (action.type) {
		case 'LOG_DATE':
			let { logs = [] } = state
			// logs.push(action.payload.date)
			// state.logs.concat(action.payload.date)
			logs = logs.concat( action.payload.date )
			// console.log('logdate called', logs)
			return { ...state, logs: logs } // { logs }
			// return state.logs.concat(action.payload.date)
		case 'SEND_CHAT':
			let { chats = [] } = state
			chats = chats.concat( action.payload.message )
			return { ...state, chats: chats } // { chats}
		case 'RECEIVE_CHAT':
			let { chats = [] } = state
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
