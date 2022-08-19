import React, {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
 const [showCart, setShowCart] = useState(false);
 const [cartItems, setCartItems] = useState([]);
 const [totalPrice, setTotalPrice] = useState(0);
 const [totalQuantities, setTotalQuantities] = useState(0);
 const [qty, setQty] = useState(1);

 let foundProduct;
 let index;

 const onAdd = (product, quantity) => {
  const checkProductInCart = cartItems.find((item) => item._id === product._id);

  setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
  setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

  if(checkProductInCart) {
   const updatedCartItems = cartItems.map((cartProduct) => {
    if(cartProduct._id === product._id) return {
     ...cartProduct,
     quantity: cartProduct.quantity + quantity,
    }
   })
   setCartItems(updatedCartItems);
  } else {
   product.quantity = quantity;
   setCartItems([...cartItems, {...product}])
  }
  toast.success(`${qty} ${product.name} added to cart.`);
 }

 const onRemove = (product) => {
  foundProduct = cartItems.find((item) => item._id === product._id);
  const newCartItems = cartItems.filter((item) => item._id !== product._id)
  setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
  setTotalQuantities((prevTotalQuantities) => prevTotalQuantities -foundProduct.quantity)
  setCartItems(newCartItems);
 }

 const toggleCartItemQuantity = (id, value) => {
  foundProduct = cartItems.find((item) => item._id === id);
  index = cartItems.findIndex((product) => product._id === id);

  const newCartItems = cartItems.filter((item) => item._id !== id)
  if(value === 'inc') {
   setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
   setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
   setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
  } else if(value === 'dec') {
   if(foundProduct.quantity > 1) {
    setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}])
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
   }
  }
 }

 const incre = () => {
  setQty((qty) => qty + 1)
 } 
 const decre = () => {
  setQty((qty) => {
   if(qty - 1 < 1) return 1;
   return qty -1;
  })
 } 

 return (
  <Context.Provider 
    value={{showCart, cartItems, totalPrice, totalQuantities, qty, incre, decre, onAdd, setShowCart, toggleCartItemQuantity, onRemove, setCartItems, setTotalPrice, setTotalQuantities}}>
     {children}
  </Context.Provider>
 )
}

export const useStateContext = () => useContext(Context);
