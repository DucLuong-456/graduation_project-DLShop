import React from "react";
import "./OrderDetail.css";
const OrderDetail = () => {
  return (
    <>
      <h1 className="order-detail-title">Chi tiết đơn hàng</h1>
      <div className="order-detail">
        <div className="right-order-detail">
          <div className="box-ma-don-hang">
            <div className="ma-don-hang">
              <p>
                Đơn hàng: <span>#abc123</span>
              </p>
              <p>02/01/2022 - 23:59</p>
            </div>
            <div className="trang-thai-don-hang">Đang giao</div>
          </div>
          <div className="nguoi-nhan">
            <div className="title-nguoi-nhan">NGƯỜI NHẬN</div>
            <div className="infor-nguoi-nhan">
              <p className="ten-nguoi-nhan">Nguyễn Minh Hoàng Phương</p>
              <p>098123345</p>
              <p>Tầng 19, tòa sunhouse apech, số 20 Hoàng Trung, Hà Nội</p>
            </div>
          </div>

          <div className="infor-product-order">
            <table className="table-detail-order">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Redmi 9A note 5G</td>
                  <td>2</td>
                  <td>2,100,000đ</td>
                  <td>4,200,000đ</td>
                </tr>
                <tr>
                  <td>Redmi 9A note 5G</td>
                  <td>2</td>
                  <td>2,100,000đ</td>
                  <td>4,200,000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="left-order-detail">
          <div className="payment-method-div">
            <div className="phuong-thuc-payment">PHƯƠNG THỨC THANH TOÁN</div>
            <div className="ten-phuong-thuc">Thanh toán khi nhận hàng</div>
            <div className="tong-tien">
              Tổng tiền: <span>10,000,000đ</span>
            </div>
          </div>

          <div className="chi-tiet-thanh-tien">
            <div className="text-1">
              <div className="tam-tinh">Tạm tính</div>
              <div className="cost-thanh-tien">10,000,000đ</div>
            </div>
            <div className="text-1">
              <div className="tam-tinh">Phí vận chuyển</div>
              <div className="cost-thanh-tien">miễn phí</div>
            </div>
            <div className="text-1">
              <div className="tam-tinh">Mã giảm giá</div>
              <div className="cost-thanh-tien">-30,000</div>
            </div>
            <div className="text-1">
              <div className="tam-tinh">Thành tiền</div>
              <div className="cost-thanh-tien">9,970,000đ</div>
            </div>
            <div className="text-2">
              <div className="can-thanh-toan">Cần thanh toán</div>
              <div className="cost-thanh-tien">9,970,000đ</div>
            </div>
          </div>

          <div className="lua-chon-don-hang">
            <div className="ghi-chu">Ghi chú</div>
            <div className="huy-don">Hủy đơn</div>
          </div>

          <div className="close-don-hang">Đóng</div>
        </div>
      </div>
    </>
  );
};
export default OrderDetail;
