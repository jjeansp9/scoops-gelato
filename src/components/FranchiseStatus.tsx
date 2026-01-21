"use client";

import { Store, Building2, Calendar } from "lucide-react";
import { useScrollReveal, getScrollRevealClass } from "@/hooks/useScrollReveal";

interface StatusCard {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}

const statusCards: StatusCard[] = [
  {
    icon: Store,
    title: "누적 가맹 운영 경험",
    value: "11개 점포",
    description: "전국 각지에서 성공적으로 운영된 가맹점 경험",
  },
  {
    icon: Building2,
    title: "운영 형태",
    value: "직영/가맹",
    description: "단독 매장부터 복합 상권까지 다양한 형태",
  },
  {
    icon: Calendar,
    title: "운영 기간 범위",
    value: "6개월 ~ 7년",
    description: "신규 오픈부터 장기 운영까지 폭넓은 노하우",
  },
];

export default function FranchiseStatus() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.15,
    rootMargin: "-100px",
  });

  return (
    <section
      id="franchise-status"
      className="scroll-mt-20 py-20 px-6 bg-zinc-50"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-12 ${getScrollRevealClass(isVisible)}`}
        >
          <span className="text-sm font-medium text-zinc-400 tracking-wide uppercase mb-4 block">
            Franchise Status
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            가맹점 현황
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {statusCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 border border-black/5 glow-hover ${getScrollRevealClass(isVisible)}`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-6">
                  <IconComponent
                    className="w-6 h-6 text-zinc-600"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <p className="text-sm font-medium text-zinc-400 mb-2">
                  {card.title}
                </p>

                {/* Value */}
                <p className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  {card.value}
                </p>

                {/* Description */}
                <p className="text-sm font-light text-zinc-500 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
