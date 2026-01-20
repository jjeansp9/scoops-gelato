"use client";

import Image from "next/image";
import { useScrollReveal, getScrollRevealClass } from "@/hooks/useScrollReveal";

export default function ProductGallery() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-80px",
  });

  return (
    <section className="py-20 px-4 md:px-6 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "100ms" }}>
          <span className="text-sm font-medium text-zinc-400 tracking-wide uppercase mb-4 block">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            프리미엄 젤라또
          </h2>
          <p className="text-base font-light text-zinc-500 max-w-xl mx-auto">
            엄선된 재료와 장인 정신으로 만드는 이탈리아 정통 젤라또
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`md:col-span-2 md:row-span-2 aspect-square rounded-3xl overflow-hidden image-glow card-hover ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "200ms" }}>
            <Image
              src="/images/unnamed4.jpg"
              alt="스쿱스 젤라또"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`aspect-square rounded-3xl overflow-hidden image-glow card-hover ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "300ms" }}>
            <Image
              src="/images/unnamed2.jpg"
              alt="티라미수 젤라또"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`aspect-square rounded-3xl overflow-hidden image-glow card-hover ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "400ms" }}>
            <Image
              src="/images/unnamed5.jpg"
              alt="다양한 젤라또"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`aspect-square rounded-3xl overflow-hidden image-glow card-hover ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "500ms" }}>
            <Image
              src="/images/unnamed3.jpg"
              alt="젤라또 제조"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`aspect-square rounded-3xl overflow-hidden image-glow card-hover ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "600ms" }}>
            <Image
              src="/images/unnamed.jpg"
              alt="스쿱스 매장"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
