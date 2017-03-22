import React from 'react';
import ReactDOM from 'react-dom';

export default class View extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <div>
			<h1>generalsio-bot</h1>
			<Grid rows='10' cols='10'></Grid>
		</div>
	}
}

class Grid extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let rows = []
		for (let i = 0; i < this.props.rows; i++) {
			rows.push(i)
		}

		return <div className='grid'>
			{rows.map( (row) => <Row key={row}></Row> )}
		</div>
	}
}

class Row extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let cols = []
		for (let i = 0; i < this.state.cols; i++) {
			cols.push(i)
		}
		return <div className='row'>
			{cols.map( (col) => <Cell key={col}></Cell> )}
		</div>
	}
}

class Cell extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <div className="cell">
			{this.props.contents}
		</div>
	}
}
