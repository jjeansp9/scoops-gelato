"use client";

import Image from "next/image";
import { Award, Leaf } from "lucide-react";
import { useScrollReveal, getScrollRevealClass } from "@/hooks/useScrollReveal";

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.15,
    rootMargin: "-100px",
  });

  return (
    <section id="about" className="scroll-mt-20 py-20 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className={`order-2 lg:order-1 ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "100ms" }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden image-glow">
                <Image
                  src="/images/unnamed.jpg"
                  alt="스쿱스 매장 외관"
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden image-glow mt-8">
                <Image
                  src="/images/unnamed3.jpg"
                  alt="매장 내부"
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className={`order-1 lg:order-2 ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "200ms" }}>
            <span className="text-sm font-medium text-zinc-400 tracking-wide uppercase mb-4 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              정직한 재료와<br />진심을 담은 맛
            </h2>
            <p className="text-base font-light text-zinc-500 leading-relaxed mb-6">
              2018년 첫 매장을 오픈한 이후, 저희는 최고 품질의 재료만을 고집하며
              고객에게 특별한 경험을 선사해왔습니다. 이탈리아 정통 젤라또 제조 방식을
              기반으로, 한국인의 입맛에 맞는 창의적인 레시피를 개발합니다.
            </p>
            <p className="text-base font-light text-zinc-500 leading-relaxed mb-8">
              현재 11개 가맹점을 운영하며, 각 매장의 성공을 위해 체계적인
              교육 시스템과 지속적인 컨설팅을 제공하고 있습니다.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium">품질 인증</p>
                  <p className="text-xs font-light text-zinc-400">이탈리아 협회 인증</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium">신선한 재료</p>
                  <p className="text-xs font-light text-zinc-400">매일 갓 만든 젤라또</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
