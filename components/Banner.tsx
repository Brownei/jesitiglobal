"use client"
import 'swiper/css';
import 'swiper/css/effect-fade'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay  } from 'swiper/modules';
import Link from 'next/link';

const Banner = () => {
  return (
    <main>
        <div className="bg-[#22AFFF] text-white h-[25px]">
            <Swiper modules={[EffectFade, Autoplay]} effect="slide" autoplay>
                <SwiperSlide>
                    <p className='text-center underline uppercase font-PoppinsLight text-sm tracking-wider'>
                        <Link href={'/graphic-store'}>Shop Now</Link>
                    </p>
                </SwiperSlide>
                <SwiperSlide>
                    <p className='text-center underline uppercase font-PoppinsLight text-sm tracking-wider'>
                        <Link href={'/laptop-store'}>Get affordable laptops</Link>
                    </p>
                </SwiperSlide>
            </Swiper>
        </div>
    </main>
  )
}

export default Banner