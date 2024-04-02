import React from 'react'
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { AiFillStar,AiOutlinePlusCircle } from "react-icons/ai";
import product_1 from '../Assets/Image/product_1.jpg'
import './Product.css'
 const Product = () => {
  return (
    <>
        <div className="product-item">
            <div className="img-product-item">
              <img src={product_1} alt="anh" />  
              <AiOutlineHeart className='heart-icon-product'/>
              <div className="type-product">
                sản phẩm MỚI
              </div>
            </div>
            <p className='title-product-name'>iPhone 14 Pro Max 512GB Chính hãng VN/A</p>
            <div className="cost-product-item-cart">
              <div className="cost-product">
                <span className='cost-product-item'>35.0000.000đ</span>
                <span className='sale-product-item'>35.0000.000đ</span>

              </div>
              <div className="div-cart-icon">
                <BsCartPlus className='cart-icon'/>
              </div>
            </div>
            <div className="khuyen-mai-content">  
	              Tặng Củ sạc nhanh Samsung 25W Type C chính hãng
            </div>
            <div className="danh-gia-product">
              <div className="left-dg">
              <AiFillStar className='start-icon-product'/>
              <AiFillStar className='start-icon-product'/>
              <AiFillStar className='start-icon-product'/>
              <AiFillStar className='start-icon-product'/>
              <AiFillStar className='start-icon-product'/>
              </div>
        
              <div className="right-dg">
                <AiOutlinePlusCircle />
                <div>chi tiết</div>
              </div>
            </div>
        
        </div>
    </>
  )
}
export default Product
