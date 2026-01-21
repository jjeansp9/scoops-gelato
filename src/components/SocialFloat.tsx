"use client";

import { Instagram } from "lucide-react";

// KakaoTalk 커스텀 아이콘 컴포넌트
function KakaoTalkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.65 1.753 4.975 4.395 6.306-.14.507-.903 3.26-.935 3.484 0 0-.019.152.08.21.099.058.216.014.216.014.285-.04 3.306-2.163 3.834-2.538.782.115 1.595.175 2.41.175 5.523 0 10-3.463 10-7.691S17.523 3 12 3z" />
    </svg>
  );
}

interface SocialLink {
  name: string;
  webUrl: string;
  deepLink?: string;
  icon: typeof Instagram | typeof KakaoTalkIcon;
  baseColor: string;
  baseBg: string;
  hoverBg: string;
  isCustomIcon: boolean;
}

const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    webUrl: "https://instagram.com/_scoopsgelato_",
    deepLink: "instagram://user?username=_scoopsgelato_",
    icon: Instagram,
    baseColor: "text-pink-500",
    baseBg: "bg-pink-50",
    hoverBg: "hover:bg-pink-100",
    isCustomIcon: false,
  },
  {
    name: "KakaoTalk",
    webUrl: "https://open.kakao.com/me/scoopsgelato",
    deepLink: undefined, // 카카오톡 링크는 자동으로 앱을 열어줌
    icon: KakaoTalkIcon,
    baseColor: "text-[#3C1E1E]",
    baseBg: "bg-[#FEE500]",
    hoverBg: "hover:bg-[#F5DC00]",
    isCustomIcon: true,
  },
];

// 모바일 디바이스 감지 함수
const isMobileDevice = (): boolean => {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export default function SocialFloat() {
  const handleSocialClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    social: SocialLink
  ) => {
    e.preventDefault();

    const isMobile = isMobileDevice();

    // Instagram의 경우 모바일에서 딥링크 시도
    if (isMobile && social.deepLink) {
      // 앱 딥링크 시도
      window.location.href = social.deepLink;

      // 앱이 설치되지 않은 경우 fallback으로 웹 URL 열기
      setTimeout(() => {
        window.location.href = social.webUrl;
      }, 500);
    } else {
      // 데스크탑이거나 딥링크가 없는 경우 새 탭에서 웹 URL 열기
      window.open(social.webUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 animate-fade-in-up"
      role="navigation"
      aria-label="Social media links"
    >
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.webUrl}
            onClick={(e) => handleSocialClick(e, social)}
            aria-label={`${social.name} 페이지로 이동`}
            className={`
              group
              flex items-center justify-center
              w-11 h-11 md:w-12 md:h-12
              ${social.baseBg}
              backdrop-blur-sm
              rounded-full
              shadow-lg shadow-black/10
              border border-white/50
              ${social.baseColor}
              transition-all duration-300 ease-out
              hover:scale-110
              hover:shadow-xl hover:shadow-black/15
              ${social.hoverBg}
            `}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {social.isCustomIcon ? (
              <Icon className="w-5 h-5 md:w-[22px] md:h-[22px] transition-transform duration-300 group-hover:scale-110" />
            ) : (
              <Icon
                className="w-5 h-5 md:w-[22px] md:h-[22px] transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.5}
              />
            )}
          </a>
        );
      })}
    </div>
  );
}
