import ajax from 'ajax-query'

//load parent components
export const load_categories  = () => {
    return (dispatch) => {
        let options = {
            url : "/categories",
            type : "GET",
            contentType : "application/json; charset=utf-8"
        };
        ajax.ajaxRequest(options, (res) => {
            if(res.type == "ok") dispatch(load_categories_reducer(res.data))
        });
    };
};
export const load_categories_reducer  = (data) => {
    return {
        type: "LOAD_CATEGORIES",
        data
    };
};

//load product
export const load_product  = (id, catId) => {
    return (dispatch) => {
        let options = {
            url : "/product",
            type : "POST",
            contentType : "application/json; charset=utf-8",
            data : {id : id}
        };
        ajax.ajaxRequest(options, (res) => {
            if(res.type == "ok") dispatch(load_product_reducer(res.data, catId))
        });
    };
};
export const load_product_reducer  = (data, catId) => {
    return {
        type: "LOAD_PRODUCT",
        data, catId
    };
};
// delete product
export const delete_product  = (id, catId) => {
    return (dispatch) => {
        let options = {
            url : "/productDel",
            type : "POST",
            contentType : "application/json; charset=utf-8",
            data : {id : id, catId : catId}
        };
        ajax.ajaxRequest(options, (res) => {
            if(res.type == "ok" && res.data) dispatch(delete_product_reducer())
        });
    };
};
export const delete_product_reducer  = () => {
    return {
        type: "DELETE_PRODUCT"
    };
};
// update product
export const update_product  = (obj, catId, prodId) => {
    return (dispatch) => {
        let options = {
            url : "/productUpdate",
            type : "POST",
            contentType : "application/json; charset=utf-8",
            data : {data : obj, prodId : prodId, catId : catId}
        };
        ajax.ajaxRequest(options, (res) => {
            console.log(res.data)
            if(res.type == "ok") dispatch(update_product_reducer(res.data))
        });
    };
};
export const update_product_reducer  = (data) => {
    return {
        type: "UPDATE_PRODUCT",
        data
    };
};
