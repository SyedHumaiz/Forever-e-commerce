import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$"
    const deliveryfee = 10;
    const [products, setproducts] = useState([])
    const [token, settoken] = useState("")
    const baseUrl = "http://localhost:4000"
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setcartItems] = useState({})
    const navigate = useNavigate()

    const addToCart = async (itemID, size) => {

        if (!size) {
            toast.error("Select Product Size")
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemID]) {
            if (cartData[itemID][size]) {
                cartData[itemID][size] += 1;
            }
            else {
                cartData[itemID][size] = 1;
            }
        } else {
            cartData[itemID] = {};
            cartData[itemID][size] = 1
        }

        setcartItems(cartData)

        if (token) {
            axios.post(baseUrl + "/api/cart/addToCart", { itemID, size }, { headers: { token } })
                .then(result => {
                    if (result.data.success) {
                        toast.success(result.data.message)
                    }
                    else {
                        toast.error(result.data.message)
                    }
                }).catch(err => {
                    toast.error(err.message)
                })
        }
    }

    const getCartCount = () => {
        let totalcount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalcount += cartItems[items][item]
                    }
                } catch (error) {
                }
            }
        }
        return totalcount;
    }

    const updateQuantity = (itemid, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemid][size] = quantity;

        setcartItems(cartData)
        if (token) {
            axios.post(baseUrl + "/api/cart/updateCart", { itemid, size, quantity } , {headers : {token}})
                .then(result => {
                    if (result.data.success) {
                        toast.success(result.data.message)
                    }
                    else {
                        toast.error(result.data.message)
                    }
                }).catch(err => {
                    toast.error(err.message)
                })
        }
    }


    const getUserCart = (token)=> {
        axios.post(baseUrl + "/api/cart/cartData" , {},{headers : {token}})
        .then(result => {
            if(result.data.success){
                setcartItems(result.data.cartItems)
            }else{
                console.log(result.data.message)
            }
        }).catch(err =>{
            console.log(err)
        })
        
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find(product => String(product.id) === items)
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += Number(itemInfo.price) * cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const fetchData = () => {
        axios.get(baseUrl + "/api/product/listproducts")
            .then(result => {
                if (result.data.success) {
                    setproducts(result.data.Products)
                }
                else {
                    toast.error(result.data.message)
                }
            }).catch(err => {
                console.log(err)
                toast.error(err.message)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            settoken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem("token"));
        }
    }, [])

    const value = {
        products, currency, deliveryfee
        , search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount
        , updateQuantity, getCartAmount, navigate, baseUrl, token, settoken , setcartItems
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider