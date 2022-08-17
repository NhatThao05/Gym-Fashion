import React from 'react'
import Link from 'next/link'
import {GiShoppingCart} from 'react-icons/gi'

export default function Navbar() {
  return (
    <div className='navbar-container'>
      <h3 className='logo'>
        <Link href="/">Gym Fashion Store</Link>
      </h3>
      <button type='button' className='cart-icon' onClick="">
        <GiShoppingCart />
        <span className='cart-item-qty'>1</span>
      </button>
    </div>
  )
}
