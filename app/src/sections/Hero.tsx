import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const scrollYRef = useRef(0);
  const currentScrollRef = useRef(0);
  const [planeVisible, setPlaneVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Search functionality - bo'limlarga yo'naltiradi
  const handleSearch = () => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      document.getElementById('transport')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const sections: { keywords: string[]; id: string }[] = [
      { 
        keywords: ['avia', 'bilet', 'parvoz', 'flight', 'авиа', 'самолет', 'plane', 'ticket', 'chipta', 'uchish', 'air', 'samalyot', 'reys'], 
        id: 'transport' 
      },
      { 
        keywords: ['mehmonxona', 'hotel', 'отель', 'stay', 'yashash', 'room', 'hostel', 'pansionat', 'joy', 'kvartira', 'apartament'], 
        id: 'hotels' 
      },
      { 
        keywords: ['tur', 'firma', 'company', 'турфирма', 'sayohat', 'travel', 'tour', 'paket', 'dam olish', 'agentlik', 'sayohatnom'], 
        id: 'tour-firms' 
      },
      { 
        keywords: ['360', 'virtual', 'ko\'rish', 'view', 'виртуал', 'panorama', 'aylanib ko\'rish', 'online sayohat', 'onlayn'], 
        id: 'virtual-tours' 
      },
      { 
        keywords: ['gid', 'guide', 'гид', 'volontyor', 'hamroh', 'yo\'l ko\'rsatuvchi', 'tushuntirish', 'tarjimon'], 
        id: 'guides' 
      },
      { 
        keywords: ['samarqand', 'buxoro', 'xiva', 'toshkent', 'farg\'ona', 'andijon', 'namangan', 'nukus', 'termiz', 'qarshi', 'shahar', 'city'], 
        id: 'transport' 
      },
      { 
        keywords: ['ai', 'sun\'iy', 'intellekt', 'chat', 'yordamchi', 'assistant', 'savol', 'javob', 'bot', 'yordam', 'help'], 
        id: 'guides' 
      },
    ];

    // Find best match based on keyword inclusion
    const matched = sections.find(s => s.keywords.some(k => q.includes(k)));
    const targetId = matched?.id || 'transport';
    
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Show plane after brief delay (dramatic reveal)
  useEffect(() => {
    const t = setTimeout(() => setPlaneVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Professional GPU-accelerated parallax
  useEffect(() => {
    // Parallax config: [speed, scaleCompensation]
    const layerConfigs = [
      { speed: 0.03, scale: 1.06 },  // Stars (slowest)
      { speed: 0.12, scale: 1.18 },  // Mountains (far)
      { speed: 0.22, scale: 1.28 },  // City (mid)
      { speed: 0.32, scale: 1.38 },  // Clouds (near)
    ];

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const lerpFactor = 0.08; // Smooth factor (0=no smoothing, 1=instant)

    const tick = () => {
      // Smooth interpolation
      currentScrollRef.current = lerp(currentScrollRef.current, scrollYRef.current, lerpFactor);
      const sy = currentScrollRef.current;

      if (layersRef.current) {
        const layers = layersRef.current.querySelectorAll<HTMLElement>('.parallax-bg-layer');
        layers.forEach((layer, i) => {
          const cfg = layerConfigs[i];
          if (!cfg) return;
          // translateY for parallax + translate3d for GPU acceleration
          layer.style.transform = `translate3d(0, ${sy * cfg.speed}px, 0) scale(${cfg.scale})`;
        });

        // Plane moves up and fades as user scrolls
        const plane = layersRef.current.parentElement?.querySelector<HTMLElement>('.plane-layer');
        if (plane) {
          const progress = Math.min(sy / 400, 1);
          plane.style.transform = `translate3d(${sy * 0.08}px, ${-sy * 0.25}px, 0)`;
          plane.style.opacity = String(1 - progress * 0.8);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full overflow-hidden select-none"
      style={{
        height: '100vh',
        minHeight: '700px',
        background: 'linear-gradient(180deg, #020d1f 0%, #0a1e3d 20%, #0f3460 45%, #1a5a8a 70%, #2e86c1 100%)',
        perspective: '1200px',
      }}
    >
      {/* ===== PARALLAX LAYERS ===== */}
      <div ref={layersRef} className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>

        {/* Stars layer */}
        <div
          className="parallax-bg-layer absolute"
          style={{
            inset: '-20% 0',
            zIndex: 0,
            willChange: 'transform',
            backgroundImage: `radial-gradient(1px 1px at 15% 25%, white, transparent),
              radial-gradient(1px 1px at 55% 12%, rgba(255,255,255,0.8), transparent),
              radial-gradient(1.5px 1.5px at 78% 40%, white, transparent),
              radial-gradient(1px 1px at 35% 65%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 8% 50%, white, transparent),
              radial-gradient(1px 1px at 88% 22%, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 45% 80%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 70% 55%, white, transparent)`,
            opacity: 0.6,
          }}
        />

        {/* Mountains (far) */}
        <div
          className="parallax-bg-layer absolute"
          style={{
            inset: '-20% 0',
            backgroundImage: 'url(/images/parallax-mountains.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
            zIndex: 1,
            opacity: 0.5,
            willChange: 'transform',
          }}
        />

        {/* City (mid) */}
        <div
          className="parallax-bg-layer absolute"
          style={{
            inset: '-20% 0',
            backgroundImage: 'url(/images/parallax-city.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 75%',
            zIndex: 2,
            opacity: 0.4,
            willChange: 'transform',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
          }}
        />

        {/* Clouds layer */}
        <div
          className="parallax-bg-layer absolute inset-0"
          style={{
            backgroundImage: 'url(/images/hero-clouds.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            zIndex: 3,
            opacity: 0.2,
            maskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 70%)',
          }}
        />
      </div>

      {/* ===== ANIMATED PLANE + ENGINE EXHAUST ===== */}
      <div
        ref={planeRef}
        className="plane-layer absolute z-[7] pointer-events-none"
        style={{
          right: '-2%',
          top: '8%',
          width: 'clamp(320px, 48vw, 750px)',
          animation: planeVisible ? 'plane-fly-in 2.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
          opacity: planeVisible ? 1 : 0,
          transformOrigin: 'center center',
        }}
      >
        {/* Plane shadow on ground */}
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '10%',
            right: '10%',
            height: '20px',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)',
            filter: 'blur(8px)',
            transform: 'scaleX(1.5) scaleY(0.4)',
          }}
        />

        {/* Plane image */}
        <img
          src="/images/photo_2026-05-07_16-27-30.png"
          alt="Uzbekistan Airways Boeing 787"
          className="w-full h-auto"
          style={{
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4)) drop-shadow(0 0 20px rgba(20,184,166,0.15))',
            transform: 'rotate(-8deg)',
          }}
        />

        {/* ===== MOTORLARDAN CHIQADIGAN OQ TUTUN ===== */}

        {/* ======= PASTKI MOTOR — QALIN OQ TUTUN ======= */}
        {/* Doimiy oq tutun oqimi */}
        <div style={{
          position: 'absolute', left: '72%', top: '80%',
          width: '80px', height: '12px',
          background: 'linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 100%)',
          borderRadius: '999px', filter: 'blur(4px)',
          animation: 'smoke-stream 0.6s ease-out 3.2s infinite',
        }}/>
        <div style={{
          position: 'absolute', left: '74%', top: '82%',
          width: '60px', height: '8px',
          background: 'linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
          borderRadius: '999px', filter: 'blur(5px)',
          animation: 'smoke-stream 0.8s ease-out 3.3s infinite',
        }}/>
        {/* Tutun bulutchalari */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`s1-${i}`}
            style={{
              position: 'absolute',
              left: `${72 + i * 1.5}%`,
              top: `${80 + (i % 3) * 1.2}%`,
              width: `${12 + i * 3}px`,
              height: `${12 + i * 3}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,255,255,${0.85 - i * 0.06}) 0%, rgba(255,255,255,${0.3 - i * 0.02}) 50%, transparent 80%)`,
              filter: `blur(${3 + i * 0.8}px)`,
              animation: `white-smoke ${1.0 + i * 0.08}s ease-out ${3.0 + i * 0.1}s infinite`,
            }}
          />
        ))}

        {/* ======= YUQORI MOTOR — QALIN OQ TUTUN ======= */}
        {/* Doimiy oq tutun oqimi */}
        <div style={{
          position: 'absolute', left: '55%', top: '60%',
          width: '55px', height: '8px',
          background: 'linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 40%, transparent 100%)',
          borderRadius: '999px', filter: 'blur(3px)',
          animation: 'smoke-stream 0.7s ease-out 3.5s infinite',
        }}/>
        <div style={{
          position: 'absolute', left: '57%', top: '62%',
          width: '40px', height: '6px',
          background: 'linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
          borderRadius: '999px', filter: 'blur(4px)',
          animation: 'smoke-stream 0.9s ease-out 3.6s infinite',
        }}/>
        {/* Tutun bulutchalari */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`s2-${i}`}
            style={{
              position: 'absolute',
              left: `${55 + i * 1.5}%`,
              top: `${60 + (i % 3) * 1}%`,
              width: `${10 + i * 2.5}px`,
              height: `${10 + i * 2.5}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,255,255,${0.75 - i * 0.06}) 0%, rgba(255,255,255,${0.25 - i * 0.02}) 50%, transparent 80%)`,
              filter: `blur(${2.5 + i * 0.7}px)`,
              animation: `white-smoke ${1.1 + i * 0.08}s ease-out ${3.3 + i * 0.12}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ===== VIGNETTE ===== */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 45% 40%, transparent 20%, rgba(2,13,31,0.55) 80%, rgba(2,13,31,0.85) 100%)',
        }}
      />

      {/* ===== FLOATING PARTICLES ===== */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${(i % 3) + 1}px`,
            height: `${(i % 3) + 1}px`,
            left: `${(i * 17 + 5) % 95}%`,
            top: `${(i * 13 + 8) % 60}%`,
            background: i % 4 === 0 ? 'rgba(20,184,166,0.6)' : 'rgba(255,255,255,0.3)',
            animation: `float ${6 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            zIndex: 6,
          }}
        />
      ))}

      {/* ===== CONTENT ===== */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        style={{ paddingTop: '64px' }}
      >

        {/* Main Title */}
        <h1
          className="text-white font-bold leading-[0.92] tracking-tight max-w-4xl"
          style={{
            fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
            fontFamily: "'Playfair Display', serif",
            textShadow: '0 4px 60px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.3)',
            animation: 'fade-in-up 1s 0.5s both',
          }}
        >
          {t('heroTitle').split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="mt-5 text-white/50 text-sm sm:text-base max-w-lg leading-relaxed"
          style={{ animation: 'fade-in-up 0.8s 0.8s both' }}
        >
          Aviabiletlar, mehmonxonalar, gidlar va ekskursiyalar — barchasi bir joyda
        </p>


        {/* Search Bar Wrapper for right alignment */}
        <div className="w-full flex justify-end mt-10 lg:pr-20 xl:pr-40">
          <div
            className="w-full max-w-xl rounded-2xl shadow-2xl p-1.5 flex flex-col sm:flex-row items-center gap-1.5"
            style={{
              background: 'rgba(255,255,255,0.96)',
              animation: 'fade-in-up 0.8s 1.1s both',
            }}
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full">
              <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-transparent border-none outline-none text-slate-700 w-full text-sm font-medium placeholder:text-slate-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/30 text-sm"
            >
              Qidirish
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6" style={{ animation: 'fade-in-up 0.8s 1.3s both' }}>
          <button
            onClick={() => scrollToId('transport')}
            className="flex items-center gap-2 px-10 py-3.5 rounded-full bg-[#14B8A6] hover:bg-[#0D9488] text-white font-semibold transition-all shadow-lg shadow-[#14B8A6]/30 hover:shadow-[#14B8A6]/50 hover:-translate-y-1 active:scale-95"
          >
            {t('heroCta')}
          </button>
          <button
            onClick={() => scrollToId('virtual-tours')}
            className="flex items-center gap-2 px-10 py-3.5 rounded-full text-white font-semibold transition-all hover:-translate-y-1 active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            360° ko'rish
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: 'fade-in-up 0.8s 1.6s both' }}
        >
          <span className="text-white/30 text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/30 animate-bounce" />
        </div>
      </div>

      {/* ===== UZBEKISTAN watermark text ===== */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[8] pointer-events-none overflow-hidden"
        style={{ animation: 'fade-in-up 1.2s 1.5s both' }}
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: 'clamp(4rem, 14vw, 12rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            lineHeight: 0.85,
            letterSpacing: '0.08em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            transform: 'translateY(35%)',
          }}
        >
          UZBEKISTAN
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[9] pointer-events-none"
        style={{
          height: '180px',
          background: 'linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.7) 35%, transparent 100%)',
        }}
      />

      {/* ===== KEYFRAME ANIMATIONS ===== */}
      <style>{`
        @keyframes plane-fly-in {
          0% {
            opacity: 0;
            transform: translateX(120vw) translateY(40vh) scale(0.4) rotate(15deg);
          }
          60% {
            opacity: 1;
          }
          85% {
            transform: translateX(-20px) translateY(-10px) scale(1.03) rotate(-10deg);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1) rotate(-8deg);
          }
        }

        @keyframes plane-float {
          0%, 100% {
            transform: translateY(0px) rotate(-8deg);
          }
          30% {
            transform: translateY(-14px) rotate(-6deg);
          }
          70% {
            transform: translateY(-6px) rotate(-10deg);
          }
        }

        @keyframes white-smoke {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0.9;
          }
          30% {
            opacity: 0.6;
          }
          100% {
            transform: translate(40px, 8px) scale(3.5);
            opacity: 0;
          }
        }

        @keyframes smoke-stream {
          0% {
            transform: scaleX(0.3) scaleY(1);
            opacity: 0.9;
          }
          50% {
            opacity: 0.5;
            transform: scaleX(1.2) scaleY(1.5);
          }
          100% {
            transform: scaleX(2) scaleY(0.6);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
