import { FC } from "react";
import { Testimonial } from './homePage/Testimonials'


type TestimonialCardProp = {
    testimonial: Testimonial
}

const TestimonialCard: FC<TestimonialCardProp> = ({ testimonial }) => {
  return (
    <div className="w-[265px]">
      <div className="p-[16px] rounded-[8px] bg-white grid gap-[10px]">
        <p className="text-[0.9rem] font-Poppins">{testimonial.content}</p>
        <span>{testimonial.name}</span>
      </div>
    </div>
  )
}

export default TestimonialCard