# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Scoops Gelato 프랜차이즈 랜딩페이지 - Next.js 기반 단일 페이지 웹사이트

## Commands

```bash
npm run dev      # 개발 서버 실행 (Turbopack)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

## Tech Stack

- **Framework**: Next.js 16.1.3 (App Router, Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Architecture

### Page Structure (`src/app/page.tsx`)
단일 랜딩페이지로 섹션별 컴포넌트 조합:
```
Navigation → Hero → Stats → About → ProductGallery → Brands → Vision → Franchise → Footer
```

### Key Patterns

**Path Alias**: `@/*` → `./src/*`

**Scroll Reveal Animation**: `useScrollReveal` 훅 사용
```tsx
const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });
<section ref={ref} className={getScrollRevealClass(isVisible)}>
```

**Anchor Navigation**: 고정 Navigation 바 대응을 위해 섹션에 `scroll-mt-20` 클래스 필수
- `#about`, `#brands`, `#vision`, `#franchise`

### Custom CSS Classes (`globals.css`)
- `.animate-fade-in-up` + `.delay-1` ~ `.delay-8`: 순차 페이드인
- `.glow-hover`, `.btn-glow`: 호버 글로우 효과
- `.card-hover`: 카드 호버 (translateY + shadow)
- `.image-glow`: 이미지 호버 확대
