import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import slider_1 from '../Assets/Image/slider_1.jpg'
import slider_2 from '../Assets/Image/slider_2.jpg'
import slider_3 from '../Assets/Image/slider_3.jpg'
import './Slider.css' 
const slides = [
  {
    id: 1,
    text: slider_1,
  },
  {
    id: 2,
    text: slider_2,
  },
  {
    id: 3,
    text: slider_3,
  },
];

const SlideShow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };
  
    const handleDotClick = (index) => {
      setCurrentSlide(index);
    };
  
    useEffect(() => {
        const interval = setInterval(() => {
          nextSlide();
        }, 3000); // Thay đổi khoảng thời gian chuyển slide tại đây (đơn vị: milisecond)
    
        return () => clearInterval(interval); // Xóa interval khi component bị unmount
      }, []);
    return (
      <div className="slideshow">
        <div className="slide">
          
          <img src={slides[currentSlide].text} alt="anh" />
        </div>
        <div className="navigation">
          <button className="prev-button" onClick={prevSlide}>
            <FiChevronLeft />
          </button>
          <div className="dot-container">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
          <button className="next-button" onClick={nextSlide}>
            <FiChevronRight />
          </button>
        </div>
      </div>
    );
  };
  
  export default SlideShow;