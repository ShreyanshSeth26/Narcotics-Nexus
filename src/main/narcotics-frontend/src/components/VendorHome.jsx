import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "../css/VendorHome.scss";
import StockPopup from "./StockPopup.jsx";

function VendorHome() {
    const {username} = useParams();
    const [productList, setProductList] = useState([]);
    const [productId, setProductId] = useState();
    const [popTrigger, setPopTrigger] = useState(false)
    const navigate=useNavigate();

    async function displayProducts(){
        const productsResponse = await fetch(`http://localhost:8080/user/vendor/${username}/product`);
        let products = await productsResponse.json();
        setProductList([...products]);
        console.log(products)
    }
    async function removeProductApi(productId){
        const removeProductResponse = await fetch(`http://localhost:8080/user/vendor/${username}/product/${productId}`,{
            method:'DELETE'
        });
    }

    function handleQuantityChange(event,index){
        let tempList=productList;
        tempList[index].quantity=event.target.value;
        setProductList(tempList);
    }

    useEffect(() => {
        displayProducts().then();
    },[]);

    function addButtonHandler() {
        navigate(`/vendor/${username}/add-product`);
    }

    function logout() {
        navigate('/',{replace:true});
    }

    function deleteProduct(index){
        let product = productList[index];
        console.log(product);
        removeProductApi(product.productId).then(()=>{
            setProductList(p=>p.filter(prod=>prod.productId!==product.productId));
            displayProducts().then();
        });

    }

    function goToProduct(index){
        navigate(`/vendor/${username}/product/${productList[index].productId}`,{replace:true});
    }

    function addStock(index) {
        setProductId(productList[index].productId);
        setPopTrigger(true);
        displayProducts().then();
    }

    return (
        <div>
            <header className={"vendor-header"}>
                <button onClick={logout} className={"log-out"}>Logout</button>
                <div className={"vendor-heading"}>NARCOTICS NEXUS VENDOR PORTAL</div>
                <div className={"vendor-username"}>{username}</div>
            </header>
            <div className={"vendor-empty-div"}/>
            <div className={"vendor-subheading"}>Your Products</div>
            <ol className={"product-list"}>
                {productList.map((product, index) => {
                    if (product.stock > 0) {
                        return (
                            <div key={index} id={product.productId} className={"product-list-item"}>
                                <div className={"product-details"} onClick={() => goToProduct(index)}>
                                    <div>
                                        Name: {product.productName}
                                    </div>
                                    <div>
                                        Cost: {product.cost}
                                    </div>
                                    <div>
                                        Stock: {product.stock}
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className={"product-button"}>
                                    <button onClick={() => {
                                        event.stopPropagation();
                                        deleteProduct(index);
                                    }}>remove
                                    </button>
                                </div>
                            </div>
                        );
                    }
                })}
            </ol>
            <div className={"vendor-subheading"}>Out of Stock Products</div>
            <StockPopup trigger={popTrigger} setTrigger={setPopTrigger} username={username} productId={productId}/>
            <ol className={"product-list"}>
                {productList.map((product, index) => {
                    if (product.stock <= 0) {
                        return (
                            <li key={index} id={product.productId} className={"product-list-item"}>
                                <div className={"product-details"} onClick={() => goToProduct(index)}>
                                    <div>
                                        Name: {product.productName}
                                    </div>
                                    <div>
                                        Cost: {product.cost}
                                    </div>
                                    <div>
                                        Stock: {product.stock}
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => addStock(index)}>Add Stock</button>
                                </div>
                            </li>
                        );
                    }
                })}
            </ol>
            <button onClick={addButtonHandler}>Add Product</button>
        </div>
    );
}

export default VendorHome;
