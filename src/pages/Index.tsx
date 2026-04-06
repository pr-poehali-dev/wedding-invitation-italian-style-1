import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-05-26T15:30:00");

function useCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = WEDDING_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Divider = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "8px 0" }}>
    <div style={{ height: 1, width: 80, background: "linear-gradient(to right, transparent, var(--c-blue))", opacity: 0.4 }} />
    <span style={{ color: "var(--c-lemon)", fontSize: 18 }}>✦</span>
    <div style={{ height: 1, width: 80, background: "linear-gradient(to left, transparent, var(--c-blue))", opacity: 0.4 }} />
  </div>
);

export default function Index() {
  const { days, hours, minutes, seconds } = useCountdown();
  useScrollReveal();

  const [form, setForm] = useState({
    name: "",
    presence: "",
    drinks: [] as string[],
    wishes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const drinksList = [
    "Безалкогольные напитки",
    "Виски",
    "Вино белое",
    "Вино красное",
    "Пиво",
    "Шампанское",
    "Коктейли",
  ];

  const toggleDrink = (d: string) => {
    setForm((f) => ({
      ...f,
      drinks: f.drinks.includes(d) ? f.drinks.filter((x) => x !== d) : [...f.drinks, d],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        :root {
          --c-blue: #2B5FA5;
          --c-blue-dark: #1a3d6e;
          --c-blue-light: #d6e8f7;
          --c-lemon: #F5C800;
          --c-lemon-light: #FFF8D6;
          --c-white: #FEFCF5;
          --c-text: #1a2035;
          --c-text-light: #4a5068;
          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-sans: 'Montserrat', sans-serif;
          --font-script: 'Montserrat', sans-serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--c-white);
          color: var(--c-text);
          font-family: var(--font-sans);
          overflow-x: hidden;
        }

        /* REVEAL ANIMATIONS */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal:nth-child(2) { transition-delay: 0.1s; }
        .reveal:nth-child(3) { transition-delay: 0.2s; }
        .reveal:nth-child(4) { transition-delay: 0.3s; }

        /* ===== HERO ===== */
        .hero {
          min-height: 100vh;
          background-color: #FEFDE8;
          background-image: repeating-linear-gradient(
            to right,
            rgba(245,200,0,0.13) 0px,
            rgba(245,200,0,0.13) 28px,
            transparent 28px,
            transparent 56px
          );
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }

        .hero-inner {
          text-align: center;
          padding: 40px 20px 60px;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Oval card */
        .hero-oval-wrap {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-lemon-img {
          position: absolute;
          top: -110px;
          left: 50%;
          transform: translateX(-50%);
          width: 320px;
          z-index: 10;
          pointer-events: none;
          filter: drop-shadow(0 8px 24px rgba(0,0,0,0.10));
        }

        .hero-oval {
          border: 2.5px solid var(--c-blue);
          border-radius: 50%;
          width: clamp(280px, 72vw, 420px);
          height: clamp(400px, 100vw, 580px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255,253,240,0.92);
          position: relative;
          z-index: 5;
          padding: 80px 32px 40px;
          box-shadow: 0 4px 32px rgba(43,95,165,0.08), inset 0 0 0 6px rgba(43,95,165,0.06);
        }

        .hero-oval-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .hero-ciao {
          font-family: var(--font-sans);
          font-size: clamp(13px, 3vw, 16px);
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--c-text-light);
          margin-bottom: 4px;
        }

        .hero-names {
          font-family: var(--font-sans);
          font-size: clamp(28px, 7vw, 46px);
          font-weight: 600;
          line-height: 1.15;
          color: var(--c-blue);
          margin-bottom: 4px;
          text-align: center;
        }

        .hero-ampersand {
          font-family: var(--font-serif);
          font-size: clamp(22px, 5vw, 34px);
          font-style: italic;
          color: var(--c-blue);
          line-height: 1;
          margin: 2px 0;
        }

        .hero-date {
          font-family: var(--font-sans);
          font-size: clamp(18px, 4vw, 26px);
          font-weight: 700;
          color: var(--c-lemon);
          letter-spacing: 0.02em;
          margin-top: 10px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.08);
        }

        .hero-location {
          font-family: var(--font-sans);
          font-size: clamp(11px, 2vw, 13px);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--c-text-light);
          margin-top: 10px;
        }

        /* Blue border frame inside hero */
        .hero-frame {
          position: absolute;
          inset: 20px;
          border: 1.5px solid var(--c-blue);
          opacity: 0.08;
          pointer-events: none;
        }

        /* ===== SECTIONS ===== */
        .sec {
          padding: 80px 20px;
        }
        .sec-white { background: var(--c-white); }
        .sec-blue {
          background: var(--c-blue);
          color: #fff;
        }
        .sec-lemon { background: var(--c-lemon-light); }

        .sec-inner {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }
        .sec-inner-wide {
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
        }

        .sec-title {
          font-family: var(--font-sans);
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 700;
          font-style: normal;
          margin-bottom: 12px;
          letter-spacing: 0.02em;
        }
        .sec-title.dark { color: var(--c-text); }
        .sec-title.light { color: #fff; }
        .sec-title.blue { color: var(--c-blue); }

        /* Ornament strip instead of lemons */
        .lemon-strip {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0;
          margin: 20px 0;
          overflow: hidden;
        }
        .ornament-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
        }
        .ornament-line::before,
        .ornament-line::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.5), rgba(255,255,255,0.5));
          max-width: 160px;
        }
        .ornament-line.dark::before,
        .ornament-line.dark::after {
          background: linear-gradient(to right, transparent, var(--c-blue), transparent);
          opacity: 0.25;
          max-width: 160px;
        }
        .ornament-symbol {
          font-size: 13px;
          letter-spacing: 6px;
          color: rgba(255,255,255,0.6);
          font-family: Georgia, serif;
        }
        .ornament-symbol.dark {
          color: var(--c-blue);
          opacity: 0.4;
        }

        /* ===== WELCOME ===== */
        .welcome-text {
          font-family: var(--font-sans);
          font-size: clamp(16px, 2.8vw, 22px);
          font-weight: 400;
          line-height: 1.9;
          color: var(--c-text);
          text-align: center;
        }
        .welcome-text em {
          font-style: italic;
          color: var(--c-blue);
          font-weight: 600;
        }

        /* ===== COUNTDOWN ===== */
        .countdown {
          display: flex;
          gap: clamp(16px, 4vw, 48px);
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin: 32px 0;
        }
        .countdown-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .countdown-num {
          font-family: var(--font-serif);
          font-size: clamp(56px, 10vw, 96px);
          font-weight: 300;
          color: var(--c-lemon);
          line-height: 1;
          min-width: 1.4em;
          text-align: center;
        }
        .countdown-sep {
          font-family: var(--font-serif);
          font-size: 64px;
          color: rgba(255,255,255,0.3);
          line-height: 1;
          margin-top: -8px;
        }
        .countdown-label {
          font-family: var(--font-sans);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }

        /* ===== PLACES ===== */
        .places-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }
        .place-card {
          background: var(--c-white);
          border: 1.5px solid var(--c-blue-light);
          border-radius: 4px;
          padding: 36px 28px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .place-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(to right, var(--c-blue), var(--c-lemon));
        }
        .place-icon { font-size: 32px; margin-bottom: 12px; }
        .place-title {
          font-family: var(--font-sans);
          font-size: 12px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--c-blue);
          margin-bottom: 12px;
          font-weight: 600;
        }
        .place-name {
          font-family: var(--font-sans);
          font-size: clamp(17px, 2.5vw, 21px);
          font-weight: 600;
          color: var(--c-text);
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .place-address {
          font-family: var(--font-sans);
          font-size: 15px;
          color: var(--c-text-light);
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .map-btn {
          display: inline-block;
          padding: 12px 28px;
          background: var(--c-blue);
          color: #fff;
          font-family: var(--font-sans);
          font-size: 14px;
          letter-spacing: 0.1em;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.2s, transform 0.2s;
        }
        .map-btn:hover {
          background: var(--c-blue-dark);
          transform: translateY(-2px);
        }

        /* ===== TIMELINE ===== */
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 560px;
          margin: 40px auto 0;
          text-align: left;
        }
        .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          position: relative;
        }
        .timeline-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 48px;
        }
        .timeline-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--c-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }
        .timeline-line-v {
          width: 2px;
          flex: 1;
          min-height: 32px;
          background: linear-gradient(to bottom, var(--c-blue), var(--c-lemon));
          opacity: 0.3;
          margin: 0 auto;
        }
        .timeline-content {
          padding: 10px 0 32px;
        }
        .timeline-time {
          font-family: var(--font-sans);
          font-size: clamp(22px, 3vw, 28px);
          font-weight: 700;
          color: var(--c-blue);
          display: block;
          line-height: 1;
          margin-bottom: 6px;
        }
        .timeline-desc {
          font-family: var(--font-sans);
          font-size: clamp(14px, 2vw, 17px);
          color: var(--c-text);
          line-height: 1.6;
        }
        .timeline-item:last-child .timeline-line-v { display: none; }

        /* ===== DRESSCODE ===== */
        .dresscode-intro {
          font-family: var(--font-sans);
          font-size: clamp(15px, 2.5vw, 19px);
          line-height: 1.8;
          color: var(--c-text);
          margin-bottom: 16px;
        }
        .dresscode-sub {
          font-family: var(--font-sans);
          font-size: clamp(14px, 2vw, 18px);
          font-style: italic;
          color: var(--c-blue);
          margin-bottom: 36px;
          line-height: 1.7;
        }
        .dresscode-images {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 16px;
        }
        .dresscode-img-wrap {
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(43,95,165,0.12);
          border: 2px solid var(--c-blue-light);
        }
        .dresscode-img {
          width: 100%;
          display: block;
          object-fit: contain;
          background: #f8f9fa;
        }

        /* ===== WISHES ===== */
        .wishes-list {
          list-style: none;
          max-width: 680px;
          margin: 32px auto 0;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .wishes-list li {
          display: flex;
          gap: 16px;
          font-family: var(--font-sans);
          font-size: clamp(15px, 2.2vw, 17px);
          color: rgba(255,255,255,0.92);
          line-height: 1.8;
          align-items: flex-start;
        }
        .wishes-list li em {
          font-style: italic;
          color: var(--c-lemon);
        }
        .wish-marker {
          color: var(--c-lemon);
          font-size: 16px;
          margin-top: 4px;
          flex-shrink: 0;
        }

        /* ===== FORM ===== */
        .sec-form-bg {
          background-image: url('https://cdn.poehali.dev/projects/00026160-0537-4715-a8aa-39785d3a60b5/bucket/9ebe60c8-fd33-4766-a04e-abf3935cd077.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .sec-form-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,253,235,0.82);
        }
        .sec-form-bg .sec-inner {
          position: relative;
          z-index: 1;
        }
        .form-intro {
          font-family: var(--font-sans);
          font-size: clamp(16px, 2.5vw, 20px);
          line-height: 1.8;
          color: var(--c-text);
          margin-bottom: 40px;
          text-align: center;
        }
        .form-intro em {
          font-style: italic;
          color: var(--c-blue);
        }
        .guest-form {
          max-width: 560px;
          margin: 0 auto;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .form-group label:first-child {
          font-family: var(--font-sans);
          font-size: 13px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--c-blue);
          font-weight: 600;
        }
        .form-group input[type="text"],
        .form-group textarea {
          padding: 14px 16px;
          border: 1.5px solid var(--c-blue-light);
          border-radius: 3px;
          font-family: var(--font-sans);
          font-size: 16px;
          color: var(--c-text);
          background: var(--c-white);
          outline: none;
          transition: border-color 0.2s;
          resize: vertical;
          width: 100%;
        }
        .form-group input[type="text"]:focus,
        .form-group textarea:focus {
          border-color: var(--c-blue);
        }
        .radio-group {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .radio-option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: 1.5px solid var(--c-blue-light);
          border-radius: 2px;
          font-family: var(--font-sans);
          font-size: 15px;
          color: var(--c-text);
          cursor: pointer;
          transition: all 0.2s;
        }
        .radio-option input { display: none; }
        .radio-option.selected {
          border-color: var(--c-blue);
          background: var(--c-blue);
          color: #fff;
        }
        .drinks-grid {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .drink-option {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border: 1.5px solid var(--c-blue-light);
          border-radius: 2px;
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--c-text);
          cursor: pointer;
          transition: all 0.2s;
        }
        .drink-option input { display: none; }
        .drink-option.selected {
          border-color: var(--c-lemon);
          background: var(--c-lemon);
          color: var(--c-text);
        }
        .submit-btn {
          padding: 18px 48px;
          background: var(--c-blue);
          color: #fff;
          font-family: var(--font-sans);
          font-size: 15px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          align-self: center;
          margin-top: 8px;
        }
        .submit-btn:hover {
          background: var(--c-blue-dark);
          transform: translateY(-2px);
        }
        .form-success {
          text-align: center;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .form-success span { font-size: 48px; }
        .form-success p {
          font-family: var(--font-serif);
          font-size: 22px;
          font-style: italic;
          color: var(--c-blue);
          line-height: 1.6;
        }

        /* ===== CONTACTS ===== */
        .contacts {
          display: flex;
          gap: 32px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 36px;
        }
        .contact-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          padding: 28px 40px;
          background: var(--c-white);
          border: 1.5px solid var(--c-blue-light);
          border-radius: 4px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .contact-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(43,95,165,0.12);
        }
        .contact-icon { font-size: 28px; }
        .contact-name {
          font-family: var(--font-sans);
          font-size: 20px;
          font-weight: 600;
          color: var(--c-text);
        }
        .contact-phone {
          font-family: var(--font-sans);
          font-size: 18px;
          color: var(--c-blue);
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        /* ===== FOOTER ===== */
        .footer {
          background: var(--c-blue-dark);
          padding: 60px 20px 48px;
          text-align: center;
        }
        .footer-script {
          font-family: var(--font-sans);
          font-size: clamp(22px, 5vw, 38px);
          font-weight: 600;
          color: var(--c-lemon);
          line-height: 1.4;
          margin: 24px 0 16px;
        }
        .footer-names {
          font-family: var(--font-sans);
          font-size: 13px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-top: 8px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 600px) {
          .hero-lemon-img { width: 220px; top: -75px; }
          .hero-oval { padding: 60px 20px 32px; }
          .places-grid { grid-template-columns: 1fr; }
          .dresscode-images { grid-template-columns: 1fr; }
          .contacts { flex-direction: column; align-items: center; }
        }
      `}</style>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-frame" />

        <div className="hero-inner reveal">
          <div className="hero-oval-wrap">
            {/* Watercolor lemon illustration — выступает над овалом */}
            <img
              className="hero-lemon-img"
              src="https://cdn.poehali.dev/projects/00026160-0537-4715-a8aa-39785d3a60b5/bucket/bf35e26a-3a93-440c-99ea-020d05f40b77.jpeg"
              alt="акварельные лимоны"
            />
            <div className="hero-oval">
              <div className="hero-oval-inner">
                <p className="hero-ciao">приглашаем вас на нашу свадьбу</p>
                <Divider />
                <h1 className="hero-names">Эдуард</h1>
                <span className="hero-ampersand">&amp;</span>
                <h1 className="hero-names">Полина</h1>
                <Divider />
                <p className="hero-date">26 мая 2026 года</p>
                <p className="hero-location">Иркутск · La Dolce Vita</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WELCOME ===== */}
      <section className="sec sec-white">
        <div className="sec-inner">
          <p className="welcome-text reveal">
            Дорогие гости!<br /><br />
            Мы счастливы пригласить вас на важное событие —<br />
            <em>день нашей свадьбы!</em><br /><br />
            Будем безумно рады, если вы присоединитесь к нам<br />
            в этот особенный день!
          </p>
        </div>
      </section>

      {/* ===== COUNTDOWN ===== */}
      <section className="sec sec-blue">
        <div className="lemon-strip reveal">
          <div className="ornament-line">
            <span className="ornament-symbol">✦ ✦ ✦ ✦ ✦</span>
          </div>
        </div>
        <div className="sec-inner">
          <h2 className="sec-title light reveal">До торжества осталось</h2>
          <div className="countdown reveal">
            {[
              { v: days, l: "дней" },
              { v: hours, l: "часов" },
              { v: minutes, l: "минут" },
              { v: seconds, l: "секунд" },
            ].map(({ v, l }) => (
              <div className="countdown-unit" key={l}>
                <span className="countdown-num">{String(v).padStart(2, "0")}</span>
                <span className="countdown-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lemon-strip reveal">
          <div className="ornament-line">
            <span className="ornament-symbol">✦ ✦ ✦ ✦ ✦</span>
          </div>
        </div>
      </section>

      {/* ===== МЕСТО ===== */}
      <section className="sec sec-white">
        <div className="sec-inner-wide">
          <h2 className="sec-title blue reveal">Место</h2>
          <Divider />
          <div className="places-grid reveal">
            <div className="place-card">
              <div className="place-icon">💍</div>
              <p className="place-title">Регистрация</p>
              <p className="place-name">Центральный отдел ЗАГС<br />по г. Иркутску</p>
              <p className="place-address">ул. Декабрьских событий, 106</p>
            </div>
            <div className="place-card">
              <div className="place-icon">🥂</div>
              <p className="place-title">Торжество</p>
              <p className="place-name">рп. Большая Речка</p>
              <p className="place-address">
                Южный переулок, 7<br />
                Иркутский район, Иркутская область
              </p>
              <a
                href="https://2gis.ru/irkutsk/search/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F%20%D0%A0%D0%B5%D1%87%D0%BA%D0%B0%2C%20%D0%AE%D0%B6%D0%BD%D1%8B%D0%B9%20%D0%BF%D0%B5%D1%80%D0%B5%D1%83%D0%BB%D0%BE%D0%BA%2C%207"
                target="_blank"
                rel="noopener noreferrer"
                className="map-btn"
              >
                Открыть на карте 2ГИС →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ТАЙМИНГ ===== */}
      <section className="sec sec-lemon">
        <div className="sec-inner">
          <h2 className="sec-title blue reveal">Тайминг дня</h2>
          <Divider />
          <div className="timeline reveal">
            {[
              { time: "15:30", desc: "Регистрация в Центральном отделе ЗАГСа", icon: "💍" },
              { time: "16:30–17:00", desc: "Выезжаем на место проведения торжества", icon: "🚗" },
              { time: "17:30", desc: "Начало банкета", icon: "🥂" },
              { time: "22:00", desc: "Танцы до позднего вечера!", icon: "🎶" },
            ].map((item) => (
              <div className="timeline-item" key={item.time}>
                <div className="timeline-left">
                  <div className="timeline-icon-wrap">{item.icon}</div>
                  <div className="timeline-line-v" />
                </div>
                <div className="timeline-content">
                  <span className="timeline-time">{item.time}</span>
                  <span className="timeline-desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ДРЕСС-КОД ===== */}
      <section className="sec sec-white">
        <div className="sec-inner-wide">
          <h2 className="sec-title blue reveal">Дресс-код</h2>
          <Divider />
          <p className="dresscode-intro reveal">
            Мы будем рады видеть вас в любом наряде, но нам будет ещё приятнее,<br />
            если вы поддержите общую цветовую гамму нашего торжества!
          </p>
          <p className="dresscode-sub reveal">
            Наша свадьба пройдёт в итальянском стиле,<br />
            прикрепляем вам несколько референсов
          </p>
          <div className="dresscode-images reveal">
            <div className="dresscode-img-wrap">
              <img
                src="https://cdn.poehali.dev/files/0c4be82a-0d8c-4fae-b1f7-d278baf02f43.jpg"
                alt="Референс дресс-кода 1"
                className="dresscode-img"
              />
            </div>
            <div className="dresscode-img-wrap">
              <img
                src="https://cdn.poehali.dev/files/e5193218-0566-4ba7-b197-1f7eccb099e1.jpg"
                alt="Референс дресс-кода 2"
                className="dresscode-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== ПОЖЕЛАНИЯ ===== */}
      <section className="sec sec-blue">
        <div className="lemon-strip reveal">
          <div className="ornament-line">
            <span className="ornament-symbol">✦ ✦ ✦ ✦ ✦</span>
          </div>
        </div>
        <div className="sec-inner">
          <h2 className="sec-title light reveal">Несколько пожеланий</h2>
          <Divider />
          <ul className="wishes-list reveal">
            <li>
              <span className="wish-marker">✦</span>
              <span>Так как мы хотим видеть только самых-самых близких людей, мы будем ждать вас <em>без дополнительного гостя</em> — именно поэтому рассылаем приглашения лично.</span>
            </li>
            <li>
              <span className="wish-marker">✦</span>
              <span>Чтобы сделать этот день ещё ярче и запоминающимся, просим взять с собой <em>разменянные наличные от 50 до 1000 ₽</em> для участия в конкурсах.</span>
            </li>
            <li>
              <span className="wish-marker">✦</span>
              <span>Свадьба планируется камерная: среди нас не будет ведущего и диджея. Если у вас появится <em>необычная идея развлечения</em> — обязательно напишите нам!</span>
            </li>
            <li>
              <span className="wish-marker">✦</span>
              <span>Подтвердите приход — <em>дайте нам знать до 1 мая 2026 года.</em></span>
            </li>
          </ul>
        </div>
        <div className="lemon-strip reveal" style={{ marginTop: 32 }}>
          <div className="ornament-line">
            <span className="ornament-symbol">✦ ✦ ✦ ✦ ✦</span>
          </div>
        </div>
      </section>

      {/* ===== АНКЕТА ===== */}
      <section className="sec sec-white sec-form-bg">
        <div className="sec-inner">
          <h2 className="sec-title blue reveal">Анкета гостя</h2>
          <Divider />
          <p className="form-intro reveal">
            Ответьте, пожалуйста, на несколько вопросов.<br />
            <em>Для нас это очень важно, спасибо!</em>
          </p>

          {submitted ? (
            <div className="form-success">
              <span>🍋</span>
              <p>Grazie mille!</p>
              <p>Ваши ответы получены.<br />Ждём вас 26 мая!</p>
            </div>
          ) : (
            <form className="guest-form reveal" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Имя и фамилия</label>
                <input
                  type="text"
                  placeholder="Ваше имя и фамилия"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Присутствие</label>
                <div className="radio-group">
                  {["Буду с радостью!", "Не смогу прийти"].map((opt) => (
                    <label key={opt} className={`radio-option ${form.presence === opt ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="presence"
                        value={opt}
                        checked={form.presence === opt}
                        onChange={() => setForm({ ...form, presence: opt })}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Предпочтения по напиткам</label>
                <div className="drinks-grid">
                  {drinksList.map((d) => (
                    <label key={d} className={`drink-option ${form.drinks.includes(d) ? "selected" : ""}`}>
                      <input type="checkbox" checked={form.drinks.includes(d)} onChange={() => toggleDrink(d)} />
                      {d}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Пожелания молодожёнам</label>
                <textarea
                  placeholder="Ваши тёплые слова..."
                  value={form.wishes}
                  onChange={(e) => setForm({ ...form, wishes: e.target.value })}
                  rows={4}
                />
              </div>

              <button type="submit" className="submit-btn">
                Отправить ответ
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ===== КОНТАКТЫ ===== */}
      <section className="sec sec-lemon">
        <div className="sec-inner">
          <h2 className="sec-title blue reveal">Контакты</h2>
          <Divider />
          <div className="contacts reveal">
            <a href="tel:+79041381591" className="contact-item">
              <span className="contact-icon">📞</span>
              <span className="contact-name">Эдуард</span>
              <span className="contact-phone">+7 (904) 138-15-91</span>
            </a>
            <a href="tel:+79041141320" className="contact-item">
              <span className="contact-icon">📞</span>
              <span className="contact-name">Полина</span>
              <span className="contact-phone">+7 (904) 114-13-20</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="lemon-strip">
          <div className="ornament-line">
            <span className="ornament-symbol">✦ ✦ ✦ ✦ ✦ ✦</span>
          </div>
        </div>
        <p className="footer-script">До скорых встреч!<br />La Dolce Vita!</p>
        <p className="footer-names">Эдуард &amp; Полина · 26.05.2026</p>
      </footer>
    </>
  );
}