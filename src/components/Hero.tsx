import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="animate-fade-in-up delay-1">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 text-sm font-light text-zinc-500 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                업계 10년, 11개 가맹점 운영
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6 animate-fade-in-up delay-2">
              새로운 맛의 경험을<br />
              <span className="text-gradient">함께 만들어갑니다</span>
            </h1>
            <p className="text-lg font-light text-zinc-500 max-w-lg mb-10 animate-fade-in-up delay-3">
              Scoops Gelato를 시작으로, 다양한 F&B 브랜드를 통해 새로운 라이프스타일을 제안합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-4">
              <a
                href="#franchise"
                className="px-8 py-4 bg-[#111111] text-white text-sm font-medium rounded-full btn-glow transition-all duration-300 hover:bg-[#222222] text-center"
              >
                가맹 문의하기
              </a>
              <a
                href="#about"
                className="px-8 py-4 bg-white text-[#111111] text-sm font-medium rounded-full border border-black/10 btn-glow transition-all duration-300 hover:bg-zinc-50 text-center"
              >
                더 알아보기
              </a>
            </div>
          </div>

          {/* Hero Image Grid */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-3">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden image-glow">
                <Image
                  src="/images/unnamed.jpg"
                  alt="스쿱스 젤라또 매장"
                  width={400}
                  height={224}
                  className="w-full h-48 md:h-56 object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden image-glow">
                <Image
                  src="/images/unnamed2.jpg"
                  alt="프리미엄 젤라또"
                  width={400}
                  height={160}
                  className="w-full h-32 md:h-40 object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-3xl overflow-hidden image-glow">
                <Image
                  src="/images/unnamed4.jpg"
                  alt="스쿱스 젤라또"
                  width={400}
                  height={192}
                  className="w-full h-40 md:h-48 object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden image-glow">
                <Image
                  src="/images/unnamed5.jpg"
                  alt="젤라또 메뉴"
                  width={400}
                  height={192}
                  className="w-full h-40 md:h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
