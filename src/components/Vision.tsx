"use client";

import { Sparkles, Handshake, Rocket } from "lucide-react";
import { useScrollReveal, getScrollRevealClass } from "@/hooks/useScrollReveal";

const visions = [
  {
    icon: Sparkles,
    title: "품질 최우선",
    description:
      "최고 품질의 재료와 레시피로 고객에게 최상의 가치를 전달합니다. 타협 없는 품질 관리가 우리의 기본입니다.",
  },
  {
    icon: Handshake,
    title: "상생 파트너십",
    description:
      "가맹점주와 함께 성장하는 파트너십을 추구합니다. 체계적인 교육과 지속적인 지원으로 성공을 돕습니다.",
  },
  {
    icon: Rocket,
    title: "지속적 혁신",
    description:
      "트렌드를 선도하는 신메뉴 개발과 브랜드 확장으로 새로운 성장 기회를 만들어갑니다.",
  },
];

export default function Vision() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.15,
    rootMargin: "-100px",
  });

  return (
    <section id="vision" className="scroll-mt-20 py-20 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-16 border border-black/5">
          <div className={`text-center mb-16 ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "100ms" }}>
            <span className="text-sm font-medium text-zinc-400 tracking-wide uppercase mb-4 block">
              Our Vision
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              우리의 사업 방향성
            </h2>
            <p className="text-base font-light text-zinc-500 max-w-2xl mx-auto">
              단순히 음식을 파는 것이 아닌, 새로운 라이프스타일과 경험을 제안합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {visions.map((vision, index) => (
              <div
                key={index}
                className={`text-center card-hover ${getScrollRevealClass(isVisible)}`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <vision.icon className="w-7 h-7 text-zinc-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium tracking-tight mb-3">
                  {vision.title}
                </h3>
                <p className="text-sm font-light text-zinc-500 leading-relaxed">
                  {vision.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
