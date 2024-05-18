import React, { useEffect, useState } from "react";
import "./Slider.css";
import SlideShow from "./Slidershow";
import axios from "axios";

const Slider = () => {
  const [banners, setBanners] = useState([]);
  // const [slider, setSlider] = useState([]);
  useEffect(() => {
    const getBanners = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/upload/banner`
        );
        setBanners(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBanners();
  }, []);
  const selectedBanners = [banners[0], banners[4], banners[5]].filter(Boolean);
  return (
    <>
      <div className="slider-home">
        <div className="left-slider">
          <SlideShow className="slideshow" selectedBanners={selectedBanners} />
        </div>
        <div className="right-slider">
          {banners.length > 0 &&
            banners
              .slice(1, 4)
              .map((banner, index) => (
                <img
                  key={index}
                  src={`${process.env.REACT_APP_API_LINK_STATIC}${banner.image}`}
                  alt={`banner-${index + 1}`}
                />
              ))}
        </div>
      </div>
    </>
  );
};
export default Slider;
