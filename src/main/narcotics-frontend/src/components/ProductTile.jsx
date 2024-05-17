import React from 'react';
import PropTypes from "prop-types";
import ProductImage from "../assets/product_placeholder.jpg";
import "../css/ProductTile.scss";

function ProductTile(props) {
    return (
        <>
            <div className={"product-tile"}>
                <img src={ProductImage} className={"product-image"}/>
                <div className={"product-description"}>
                    <div className={"product-title"}>
                        {props.name}
                    </div>
                    <div className={"product-price"}>
                        ${props.price}
                    </div>
                </div>
            </div>
        </>
    );
}

ProductTile.propType={
    name: PropTypes.string,
    price: PropTypes.string
}

export default ProductTile;