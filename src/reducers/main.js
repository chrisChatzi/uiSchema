import init from '../initialState'

const state_update = (state = init.main, action) => {
	let newstate = Object.assign({}, state);
	switch (action.type) {
		case "LOAD_CATEGORIES": {
			newstate.categories = action.data;
			return newstate;
		}
		case "LOAD_PRODUCT": {
			newstate.product = action.data;
			newstate.selectedCategory = action.catId;
			return newstate;
		}
		case "DELETE_PRODUCT": {
			newstate.product = [];
			return newstate;
		}
		case "UPDATE_PRODUCT": {
			// let arr = newstate.product.slice();
			let arr = [action.data];
			console.log(arr)
			newstate.product = arr;
			return newstate;
		}
		default:
			return state || init.main
	}
}

export default state_update
