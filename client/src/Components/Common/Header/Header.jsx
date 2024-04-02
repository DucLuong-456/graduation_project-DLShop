import React from 'react'
import './Header.css'
import { AiOutlineSearch } from "react-icons/ai";
 const Header = () => {
  return (
    <>
      <div className="top-header">
        <div className="header-container">
          <div className="row">
            <div className="header-logo">
              <img src="https://bizweb.dktcdn.net/100/497/960/themes/923878/assets/logo.png?1710409416702" alt="logo" />
            </div>
            <div className="header-search-box">
              <form action="" className='form-input-search'>
                  <input type="text" placeholder='Nhập tên sản phẩm...'/>
                  <div className="div-icon-search">
                  <AiOutlineSearch className='icon-search'/>
                  </div>
                <div className="search-suggest">

                </div>
              </form>
            </div>
            <div className="header-contact">
                  <div>
                    Hỗ trợ 24h
                  </div>
                  <div>
                    1900 6750
                  </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header