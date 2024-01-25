"use client"

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function CarouselComp() {
  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <Carousel showArrows autoPlay interval={3000} infiniteLoop showThumbs={false}>
          <div>
            <img src="/images/banner/1.png" alt="imagen 1" />
          </div>
          <div>
            <img src="/images/banner/2.png" alt="imagen 2" />
          </div>
          <div>
            <img src="/images/banner/3.png" alt="imagen 3" />
          </div>
        </Carousel>
      </div>
    </>
  )
}