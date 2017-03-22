import React from 'react'
import ReactDOM from 'react-dom'

export default class BotView extends React.Component {
	// switch to prop init syntax?
	// check this set correct without binding react

	constructor(props) {
		super(props);
		this.onKeyPress = this.onKeyPress.bind(this);
		document.addEventListener('keypress', this.onKeyPress )
		this.state = {
			logs: [],
			messages: [],
		}
	}

	onKeyPress(e) {
		this.setState({
			logs: this.state.logs.concat(e.key),
			// messages: this.state.logs.concat(e.key),
		});
	}

	// onKeyPress = (e) => {
	// 	console.log('keypress');
	// 	this.setState({
	// 		logs: this.state.logs.push(e.key),
	// 	});
	// }

	onClick(e) {
		console.log(e)
	}

	render() {
		return <div>
			<Console logs={this.state.logs}></Console>
			<Chat messages={this.state.messages} sendChat={this.props.sendChat}></Chat>
		</div>
	}
}

function Console(props) {
	return <div className="console">
		<h2>Console:</h2>
		{props.logs.map( (msg, i) => <p key={i}>{msg}</p> )}
	</div>
}

function Chat(props) {
	return <div className="chat">
		<h2>Chat:</h2>
		{props.messages.map( (msg, i) => <p key={i}>{msg}</p> )}
		<ChatInput sendChat={props.sendChat}></ChatInput>
	</div>
}

function ChatInput(props) {
	function onKeyPress(e) {
		// console.log(e.key)
		if (e.key == 'Enter') {
			props.sendChat(e.target.value)
			e.target.value = ''
		}
	}

	return <input type="text" placeholder="Enter cat msg hurr" className="chat-input" onKeyPress={onKeyPress}>
	</input>
}

function ChatMessage(props) {
	// return { props.messages.map( (msg) => <p>{msg}</p> ) }
}

// <Grid></Grid>
// <Players></Players>
// <Chat></Chat>
// <Console></Console>
