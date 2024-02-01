import Footer from "@/components/Footer"
import Image from "next/image"
import developer from '@/public/pexels-christina-morillo-1181676.jpg'


const AboutPage = () => {
  return (
    <main>
        <div className="relative container mx-auto p-4 flex flex-col gap-10 justify-start items-start mt-[50px] lg:flex-row">
            <Image className="object-cover md:w-[392px] md:h-[606px] lg:w-[592px] lg:h-[806px]" src={developer} alt="Company" width={1000} height={1000}/>
            <div>
                <h1 className='text-start text-[2rem] tracking-[-2px] font-FamiljenBold md:tracking-[-5.39px] md:text-[4.8rem]'>About Jesitiglobal</h1>
                <p className="flex-shrink-0 flex justify-start items-start text-start font-PoppinsLight text-[0.8rem] md:text-[1rem] lg:mt-[22.5px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid non incidunt repellendus ex quis corporis, eaque distinctio unde similique laborum impedit totam nisi. Quis, eos! Officiis, perspiciatis officia! Repudiandae qui perferendis adipisci delectus quibusdam illum, ipsum, quae molestias eos necessitatibus itaque voluptatum ducimus tenetur placeat corporis inventore! Aspernatur eius cum aperiam, placeat voluptatum quidem aliquam maiores nostrum reprehenderit blanditiis animi, eveniet culpa eum, porro repellendus! Tempora alias animi atque saepe dicta consequuntur veniam officia, repellendus, autem quaerat odio molestias. Impedit expedita cupiditate veniam iste doloremque dignissimos id tempora accusantium a voluptate blanditiis voluptatem, dicta aperiam voluptatum velit corrupti? Quibusdam nulla fugit temporibus, sed amet a, dolores, at placeat illum deserunt eos? Impedit maxime aliquam deleniti fugit ab laboriosam, in possimus, necessitatibus recusandae et magnam vitae. Hic rerum iusto ipsa quae maiores fugiat quisquam sequi, ullam, beatae, commodi perferendis laboriosam obcaecati minima cupiditate neque? Eligendi eius hic, reiciendis tempore nostrum cupiditate. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam exercitationem iste error nulla molestias nihil illo sapiente fuga. Tenetur animi, est autem tempore repellendus numquam cum maiores nobis possimus quaerat repudiandae. Asperiores consectetur atque nobis laborum rerum saepe alias, nam dolore, eveniet excepturi id! Eaque ducimus placeat, ex et dolorem laudantium animi sit, labore harum asperiores laborum ad totam quae deleniti nostrum! Modi minima quaerat facere. Praesentium atque incidunt, consectetur doloribus voluptate eveniet eaque, explicabo debitis, consequatur libero rerum laborum tempora quaerat vel. Odit ullam sapiente qui voluptas obcaecati corporis autem doloremque eveniet minima rerum suscipit, ipsam, fugiat voluptatem voluptatibus quas! Veritatis placeat quidem ipsa, libero qui sint nisi non porro accusantium voluptatibus, deserunt dolorem distinctio corrupti, at eaque quis voluptatum blanditiis saepe! Est aliquid explicabo ducimus, minima dicta natus ex ipsum distinctio, adipisci pariatur perspiciatis eos assumenda expedita! Porro deserunt laborum mollitia molestiae a neque sunt illum debitis! Expedita!</p>
                
            </div>
        </div>
        <div className="bg-[#061439] mt-[80px] py-[100px]">
            <Footer />
        </div>
    </main>
  )
}

export default AboutPage