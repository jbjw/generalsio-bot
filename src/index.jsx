import React from 'react'
import ReactDOM from 'react-dom'

import { connect } from 'react-redux'

import Actions from './actions.js'

class BotView extends React.Component {
	// boolean altKey
	// number charCode
	// boolean ctrlKey
	// boolean getModifierState(key)
	// string key
	// number keyCode
	// boolean metaKey
	// boolean repeat
	// boolean shiftKey

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
			<StartButton {...this.props}></StartButton>
		</div>
	}
}

function StartButton(props) {
	function onClick(e) {
		props.bot.startCustomGame()
		// Actions.startCustomGame()
	}
	return <input type='button' value='Start Custom' onClick={onClick}></input>
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

// this is the store state, not the view state
function mapStateToProps(state) {
	return { logs: state.logs }
}

function mapDispatchToProps(dispatch) {
	return {
		sendChat: msg => dispatch( Actions.sendChat( msg ) ),
		// log: msg => dispatch( Actions.log( msg ) ),
	}
}

export default connect(
	mapStateToProps,
	// mapDispatchToProps,
)(BotView);
