import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/VendorProduct.scss";
import UploadImagePopUp from "./UploadImagePopUp.jsx";
import StockPopup from "./StockPopup.jsx";

function VendorProduct(){
    const{username, productId} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productName:"Product",
        sale:0,
        earnings:0
    });
    const [imageUrl, setImageUrl] = useState("");
    const [popTrigger, setPopTrigger] = useState(false);

    const fetchImage = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/product/id/${productId}/image`, {
                responseType: 'blob',
            });
            const imageObjectUrl = URL.createObjectURL(response.data);
            setImageUrl(imageObjectUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
            alert('Failed to fetch image');
        }
    };

    async function getStats(){
        const statsResponse = await fetch(`http://localhost:8080/user/vendor/${username}/product/${productId}/stats`);
        let productStats = await statsResponse.json();
        console.log(productStats);
        setProduct(productStats);
    }

    useEffect(() => {
        getStats().then();
        fetchImage().then();
    },[]);

    function goBack(){
        console.log("clicked");
        navigate(`/vendor/${username}/home`,{replace:true});
    }

    function handleUploadTrigger(){
        setPopTrigger(true);
    }

    function closePopTrigger(response){
        setPopTrigger(response);
        fetchImage().then();
    }


    return(
        <div>
            <h1>{product.productName}</h1>
            <h2>Sell stats</h2>
            <div className={"product-content"}>
                <UploadImagePopUp trigger={popTrigger} setTrigger={closePopTrigger} username={username} productId={productId}/>
                <div className={"product-image"}>
                    <img src={imageUrl} id={"product-image"} alt={"product"}/>
                    <button onClick={handleUploadTrigger}>Upload new image</button>
                </div>
                <div className={"product-info"}>
                    <ul className={"product-list"}>
                        <li className={"product-list-item"}>
                            Name: {product.productName}
                        </li>
                        <li className={"product-list-item"}>
                            Sale: {product.sale}
                        </li>
                        <li className={"product-list-item"}>
                            Earnings: {product.earnings}
                        </li>
                    </ul>
                </div>
            </div>

            <button onClick={goBack}>Back</button>
        </div>
    );
}

export default VendorProduct;