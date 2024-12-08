

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../Component/Title";
import { assets } from "../assets/assets";
import CartTotal from "../Component/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setcartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    Object.keys(cartItems).forEach(productId => {
      Object.keys(cartItems[productId]).forEach(size => {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            id: Number(productId),
            size,
            quantity: cartItems[productId][size],
          });
        }
      });
    });
    setcartData(tempData);
  }, [cartItems]);

  if (!products || !cartItems) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl">
        <Title text1={"Your"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item) => {
          const productData = products.find(product => Number(product.id) === item.id);


          return (
            <div
              key={`${item.id}-${item.size}`}
              className="py-4 border-t border-b border-gray-300 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.images?.[0] ? `http://localhost:5174${productData.images[0]}` : "default-image-path.jpg"}
                  alt={productData.name || "Product Image"}
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="border px-2 sm:px-3 sm:py-1 bg-slate-100">{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? ""
                    : updateQuantity(item.id, item.size, Number(e.target.value))
                }
                className="border max-w-10 sm:max-w-20 py-1 px-1 sm:px-2"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item.id, item.size, 0)}
                className="w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end">
        <div className="w-full sm:w-[30%]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
