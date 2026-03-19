import React, { useState, useEffect, useRef } from 'react';
import {
  Download, Smartphone, Globe, Compass, Calculator,
  Calendar, Bell, CheckCircle, ExternalLink, Github,
  Award, Languages, Star, Menu, X, ChevronRight, Moon, BookOpen
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TRANSLATIONS
───────────────────────────────────────────── */
const T = {
  en: {
    nav: { features: "Features", gallery: "Gallery", download: "Download", getApp: "Get the App" },
    hero: {
      badge: "Open Source · Free Forever",
      title: "Al Risala",
      titleAr: "الرسالة",
      sub: "Your comprehensive Islamic Divine Compass. High-precision prayer times, precision Qibla, and essential Sharia calculators in one beautiful, native experience.",
      cta1: "Free Download",
      cta2: "View on GitHub",
      stat1v: "4.9 / 5", stat1l: "Rating",
      stat2v: "10K+",   stat2l: "Downloads",
      stat3v: "100%",   stat3l: "Free"
    },
    features: {
      tag: "Core Features",
      title: "Precision Meets Spirituality",
      sub: "Every detail in Al Risala is crafted for high performance and religious accuracy.",
      items: [
        { title: "Prayer Times",        desc: "Accurate worldwide prayer times with customizable Adhan notifications for all 5 daily prayers." },
        { title: "Qibla Compass",       desc: "Precision direction finding using native device sensors for perfect Mecca alignment." },
        { title: "Islamic Calculators", desc: "Advanced Zakat and Inheritance (Mawarith) calculators according to Sharia law." },
        { title: "Hijri Calendar",      desc: "Integrated dual-calendar system with manual Hijri day adjustment support." },
        { title: "Muslim Adhkar",       desc: "Complete collection of daily Islamic supplications — morning, evening, sleep, and occasion-based Adhkar." }
      ]
    },
    gallery: { tag: "App Gallery", title: "Beautifully Designed", sub: "A soulfully crafted interface for your spiritual journey." },
    download: {
      tag: "Download",
      title: "Start Your Spiritual Journey",
      sub: "Accurate prayer notifications, precision Qibla, and advanced Islamic tools — all free.",
      openSource: "Free and open-source for the Ummah",
      android: "Android (APK)",
      web: "Web App (PWA)"
    },
    footer: {
      sub: "The Divine Compass",
      links: ["Terms", "Privacy", "Contact", "Support"],
      rights: "All rights reserved."
    }
  },
  ar: {
    nav: { features: "المميزات", gallery: "المعرض", download: "التحميل", getApp: "احصل على التطبيق" },
    hero: {
      badge: "مفتوح المصدر · مجاني للأبد",
      title: "الرسالة",
      titleAr: "Al Risala",
      sub: "بوصلتك الإسلامية الشاملة. مواقيت صلاة بدقة عالية، قبلة دقيقة، وحاسبات شرعية أساسية في تجربة واحدة جميلة.",
      cta1: "تحميل مجاني",
      cta2: "عرض على GitHub",
      stat1v: "4.9 / 5", stat1l: "التقييم",
      stat2v: "+10K",    stat2l: "التحميلات",
      stat3v: "100%",    stat3l: "مجاني"
    },
    features: {
      tag: "المميزات الأساسية",
      title: "الدقة تلتقي بالروحانية",
      sub: "تم تصميم كل تفصيل في الرسالة لتقديم أداء عالٍ ودقة دينية.",
      items: [
        { title: "مواقيت الصلاة",   desc: "مواقيت صلاة دقيقة حول العالم مع تنبيهات أذان قابلة للتخصيص للصلوات الخمس." },
        { title: "بوصلة القبلة",    desc: "تحديد دقيق للاتجاه باستخدام مستشعرات الجهاز الأصلية لمحاذاة مثالية نحو مكة المكرمة." },
        { title: "حاسبات إسلامية", desc: "حاسبات متقدمة للزكاة والمواريث وفقاً للشريعة الإسلامية." },
        { title: "التقويم الهجري",  desc: "نظام تقويم مزدوج متكامل مع دعم تعديل اليوم الهجري يدوياً." },
        { title: "أذكار المسلم",    desc: "مجموعة كاملة من الأذكار اليومية — أذكار الصباح والمساء والنوم والمناسبات." }
      ]
    },
    gallery: { tag: "معرض التطبيق", title: "تصميم جميل بروحانية", sub: "واجهة مصممة بعناية لرحلتك الروحية." },
    download: {
      tag: "التحميل",
      title: "ابدأ رحلتك الروحية",
      sub: "تنبيهات دقيقة للصلوات، قبلة دقيقة، وأدوات إسلامية متقدمة — كل ذلك مجاناً.",
      openSource: "مجاني ومفتوح المصدر للأمة",
      android: "أندرويد (APK)",
      web: "تطبيق الويب (PWA)"
    },
    footer: {
      sub: "البوصلة الإلهية",
      links: ["الشروط", "الخصوصية", "اتصل بنا", "الدعم"],
      rights: "جميع الحقوق محفوظة."
    }
  }
};

/* ─────────────────────────────────────────────
   SCREENSHOT DATA
───────────────────────────────────────────── */
const SHOTS = [
  { url: '/screenshots/screen1.png',  label: 'Splash' },
  { url: '/screenshots/screen2.png',  label: 'Home' },
  { url: '/screenshots/screen7.png',  label: 'Prayers' },
  { url: '/screenshots/screen11.png', label: 'Qibla' },
  { url: '/screenshots/screen3.png',  label: 'Zakat' },
  { url: '/screenshots/screen16.png', label: 'Mirath' },
  { url: '/screenshots/screen12.png', label: 'Azkar' },
  { url: '/screenshots/screen15.png', label: 'Profile' },
];

const FEATURE_ICONS = [Bell, Compass, Calculator, Calendar, BookOpen];

/* ─────────────────────────────────────────────
   GEOMETRIC PATTERN SVG
───────────────────────────────────────────── */
const IslamicPattern = ({ opacity = 0.06, color = '#C9A84C' }) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
    <defs>
      <pattern id="ip" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <g fill="none" stroke={color} strokeWidth="0.8" opacity={opacity * 14}>
          <polygon points="40,2 78,21 78,59 40,78 2,59 2,21" />
          <polygon points="40,14 66,27 66,53 40,66 14,53 14,27" />
          <line x1="40" y1="2" x2="40" y2="78" />
          <line x1="2" y1="21" x2="78" y2="59" />
          <line x1="78" y1="21" x2="2" y2="59" />
          <circle cx="40" cy="40" r="10" />
          <circle cx="40" cy="40" r="4" fill={color} fillOpacity="0.3" stroke="none" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ip)" />
  </svg>
);

