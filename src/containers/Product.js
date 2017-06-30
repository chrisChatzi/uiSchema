/*
	Header component
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProductC from '../components/Product.js'
import { load_categories } from '../actions.js'
import history from '../history.js'

function mapStateToProps(state) {
	return {
        
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadCategories: () => {
			dispatch(load_categories())
		},
	};
}

class Product extends Component {
	static get propTypes() {
		return {

		}
	}

	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		return (
			<div>
				<ProductC />
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
