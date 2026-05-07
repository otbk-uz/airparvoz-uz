import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Scroll-driven parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!layersRef.current) return;
      const scrollY = window.scrollY;
      const layers = layersRef.current.querySelectorAll('.parallax-layer');
      layers.forEach((layer, i) => {
        const speed = [0.08, 0.2][i];
        (layer as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
      // Plane moves upward faster on scroll
      const plane = layersRef.current.querySelector('.plane-layer') as HTMLElement;
      if (plane) {
        plane.style.transform = `translateY(${-scrollY * 0.15}px) translateX(${scrollY * 0.05}px)`;
      }
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
        background: 'linear-gradient(180deg, #0A1628 0%, #0f2d4a 25%, #1a5276 50%, #2e86c1 75%, #5dade2 100%)',
      }}
    >
      {/* Parallax Layers */}
      <div ref={layersRef} className="absolute inset-0">
        {/* Layer 1 - Mountains (back) */}
        <div
          className="parallax-layer"
          style={{
            backgroundImage: 'url(/images/parallax-mountains.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
            zIndex: 1,
            opacity: 0.5,
          }}
        />

        {/* Layer 2 - City (mid) */}
        <div
          className="parallax-layer"
          style={{
            backgroundImage: 'url(/images/parallax-city.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 80%',
            zIndex: 2,
            opacity: 0.4,
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 65%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 65%, transparent 100%)',
          }}
        />
      </div>

      {/* Animated plane flying */}
      <div
        className="plane-layer absolute z-[6] pointer-events-none"
        style={{
          right: '5%',
          top: '12%',
          width: 'clamp(300px, 40vw, 600px)',
          animation: 'plane-enter 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
        }}
      >
        <img
          src="/images/plane-uzb.png"
          alt="Uzbekistan Airways"
          className="w-full h-auto"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 35%, transparent 25%, rgba(10,22,40,0.6) 100%)' }}
      />

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            background: 'rgba(255,255,255,0.25)',
            animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
            zIndex: 6,
          }}
        />
      ))}

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        style={{ paddingTop: '60px' }}
      >
        {/* Main Title */}
        <h1
          className="text-white font-bold leading-[0.92] tracking-tight max-w-5xl"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontFamily: "'Playfair Display', serif",
            textShadow: '0 4px 50px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
            animation: 'fade-in-up 1s 0.5s both',
          }}
        >
          {t('heroTitle').split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="mt-5 text-white/45 text-sm sm:text-base max-w-lg leading-relaxed"
          style={{ animation: 'fade-in-up 0.8s 0.8s both' }}
        >
          Aviabiletlar, mehmonxonalar, gidlar va ekskursiyalar — barchasi bir joyda
        </p>

        {/* Banner / Meme */}
        <div 
          className="mt-6 px-6 py-3 bg-[#14B8A6]/10 backdrop-blur-md border border-[#14B8A6]/20 rounded-2xl max-w-2xl"
          style={{ animation: 'fade-in-up 0.8s 1.0s both' }}
        >
          <p className="text-[#14B8A6] text-sm font-medium">
            {t('bannerText')}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8" style={{ animation: 'fade-in-up 0.8s 1.2s both' }}>
          <button onClick={scrollToContent} className="btn-primary flex items-center gap-2">
            {t('heroCta')}
          </button>
          <button 
            onClick={scrollToContent} 
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            360° ko'rish
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: 'fade-in-up 0.8s 1.4s both' }}
        >
          <span className="text-white/25 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/25 animate-bounce" />
        </div>
      </div>

      {/* UZBEKISTAN text at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[8] pointer-events-none overflow-hidden"
        style={{
          animation: 'fade-in-up 1.2s 1.5s both',
        }}
      >
        <div
          className="text-center select-none"
          style={{
            fontSize: 'clamp(4rem, 14vw, 12rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            lineHeight: 0.85,
            letterSpacing: '0.08em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.12)',
            transform: 'translateY(35%)',
          }}
        >
          UZBEKISTAN
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[7] pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.6) 30%, transparent 100%)' }}
      />

      <style>{`
        @keyframes plane-enter {
          0% {
            opacity: 0;
            transform: translateX(200px) translateY(50px) scale(0.8);
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
