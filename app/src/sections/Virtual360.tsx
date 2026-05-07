import { useEffect, useRef, useState, useCallback } from 'react';
import { Compass, X, Move, Hand, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const tours = [
  { id: 1, name: 'Registon, Samarqand', image: '/images/parallax-city.jpg', thumb: '/images/tour-samarkand.jpg', location: 'Samarqand' },
  { id: 2, name: "Ichan Qal'a, Xiva", image: '/images/tour-khiva.jpg', thumb: '/images/tour-khiva.jpg', location: 'Xiva' },
];

function PanoramaViewer({ image, onClose }: { image: string; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const autoRotateRef = useRef<number>(0);

  // Mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - offsetX);
    setIsAutoRotate(false);
  }, [offsetX]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - startX;
    setOffsetX(newX);
  }, [isDragging, startX]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch drag
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - offsetX);
    setIsAutoRotate(false);
  }, [offsetX]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const newX = e.touches[0].clientX - startX;
    setOffsetX(newX);
  }, [isDragging, startX]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Auto rotate
  useEffect(() => {
    if (!isAutoRotate) return;
    const animate = () => {
      autoRotateRef.current = requestAnimationFrame(() => {
        setOffsetX(prev => prev - 0.5);
        if (isAutoRotate) animate();
      });
    };
    animate();
    return () => cancelAnimationFrame(autoRotateRef.current);
  }, [isAutoRotate]);

  // Normalize offset to keep it smooth
  const normalizedOffset = offsetX % (window.innerWidth * 2 || 2000);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A1628]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#14B8A6]" />
          <span className="text-white text-sm font-semibold">360° Panorama</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isAutoRotate ? 'bg-[#14B8A6] text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Panorama Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: '1000px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="h-full flex items-center"
          style={{
            width: '300%',
            transform: `translateX(${-33.33 + (normalizedOffset / (window.innerWidth || 1000)) * 33.33}%)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {/* Tripled image for seamless loop effect */}
          <div className="flex h-full" style={{ width: '300%' }}>
            <div
              className="h-full flex-shrink-0"
              style={{
                width: '33.33%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'saturate(1.1) contrast(1.05)',
              }}
            />
            <div
              className="h-full flex-shrink-0"
              style={{
                width: '33.33%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'saturate(1.1) contrast(1.05)',
              }}
            />
            <div
              className="h-full flex-shrink-0"
              style={{
                width: '33.33%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'saturate(1.1) contrast(1.05)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent px-4 py-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/70 text-xs">
            <Hand className="w-3.5 h-3.5" />
            Sichqoncha bilan suring
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/70 text-xs">
            <Move className="w-3.5 h-3.5" />
            Chap / O'ng
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Virtual360() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTour, setActiveTour] = useState<typeof tours[0] | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('.virtual-card').forEach((card, i) => {
            setTimeout(() => {
              (card as HTMLElement).style.opacity = '1';
              (card as HTMLElement).style.transform = 'translateY(0)';
            }, i * 150);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="virtual-tours" className="relative w-full py-20 sm:py-28 bg-[#0A1628]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-14">
            <span className="text-[11px] uppercase tracking-[0.2em] text-orange-500 font-bold">360°</span>
            <h2 className="mt-3 text-white font-bold leading-[1.05]" style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-normal">{t('virtualToursTitle')}</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/50 max-w-lg mx-auto">{t('virtualToursSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="virtual-card group relative cursor-pointer rounded-2xl overflow-hidden aspect-[16/10]"
                style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
                onClick={() => setActiveTour(tour)}
              >
                <img src={tour.thumb} alt={tour.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* 360 badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5 animate-pulse shadow-lg shadow-orange-500/40">
                  <Compass className="w-3.5 h-3.5" />
                  360°
                </div>

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-20 h-20 rounded-full bg-[#14B8A6]/90 flex items-center justify-center shadow-lg shadow-[#14B8A6]/30 hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white">{tour.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-xs text-white/60">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {tour.location}
                  </div>
                </div>

                {/* Drag hint */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-white/60 flex items-center gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                    <Move className="w-3 h-3" /> Sichqoncha bilan suring
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-screen Panorama Viewer */}
      {activeTour && (
        <PanoramaViewer
          image={activeTour.image}
          onClose={() => setActiveTour(null)}
        />
      )}
    </>
  );
}
