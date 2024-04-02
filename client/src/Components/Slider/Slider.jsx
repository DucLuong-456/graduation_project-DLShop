import React from 'react'
import './Slider.css'
import banner_right_1 from '../Assets/Image/banner_right_1.jpg'
import banner_right_3 from '../Assets/Image/banner_right_3.jpg'
import banner_right_2 from '../Assets/Image/banner_right_2.jpg'
// import slider_1 from '../Assets/Image/slider_1.jpg'
import SlideShow from './Slidershow'
 const Slider = () => {
  return (
    <>
        <div className="slider-home">
            <div className="left-slider">
                <SlideShow className="slideshow"/>
            </div>
            <div className="right-slider">
                <img src={banner_right_1} alt="anh" />
                <img src={banner_right_3} alt="anh" />
                <img src={banner_right_2} alt="anh" />
            </div>
        </div>
    </>
  )
}
export default Slider
