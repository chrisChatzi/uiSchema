/*
	Header component
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainC from '../components/Main.js'
import { load_categories, load_product, new_product } from '../actions.js'
import history from '../history.js'

function mapStateToProps(state) {
	return {
        categories : state.main.categories,
        product : state.main.productEdit
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadCategories: () => {
			dispatch(load_categories());
		},
        loadProduct: (productIdx, catId) => {
            dispatch(load_product(productIdx, catId));
        },
        newProduct: (data, prodId, catId) => {
            dispatch(new_product(data, prodId, catId));
        }
	};
}

class Main extends Component {
	static get propTypes() {
		return {}
	}

	constructor(props) {
		super(props);

		this.state = {
			popup : false,
			newTagData : this.props.product
		}

        this.openTag = this.openTagHandler.bind(this);
        this.newTag = this.newTagHandler.bind(this);
		this.openPopup = this.openPopupHandler.bind(this);
        this.closePopup = this.closePopupHandler.bind(this);
        this.changeInput = this.changeInputHandler.bind(this);
        this.addProduct = this.addProductHandler.bind(this);
	}

	componentDidMount() {
        this.props.loadCategories();
	}

    //open product
    openTagHandler(catIdx, idx){
        this.props.loadProduct(this.props.categories[catIdx].offers[idx].id, this.props.categories[catIdx].id);
        history.push("/product");
    }
	//create new product for this category
	newTagHandler(catId){
		this.openPopupHandler();
	}
	// open popup
    openPopupHandler(){
        this.setState({popup : true})
        let el = document.getElementById("popupCat");
        Object.assign(el.style, {
            height: window.innerHeight*0.8+"px",
            width: window.innerWidth*0.8+"px",
            top: "50%",
            left: "50%",
            marginTop : (-(window.innerHeight*0.8)/2)+"px",
            marginLeft : (-(window.innerWidth*0.8)/2)+"px"
        });
    }
    //close popup
    closePopupHandler(){
        this.setState({popup : false});
    }
	// edit product input change handler
    changeInputHandler(e, type){
        let edit = this.state.newTagData.slice();
        if(type.indexOf(".") >= 0){
            let arr = type.split(".");
            if(arr[2]) edit[0].offer[0].properties[arr[1]][arr[2]] = e.target.value;
            else edit[0].offer[0].properties[arr[1]] = e.target.value;
        }else edit[0][type] = e.target.value;

        this.setState({newTagData : edit})
    }
	// add new product
	addProductHandler(){
		// get date now
		let d = new Date();
		let edit = this.state.newTagData.slice();
		edit[0].createdAt = d;
		edit[0].offer[0].createdAt = d;
		// checks
		let errors = []
		for(let val in edit[0]) if(edit[0][val].length <= 0) errors.push(val);
		for(let val in edit[0].offer[0].properties) if(edit[0].offer[0].properties[val].length <= 0) errors.push(val);
		if(edit[0].offer[0].properties.originalPrice.currencyCode.length <= 0) errors.push("originalPrice currencyCode");
		if(edit[0].offer[0].properties.reducedPrice.currencyCode.length <= 0) errors.push("reducedPrice currencyCode");
		if(edit[0].offer[0].properties.productImagePointer.itemName.length <= 0) errors.push("image");
		if(errors.length > 0) alert("Missing fields:\n"+errors.join("\n"));
		else{
			this.props.newProduct(this.state.newTagData[0], this.state.newTagData[0].id, this.props.categories[0].id)
			this.closePopupHandler();
		}
	}

	render() {
		return (
			<div>
				<MainC state={this.state} categories={this.props.categories} product={this.props.product}
					openTag={this.openTag} newTag={this.newTag}
					openPopup={this.openPopup} closePopup={this.closePopup}
					changeInput={this.changeInput} addProduct={this.addProduct} />
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
