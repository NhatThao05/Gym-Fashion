import React, {useRef} from 'react';
import Link from 'next/link';
import {AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineLeftCircle, AiOutlineStar} from 'react-icons/ai'
import {GiShoppingCart} from 'react-icons/gi'
import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

export default function Cart() {
  const cartRef = useRef();
  const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext();

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeftCircle />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <GiShoppingCart size={150} color="#324d67"/>
            <h3>Your shopping bag is empty now</h3>
            <Link href="/">
              <button type='button' className='btn' onClick={() => setShowCart(false)}>
                Go to shopping
              </button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          {cartItems.length >=1 && cartItems.map((item, index) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image"/>
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                        <AiOutlineMinusCircle />
                      </span>
                      <span className='num'>{item.quantity}</span>
                      <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                        <AiOutlinePlusCircle />
                      </span>
                    </p>
                  </div>
                  <button className='remove-item' type='button' onClick={() => onRemove(item)}><TiDeleteOutline /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >=1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button className='btn' type='button' onClick="">
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
