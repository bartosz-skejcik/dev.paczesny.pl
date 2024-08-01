"use client";
import { Paragraph } from "@ui/Paragraph";
import Image from "next/image";

import { motion } from "framer-motion";

export default function About() {
    const images = [
        "/images/about/f1.jpeg",
        "/images/about/mscds.jpeg",
        "/images/about/coding.jpeg",
        "/images/about/coding1.jpeg",
    ];
    return (
        <div>
            <div className="my-10 grid grid-cols-2 gap-10 md:grid-cols-4">
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
                            className="block h-40 w-full rotate-3 transform rounded-md object-cover shadow-xl transition duration-200 hover:rotate-0 md:h-60"
                        />
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl">
                <Paragraph className="mt-4">
                    Jestem ambitnym, aspirującym Frontend Developerem po
                    technikum informatycznym, który posiada wiedzę i
                    umiejętności w zakresie zarówno frontendu, jak i backendu.
                    Projektowałem aplikacje internetowe w Express.js i tworzyłem
                    skrypty w Pythonie.
                </Paragraph>
                <Paragraph className="mt-4">
                    Moje doświadczenie obejmuje projektowanie i tworzenie stron
                    internetowych z użyciem React.js, TailwindCSS i Framer
                    Motion. Osiągnąłem sukces w projektach szkolnych. Posiadam
                    zdolności analityczne, znam technologie webowe, biblioteki i
                    frameworki takie jak React czy Next.
                </Paragraph>

                <Paragraph className="mt-4">
                    Jako stażysta chciałbym zdobyć praktyczne doświadczenie w
                    branży i rozwijać swoje umiejętności w profesjonalnym
                    środowisku. Chcę pracować z zespołem, aby zdobyć wiedzę od
                    doświadczonych programistów, którzy pomogą mi w zdobyciu
                    nowych umiejętności i w przyszłości osiągnięciu moich celów
                    zawodowych.
                </Paragraph>
            </div>
        </div>
    );
}
