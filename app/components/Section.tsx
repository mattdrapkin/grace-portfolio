'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface SectionProps {
  title: string;
  content: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

const Section = ({ title, content, imageSrc, imageAlt, reverse = false }: SectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between gap-12 min-h-screen py-24 px-6`}
    >
      <div className="flex-1 space-y-6">
        <h2 className="text-4xl font-light">{title}</h2>
        <div className="w-12 h-0.5 bg-[#ff4d4d]" />
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
      
      <div className="flex-1 w-full aspect-square relative">
        <div className="w-full h-full bg-gray-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Section;