/* ─────────────────────────────────────────────
   APP LOGO
───────────────────────────────────────────── */
const Logo = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8C55A" />
        <stop offset="50%" stopColor="#C9A84C" />
        <stop offset="100%" stopColor="#7A5C10" />
      </linearGradient>
      <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0D1B2A" />
        <stop offset="100%" stopColor="#0a1520" />
      </linearGradient>
      <filter id="sh" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#00000055" />
      </filter>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <clipPath id="roundClip">
        <rect width="200" height="200" rx="46" />
      </clipPath>
    </defs>

    {/* App icon background */}
    <rect width="200" height="200" rx="46" fill="url(#lg1)" filter="url(#sh)" />

    {/* Dark inner panel */}
    <rect width="200" height="200" rx="46" fill="url(#lg2)" clipPath="url(#roundClip)" />

    {/* Subtle radial glow center */}
    <circle cx="90" cy="105" r="90" fill="rgba(201,168,76,0.07)" clipPath="url(#roundClip)" />

    {/* ── CRESCENT: left-facing, centered vertically, shifted left ── */}
    <g clipPath="url(#roundClip)" filter="url(#glow)">
      {/* Main crescent circle */}
      <circle cx="84" cy="100" r="52" fill="#C9A84C" />
      {/* Cutout circle to form crescent shape */}
      <circle cx="102" cy="92" r="43" fill="#0D1B2A" />
      {/* Inner crescent highlight */}
      <circle cx="84" cy="100" r="52" fill="none" stroke="rgba(255,235,150,0.15)" strokeWidth="1.5" />
    </g>

    {/* ── STAR: to the right of the crescent opening ── */}
    {/* 5-pointed star at (148, 88), size ~20px */}
    <g filter="url(#glow)">
      <polygon
        points="148,72 152,84 165,84 155,92 159,104 148,96 137,104 141,92 131,84 144,84"
        fill="#F5D78E"
        opacity="0.97"
      />
      {/* Star inner shine */}
      <polygon
        points="148,76 151,85 160,85 153,90 156,99 148,94 140,99 143,90 136,85 145,85"
        fill="rgba(255,255,200,0.25)"
      />
    </g>

    {/* Border ring */}
    <rect width="200" height="200" rx="46" fill="none" stroke="rgba(255,215,100,0.12)" strokeWidth="2" clipPath="url(#roundClip)" />
  </svg>
);

