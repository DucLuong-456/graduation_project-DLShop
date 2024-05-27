import React, { useEffect, useState, useContext } from "react";
import "./DetailProduct.css";
import detail_product1 from "../Assets/Image/detail_product1.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import { IoCartOutline, IoTerminal } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";

import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const DetailProduct = () => {
  const { setCallBack, isLogged, token } = useContext(AppContext);
  const navigate = useNavigate();
  //addToCart
  const addToCart = async (token, product) => {
    try {
      if (isLogged === false) return alert("Please login or registerto use!");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/user/addTocart`,
        {
          product_id: product.product_id,
          quanlity_product: product.quanlity_product,
        },
        { headers }
      );
      setCallBack((cb) => !cb);
      Swal.fire({
        title: "SUCCESS!",
        text: "Add product success on cart",
        icon: "success",
        confirmButtonText: "ok",
      });
    } catch (error) {
      Swal.fire({
        title: "ERROR!",
        text: `${error.response.data.msg}`,
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };
  //handle comment

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const onChangeInput = (e) => {
    const { value } = e.target;
    setContent(value);
  };
  const handlePostComment = async (id, content) => {
    if (isLogged === false) return alert("Please login or registerto use!");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/comment/${id}`,
        {
          content: content,
        },
        { headers }
      );
      const { user_name, comment } = res.data;
      setComments((prevComments) => [
        ...prevComments,
        {
          user_name: user_name,
          content: comment.content,
        },
      ]);
      setContent("");
      Swal.fire({
        title: "SUCCESS!",
        text: "Thêm đánh giá thành công",
        icon: "success",
        confirmButtonText: "ok",
      });
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const getAllCommentByProduct = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_KEY}/api/comment/${id}`
      );
      const CommentArray = res.data.map((item) => {
        const { user_id, content } = item;
        return { user_name: user_id.name, content };
      });
      setComments(CommentArray);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  //handle-multi-image
  const [currentImage, setCurrentImage] = useState("");
  const handleClickImage = (image) => {
    setCurrentImage(image);
  };

  const [productImage, setProductImage] = useState([]);
  const productsImg = async (product_name) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_KEY}/api/upload/uploadMultiImage/${product_name}`
      );

      if (res.data)
        setProductImage([...productImage, ...res.data.additionalImages]);
    } catch (error) {
      console.log(error);
    }
  };

  const { id } = useParams();
  const [showInfo, setInfor] = useState(false);
  const [product, setProduct] = useState([]);
  const handleShowInfor = () => {
    setInfor(!showInfo);
  };

  //xử lý số lượng sản phẩm thêm giỏ hàng
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/product/${id}`
        );
        setProduct(response.data.data);
        setProductImage([...productImage, response.data.data.image]);
        productsImg(response.data.data.name);
        setCurrentImage(response.data.data.image);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct(id);
    getAllCommentByProduct(id);
  }, [id]);
  return (
    <>
      <div className="detail-product">
        <div className="left-detail-product">
          <div className="img-detail-product">
            <img
              src={process.env.REACT_APP_API_LINK_STATIC + currentImage}
              alt="anh"
            />
          </div>
          <AiOutlineHeart className="heart-icon-detailproduct" />
          <div className="type-detailproduct">sản phẩm MỚI</div>
          <div className="list-product-img">
            {productImage.length > 0 &&
              productImage.map((item, index) => (
                <img
                  src={process.env.REACT_APP_API_LINK_STATIC + item}
                  key={index}
                  alt="anh"
                  onClick={() => handleClickImage(item)}
                />
              ))}
          </div>
        </div>
        <div className="content-center-product">
          <h1 className="title-detail-product">{product.name}</h1>
          <span className="brand-product">
            Thương hiệu: {product.brand} | Tình trạng:{" "}
            {product.status ? "Còn hàng" : "Hết hàng"}
          </span>
          <br />
          <span className="cost-detail-product">
            Giá:
            <span className="cost-product-">
              {parseInt(product.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </span>
          <div className="sub-cost">
            Giá thị trường: 28.990.000₫ Tiết kiệm: 8.500.000₫ so với giá thị
            trường
          </div>
          <div className="khuyen-mai">
            <div className="khuyen-mai-title">Quà tặng khuyến mãi</div>
            <div className="name-product-khuyen-mai">
              Sạc cáp nhanh 20w giới hạn trị giá 250k
            </div>
          </div>

          <div className="so-luong-product">
            <div className="title-soluong">Số lượng:</div>
            <div className="btn-so-luong">
              <button className="quantity-btn" onClick={decreaseQuantity}>
                -
              </button>
              <input type="number" value={quantity} min="1" readOnly />
              <button className="quantity-btn" onClick={increaseQuantity}>
                +
              </button>
            </div>
          </div>

          <div className="add-cart">
            <div className="mua-ngay">
              <IoCartOutline className="icon-cart-detail" />
              <div className="text-add-cart">MUA NGAY</div>
            </div>
            <div
              className="them-gio-hang"
              onClick={() => {
                addToCart(token, {
                  product_id: product._id,
                  quanlity_product: quantity,
                });
              }}
            >
              THÊM VÀO GIỎ HÀNG
            </div>
          </div>
        </div>
        <div className="right-detail-product">
          <div className="right-title">CHÍNH SÁCH CỦA CHÚNG TÔI</div>
          <div className="right-content">
            <ul className="list-head">
              <li>
                <FaLocationArrow className="icon-head-right" />
                <div className="right-text-head">
                  Miễn phí vận chuyển tại TP.HCM
                </div>
              </li>
              <li>
                <FaLocationArrow className="icon-head-right" />
                <div className="right-text-head">
                  Bảo hành chính hãng toàn quốc
                </div>
              </li>
              <li>
                <FaLocationArrow className="icon-head-right" />
                <div className="right-text-head">Cam kết chính hãng 100%</div>
              </li>
              <li>
                <FaLocationArrow className="icon-head-right" />
                <div className="right-text-head">1 đổi 1 nếu sản phẩm lỗi</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mo-ta-san-pham">
        <div className="title-descript">MÔ TẢ SẢN PHẨM</div>
        <button
          className="btn-showDescript"
          onClick={() => {
            handleShowInfor();
          }}
        >
          {showInfo ? "Thu gọn" : "Xem thêm"}
          {showInfo ? (
            <MdKeyboardDoubleArrowUp />
          ) : (
            <MdKeyboardDoubleArrowDown />
          )}
        </button>
        {showInfo && (
          <div className="content-descript">
            {/* <p>iPhone 12 256GB Chính Hãng VN/A</p>
            <p>
              iPhone 12 256GB chính hãng VN/A đã chính thức được giới thiệu, đã
              không còn sử dụng màn hình LCD nữa mà thay vào là màn OLED 6,1
              inch với công nghệ Super Retina XDR vô cùng sắc nét, đẹp hơn
              iPhone 11 năm ngoái, hỗ trợ kết nối mạng 5G siêu nhanh liệu có
              đáng để mua.
            </p>
            <p>Thiết kế mới nguyên khối, vuông vức đẹp tinh xảo</p>
            <div className="img-descript">
              <img src={descript1_img} alt="" />
            </div>
            <p>
              iPhone 12 256GB chính hãng VN/A chính là thiết bị điện thoại tâm
              điểm được Apple giới thiệu đầu tiên tại sự kiện ra mắt, đây là
              dòng sản phẩm nâng cấp thay thế cho iPhone 11. Những chiếc iPhone
              của Apple luôn được đánh giá cao về thiết kế, năm nay khi iPhone
              12 ngoài được nâng cấp về màn hình Oled thì thiết kế máy cũng được
              đánh giá là điểm “đáng đồng tiền bát gạo” khi các viền máy được
              vát phẳng, vuông vức trông rất tương đồng với kiểu dáng của iPhone
              5 đời cũ và các thế hệ iPad Pro gần đây, phần lớn người dùng đều
              cảm thấy đây là một thiết kế đẹp. Tai thỏ vẫn được Apple giữ lại
              nhưng đã tinh chỉnh lại kích thước nhỏ lại vừa đủ để đặt loa và
              cụm cảm biến Face ID nhận diện khuôn mặt
            </p>
            <p>
              Toàn bộ thân máy được chế tạo từ chất liệu nhôm nguyên khối siêu
              cứng cáp, hai mặt trước sau được trang bị lớp kính cường lực
              Gorilla Glass, Apple cũng cho biết thêm họ trang bị thêm công nghệ
              Ceramic Shied giúp tăng cường độ cứng bề mặt kính lên gấp 4 lần
              khi rơi, điều đó có nghĩa máy sẽ giảm thiểu được tình trạng vỡ.
              Ngoài ra công nghệ chống nước, chống bụi tiêu chuẩn IP 68 cũng
              được trang bị.
            </p>
            <p>
              Màn hình 6.1 inch Super Retina XDR siêu nét chứ không còn là LCD
            </p>
            <p>
              Năm ngoái chiếc điện thoại bán chạy nhất trong dãy sản phẩm iPhone
              chính hãng của Apple chính là iPhone 11, chiếc iPhone này chỉ được
              trang bị 2 camera và màn hình LCD kém sắc nét. Năm nay, chiếc
              iPhone 12 đã được trang bị màn hình OLED có tên Super Retina XDR
              giống như iPhone 12 Pro Max. Màn hình của máy độ phân giải 2532x
              1170pixels và có kích thước 6.1 inch, nhỏ hơn so với iPhone 12 Pro
              Max (6.7 inch). Nhờ sự nâng cấp đáng giá về màn hình từ công nghệ
              LCD giống như trên iPhone 11 nay đã thay bằng công nghệ OLED Super
              Retina XDR xịn sò, cạnh viền của iPhone 12 256GB chính hãng VN/A
              nay đã mỏng hơn đáng kể giúp tổng thể chiếc trông đẹp, không gian
              hiển thị cũng được tăng lên một chút. Ngoài ra, iPhone 12 cũng
              được tích hợp thêm tính năng Dolby Vision và True tone, điều mà
              chiếc iPhone 11 hoàn toàn không có nhưng nó vẫn là sản phẩm bán
              chạy nhất năm thì iPhone 12 có lẽ là người đàn em thay thế doanh
              số bán kỉ lục của iPhone 11.
            </p>
            <p>
              Chip Apple A14 Bionic siêu mạnh, tiến trình 5nm đầu tiên trên
              smartphone
            </p>
            <p>
              Điểm đáng giá trên điện thoại iPhone 12 256GB chính hãng VN/A năm
              nay có thể kể đến con chip A14 Bionic, so với con chip A13 Bionic
              năm ngoái thì năm nay A14 Bionic được sản xuất trên tiến trình 5nm
              đầu tiên trên thế giới sản xuất cho smartphone cho phép tích hợp
              thêm nhiều bóng bán dẫn hơn, Apple đã cho biết có tất cả 11,8 tỷ
              bóng bán dẫn đã được sử dụng trên con chip này.
            </p>
            <p>
              Gaming cũng là một điểm mạnh của A14 Bionic với hiệu năng vượt
              trội của CPU lẫn GPU, cộng hưởng với công nghệ 5G, trải nghiệm
              chơi game online trên iPhone 12 thậm chí còn tốt hơn. Nó có thể
              cân tựa game nổi tiếng như PUGB, LOL.v.v với độ hoạ ở mức cao nhất
              vẫn không xi nhê.
            </p> */}
            {product.description}
          </div>
        )}
      </div>
      <hr
        className="hr-danh-gia"
        style={{ marginBottom: "20px", marginTop: "20px" }}
      />
      <div className="danh-gia-san-pham">
        <textarea
          name="content"
          id="comment"
          placeholder="Nhập đánh giá của bạn"
          value={content}
          onChange={onChangeInput}
        ></textarea>
        <div
          className="btn-danh-gia"
          onClick={() => {
            handlePostComment(id, content);
          }}
        >
          Gửi đánh giá
        </div>
        <h1>Đánh giá</h1>
        <div className="danh-sach-danh-gia">
          <ul>
            {comments.length > 0 &&
              comments.map((item) => {
                return (
                  <li>
                    <div className="user-name-comment">@{item.user_name}</div>
                    <div className="noi-dung-danh-gia">{item.content}</div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default DetailProduct;
