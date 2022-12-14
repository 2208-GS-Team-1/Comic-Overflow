import React, { useState } from 'react';
import './homeStyle.css'

const Slider = () => {

  //array of image sources from static folder
  const imageArray = [
    "/static/sliderImages/sliderimage-01.jpg",
    "/static/sliderImages/sliderimage-02.jpg",
    "/static/sliderImages/sliderimage-03.jpg"
  ]
  const [currentSlide, setSlide] = useState(0)

  //below function allows the arrow icon to shift through slides
  const prevSlide = () =>{
    setSlide(currentSlide === 0 ? 2: currentSlide -1 )
  }
  const nextSlide = () => {
    setSlide(currentSlide === 2 ? 0: currentSlide +1 )
  }

  // automating slider carousel
  setTimeout(()=>{ prevSlide()}, 2500);

  //icons ( i tag) are from css website. They offer free icons!
  //https://css.gg/
  //style={{transform: `translateX(-${currentSlide *100}vw)`}}

    return (
      <div className="slider">
        <div className="container" >
          <img src={imageArray[currentSlide]}  />
        </div>
        {/* icons are disabled for now */}
        {/* <div className='icons'>
          <div className='icon'>
            <i className="gg-play-track-prev-r" onClick={prevSlide}></i>
          </div>
          <div className='icon'>
            <i className="gg-push-chevron-right-r" onClick={nextSlide}></i>
          </div>
        </div> */}
      </div>
    );
};

export default Slider;