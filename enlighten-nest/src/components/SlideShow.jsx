import React from 'react'
import { Carousel } from "flowbite-react";

const SlideShow = () => {
  return (
    
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src="/image/1st_slide.png" alt="..." />
        <img src="/image/2nd_slide.png" alt="..." />
        <img src="/image/3rd_slide.jpg" alt="..." />
        <img src="/image/4th_slide.jpg" alt="..." />
        <img src="/image/5th_slide.jpg" alt="..." />
      </Carousel>
    </div>
  )
}

export default SlideShow