import React, { PropTypes } from 'react'
import Popup from './Popup.js'

const Product = ( { state, product, delProduct, openPopup, closePopup, changeInput, updateProduct } ) => (
	<div className="product">
        <div className={(state.popup) ? "popupBack" : "popupBack off"} onClick={closePopup}></div>
        <div className={(state.popup) ? "popup" : "popup off"} id="popup">
            <Popup data={product} changeInput={changeInput} updateProduct={updateProduct} />
        </div>
        {(product.length > 0) ?
            product.map( (v,i) =>
                <div key={i} className="productItem">
                    <div className="productRow head">
                        {v.id}
                        <div className="header edit" onClick={openPopup}><i className="fa fa-pencil"></i></div>
                        <div className="header del" onClick={delProduct}><i className="fa fa-trash"></i></div>
                    </div>
                    <div className="productRow">
                        <div className="key">Content type</div>
                        <div className="val">{v.contentType}</div>
                    </div>
                    <div className="productRow">
                        <div className="key">Properties</div>
                        <div className="val">{v.properties}</div>
                    </div>
                    <div className="productRow">
                        <div className="key">Created at</div>
                        <div className="val">{v.createdAt}</div>
                    </div>
                    {v.offer.map( (vOffer, iOffer) =>
                        <div key={iOffer} className="offer">
                            <div className="productRow head">Offer</div>
                            <div className="productRow">
                                <div className="key">Created at</div>
                                <div className="val">{vOffer.createdAt}</div>
                            </div>
                            <div className="productRow">
                                <div className="key">Name</div>
                                <div className="val">{vOffer.properties.name}</div>
                            </div>
                            <div className="productRow">
                                <div className="key">Category</div>
                                <div className="val">{vOffer.properties.category}</div>
                            </div>
                            <div className="productRow">
                                <div className="key">Description</div>
                                <div className="val">{vOffer.properties.description}</div>
                            </div>
                            <div className="productRow">
                                <div className="key">Product name</div>
                                <div className="val">{vOffer.properties.productName}</div>
                            </div>
                            <div className="productRow">
                                <div className="key">Retailer URL</div>
                                <div className="val">{vOffer.properties.retailerUrl}</div>
                            </div>
                            <div className="productRow">
                                <div className="key">Product Brand</div>
                                <div className="val">{vOffer.properties.productBrand}</div>
                            </div>
                            <div className="productRow">
                                <div className="key">Original price</div>
                                <div className="val">
                                    {vOffer.properties.originalPrice.amount+" "+vOffer.properties.originalPrice.currencyCode}
                                </div>
                            </div>
                            <div className="productRow">
                                <div className="key">Reduced price</div>
                                <div className="val">
                                    {vOffer.properties.reducedPrice.amount+" "+vOffer.properties.reducedPrice.currencyCode}
                                </div>
                            </div>
                            <div className="productRow">
                                <div className="key">Image</div>
                                <div className="val">{vOffer.properties.productImagePointer.itemName}</div>
                            </div>
                        </div>
                    )}
                </div>
            )
        :""}
	</div>
)

export default Product
