import React from "react";
import "./Footer.css";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import pt_thanh_toan_1 from "../../Assets/Image/pt_thanh_toan_1.jpg";
import pt_thanh_toan_2 from "../../Assets/Image/pt_thanh_toan_2.jpg";
import pt_thanh_toan_3 from "../../Assets/Image/pt_thanh_toan_3.jpg";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="main-footer">
          <div className="thong-tin-chung">
            <div className="tieu-de-thong-tin">THÔNG TIN CHUNG</div>
            <div className="noi-dung-footer">
              Với sứ mệnh "Khách hàng là ưu tiên số 1" chúng tôi <br /> luôn
              mạng lại giá trị tốt nhất
            </div>
            <div className="footer-dia-chi">
              <span>Địa chỉ: </span>
              70 Lữ Gia, Phường 15, Quận 11, TP. Hồ Chí Minh
            </div>
            <div className="footer-dien-thoai">
              <span>Điện thoại: </span>
              1900 6750
            </div>
            <div className="footer-email">
              <span>Email: </span>
              dlshopsupport@dlshop.vn
            </div>
          </div>
          <div className="ho-tro">
            <div className="tieu-de-ho-tro">TỔNG ĐÀI HỖ TRỢ</div>
            <div className="footer-ho-tro">
              <FaPhoneVolume className="icon-phone-footer" />
              <div className="tu-van">
                <span>Tư vấn mua hàng (miễn phí):</span>
                <span>1900 800 111 (08h00 - 21h30)</span>
              </div>
            </div>
            <div className="footer-ho-tro">
              <FaPhoneVolume className="icon-phone-footer" />
              <div className="tu-van">
                <span>Khiếu nại - Góp ý:</span>
                <span>1900 800 111 (08h00 - 21h30)</span>
              </div>
            </div>
          </div>

          <div className="lien-ket">
            <div className="tieu-de-lien-ket">LIÊN KẾT XÃ HỘI</div>
            <div className="footer-lien-ket">
              <div className="icon-lien-ket-1">
                <FaFacebook className="icon-lien-ket" />
                <FaTwitter className="icon-lien-ket" />
                <FaInstagram className="icon-lien-ket" />
                <FaYoutube className="icon-lien-ket" />
              </div>
              <div className="phuong-thuc-thanh-toan">
                <div className="tieu-de-lien-ket">PHƯƠNG THỨC THANH TOÁN</div>
                <div className="phuong-thuc-thanh-toan-img">
                  <div className="img-pt-thanh-toan">
                    <img src={pt_thanh_toan_1} alt="anh" />
                  </div>
                  <div className="img-pt-thanh-toan">
                    <img src={pt_thanh_toan_2} alt="anh" />
                  </div>
                  <div className="img-pt-thanh-toan">
                    <img src={pt_thanh_toan_3} alt="anh" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
