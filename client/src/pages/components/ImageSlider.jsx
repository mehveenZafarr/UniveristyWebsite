import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const ImageSlider = () => {
    const pictures = ['kfueitHistorical', 'img1', 'img2', 'img4', 'img5', 'img6', 'img7', 'img8', 'img9'];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === pictures.length - 1? 0 : prevIndex + 1);
    };
    const interval = 3000;

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, interval);

        return () => clearInterval(slideInterval);
    }, [currentIndex, interval]);
  return (
    <div className='relative w-full h-64 image-slider'>
        {pictures.map((picture, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex? "opacity-100" : "opacity-0"}`}>
                <img src={`/${picture}.jpg`}
                className='object-cover w-full h-full'/>
            </div>
        ))}
    </div>
  )
}

export default ImageSlider
