import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const [planeVisible, setPlaneVisible] = useState(false);

  // Show plane after brief delay (dramatic reveal)
  useEffect(() => {
    const t = setTimeout(() => setPlaneVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Scroll-driven parallax only
  useEffect(() => {
    const handleScroll = () => {
      if (!layersRef.current) return;
      const scrollY = window.scrollY;
      const layers = layersRef.current.querySelectorAll<HTMLElement>('.parallax-bg-layer');
      layers.forEach((layer, i) => {
        const speeds = [0.05, 0.12, 0.20, 0.28];
        layer.style.transform = `translateY(${scrollY * speeds[i]}px)`;
      });
    };

    const onScroll = () => {
      rafRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToContent = () => {
    document.getElementById('transport')?.scrollIntoView({ behavior: 'smooth' });
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
          className="parallax-bg-layer absolute inset-0"
          style={{
            zIndex: 0,
            backgroundImage: `radial-gradient(1px 1px at 20% 30%, white, transparent),
              radial-gradient(1px 1px at 60% 15%, rgba(255,255,255,0.8), transparent),
              radial-gradient(1.5px 1.5px at 80% 45%, white, transparent),
              radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 10% 55%, white, transparent),
              radial-gradient(1px 1px at 90% 25%, rgba(255,255,255,0.7), transparent)`,
            opacity: 0.5,
          }}
        />

        {/* Mountains (far) */}
        <div
          className="parallax-bg-layer absolute inset-0"
          style={{
            backgroundImage: 'url(/images/parallax-mountains.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
            zIndex: 1,
            opacity: 0.45,
          }}
        />

        {/* City (mid) */}
        <div
          className="parallax-bg-layer absolute inset-0"
          style={{
            backgroundImage: 'url(/images/parallax-city.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 75%',
            zIndex: 2,
            opacity: 0.35,
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 70%, transparent 100%)',
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

      {/* ===== PLANE CONTRAIL (smoke trail) ===== */}
      {planeVisible && (
        <div
          className="absolute z-[5] pointer-events-none"
          style={{
            right: '35%',
            top: '22%',
            width: 'clamp(150px, 25vw, 400px)',
            height: '3px',
            background: 'linear-gradient(to left, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.0) 100%)',
            animation: 'contrail-appear 2s 1.2s both',
            borderRadius: '999px',
            filter: 'blur(2px)',
          }}
        />
      )}
      {planeVisible && (
        <div
          className="absolute z-[5] pointer-events-none"
          style={{
            right: '34%',
            top: '24%',
            width: 'clamp(100px, 18vw, 280px)',
            height: '2px',
            background: 'linear-gradient(to left, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.0) 100%)',
            animation: 'contrail-appear 2s 1.4s both',
            borderRadius: '999px',
            filter: 'blur(3px)',
          }}
        />
      )}

      {/* ===== ANIMATED PLANE ===== */}
      <div
        ref={planeRef}
        className="plane-layer absolute z-[7] pointer-events-none"
        style={{
          right: '-2%',
          top: '8%',
          width: 'clamp(320px, 48vw, 750px)',
          animation: planeVisible ? 'plane-fly-in 2.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both, plane-float 6s ease-in-out 3.5s infinite' : 'none',
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
            animation: 'shadow-pulse 6s ease-in-out 3.5s infinite',
          }}
        />
        <img
          src="/images/photo_2026-05-07_16-27-30.png"
          alt="Uzbekistan Airways Boeing 787"
          className="w-full h-auto"
          style={{
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4)) drop-shadow(0 0 20px rgba(20,184,166,0.15))',
            transform: 'rotate(-8deg)',
          }}
        />
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
        {/* Badge */}
        <div
          className="mb-5 flex items-center gap-2 px-4 py-1.5 rounded-full border"
          style={{
            background: 'rgba(20,184,166,0.12)',
            borderColor: 'rgba(20,184,166,0.3)',
            animation: 'fade-in-up 0.8s 0.3s both',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
          <span className="text-[#14B8A6] text-xs font-semibold tracking-widest uppercase">Uzbekistan Airways</span>
        </div>

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

        {/* Banner */}
        <div
          className="mt-5 px-5 py-2.5 rounded-2xl max-w-2xl"
          style={{
            background: 'rgba(20,184,166,0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(20,184,166,0.25)',
            animation: 'fade-in-up 0.8s 1.0s both',
          }}
        >
          <p className="text-[#5eead4] text-sm font-medium">
            {t('bannerText')}
          </p>
        </div>

        {/* Search Bar */}
        <div
          className="mt-8 w-full max-w-2xl rounded-2xl shadow-2xl p-1.5 flex flex-col sm:flex-row items-center gap-1.5"
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
              className="bg-transparent border-none outline-none text-slate-700 w-full text-sm font-medium placeholder:text-slate-400"
            />
          </div>
          <button className="w-full sm:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/30 text-sm">
            Qidirish
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6" style={{ animation: 'fade-in-up 0.8s 1.3s both' }}>
          <button
            onClick={scrollToContent}
            className="flex items-center gap-2 px-10 py-3.5 rounded-full bg-[#14B8A6] hover:bg-[#0D9488] text-white font-semibold transition-all shadow-lg shadow-[#14B8A6]/30 hover:shadow-[#14B8A6]/50 hover:-translate-y-1 active:scale-95"
          >
            {t('heroCta')}
          </button>
          <button
            onClick={scrollToContent}
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

        @keyframes shadow-pulse {
          0%, 100% { opacity: 0.6; transform: scaleX(1.5) scaleY(0.4); }
          50% { opacity: 0.3; transform: scaleX(1.8) scaleY(0.3); }
        }

        @keyframes contrail-appear {
          0% { opacity: 0; width: 0; }
          40% { opacity: 1; }
          100% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
