import React, {useState} from 'react'
import { client, urlFor } from '../../lib/client'
import {AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineStar} from 'react-icons/ai'
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

export default function ProductDetails({product, products}) {
 const {image, name, details, price} = product;
 const [index, setIndex] = useState(0)
 const {qty, incre, decre, onAdd} = useStateContext()
  return (
    <div>
     <div className='product-detail-container'>
       <div>
        <div className='image-container'>
          <img src={urlFor(image && image[index])} className="product-detail-image"/>
        </div>
        <div className='small-images-container'>
          {image?.map((item, i) => (
           <img src={urlFor(item)} className="small-image" onMouseEnter={() => setIndex(i)}/>
          ))}
        </div>
       </div>
       <div className='product-detail-desc'>
         <h1>{name}</h1>
         <div className='reviews'>
           <div>
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
           </div>
           <p>(20)</p>
         </div>
         <h4>Details:</h4>
         <p>{details}</p>
         <p>${price}</p>
         <div className='quantity'>
          <h3>Quantity:</h3>
          <p className='quantity-desc'>
           <span className='minus' onClick={decre}>
            <AiOutlineMinusCircle />
           </span>
           <span className='num'>{qty}</span>
           <span className='plus' onClick={incre}>
            <AiOutlinePlusCircle />
           </span>
          </p>
         </div>
         <div className='buttons'>
          <button type="button" className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to Cart</button>
          <button type="button" className='buy-now'>Shop Now</button>
         </div>
       </div>
     </div>
     <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
         <div className='maylike-products-container track'>
          {products.map((item) => (
            <Product key={item._id} product={item}/>
          ))}
         </div>
        </div>
     </div>
    </div>
  )
}

export const getStaticPaths = async () => {
 const query = `*[_type == "product"]{
  slug {
   current
  }
 }`;
 const products = await client.fetch(query);
 const paths = products.map((product) => ({
  params: {
   slug: product.slug.current
  }
 }))
 return {
  paths,
  fallback: 'blocking'
 }
}

export const getStaticProps = async ({params: {slug}}) => {
 const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
 const productsQuery = '*[_type == "product"]';

 const product = await client.fetch(query);
 const products = await client.fetch(productsQuery);

 console.log(product)

 return {
   props: {products, product}
 }
}
