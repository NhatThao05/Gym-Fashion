import React from 'react'
import Link from 'next/link'
import {GiShoppingCart} from 'react-icons/gi'
import Cart from './Cart'
import { useStateContext } from '../context/StateContext';


export default function Navbar() {
  const {showCart ,setShowCart, totalQuantities} = useStateContext()
  return (
    <div className='navbar-container'>
      <h3 className='logo'>
        <Link href="/">Gym Fashion Store</Link>
      </h3>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <GiShoppingCart />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  )
}
