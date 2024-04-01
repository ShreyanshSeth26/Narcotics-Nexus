import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function CustomerProduct() {
    const {username,productId} = useParams();
    const [quantity, setQuantity] = useState(0);
    const [message, setMessage] = useState("");
    const navigate=useNavigate();
    const [product, setProduct] = useState({
        productName:"Product"
    });

    async function getProductDetails(){
        const productResponse= await fetch(`http://localhost:8080/products/id/${productId}`);
        let productDetails = await productResponse.json();
        console.log(productDetails);
        setProduct(productDetails);
    }

    useEffect(() => {
        getProductDetails().then();
    }, []);

    function handleQuantityChange(event){
        setQuantity(event.target.value);
    }

    function buyProduct() {
        if(quantity<=0){
            setMessage("Enter valid quantity");
        }
        else{
            setMessage("");
            addOrderDetails().then(()=>{
                navigate('/bought');
            });
        }
    }
    function addTocart() {
        if(quantity<=0){
            setMessage("Enter valid quantity");
        }
        else{
            addCartItem().then(()=>{
                setMessage("Item added succesfully!!!");
            });
        }
    }
    async function addCartItem(){
        const orderResponse = await fetch(`http://localhost:8080/user/customer/${username}/cart/product/${productId}/quantity/${quantity}`,{
            method:'POST',
            headers:{
                "content-type":"application/json"
            }
        });
    }
    async function addOrderDetails(){
        const orderResponse = await fetch(`http://localhost:8080/user/customer/${username}/order/product/${productId}/quantity/${quantity}`,{
            method:'POST',
            headers:{
                "content-type":"application/json"
            }
        });
    }

    function goBack() {
        navigate(`/customer/${username}/home`,{replace:true});
    }

    return (
        <div>
            <h1>{product.productName}</h1>
            <ul className={"product-list"}>
                <li className={"product-list-item"}>
                    Cost: {product.cost}
                </li>
                <li className={"product-list-item"}>
                    Weight: {product.weight}
                </li>
                <li className={"product-list-item"}>
                    Category: {product.category}
                </li>
            </ul>
            <hr/>
            <h3>{message}</h3>
            <label htmlFor={"quantity"}>Quantity:</label>
            <input name={"quantity"} type={"number"} value={quantity} onChange={handleQuantityChange}/>
            <br/>
            <button onClick={buyProduct}>Buy</button>
            <button onClick={addTocart}>Add to Cart</button>
            <br/>
            <button onClick={goBack}>Back</button>
        </div>
    );
}

export default CustomerProduct;