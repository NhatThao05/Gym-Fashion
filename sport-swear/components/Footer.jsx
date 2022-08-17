import React from 'react'
import {AiFillInstagram, AiFillFacebook, AiFillYoutube, AiOutlineTwitter} from 'react-icons/ai'

export default function Footer() {
  return (
    <div className='footer-container'>
      <p>@2022 Gym Store All rights reserverd</p>
      <p className='icons'>
        <AiFillFacebook />
        <AiFillInstagram />
        <AiFillYoutube />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}
