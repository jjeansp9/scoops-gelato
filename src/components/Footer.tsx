import Image from "next/image";
import { IceCreamBowl, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <IceCreamBowl className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-lg font-semibold tracking-tight">
                Scoops Gelato
              </span>
            </div>
            <p className="text-sm font-light text-zinc-500 leading-relaxed max-w-sm mb-6">
              10년의 경험과 11개 가맹점 운영 노하우로 새로운 맛의 경험을 선사합니다.
            </p>
            {/* Small Product Images */}
            <div className="flex gap-2">
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <Image
                  src="/images/unnamed4.jpg"
                  alt="젤라또"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <Image
                  src="/images/unnamed5.jpg"
                  alt="젤라또"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <Image
                  src="/images/unnamed2.jpg"
                  alt="젤라또"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">바로가기</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300"
                >
                  소개
                </a>
              </li>
              <li>
                <a
                  href="#brands"
                  className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300"
                >
                  브랜드
                </a>
              </li>
              <li>
                <a
                  href="#vision"
                  className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300"
                >
                  비전
                </a>
              </li>
              <li>
                <a
                  href="#franchise"
                  className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300"
                >
                  가맹문의
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-sm font-light text-zinc-500 hover:text-[#111111] transition-all duration-300"
                >
                  로그인
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">연락처</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm font-light text-zinc-500">
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                02-1234-5678
              </li>
              <li className="flex items-center gap-2 text-sm font-light text-zinc-500">
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                contact@scoopsgelato.co.kr
              </li>
              <li className="flex items-center gap-2 text-sm font-light text-zinc-500">
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
                서울특별시 강남구
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5">
          <p className="text-sm font-light text-zinc-400">
            &copy; 2025 Scoops Gelato. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-zinc-400 hover:text-[#111111] transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-[#111111] transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-[#111111] transition-all duration-300"
              aria-label="Youtube"
            >
              <Youtube className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
