import React, { PropTypes } from 'react'
import Popup from './Popup.js'

const Main = ( { state, categories, product, openTag, newTag, openPopup, closePopup, changeInput, addProduct } ) => (
	<div className="main">
		<div className={(state.popup) ? "popupBack" : "popupBack off"} onClick={closePopup}></div>
        <div className={(state.popup) ? "popup" : "popup off"} id="popupCat">
            <Popup data={product} changeInput={changeInput} action={addProduct} newFlag={true} />
        </div>
        {(categories.length > 0) ?
            categories.map( (v,i) =>
                <div key={i}>
                    <div className="mainRow head">
                        {v.id}
                    </div>
                    <div className="mainRow">
                        <div className="key">Properties</div>
                        <div className="val">{v.properties}</div>
                    </div>
                    <div className="mainRow">
                        <div className="key">Content type</div>
                        <div className="val">{v.contentType}</div>
                    </div>
                    <div className="mainRow">
                        <div className="key">Created At</div>
                        <div className="val">{v.createdAt}</div>
                    </div>
                    <div className="mainRow">
                        <div className="key">Products</div>
                        <div className="val">
                            {(v.offers.length > 0) ?
                                v.offers.map( (vOffer, iOffer) =>
                                    <div key={iOffer} className="tag" onClick={()=>openTag(i, iOffer)}>{vOffer.id}</div>
                                )
                            :"No offers"}
							<div className="tag plus" onClick={()=>newTag(v.id)}><i className="fa fa-plus"></i></div>
                        </div>
                    </div>
                </div>
            )
        :"No data"}
	</div>
)

export default Main
