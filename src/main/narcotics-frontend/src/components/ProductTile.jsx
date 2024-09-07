import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import "../css/ProductTile.scss";
import axios from "axios";

function ProductTile(props) {
    const [imageUrl, setImageUrl] = useState("");
    useEffect(()=>{
        fetchImage().then();
    },[])
    const fetchImage = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/product/id/${props.id}/image`, {
                responseType: 'blob',
            });
            const imageObjectUrl = URL.createObjectURL(response.data);
            setImageUrl(imageObjectUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
            alert('Failed to fetch image');
        }
    };

    return (
        <>
            <div className={"product-tile"} title={props.name}>
                <img src={imageUrl} className={"product-image"} alt={"product"}/>
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
    price: PropTypes.string,
    id: PropTypes.number
}

export default ProductTile;