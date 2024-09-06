import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

function VendorProduct(){
    const{username, productId} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productName:"Product",
        sale:0,
        earnings:0
    });

    async function getStats(){
        const statsResponse = await fetch(`http://localhost:8080/user/vendor/${username}/product/${productId}/stats`);
        let productStats = await statsResponse.json();
        console.log(productStats);
        setProduct(productStats);
    }

    useEffect(() => {
        getStats().then(()=>{
            if(product.image!==null){
                const blob = new Blob([product.image], { type: 'image/jpeg' }); // Adjust type based on image format
                const url = URL.createObjectURL(blob);
                document.getElementById('productImage').src = url;
            }
        });
    },[]);

    function goBack(){
        console.log("clicked");
        navigate(`/vendor/${username}/home`,{replace:true});
    }

    function handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const arrayBuffer = e.target.result;
                const byteArray = new Uint8Array(arrayBuffer);

                // Display byte array
                displayByteArray(byteArray);

                // Convert byte array back to image
                const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust type based on image format
                const url = URL.createObjectURL(blob);
                document.getElementById('productImage').src = url;
            };
            reader.readAsArrayBuffer(file);
        }
    }
    function displayByteArray(byteArray) {
        console.log(byteArray.join(', '));
    }

    return(
        <div>
            <h1>{product.productName}</h1>
            <h2>Sell stats</h2>
            <img id="productImage" alt="Product Image"/><br/>
            <input type="file" id="photoInput" accept="image/*" onChange={handlePhotoUpload}/>
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
            <button onClick={goBack}>Back</button>
        </div>
    );
}

export default VendorProduct;