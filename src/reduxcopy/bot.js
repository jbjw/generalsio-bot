var io = require('socket.io-client');
var socket = io('http://botws.generals.io');
var utils = require('./bot-utils')

import Actions from './actions.js'

let store;
export default function init(instore) {
	store = instore;
}

window.setInterval(rerender, 1000);

function rerender() {
	// console.log('attempting action logDate')
	store.dispatch(Actions.logDate(Date.now()))
}

socket.on('disconnect', function(data) {
	console.error('Disconnected from server.', data)
	// process.exit(1);
});

socket.on('connect', function(data) { console.log('Connected to server.', data) });

// env replace e.g. var user_id = process.env.BOT_USER_ID;
var user_id = 'my_example_bot_id'
var username = '[Bot] Example Bot'

socket.emit('set_username', user_id, username);

socket.on('error_set_username', function(data) { console.log(`Error setting username?: ${data}`) });

// Join a custom game and force start immediately.

// socket.emit('play', user_id)
// socket.emit('join_1v1', user_id)


var custom_game_id = 'my_private_game';
socket.emit('join_private', custom_game_id, user_id);
socket.emit('set_force_start', custom_game_id, true);
console.log('Joined custom game at http://bot.generals.io/games/' + encodeURIComponent(custom_game_id));

// socket.emit('set_custom_team', custom_game_id, team);

// socket.emit('join_team', team_id, user_id);
// console.log('Join the same 2v2 team at http://bot.generals.io/teams/' + encodeURIComponent(team_id));
// socket.emit('leave_team', team_id);

// Terrain Constants.
// Any tile with a nonnegative value is owned by the player corresponding to its value.
// For example, a tile with value 1 is owned by the player with playerIndex = 1.
var TILE_EMPTY = -1;
var TILE_MOUNTAIN = -2;
var TILE_FOG = -3;
var TILE_FOG_OBSTACLE = -4; // Cities and Mountains show up as Obstacles in the fog of war.


var generals;
var cities = [];
var map = [];

var playerIndex
var replayId
var chatRoom
var teamChatRoom
var usernames
var teams

socket.on('game_start', function(data) {
	playerIndex = data.playerIndex
	replayId = data.replay_id
	chatRoom = data.chat_room
	teamChatRoom = data.team_chat_room
	usernames = data.usernames
	teams = data.teams

	var replay_url = 'http://bot.generals.io/replays/' + encodeURIComponent(data.replay_id)
	console.log('Game starting! The replay will be available after the game at ' + replay_url)
	console.log(data)
});

socket.on('game_update', function(data) {
	// Patch the city and map diffs into our local variables.
	cities = patch(cities, data.cities_diff);
	map = patch(map, data.map_diff);
	generals = data.generals;

	// The first two terms in |map| are the dimensions.
	var width = map[0];
	var height = map[1];
	var size = width * height;

	// The next |size| terms are army values.
	// armies[0] is the top-left corner of the map.
	var armies = map.slice(2, size + 2);

	// The last |size| terms are terrain values.
	// terrain[0] is the top-left corner of the map.
	var terrain = map.slice(size + 2, size + 2 + size);
});

socket.on('game_lost', function(data) {
	console.log('game lost')
	// socket.emit('leave_game')
});

socket.on('game_won', function(data) {
	console.log('game won')
	// socket.emit('leave_game')
});

export function sendChat( message ) {
	socket.emit('chat_message', chatRoom, 'test chat message');
}

socket.on('chat_message', function(chat_room, data) {
	// console.log('chat msg:', data)
	data.username
	data.playerIndex
	data.text
});

socket.on('stars', function(data) { console.log('stars:', data) });
socket.on('rank', function(data) { console.log('rank:', data) });

// socket.emit('stars_and_rank', user_id);
