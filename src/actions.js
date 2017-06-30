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
