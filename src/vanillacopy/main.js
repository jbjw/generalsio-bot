//

const qs = document.querySelector.bind(document);

import * as bot from './bot.js'

console.log(bot.socket)

const connectionInput = document.querySelector("#connection-input")
const connectionButton = document.querySelector("#connection-button")

const userIdInput = document.querySelector("#user-id-input")
const userIdButton = document.querySelector("#user-id-button")

const usernameInput = document.querySelector("#username-input")
const usernameButton = document.querySelector("#username-button")

const gameIdInput = document.querySelector("#game-id-input")
const gameIdButton = document.querySelector("#game-id-button")
const gameIdStatus = document.querySelector("#game-id-status")

bot.socket.on('connect', function(data) {
	console.log('Connected to server.', data)
})

bot.socket.on('disconnect', function(data) {
	console.error('Disconnected from server.', data)
	// process.exit(1)
})

bot.socket.on('error_set_username', function(data) {
	console.log(`Error setting username?: ${data}`)
})

userIdButton.addEventListener('click', function(e) {
	bot.setUserId( userIdInput.value )
	// userIdInput.value = ''
})

gameIdButton.addEventListener('click', function(e) {
	bot.setGameId( gameIdInput.value )
	bot.customGame( bot.getGameId(), bot.getUserId() )
	gameIdStatus.textContent = 'http://bot.generals.io/games/' + encodeURIComponent(bot.getGameId())
	gameIdStatus.setAttribute('href', 'http://bot.generals.io/games/' + encodeURIComponent(bot.getGameId()))
	// gameIdInput.value = ''
})
