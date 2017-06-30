/*
	Header component
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MainC from '../components/Main.js'
import { load_categories } from '../actions.js'
import history from '../history.js'

function mapStateToProps(state) {
	return {
        categories : state.main.categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadCategories: () => {
			dispatch(load_categories())
		},
	};
}

class Main extends Component {
	static get propTypes() {
		return {

		}
	}

	constructor(props) {
		super(props);
	}

	componentDidMount() {
        this.props.loadCategories();
	}

	render() {
		return (
			<div>
				<MainC categories={this.props.categories}/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