/* ─────────────────────────────────────────────
   PHONE MOCKUP
───────────────────────────────────────────── */
const PhoneMockup = ({ src, index }) => (
  <div
    style={{
      minWidth: 220,
      height: 460,
      borderRadius: 36,
      background: '#111',
      border: '6px solid #1a1a1a',
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)',
      transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)`,
      transition: 'transform 0.4s ease',
      cursor: 'pointer',
      flexShrink: 0,
      position: 'relative',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.03)'}
    onMouseLeave={e => e.currentTarget.style.transform = `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)`}
  >
    <div style={{
      position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
      width: 80, height: 22, background: '#111', borderRadius: '0 0 16px 16px', zIndex: 10
    }} />
    <img
      src={src}
      alt=""
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      onError={e => {
        e.target.style.display = 'none';
        e.target.parentNode.style.background = 'linear-gradient(135deg, #0D1B2A, #1a3a2a)';
      }}
    />
  </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function AlRisalaLanding() {
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];
  const isAr = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lang]);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: isAr ? "'Noto Sans Arabic','Cairo',sans-serif" : "'Cormorant Garamond','Playfair Display',Georgia,serif", background: '#F7F4EE', color: '#0D1B2A', overflowX: 'hidden' }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Noto+Sans+Arabic:wght@300;400;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .sans { font-family: 'DM Sans', sans-serif; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .arabic { font-family: 'Noto Sans Arabic', 'Cairo', sans-serif; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F7F4EE; }
        ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 3px; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes floatUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseGold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
          50%       { box-shadow: 0 0 0 16px rgba(201,168,76,0); }
        }
        @keyframes rotateSlowly {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .anim-1 { animation: fadeInUp 0.8s ease forwards; }
        .anim-2 { animation: fadeInUp 0.8s 0.15s ease forwards; opacity: 0; }
        .anim-3 { animation: fadeInUp 0.8s 0.3s ease forwards;  opacity: 0; }
        .anim-4 { animation: fadeInUp 0.8s 0.45s ease forwards; opacity: 0; }
        .anim-5 { animation: fadeInUp 0.8s 0.6s ease forwards;  opacity: 0; }

        .gold-shimmer {
          background: linear-gradient(90deg, #C9A84C 0%, #F5D78E 40%, #C9A84C 60%, #8B6914 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .btn-gold {
          background: linear-gradient(135deg, #C9A84C, #8B6914);
          color: #fff;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
        }
        .btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(201,168,76,0.45);
        }

        .btn-ghost {
          background: transparent;
          color: #0D1B2A;
          border: 1.5px solid rgba(13,27,42,0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
        }
        .btn-ghost:hover {
          border-color: #C9A84C;
          color: #8B6914;
          background: rgba(201,168,76,0.06);
        }

        .card-feature {
          background: #fff;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 24px;
          padding: 36px 28px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .card-feature::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 4px; height: 100%;
          background: linear-gradient(180deg, #C9A84C, #8B6914);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .card-feature:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(201,168,76,0.12);
          border-color: rgba(201,168,76,0.4);
        }
        .card-feature:hover::before { opacity: 1; }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #4A5568;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s;
          letter-spacing: 0.02em;
        }
        .nav-link:hover { color: #8B6914; }

        section { scroll-margin-top: 90px; }

        @media (max-width: 768px) {
          .hero-title { font-size: 52px !important; }
          .hero-sub { font-size: 16px !important; }
          .stats-grid { gap: 20px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .download-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px',
        height: 72,
        display: 'flex', alignItems: 'center',
        background: scrolled ? 'rgba(247,244,238,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
            <Logo size={40} />
            <div>
              <div className={isAr ? 'arabic' : 'serif'} style={{ fontSize: 18, fontWeight: 700, color: '#0D1B2A', lineHeight: 1 }}>
                {isAr ? 'الرسالة' : 'Al Risala'}
              </div>
              <div className="sans" style={{ fontSize: 10, color: '#8B6914', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
                {t.footer.sub}
              </div>
            </div>
          </div>

          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desktop-nav">
            {['features', 'gallery', 'download'].map(id => (
              <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{t.nav[id]}</span>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
              className="btn-ghost sans"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 40, fontSize: 13 }}
            >
              <Languages size={15} />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>
            <button
              onClick={() => scrollTo('download')}
              className="btn-gold"
              style={{ padding: '10px 22px', borderRadius: 40, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Download size={14} />
              {t.nav.getApp}
            </button>
            <button
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(m => !m)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 72, left: 0, right: 0, zIndex: 99,
          background: '#F7F4EE', borderBottom: '1px solid rgba(201,168,76,0.2)',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16
        }}>
          {['features', 'gallery', 'download'].map(id => (
            <span key={id} className="nav-link" style={{ fontSize: 16 }} onClick={() => scrollTo(id)}>{t.nav[id]}</span>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>

        {/* Background geometric */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)' }} />
        <IslamicPattern />

        {/* Floating orb */}
        <div style={{ position: 'absolute', top: '15%', right: '8%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', animation: 'rotateSlowly 30s linear infinite' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,27,42,0.04) 0%, transparent 70%)' }} />

        <div style={{ maxWidth: 760, position: 'relative', zIndex: 1 }}>

          {/* Badge */}
          <div className="anim-1 sans" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 40, padding: '6px 16px', marginBottom: 32,
            fontSize: 12, fontWeight: 600, color: '#8B6914', letterSpacing: '0.06em', textTransform: 'uppercase'
          }}>
            <CheckCircle size={13} />
            {t.hero.badge}
          </div>

          {/* Logo */}
          <div className="anim-2" style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{ animation: 'pulseGold 3s ease-in-out infinite', borderRadius: '50%' }}>
              <Logo size={100} />
            </div>
          </div>

          {/* Title */}
          <h1 className={`anim-3 ${isAr ? 'arabic' : 'serif'} hero-title`} style={{ fontSize: 80, fontWeight: 700, lineHeight: 1, marginBottom: 12, color: '#0D1B2A' }}>
            <span className="gold-shimmer">{t.hero.title}</span>
          </h1>
          <p className={`anim-3 ${isAr ? 'arabic' : 'serif'}`} style={{ fontSize: 24, color: '#8B6914', marginBottom: 24, fontStyle: isAr ? 'normal' : 'italic', fontWeight: 400 }}>
            {t.hero.titleAr}
          </p>

          {/* Subtitle */}
          <p className={`anim-4 sans hero-sub`} style={{ fontSize: 18, lineHeight: 1.7, color: '#4A5568', marginBottom: 44, maxWidth: 600, margin: '0 auto 44px' }}>
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div className="anim-5" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
            <button
              onClick={() => scrollTo('download')}
              className="btn-gold"
              style={{ padding: '16px 36px', borderRadius: 50, fontSize: 16, display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <Download size={18} />
              {t.hero.cta1}
            </button>
            <button
              onClick={() => window.open('https://github.com', '_blank')}
              className="btn-ghost"
              style={{ padding: '16px 36px', borderRadius: 50, fontSize: 16, display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <Github size={18} />
              {t.hero.cta2}
            </button>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: 36 }}>
            {[
              { v: t.hero.stat1v, l: t.hero.stat1l },
              { v: t.hero.stat2v, l: t.hero.stat2l },
              { v: t.hero.stat3v, l: t.hero.stat3l },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className={`${isAr ? 'arabic' : 'serif'}`} style={{ fontSize: 32, fontWeight: 700, color: '#0D1B2A', lineHeight: 1 }}>{s.v}</div>
                <div className="sans" style={{ fontSize: 11, color: '#8B6914', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6, fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', animation: 'floatUp 1.5s ease infinite alternate' }}>
          <div style={{ width: 1, height: 50, background: 'linear-gradient(180deg, transparent, #C9A84C)', margin: '0 auto' }} />
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" style={{ padding: '100px 0', background: '#0D1B2A', position: 'relative', overflow: 'hidden' }}>
        <IslamicPattern opacity={0.04} color="#C9A84C" />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 56 }}>
          <div className="sans" style={{ color: '#C9A84C', fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>
            {t.gallery.tag}
          </div>
          <h2 className={`${isAr ? 'arabic' : 'serif'}`} style={{ fontSize: 48, fontWeight: 700, color: '#F7F4EE', lineHeight: 1.15, marginBottom: 14 }}>
            {t.gallery.title}
          </h2>
          <p className="sans" style={{ fontSize: 17, color: 'rgba(247,244,238,0.5)', maxWidth: 500 }}>{t.gallery.sub}</p>
        </div>

        {/* Horizontal scroll */}
        <div
          className="scrollbar-hide"
          style={{ display: 'flex', gap: 24, overflowX: 'auto', padding: '16px 48px 40px', cursor: 'grab' }}
        >
          {SHOTS.map((shot, i) => (
            <PhoneMockup key={i} src={shot.url} index={i} />
          ))}
          {/* End card */}
          <div style={{
            minWidth: 220, height: 460, borderRadius: 36,
            background: 'linear-gradient(135deg, #1a3a2a, #0D1B2A)',
            border: '1px solid rgba(201,168,76,0.3)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, gap: 16, padding: 32, textAlign: 'center',
            boxShadow: '0 32px 80px rgba(0,0,0,0.4)'
          }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(201,168,76,0.3)' }}>
              <Star size={22} style={{ color: '#C9A84C' }} />
            </div>
            <p className={`${isAr ? 'arabic' : 'serif'}`} style={{ fontSize: 18, color: '#F7F4EE', lineHeight: 1.5, fontWeight: 500 }}>
              {isAr ? 'والعديد من الميزات القوية الأخرى...' : 'And many more powerful native features...'}
            </p>
            <button
              onClick={() => scrollTo('download')}
              className="btn-gold sans"
              style={{ padding: '10px 24px', borderRadius: 40, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}
            >
              {t.hero.cta1} <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '100px 24px', background: '#F7F4EE', position: 'relative' }}>
        <IslamicPattern opacity={0.04} />

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="sans" style={{ color: '#C9A84C', fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>
              {t.features.tag}
            </div>
            <h2 className={`${isAr ? 'arabic' : 'serif'}`} style={{ fontSize: 48, fontWeight: 700, color: '#0D1B2A', marginBottom: 14, lineHeight: 1.15 }}>
              {t.features.title}
            </h2>
            <p className="sans" style={{ fontSize: 17, color: '#4A5568', maxWidth: 520, margin: '0 auto' }}>{t.features.sub}</p>
          </div>

          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {t.features.items.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              const gradients = [
                'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.01))',
                'linear-gradient(135deg, rgba(201,168,76,0.10), rgba(201,168,76,0.01))',
                'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(59,130,246,0.01))',
                'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(99,102,241,0.01))',
                'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(236,72,153,0.01))',
              ];
              const iconColors = ['#10B981', '#C9A84C', '#3B82F6', '#6366F1', '#EC4899'];
              const isLast = i === 4;
              return (
                <div
                  key={i}
                  className="card-feature"
                  style={{
                    background: `${gradients[i]}, #fff`,
                    gridColumn: isLast ? '1 / -1' : undefined,
                    maxWidth: isLast ? 520 : undefined,
                    margin: isLast ? '0 auto' : undefined,
                    width: isLast ? '100%' : undefined,
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: `${iconColors[i]}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 24, border: `1px solid ${iconColors[i]}25`
                  }}>
                    <Icon size={24} color={iconColors[i]} />
                  </div>
                  <h3 className={`${isAr ? 'arabic' : 'serif'}`} style={{ fontSize: 24, fontWeight: 700, color: '#0D1B2A', marginBottom: 12 }}>
                    {f.title}
                  </h3>
                  <p className="sans" style={{ fontSize: 15, color: '#4A5568', lineHeight: 1.7 }}>{f.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 20 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: iconColors[i] }} />
                    <span className="sans" style={{ fontSize: 12, color: iconColors[i], fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {isAr ? 'متضمن' : 'Included'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD ── */}
      <section id="download" style={{ padding: '100px 24px', background: '#0D1B2A', position: 'relative', overflow: 'hidden' }}>
        <IslamicPattern opacity={0.05} color="#C9A84C" />

        {/* Decorative glow */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="sans" style={{ color: '#C9A84C', fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>
            {t.download.tag}
          </div>

          <h2 className={`${isAr ? 'arabic' : 'serif'}`} style={{ fontSize: 52, fontWeight: 700, color: '#F7F4EE', marginBottom: 20, lineHeight: 1.15 }}>
            {t.download.title}
          </h2>
          <p className="sans" style={{ fontSize: 18, color: 'rgba(247,244,238,0.55)', marginBottom: 52, maxWidth: 500, margin: '0 auto 52px' }}>
            {t.download.sub}
          </p>

          <div className="download-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 40, maxWidth: 620, margin: '0 auto 40px' }}>
            {[
              {
                label: t.download.android,
                sub: isAr ? 'تحميل مباشر · مجاني' : 'Direct install · Free',
                icon: Smartphone,
                badge: 'APK',
              },
              {
                label: t.download.web,
                sub: isAr ? 'بدون تثبيت · فوري' : 'No install · Instant',
                icon: Globe,
                badge: 'PWA',
              },
            ].map(({ label, sub, icon: Icon, badge }, i) => (
              <button
                key={i}
                className="sans"
                style={{
                  display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 18,
                  padding: '24px 28px', borderRadius: 24, textAlign: isAr ? 'right' : 'left',
                  background: 'linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  color: '#0D1B2A',
                  cursor: 'pointer',
                  transition: 'all 0.35s ease',
                  boxShadow: '0 8px 40px rgba(201,168,76,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(201,168,76,0.55), inset 0 1px 0 rgba(255,255,255,0.28)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,168,76,0.35), inset 0 1px 0 rgba(255,255,255,0.2)';
                }}
              >
                {/* Icon circle */}
                <div style={{
                  width: 56, height: 56, borderRadius: 18, flexShrink: 0,
                  background: 'rgba(13,27,42,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1.5px solid rgba(13,27,42,0.18)',
                  backdropFilter: 'blur(4px)',
                }}>
                  <Icon size={26} color="#0D1B2A" />
                </div>
                {/* Text */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>
                    {isAr ? 'تحميل على' : 'Download for'}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, opacity: 0.65, fontWeight: 400 }}>{sub}</div>
                </div>
                {/* Badge */}
                <div style={{
                  position: 'absolute', top: 12, right: isAr ? 'auto' : 12, left: isAr ? 12 : 'auto',
                  background: 'rgba(13,27,42,0.18)',
                  borderRadius: 6, padding: '2px 8px',
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
                  color: '#0D1B2A',
                  border: '1px solid rgba(13,27,42,0.14)',
                }}>
                  {badge}
                </div>
                {/* Shine overlay */}
                <div style={{
                  position: 'absolute', top: 0, left: '-60%', width: '40%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                  transform: 'skewX(-20deg)', pointerEvents: 'none',
                }} />
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <CheckCircle size={15} color="#C9A84C" />
            <span className="sans" style={{ fontSize: 13, color: 'rgba(247,244,238,0.45)', fontWeight: 500 }}>{t.download.openSource}</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#080F16', padding: '60px 24px 40px', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32, marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Logo size={44} />
              <div>
                <div className={`${isAr ? 'arabic' : 'serif'}`} style={{ fontSize: 20, fontWeight: 700, color: '#F7F4EE' }}>
                  {isAr ? 'الرسالة' : 'Al Risala'}
                </div>
                <div className="sans" style={{ fontSize: 11, color: '#8B6914', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
                  {t.footer.sub}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {t.footer.links.map((l, i) => (
                <a key={i} href="#" className="sans" style={{ fontSize: 13, color: 'rgba(247,244,238,0.4)', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#C9A84C'}
                  onMouseLeave={e => e.target.style.color = 'rgba(247,244,238,0.4)'}
                >{l}</a>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <Github size={17} color="#C9A84C" />
              </button>
              <button style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; e.currentTarget.style.borderColor = '#C9A84C'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <ExternalLink size={17} color="#C9A84C" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p className="sans" style={{ fontSize: 12, color: 'rgba(247,244,238,0.25)', fontWeight: 400 }}>
              © {new Date().getFullYear()} {isAr ? 'تطبيق الرسالة' : 'Al Risala App'} — {t.footer.rights}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
              <span className="sans" style={{ fontSize: 12, color: 'rgba(247,244,238,0.25)' }}>
                {isAr ? 'مفتوح المصدر' : 'Open Source'}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .download-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-title { font-size: 48px !important; }
        }
      `}</style>
    </div>
  );
}
