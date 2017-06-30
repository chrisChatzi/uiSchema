/*
	Header component
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MainC from '../components/Main.js'
import { load_categories, load_product } from '../actions.js'
import history from '../history.js'

function mapStateToProps(state) {
	return {
        categories : state.main.categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadCategories: () => {
			dispatch(load_categories());
		},
        loadProduct: (productIdx, catId) => {
            dispatch(load_product(productIdx, catId));
        }
	};
}

class Main extends Component {
	static get propTypes() {
		return {

		}
	}

	constructor(props) {
		super(props);

        this.openTag = this.openTagHandler.bind(this);
	}

	componentDidMount() {
        this.props.loadCategories();
	}

    //open product
    openTagHandler(catIdx, idx){
        this.props.loadProduct(this.props.categories[catIdx].offers[idx].id, this.props.categories[catIdx].id);
        history.push("/product");
    }

	render() {
		return (
			<div>
				<MainC categories={this.props.categories} openTag={this.openTag} />
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
