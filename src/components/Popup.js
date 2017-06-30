import React, { PropTypes } from 'react'

const Popup = ( { newFlag, data, changeInput, action } ) => (
	<div className="popupMain">
        {(data[0]) ?
            <div>
                {(newFlag) ?
                    <div className="popupRow">
                        <div className="key">Id</div>
                        <div className="val"><input value={data[0].id} onChange={(e)=>changeInput(e, "id")} /></div>
                    </div>
                :""}
                <div className="popupRow">
                    <div className="key">Content type</div>
                    <div className="val"><input value={data[0].contentType} onChange={(e)=>changeInput(e, "contentType")} /></div>
                </div>
                <div className="popupRow">
                    <div className="key">Properties</div>
                    <div className="val"><input value={data[0].properties} onChange={(e)=>changeInput(e, "properties")} /></div>
                </div>
                {data[0].offer.map( (vOffer, iOffer) =>
                    <div key={iOffer} className="offer">
                        <div className="popupRow head">Offer</div>
                        <div className="popupRow">
                            <div className="key">Name</div>
                            <div className="val">
                                <input value={vOffer.properties.name} onChange={(e)=>changeInput(e, "offer.name")} />
                            </div>
                        </div>
                        <div className="popupRow">
                            <div className="key">Category</div>
                            <div className="val">
                                <input value={vOffer.properties.category} onChange={(e)=>changeInput(e, "offer.category")} />
                            </div>
                        </div>
                        <div className="popupRow">
                            <div className="key">Description</div>
                            <div className="val">
                                <input value={vOffer.properties.description} onChange={(e)=>changeInput(e, "offer.description")} />
                            </div>
                        </div>
                        <div className="popupRow">
                            <div className="key">Product name</div>
                            <div className="val">
                                <input value={vOffer.properties.productName} onChange={(e)=>changeInput(e, "offer.productName")} />
                            </div>
                        </div>
                        <div className="popupRow">
                            <div className="key">Retailer URL</div>
                            <div className="val">
                                <input value={vOffer.properties.retailerUrl} onChange={(e)=>changeInput(e, "offer.retailerUrl")} />
                            </div>
                        </div>
                        <div className="popupRow">
                            <div className="key">Product Brand</div>
                            <div className="val">
                                <input value={vOffer.properties.productBrand} onChange={(e)=>changeInput(e, "offer.productBrand")} />
                            </div>
                        </div>
                        <div className="popupRow">
                            <div className="key">Original price</div>
                            <div className="val">
                                <input value={vOffer.properties.originalPrice.amount}
                                    onChange={(e)=>changeInput(e, "offer.originalPrice.amount")} />
                                <input value={vOffer.properties.originalPrice.currencyCode}
                                    onChange={(e)=>changeInput(e, "offer.originalPrice.currencyCode")} />
                            </div>
                        </div>
                        <div className="popupRow">
                            <div className="key">Reduced price</div>
                            <div className="val">
                                <input value={vOffer.properties.reducedPrice.amount}
                                    onChange={(e)=>changeInput(e, "offer.reducedPrice.amount")} />
                                <input value={vOffer.properties.reducedPrice.currencyCode}
                                    onChange={(e)=>changeInput(e, "offer.reducedPrice.currencyCode")} />
                            </div>
                        </div>
                        <div className="popupRow">
                            <div className="key">Image</div>
                            <div className="val">
                                <input value={vOffer.properties.productImagePointer.itemName}
                                    onChange={(e)=>changeInput(e, "offer.productImagePointer.itemName")} />
                            </div>
                        </div>
                    </div>
                )}
                <div className="popupRow">
                    <button onClick={action}>{(newFlag) ? "Add" : "Update"}</button>
                </div>
            </div>
        :""}
	</div>
)

export default Popup
