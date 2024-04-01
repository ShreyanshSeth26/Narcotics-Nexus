import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function VendorHome() {
    const {username} = useParams();
    const [productList, setProductList] = useState([]);
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

    useEffect(() => {
        displayProducts().then();
    });

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
        });
    }

    function goToProduct(index){
        navigate(`/vendor/${username}/product/${productList[index].productId}`,{replace:true});
    }

    return (
        <div>
            <h1>Vendor Home Page</h1>
            <h3>name:  {username}</h3>
            <button onClick={logout}>logout</button>
            <h2>Your Products</h2>
            <ol className={"product-list"}>
                {productList.map((product,index) => <li key={index} id={product.productId} className={"product-list-item"} onClick={()=>goToProduct(index)}>
                    <div>
                        Name: {product.productName}
                    </div>
                    <div>
                        Cost: {product.cost}
                    </div>
                    <div>
                        <button onClick={()=>deleteProduct(index)}>delete</button>
                    </div>
                </li>)}
            </ol>
            <button onClick={addButtonHandler}>Add Product</button>
        </div>
    );
}

export default VendorHome;