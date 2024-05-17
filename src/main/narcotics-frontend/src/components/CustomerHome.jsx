import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import cart from "../assets/cart.svg";
import clock from "../assets/clock.svg";
import profile from "../assets/profile.svg";
import "../css/CustomerHome.scss";
import ProductTile from "./ProductTile.jsx";

function CustomerHome() {
    const [productList, setProductList] = useState([])
    const {username}=useParams();
    const navigate=useNavigate();
    async function displayProducts(){
        const productsResponse = await fetch('http://localhost:8080/products');
        let products = await productsResponse.json();
        setProductList([...products]);
        console.log(products)
    }

    useEffect(() => {
        displayProducts().then();
    }, []);

    function logOut() {
        navigate('/',{replace:true});
    }

    function showProduct(productId) {
        navigate(`/customer/${username}/product/${productId}`,{replace:true});
    }

    function pastOrder() {
        navigate(`/customer/${username}/past-orders`);
    }

    function goCart() {
        navigate(`/customer/${username}/cart`,{replace:true});
    }

    function goProfile() {
        navigate(`/customer/${username}/profile`,{replace:true});
    }

    return (
        <div className={"home-page"}>
            <header className={"header"}>
                {/*<h1>Home Page</h1>*/}
                {/*<h3>Name: {username}</h3>*/}

                <button onClick={logOut} className={"log-out"}>Logout</button>
                <div className={"heading"}>NARCOTICS NEXUS</div>
                <div className={"navigation"}>
                    <img src={cart} alt={"cart"} height={40} width={40} onClick={goCart} className={"navigation-icon"}/>
                    <img src={clock} alt={"clock"} height={35} width={35} onClick={pastOrder} className={"navigation-icon"}/>
                    <img src={profile} alt={"profile"} height={40} width={40} onClick={goProfile} className={"navigation-icon"}/>
                </div>
            </header>
            <div className={"empty-div"}/>
            <div className={"products"}>
                {productList.map((product,index) => {
                    if(product.stock>0) {
                        return (
                            <div onClick={() => showProduct(product.productId)}>
                                <ProductTile id={product.productId} name={product.productName} price={product.cost}/>
                            </div>
                        );
                    }
                })}
            </div>
            {/*<ul className={"product-list"}>*/}
            {/*    {productList.map((product,index) => {*/}
            {/*        if(product.stock>0) {*/}
            {/*            return (*/}
            {/*                <li key={index} id={product.productId} className={"product-list-item"}*/}
            {/*                    onClick={() => showProduct(product.productId)}>*/}
            {/*                    <div>*/}
            {/*                        Name: {product.productName}*/}
            {/*                    </div>*/}
            {/*                    <div>*/}
            {/*                        Cost: {product.cost}*/}
            {/*                    </div>*/}
            {/*                </li>*/}
            {/*            );*/}
            {/*        }*/}
            {/*    })}*/}
            {/*</ul>*/}
        </div>
    );
}

export default CustomerHome;