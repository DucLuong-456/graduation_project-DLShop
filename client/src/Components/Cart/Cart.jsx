import React from 'react'
import './Cart.css'
import cart_img from '../Assets/Image/cart.jpg'
 const Cart = () => {
  return (
    <>
    <div className="cart-product">
        <div className="cart-title">
        GIỎ HÀNG CỦA BẠN
        </div>
        <div className="detail-cart">
            <table>
            <thead>
          <tr>
            <th colspan="2">THÔNG TIN SẢN PHẨM</th>
            <th>ĐƠN GIÁ</th>
            <th>SỐ LƯỢNG</th>
            <th>CHỌN</th>
            <th className='thanh-tien-content'>THÀNH TIỀN</th>
          </tr>
        </thead>
        <tbody className='cart-body'>
        <td colSpan={6} className='line'></td>
        <tr >
              <td className='div-cart-product-img'>
                <img className='cart-product-img' src={cart_img} alt="anh" />
              </td>
              <td>
                <div className="cart-name-product">
              Redmi Note 12 Turbo 8GB/256GB
                </div>
                <div className="cart-delete-product">
                Xóa
                </div>
                </td>
              <td className='cart-cost-product'>6.190.000₫</td>
              <td className='cart-quanlity-product'>1</td>
              <td className='check-box-product'><input type="checkbox" name="select-product" id="" /></td>
              <td className='total-cost-product'>6.190.000₫</td>
            </tr>
            <td colSpan={6} className='line'></td>
            <tr >
              <td className='div-cart-product-img'>
                <img className='cart-product-img' src={cart_img} alt="anh" />
              </td>
              <td>
                <div className="cart-name-product">
              Redmi Note 12 Turbo 8GB/256GB
                </div>
                <div className="cart-delete-product">
                Xóa
                </div></td>
              <td className='cart-cost-product'>6.190.000₫</td>
              <td className='cart-quanlity-product'>1</td>
              <td className='check-box-product'><input type="checkbox" name="select-product" id="" /></td>
              <td className='total-cost-product'>6.190.000₫</td>
            </tr>
        </tbody>

            </table>
        <div className="cart-infor-active">
            <div className="continue-buy">
            Tiếp tục mua hàng
            </div>
            <div className="cart-pay">
                <div className="title-cost-pay">
                    <div className="title-name">
                    TỔNG TIỀN:
                    </div>
                    <div className="title-cost">
                    6.190.000₫
                    </div>
                </div>
                <div className="cart-btn-pay">
                  THANH TOÁN
                </div>
            </div>
        </div>
        </div>
    </div>
    
    </>
  )
}
export default Cart
