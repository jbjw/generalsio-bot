export const socket = require('socket.io-client')('http://botws.generals.io');


let userId = 'my_example_bot_id'
let username = '[Bot] Example Bot'
let gameId = 'test'

// class Bot {
// 	constructor() {
//
// 	}
// }

export function setUserId( _userId ) {
	userId = _userId
}

export function getUserId(  ) {
	return userId
}

export function setUsername( username ) {
	username = username
	socket.emit('set_username', userId, username);
}

export function getUsername(  ) {
	return username
}

export function setGameId( _gameId ) {
	gameId = _gameId
}

export function getGameId(  ) {
	return gameId
}

// var custom_game_id = 'my_private_game'
export function customGame( _gameId, _userId ) {
	socket.emit('join_private', _gameId, _userId)
	socket.emit('set_force_start', _gameId, true)
	// socket.emit('set_custom_team', custom_game_id, team);
	// return gameId
}

// socket.emit('play', userId) // ffa queue

// socket.emit('join_1v1', userId) // 1v1 queue

// socket.emit('join_team', team_id, userId); // 2v2
// console.log('Join the same 2v2 team at http://bot.generals.io/teams/' + encodeURIComponent(team_id));
// socket.emit('leave_team', team_id);

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
	// Make a random move.
	while (true) {
		// Pick a random tile.
		var index = Math.floor(Math.random() * size);

		// If we own this tile, make a random move starting from it.
		if (terrain[index] === playerIndex) {
			var row = Math.floor(index / width);
			var col = index % width;
			var endIndex = index;

			var rand = Math.random();
			if (rand < 0.25 && col > 0) { // left
				endIndex--;
			} else if (rand < 0.5 && col < width - 1) { // right
				endIndex++;
			} else if (rand < 0.75 && row < height - 1) { // down
				endIndex += width;
			} else if (row > 0) { //up
				endIndex -= width;
			} else {
				continue;
			}

			// Would we be attacking a city? Don't attack cities.
			if (cities.indexOf(endIndex) >= 0) {
				continue;
			}

			socket.emit('attack', index, endIndex);
			break;
		}
	}
});

socket.on('game_lost', function(data) {
	console.log('game lost')
	socket.emit('leave_game')
});

socket.on('game_won', function(data) {
	console.log('game won')
	socket.emit('leave_game')
});

socket.emit('chat_message', chatRoom, 'test chat message');

let chatMessages = []
socket.on('chat_message', function(chat_room, data) {
	// console.log('chat msg:', data)
	// chatMessages
});

socket.on('stars', function(data) { console.log('stars:', data) });
socket.on('rank', function(data) { console.log('rank:', data) });

// socket.emit('stars_and_rank', user_id);

/* Returns a new array created by patching the diff into the old array.
 * The diff formatted with alternating matching and mismatching segments:
 * <Number of matching elements>
 * <Number of mismatching elements>
 * <The mismatching elements>
 * ... repeated until the end of diff.
 * Example 1: patching a diff of [1, 1, 3] onto [0, 0] yields [0, 3].
 * Example 2: patching a diff of [0, 1, 2, 1] onto [0, 0] yields [2, 0].
 */
function patch(old, diff) {
	var out = [];
	var i = 0;
	while (i < diff.length) {
		if (diff[i]) {  // matching
			Array.prototype.push.apply(out, old.slice(out.length, out.length + diff[i]));
		}
		i++;
		if (i < diff.length && diff[i]) {  // mismatching
			Array.prototype.push.apply(out, diff.slice(i + 1, i + 1 + diff[i]));
			i += diff[i];
		}
		i++;
	}
	return out;
}
