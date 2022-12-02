import React from 'react';

//THIS IS TBD//
const Slider = () => {
    const imageData = [
      "https://i.ibb.co/vjWRMS0/sliderimage-01.jpg",
      "https://i.ibb.co/G34PVwm/sliderimage-02.jpg",
    ];

    return (
      <div className="slider">
        <div className="container">
          <img src="/sliderImages/sliderimage-01.jpg" />
          <img src="/sliderImages/sliderimage-02.jpg" />
        </div>
      </div>
    );
};

export default Slider;