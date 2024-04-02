import React from 'react'
import './Category.css'
import { TbCategory } from "react-icons/tb";
import { AiOutlineUser,AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';
 const Category = () => {
  return (
    <>
        <div className="header">
                <div className="header-row">
                    <div className="header-title-menu">
                        <div className="category-icon">
                        <TbCategory className='header-category-icon' style={{
                            color: '#ffffff',
                            }}/>
                        </div>
                        <span className='category-name'>Danh mục sản phẩm</span>   
                    </div>
                    <div className="header-center">
                        <ul className='category-list-name'>
                            <Link to='/slider'><li>Iphone 5</li></Link><span className='category-pagi'>|</span>
                            <li>Iphone 5</li><span className='category-pagi'>|</span>
                            <li>Iphone 5</li><span className='category-pagi'>|</span>
                            <li>Iphone 5</li><span className='category-pagi'>|</span>
                            <li>Iphone 5</li><span className='category-pagi'>|</span>
                            <li>Iphone 5</li><span className='category-pagi'>|</span>
                            <li>Iphone 5</li>
                        </ul>
                    </div>
                    <div className="header-right">
                    <div className='user-icon'
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        >
                        <AiOutlineUser  className='header-category-icon'/>
                        </div>
                        <div className='user-icon shopping-cart'
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        >
                        <AiOutlineShoppingCart className='header-category-icon'/>
                        <div className="nav-cart-count">0</div>
                        </div>

                        <div className='user-icon heart-icon'
                        style={{
                            backgroundColor: '#ffffff',
                        }}
                        >
                        <AiOutlineHeart  className='header-category-icon'/>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
export default Category
