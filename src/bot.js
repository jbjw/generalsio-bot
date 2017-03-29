var socket = require('socket.io-client')('http://botws.generals.io')

var user_id = 'my_example_bot_id'
var username = '[Bot] Example Bot'

// env replace e.g. var user_id = process.env.BOT_USER_ID;

export default class Bot {
	constructor() {
		socket.on('connect', function(data) {
			console.log('Connected to server.', data)
		})

		socket.on('disconnect', function(data) {
			console.error('Disconnected from server.', data)
			// process.exit(1)
		})

		socket.emit('stars_and_rank', user_id);

		socket.on('stars', function(data) { console.log('stars:', data) })
		socket.on('rank', function(data) { console.log('rank:', data) })
	}

	onGameStart( callback ) {
		socket.on( 'game_start', callback( data ) )
	}

	customGame() {
		var custom_game_id = 'my_private_game'
		socket.emit('join_private', custom_game_id, user_id)
		socket.emit('set_force_start', custom_game_id, true)
		// socket.emit('set_custom_team', custom_game_id, team)
		console.log('Joined custom game at http://bot.generals.io/games/' + encodeURIComponent(custom_game_id));

		socket.on('game_start', function(data) {
			// replace with obj destructuring
			this.player_index = data.player_index
			this.replay_id = data.replay_id
			this.chat_room = data.chat_room
			this.team_chat_room = data.team_chat_room
			this.usernames = data.usernames
			this.teams = data.teams
			this.replay_url = 'http://bot.generals.io/replays/' + encodeURIComponent(this.replay_id)

			console.log('Game starting! The replay will be available after the game at ' + this.replay_url)

			socket.emit('chat_message', this.chat_room, 'test chat message');

			socket.on('game_lost', function(data) {
				console.log('game lost')
				socket.emit('leave_game')
			})

			socket.on('game_won', function(data) {
				console.log('game won')
				socket.emit('leave_game')
			})

			// let chatMessages = []
			socket.on('chat_message', function(chat_room, data) {
				console.log('chat msg:', data)
			})
		})

		// Terrain Constants.
		// Any tile with a nonnegative value is owned by the player corresponding to its value.
		// For example, a tile with value 1 is owned by the player with playerIndex = 1.
		var TILE_EMPTY = -1;
		var TILE_MOUNTAIN = -2;
		var TILE_FOG = -3;
		var TILE_FOG_OBSTACLE = -4; // Cities and Mountains show up as Obstacles in the fog of war.

		socket.on('game_update', function(data) {
			// Patch the city and map diffs into our local variables.

			// double check, better way to do empty list thing?
			this.cities = []
			this.map = []
			this.cities = patch(this.cities || [], data.cities_diff)
			this.map = patch(this.map || [], data.map_diff)
			this.generals = data.generals

			// The first two terms in |map| are the dimensions.
			var width = this.map[0]
			var height = this.map[1]
			var size = width * height

			// The next |size| terms are army values.
			// armies[0] is the top-left corner of the map.
			var armies = this.map.slice(2, size + 2)

			// The last |size| terms are terrain values.
			// terrain[0] is the top-left corner of the map.
			var terrain = this.map.slice(size + 2, size + 2 + size)
			// Make a random move.
			while (true) {
				// Pick a random tile.
				var index = Math.floor(Math.random() * size)

				// If we own this tile, make a random move starting from it.
				if (terrain[index] === this.playerIndex) {
					var row = Math.floor(index / width)
					var col = index % width
					var endIndex = index

					var rand = Math.random();
					if (rand < 0.25 && col > 0) { // left
						endIndex--
					} else if (rand < 0.5 && col < width - 1) { // right
						endIndex++
					} else if (rand < 0.75 && row < height - 1) { // down
						endIndex += width
					} else if (row > 0) { //up
						endIndex -= width
					} else {
						continue
					}

					// Would we be attacking a city? Don't attack cities.
					if (this.cities.indexOf(endIndex) >= 0) {
						continue
					}

					socket.emit('attack', index, endIndex)
					break
				}
			}
		});

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
	}

	get username() {
		return this.username
	}

	set username(x) {
		socket.emit('set_username', user_id, username)
		socket.on('error_set_username', function(data) {
			console.log(`Error setting username?: ${data}`)
		})
	}
}

// socket.emit('play', user_id) // ffa queue

// socket.emit('join_1v1', user_id) // 1v1 queue

// socket.emit('join_team', team_id, user_id); // 2v2
// console.log('Join the same 2v2 team at http://bot.generals.io/teams/' + encodeURIComponent(team_id));
// socket.emit('leave_team', team_id);
