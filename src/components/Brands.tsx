"use client";

import Image from "next/image";
import { Coffee, CakeSlice } from "lucide-react";
import { useScrollReveal, getScrollRevealClass } from "@/hooks/useScrollReveal";

export default function Brands() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-80px",
  });

  return (
    <section id="brands" className="scroll-mt-20 py-20 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "100ms" }}>
          <span className="text-sm font-medium text-zinc-400 tracking-wide uppercase mb-4 block">
            Our Brands
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            다양한 브랜드 포트폴리오
          </h2>
          <p className="text-base font-light text-zinc-500 max-w-xl mx-auto">
            Scoops Gelato를 시작으로, 새로운 F&B 브랜드를 준비하고 있습니다.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Brand */}
          <div className={`md:col-span-2 md:row-span-2 bg-white rounded-3xl overflow-hidden border border-black/5 glow-hover card-hover ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "200ms" }}>
            <div className="relative h-64 md:h-80">
              <Image
                src="/images/unnamed.jpg"
                alt="스쿱스 젤라또 매장"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="inline-block px-3 py-1 bg-white text-[#111111] text-xs font-medium rounded-full mb-3">
                  대표 브랜드
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
                  Scoops Gelato
                </h3>
                <p className="text-sm font-light text-white/80">
                  이탈리아 정통 방식의 프리미엄 젤라또
                </p>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-base font-light text-zinc-500 leading-relaxed mb-6">
                매일 신선하게 만들어 최상의 맛과 품질을 제공합니다.
                현재 11개 가맹점을 운영 중이며, 지속적인 확장을 계획하고 있습니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-zinc-100 text-sm font-light text-zinc-600 rounded-full">
                  프리미엄 젤라또
                </span>
                <span className="px-4 py-2 bg-zinc-100 text-sm font-light text-zinc-600 rounded-full">
                  11개 매장
                </span>
                <span className="px-4 py-2 bg-zinc-100 text-sm font-light text-zinc-600 rounded-full">
                  Since 2018
                </span>
              </div>
            </div>
          </div>

          {/* Upcoming Brand 1 */}
          <div className={`bg-white rounded-3xl p-6 md:p-8 border border-black/5 glow-hover card-hover ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "300ms" }}>
            <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-full mb-4">
              준비중
            </span>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-6 h-6 text-zinc-400" strokeWidth={1.5} />
              <h3 className="text-lg font-medium tracking-tight">Coffee Lab</h3>
            </div>
            <p className="text-sm font-light text-zinc-500">
              스페셜티 커피와 디저트를 함께 즐기는 카페 브랜드
            </p>
          </div>

          {/* Upcoming Brand 2 */}
          <div className={`bg-white rounded-3xl p-6 md:p-8 border border-black/5 glow-hover card-hover ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "400ms" }}>
            <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-full mb-4">
              준비중
            </span>
            <div className="flex items-center gap-2 mb-4">
              <CakeSlice className="w-6 h-6 text-zinc-400" strokeWidth={1.5} />
              <h3 className="text-lg font-medium tracking-tight">Sweet Moment</h3>
            </div>
            <p className="text-sm font-light text-zinc-500">
              특별한 순간을 위한 프리미엄 디저트 전문점
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
