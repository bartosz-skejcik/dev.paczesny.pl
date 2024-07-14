"use client";
import { Paragraph } from "@ui/Paragraph";
import Image from "next/image";

import { motion } from "framer-motion";

export default function About() {
    const images = [
        "/images/about/f1.jpeg",
        "/images/about/stas.jpeg",
        "/images/about/coding.jpeg",
        "/images/about/coding1.jpeg",
    ];
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 my-10">
                {images.map((image, index) => (
                    <motion.div
                        key={image}
                        initial={{
                            opacity: 0,
                            y: -50,
                            rotate: 0,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            rotate: index % 2 === 0 ? 3 : -3,
                        }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                        <Image
                            src={image}
                            width={200}
                            height={400}
                            alt="about"
                            className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
                        />
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl">
                <Paragraph className=" mt-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Expedita quaerat itaque cupiditate dolor sit ullam nostrum
                    soluta voluptatem obcaecati earum!
                </Paragraph>
                <Paragraph className=" mt-4">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Beatae doloremque magni dolore hic rem nam aspernatur totam
                    tempore. Ex voluptates asperiores minus ipsam corporis
                    quaerat cum distinctio qui, sit possimus!
                </Paragraph>

                <Paragraph className=" mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quos mollitia illum quibusdam hic expedita nobis, odio rerum
                    voluptatibus, voluptate optio officiis obcaecati repudiandae
                    asperiores quo tempora enim libero accusantium quidem!
                </Paragraph>
                <Paragraph className=" mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    animi eligendi laboriosam sequi, nihil pariatur autem dolore
                    officia, et debitis illum quas quam. Laboriosam consectetur
                    eligendi dolorum quis quidem ducimus!
                </Paragraph>
                <Paragraph className=" mt-4">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Iste, voluptate optio! Maxime, cumque iusto. Vitae mollitia
                    aliquid, cum omnis neque veritatis dolorem laudantium!
                    Incidunt dolore earum est porro impedit aspernatur.
                </Paragraph>
                <Paragraph className=" mt-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sed at et illum iste, placeat ab nesciunt iure similique
                    necessitatibus voluptatem exercitationem saepe totam
                    provident velit, tenetur impedit incidunt perspiciatis
                    deleniti.
                </Paragraph>
                <Paragraph className=" mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis labore accusamus.
                </Paragraph>
            </div>
        </div>
    );
}
