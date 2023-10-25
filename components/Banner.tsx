"use client"
import 'swiper/css';
import 'swiper/css/effect-fade'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay  } from 'swiper/modules';


const Banner = () => {
  return (
    <main>
        <div className="bg-[#22AFFF] text-white h-[25px]">
            <Swiper modules={[EffectFade, Autoplay]} effect="slide" autoplay>
                <SwiperSlide>
                    <p className='text-center underline uppercase font-Futura text-sm'>Shop Now</p>
                </SwiperSlide>
                <SwiperSlide>
                    <p className='text-center underline uppercase font-Futura text-sm'>Get affordable laptops</p>
                </SwiperSlide>
            </Swiper>
        </div>
    </main>
  )
}

export default Banner