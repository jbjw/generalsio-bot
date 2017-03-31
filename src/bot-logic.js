
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
