
type Testimonial = {
  content: string;
  name: string;
}

const Testimonials = () => {

  const Testimonial: Testimonial[] = [
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    }
  ]

  return (
    <main className='relative container mx-auto p-3 mt-[100px]'>
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className='text-center text-[28px] capitalize font-FuturaExtraBold text-[#061439] lg:text-[44px]'> A word from our clients</h1>
        <div className="grid grid-cols-1 gap-5 justify-center items-center mt-[50px] md:grid-cols-1 lg:grid-cols-3">
          {Testimonial.map((i, index) => (
            <div className="relative flex flex-col justify-center items-center p-[16px] bg-[#3ab5fc] rounded-[50px] text-white w-full h-[200px] shadow-2xl lg:h-[380px]" key={index}>
              <p className="text-center">{i.content}</p>
              <p className="absolute bottom-10 right-5">{i.name}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Testimonials;