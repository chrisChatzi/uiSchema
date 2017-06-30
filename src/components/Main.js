import React, { PropTypes } from 'react'

const Main = ( {categories} ) => (
	<div className="main">
        {(categories.length > 0) ?
            categories.map( (v,i) =>
                <div key={i}>
                    <div>{v.id}</div>
                </div>
            )
        :"Add"}
	</div>
)

export default Main
