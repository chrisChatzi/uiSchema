import React, { PropTypes } from 'react'

const Main = ( { categories, openTag } ) => (
	<div className="main">
        <div className="add"><i className="fa fa-plus"></i></div>
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
                            {v.offers.map( (vOffer, iOffer) =>
                                <div key={iOffer} className="tag" onClick={()=>openTag(i, iOffer)}>{vOffer.properties.name}</div>
                            )}
                        </div>
                    </div>
                </div>
            )
        :"No data"}
	</div>
)

export default Main
