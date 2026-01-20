"use client";

import { useEffect, useState, useRef } from "react";

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { target: 10, suffix: "+", label: "년의 업계 경험" },
  { target: 11, suffix: "", label: "운영 가맹점" },
  { target: 50, suffix: "K+", label: "월간 고객" },
  { target: 98, suffix: "%", label: "가맹점 만족도" },
];

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export default function Stats() {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          stats.forEach((stat, index) => {
            setTimeout(() => {
              const duration = 2000;
              const startTime = performance.now();

              function updateCounter(currentTime: number) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const current = Math.round(easedProgress * stat.target);

                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[index] = current;
                  return newCounts;
                });

                if (progress < 1) {
                  requestAnimationFrame(updateCounter);
                }
              }

              requestAnimationFrame(updateCounter);
            }, index * 150);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 px-6" id="stats-section">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 border border-black/5 glow-hover animate-fade-in-up delay-${index + 1}`}
            >
              <p className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
                <span>{counts[index]}</span>
                {stat.suffix}
              </p>
              <p className="text-sm font-light text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
