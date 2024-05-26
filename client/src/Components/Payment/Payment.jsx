import React, { useContext, useState, useEffect } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import format_money from "../../helpers/fomat.money";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import Swal from "sweetalert2";
import { socket } from "../../helpers/socket.client";
import diachinhVN from "../../json/diachinhVN.json";
const Payment = () => {
  const { user, cart, token, setCallBack, isLogged } = useContext(AppContext);
  const navigate = useNavigate();
  const payment_method = {
    online: "Chuyển khoản",
    money: "Thanh toán khi nhận hàng",
  };

  //dia chinh viet nam
  const [province, setProvince] = useState("");
  const [provinces, setProvinces] = useState([]);

  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [commune, setCommune] = useState("");
  const [communes, setCommunes] = useState([]);

  const getValueAddressById = (id, addressArray) => {
    return addressArray.find((item) => {
      return item.Id === id;
    }).Name;
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "province":
        setProvince(value);
        break;

      case "commune":
        setCommune(value);
        break;
      case "district":
        setDistrict(value);
        break;
      default:
        break;
    }
  };
  const getProvinceCity = async () => {
    setProvinces(
      diachinhVN.map((item) => {
        return { Id: item.Id, Name: item.Name };
      })
    );
  };

  const getDistrict = (province) => {
    const temp = diachinhVN.find((item) => {
      return item.Id === province;
    });
    setDistricts(
      temp.Districts.map((item) => {
        return item;
      })
    );
  };

  const getCommune = (distric) => {
    const temp = districts.find((item) => {
      return item.Id === distric;
    });
    setCommunes(
      temp.Wards.map((item) => {
        return { Id: item.Id, Name: item.Name };
      })
    );
  };

  const [orderProduct, setOrderProduct] = useState({
    data: [],
    total_money: 0,
  });
  const findProductOrder = (cart) => {
    setOrderProduct({
      data: cart.data.filter((item) => {
        return item.isChecked === true;
      }),
      total_money: cart.total_money,
    });
  };

  const createOrder = async (orderProduct, token) => {
    try {
      if (isLogged === false) return alert("Please login or registerto use!");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/order`,
        {
          productsIdSelected: orderProduct.data.map((item) => {
            return item.product_id._id;
          }),
          total_money: orderProduct.total_money,
          payment_method: payment_method.money,
          order_address: `Xóm 5 ,${getValueAddressById(
            commune,
            communes
          )}, ${getValueAddressById(
            district,
            districts
          )}, ${getValueAddressById(province, provinces)}`,
        },
        { headers }
      );
      setCallBack((cb) => !cb);
      socket.emit("new-order", {
        user_id: user._id,
        username: user.name,
      });
      Swal.fire({
        title: "SUCCESS!",
        text: " create order success",
        icon: "success",
        confirmButtonText: "ok",
      });
      navigate("/order_detail/" + res.data.data._id);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    findProductOrder(cart);
    getProvinceCity();
  }, []);

  return (
    <>
      {isLogged && (
        <div className="payment-body">
          <div className="payment-infor">
            <h2>Thông tin nhận hàng</h2>
            <div className="form-infor-pay">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={user.email}
                className="address-pay"
              />
              <input
                type="text"
                placeholder="Họ và tên"
                name="fullName"
                value={user.name}
                className="address-pay"
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                name="phoneNumber"
                value={user.phone_number}
                className="address-pay"
              />
              <select
                placeholder="Tỉnh thành phố"
                name="province"
                className="address-pay"
                onChange={(e) => {
                  onChangeInput(e);
                  getDistrict(e.target.value);
                }}
              >
                <option>-- chọn tỉnh thành phố --</option>
                {provinces.length > 0 &&
                  provinces.map((item, index) => {
                    return (
                      <option key={index} value={item.Id}>
                        {item.Name}
                      </option>
                    );
                  })}
              </select>
              <br />
              <select
                placeholder="Quận huyện"
                name="district"
                className="address-pay"
                onChange={(e) => {
                  onChangeInput(e);
                  getCommune(e.target.value);
                }}
              >
                <option>-- chọn quận huyện --</option>
                {districts.length > 0 &&
                  districts.map((item, index) => {
                    return (
                      <option key={index} value={item.Id}>
                        {item.Name}
                      </option>
                    );
                  })}
              </select>
              <br />
              <select
                placeholder="Phường xã"
                name="commune"
                className="address-pay"
                onChange={onChangeInput}
              >
                <option>-- chọn phường xã --</option>
                {communes &&
                  communes.map((item, index) => {
                    return (
                      <option key={index} value={item.Id}>
                        {item.Name}
                      </option>
                    );
                  })}
              </select>
              <br />
              <input
                type="text"
                placeholder="Địa chỉ nhận hàng"
                name="deliveryAddress"
                value={user.address}
                className="address-pay"
              />
            </div>
          </div>
          <div className="payment-tranport">
            <h2>Vận chuyển</h2>
            <div className="noti-payment">
              Vui lòng nhập thông tin giao hàng
            </div>
            <h2>Thanh toán</h2>
            <div className="payment-method-center">
              <div className="payment-method-box">
                <div>
                  <input
                    type="radio"
                    name="payment-method"
                    className="payment-method"
                  />
                  <span> Thanh toán khi nhận hàng</span>
                </div>
                <FaMoneyBillAlt className="icon-money-payment" />
              </div>

              <div className="payment-method-box">
                <div>
                  <input
                    type="radio"
                    name="payment-method"
                    className="payment-method"
                  />
                  <span>Chuyển khoản</span>
                </div>
                <FaMoneyBillAlt className="icon-money-payment" />
              </div>
            </div>
          </div>

          <div className="payment-order-infor">
            <h2 className="title-payment">
              Đơn hàng ({orderProduct.data.length} sản phẩm)
            </h2>
            <div class="list-product-payment">
              <h2>Danh sách sản phẩm</h2>
              <div class="scrollable-list">
                <ul>
                  {orderProduct.data.map((item) => {
                    return (
                      <li>
                        <img
                          src={
                            process.env.REACT_APP_API_LINK_STATIC +
                            item.product_id.image
                          }
                          alt="anh"
                        />
                        <div className="name-product-payment">
                          {item.product_id.name}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="voucher-payment">
              <input type="text" placeholder="Nhập mã giảm giá" />
              <div className="btn-ap-dung">Áp dụng</div>
            </div>
            <div className="phi-van-chuyen">
              <span>Phí vận chuyển</span>
              <span>20.000₫</span>
            </div>
            <div className="line-payment"></div>
            <div className="tong-cong">
              <span>Tổng cộng</span>
              <span>{format_money(orderProduct.total_money)}</span>
            </div>

            <div className="div-dat-hang">
              <span>Quay về giỏ hàng</span>
              <div
                className="btn-dat-hang"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  createOrder(orderProduct, token);
                }}
              >
                Đặt hàng
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Payment;
