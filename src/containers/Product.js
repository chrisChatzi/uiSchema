/*
	Header component
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductC from '../components/Product.js'
import { delete_product, update_product } from '../actions.js'
import history from '../history.js'

function mapStateToProps(state) {
	return {
        product : state.main.product,
        catId : state.main.selectedCategory
	};
}

function mapDispatchToProps(dispatch) {
	return {
		deleteProduct: (id, catId) => {
			dispatch(delete_product(id, catId))
		},
        updateProduct: (obj, catId, prodId) => {
            dispatch(update_product(obj, catId, prodId))
        }
	};
}

class Product extends Component {
	static get propTypes() {
		return {
            product : PropTypes.array.isRequired
		}
	}

	constructor(props) {
		super(props);

        this.state = {
            popup : false,
            productEdit : ""
        }

        this.delProduct = this.delProductHandler.bind(this);
        this.openPopup = this.openPopupHandler.bind(this);
        this.closePopup = this.closePopupHandler.bind(this);
        this.changeInput = this.changeInputHandler.bind(this);
        this.updateProduct = this.updateProductHandler.bind(this);
	}

	componentDidMount() { }

    // delete product
    delProductHandler(){
        let r = confirm("Are you sure you want to delete this product?\nId: "+this.props.product[0].id);
        if(r){
            this.props.deleteProduct(this.props.product[0].id, this.props.catId);
            history.push("/");
        }
    }

    // open popup
    openPopupHandler(){
        this.setState({popup : true})
        let el = document.getElementById("popup");
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
        let edit = this.props.product.slice();
        if(type.indexOf(".") >= 0){
            let arr = type.split(".");
            if(arr[2]) edit[0].offer[0].properties[arr[1]][arr[2]] = e.target.value;
            else edit[0].offer[0].properties[arr[1]] = e.target.value;
        }else edit[0][type] = e.target.value;

        this.setState({productEdit : edit[0]})
    }
    // update product
    updateProductHandler(){
        let res = this.state.productEdit;
        if(res){
            if(parseInt(res.offer[0].properties.originalPrice.amount,10) < parseInt(res.offer[0].properties.reducedPrice.amount,10))
                alert("Reduced price cannot be higher than the original one")
            else{
                this.props.updateProduct(res, this.props.catId, this.props.product[0].id);
                this.closePopupHandler();
            }
        }else alert("Nothing to update")
    }

	render() {
		return (
			<div>
				<ProductC state={this.state}
                    product={this.props.product} delProduct={this.delProduct}
                    openPopup={this.openPopup} closePopup={this.closePopup}
                    changeInput={this.changeInput} updateProduct={this.updateProduct} />
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
