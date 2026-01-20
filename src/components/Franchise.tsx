"use client";

import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useScrollReveal, getScrollRevealClass } from "@/hooks/useScrollReveal";

const benefits = [
  "체계적인 창업 컨설팅",
  "전문 교육 프로그램",
  "지속적인 운영 지원",
  "마케팅 및 홍보 지원",
];

// Focus styles for form inputs
const inputFocusClasses = "focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:border-transparent focus:outline-none";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function Franchise() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-80px",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/franchise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          region: formData.location,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "문의 제출에 실패했습니다.");
      }

      setSubmitStatus("success");
      setFormData({ name: "", phone: "", location: "", message: "" });

      // Reset success status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "오류가 발생했습니다."
      );
    }
  };

  return (
    <section id="franchise" className="scroll-mt-20 py-20 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Franchise Info */}
          <div className={`bg-[#111111] text-white rounded-3xl overflow-hidden card-hover ${getScrollRevealClass(isVisible)}`} style={{ transitionDelay: "100ms" }}>
            <div className="relative h-48 md:h-56">
              <Image
                src="/images/unnamed.jpg"
                alt="스쿱스 젤라또 매장"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent"></div>
            </div>
            <div className="p-8 md:p-10 -mt-12 relative">
              <span className="text-sm font-medium text-zinc-400 tracking-wide uppercase mb-4 block">
                Franchise
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
                함께 성장할<br />파트너를 찾습니다
              </h2>
              <p className="text-base font-light text-zinc-400 leading-relaxed mb-8">
                10년의 노하우와 검증된 시스템으로 가맹점주님의 성공을 지원합니다.
              </p>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                    <span className="text-sm font-light text-zinc-300">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`bg-white rounded-3xl p-8 md:p-10 border border-black/5 card-hover ${getScrollRevealClass(isVisible)}`}
            style={{ transitionDelay: "200ms" }}
            id="contact"
          >
            <h3 className="text-xl font-semibold tracking-tight mb-6">
              가맹 문의
            </h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-light text-zinc-500 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-light transition-all duration-300 ${inputFocusClasses}`}
                  placeholder="홍길동"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-light text-zinc-500 mb-2">
                  연락처
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-light transition-all duration-300 ${inputFocusClasses}`}
                  placeholder="010-1234-5678"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-light text-zinc-500 mb-2">
                  희망 지역
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-light transition-all duration-300 ${inputFocusClasses}`}
                  placeholder="서울특별시 강남구"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-light text-zinc-500 mb-2">
                  문의 내용
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 bg-zinc-50 border border-black/10 rounded-xl text-sm font-light transition-all duration-300 resize-none ${inputFocusClasses}`}
                  placeholder="궁금한 점을 자유롭게 작성해주세요."
                ></textarea>
              </div>
              {submitStatus === "success" && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
                  상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="w-full py-4 bg-[#111111] text-white text-sm font-medium rounded-xl btn-glow btn-hover transition-all duration-300 hover:bg-[#222222] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitStatus === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    제출 중...
                  </>
                ) : (
                  "상담 신청하기"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
