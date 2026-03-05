import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: #0a0a0f;
    font-family: 'DM Sans', sans-serif;
    color: #e8e0f5;
    overflow-x: hidden;
  }

  .portfolio {
    background: #0a0a0f;
    min-height: 100vh;
    position: relative;
  }

  .portfolio::before {
    content: '';
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 55% 45% at 70% 10%, rgba(120,60,220,0.18) 0%, transparent 65%),
      radial-gradient(ellipse 40% 35% at 10% 80%, rgba(160,80,255,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 30% 25% at 90% 90%, rgba(80,40,180,0.1) 0%, transparent 55%);
  }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(10, 10, 15, 0.8);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(140,80,255,0.15);
  }
  .nav-inner {
    max-width: 1000px; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: center;
    height: 64px; padding: 0 3rem;
  }
  .nav-logo {
    font-family: 'Fraunces', serif;
    font-size: 1.1rem; font-weight: 700; color: #e8e0f5;
    display: flex; align-items: center; gap: 0.65rem;
  }
  .nav-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #a855f7;
    box-shadow: 0 0 12px rgba(168,85,247,0.7);
    animation: blink 2.4s ease-in-out infinite; flex-shrink: 0;
  }
  .nav-links { display: flex; gap: 0.2rem; list-style: none; }
  .nav-links a {
    font-size: 0.82rem; font-weight: 500; color: #9070c0;
    padding: 0.4rem 0.9rem; border-radius: 20px;
    text-decoration: none; transition: color 0.2s, background 0.2s;
  }
  .nav-links a:hover { color: #d8b4fe; background: rgba(140,80,255,0.12); }

  .page { max-width: 1000px; margin: 0 auto; padding: 0 3rem; position: relative; z-index: 1; }

  /* HERO */
  .hero {
    padding: 7rem 0 6rem;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: center;
    border-bottom: 1px solid rgba(140,80,255,0.12);
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: 'DM Mono', monospace; font-size: 0.7rem; color: #c084fc;
    background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.25);
    padding: 0.3rem 0.85rem; border-radius: 20px; margin-bottom: 1.5rem;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero h1 {
    font-family: 'Fraunces', serif;
    font-size: clamp(2.8rem, 5.5vw, 4.2rem);
    font-weight: 900; line-height: 1.05; letter-spacing: -0.03em; color: #f0eaff;
    margin-bottom: 1.5rem; animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero h1 .wavy { color: #a855f7; position: relative; }
  .hero h1 .wavy::after {
    content: ''; position: absolute; bottom: -4px; left: 0; right: 0; height: 3px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 8'%3E%3Cpath d='M0 4 Q25 0 50 4 Q75 8 100 4' stroke='%23a855f7' stroke-width='2.5' fill='none'/%3E%3C/svg%3E") repeat-x center;
    background-size: 60px 6px;
  }
  .hero-bio {
    font-size: 0.95rem; color: #9080b0; line-height: 1.85; margin-bottom: 2.5rem;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .hero-actions {
    display: flex; align-items: center; gap: 1.2rem; flex-wrap: wrap;
    animation: fadeUp 0.6s 0.4s ease both;
  }
  .hero-email {
    font-size: 0.88rem; font-weight: 600; color: #c084fc; text-decoration: none;
    border-bottom: 2px solid rgba(168,85,247,0.3); padding-bottom: 1px;
    transition: border-color 0.2s, color 0.2s;
  }
  .hero-email:hover { color: #d8b4fe; border-color: #a855f7; }
  .hero-social { display: flex; gap: 1rem; flex-wrap: wrap; }
  .hero-social a {
    font-size: 0.82rem; font-weight: 500; color: #7060a0; text-decoration: none;
    transition: color 0.2s;
  }
  .hero-social a:hover { color: #c084fc; }

  /* Hero card */
  .hero-right { animation: fadeUp 0.6s 0.35s ease both; }
  .hero-card {
    background: rgba(30, 15, 55, 0.7);
    border-radius: 24px; padding: 2rem;
    border: 1px solid rgba(140,80,255,0.2);
    backdrop-filter: blur(12px);
  }
  .hero-card-label {
    font-family: 'DM Mono', monospace; font-size: 0.65rem; color: #7060a0;
    letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 1rem;
  }
  .stat-row { display: flex; flex-direction: column; gap: 0.75rem; }
  .stat {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.85rem 1rem; border-radius: 12px; font-size: 0.85rem;
  }
  .stat-label { font-weight: 500; color: #d0c0f0; }
  .stat-value { font-family: 'DM Mono', monospace; font-size: 0.78rem; font-weight: 500; }
  .s1 { background: rgba(168,85,247,0.12); } .s1 .stat-value { color: #c084fc; }
  .s2 { background: rgba(99,102,241,0.12); } .s2 .stat-value { color: #818cf8; }
  .s3 { background: rgba(236,72,153,0.12); } .s3 .stat-value { color: #f472b6; }
  .s4 { background: rgba(139,92,246,0.12); } .s4 .stat-value { color: #a78bfa; }

  /* SECTIONS */
  .section {
    padding: 5.5rem 0; border-bottom: 1px solid rgba(140,80,255,0.1);
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .section.visible { opacity: 1; transform: translateY(0); }

  .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 3rem; }
  .section-pill {
    font-family: 'DM Mono', monospace; font-size: 0.65rem;
    letter-spacing: 0.1em; padding: 0.28rem 0.8rem; border-radius: 20px; font-weight: 500;
  }
  .p1 { background: rgba(168,85,247,0.15);  color: #c084fc; }
  .p2 { background: rgba(99,102,241,0.15);  color: #818cf8; }
  .p3 { background: rgba(236,72,153,0.15);  color: #f472b6; }
  .p4 { background: rgba(139,92,246,0.15);  color: #a78bfa; }
  .p5 { background: rgba(192,132,252,0.15); color: #d8b4fe; }
  .section-title {
    font-family: 'Fraunces', serif; font-size: 1.8rem; font-weight: 700;
    letter-spacing: -0.03em; color: #f0eaff;
  }
  .section-line { flex: 1; height: 1px; background: rgba(140,80,255,0.15); }

  /* SKILLS */
  .skill-groups { display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem; }
  .skill-group {
    background: rgba(25, 12, 50, 0.6);
    border: 1px solid rgba(140,80,255,0.18);
    border-radius: 20px; padding: 1.6rem; backdrop-filter: blur(8px);
    transition: border-color 0.2s;
  }
  .skill-group:hover { border-color: rgba(168,85,247,0.35); }
  .sg-top {
    display: flex; align-items: center; gap: 0.6rem;
    margin-bottom: 1.1rem; padding-bottom: 0.9rem;
    border-bottom: 1px solid rgba(140,80,255,0.1);
  }
  .sg-icon { width: 30px; height: 30px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0; }
  .sg-title { font-size: 0.82rem; font-weight: 600; color: #d0c0f0; }
  .chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .chip {
    font-size: 0.73rem; font-weight: 500; padding: 0.28rem 0.72rem; border-radius: 8px;
    background: rgba(100,60,200,0.15); border: 1px solid rgba(140,80,255,0.2);
    color: #a890d0; transition: all 0.2s; cursor: default;
  }
  .chip:hover { background: rgba(168,85,247,0.2); color: #d8b4fe; border-color: rgba(168,85,247,0.4); }

  /* PROJECTS */
  .projects { display: flex; flex-direction: column; gap: 1rem; }
  .project {
    background: rgba(20, 10, 45, 0.65);
    border: 1px solid rgba(140,80,255,0.18);
    border-radius: 20px; padding: 2.2rem;
    display: grid; grid-template-columns: 1fr auto;
    gap: 2rem; align-items: start;
    backdrop-filter: blur(8px);
    transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
    position: relative; overflow: hidden;
  }
  .project::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  }
  .proj-p::before { background: linear-gradient(90deg, #a855f7, #ec4899); }
  .proj-i::before { background: linear-gradient(90deg, #6366f1, #a855f7); }
  .project:hover {
    transform: translateY(-4px);
    border-color: rgba(168,85,247,0.35);
    box-shadow: 0 16px 50px rgba(100,40,200,0.2);
  }

  .project-title {
    font-family: 'Fraunces', serif; font-size: 1.25rem; font-weight: 700;
    letter-spacing: -0.02em; color: #f0eaff; margin-bottom: 0.3rem;
  }
  .project-period { font-family: 'DM Mono', monospace; font-size: 0.68rem; color: #7060a0; margin-bottom: 1rem; }
  .project-desc { font-size: 0.88rem; color: #8070b0; line-height: 1.8; margin-bottom: 1.3rem; }
  .project-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .tag { font-family: 'DM Mono', monospace; font-size: 0.65rem; padding: 0.2rem 0.6rem; border-radius: 6px; }
  .tpurple { background: rgba(168,85,247,0.12);  color: #c084fc; border: 1px solid rgba(168,85,247,0.2); }
  .tindigo { background: rgba(99,102,241,0.12);  color: #818cf8; border: 1px solid rgba(99,102,241,0.2); }
  .tpink   { background: rgba(236,72,153,0.12);  color: #f472b6; border: 1px solid rgba(236,72,153,0.2); }
  .tviolet { background: rgba(139,92,246,0.12);  color: #a78bfa; border: 1px solid rgba(139,92,246,0.2); }
  .trose   { background: rgba(244,114,182,0.12); color: #f9a8d4; border: 1px solid rgba(244,114,182,0.2); }

  .proj-link {
    display: inline-flex; align-items: center; gap: 0.35rem;
    font-size: 0.78rem; font-weight: 600; padding: 0.55rem 1.1rem; border-radius: 10px;
    text-decoration: none; white-space: nowrap; transition: all 0.2s;
  }
  .pl-p { background: rgba(168,85,247,0.12); color: #c084fc; border: 1px solid rgba(168,85,247,0.25); }
  .pl-p:hover { background: #a855f7; color: #f5eeff; }
  .pl-i { background: rgba(99,102,241,0.12); color: #818cf8; border: 1px solid rgba(99,102,241,0.25); }
  .pl-i:hover { background: #6366f1; color: #eef0ff; }

  /* EXPERIENCE */
  .exp-item {
    display: grid; grid-template-columns: 190px 1fr;
    gap: 2rem; padding: 2rem 0; border-bottom: 1px solid rgba(140,80,255,0.1);
  }
  .exp-item:last-child { border-bottom: none; }
  .exp-period { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: #7060a0; margin-bottom: 0.4rem; }
  .exp-company { font-size: 0.78rem; font-weight: 600; color: #f472b6; }
  .exp-role {
    font-family: 'Fraunces', serif; font-size: 1.05rem; font-weight: 700;
    color: #f0eaff; margin-bottom: 0.9rem; letter-spacing: -0.02em;
  }
  .exp-bullets { list-style: none; }
  .exp-bullets li {
    font-size: 0.88rem; color: #8070b0; line-height: 1.8;
    padding-left: 1.3rem; position: relative; margin-bottom: 0.5rem;
  }
  .exp-bullets li::before { content: '→'; position: absolute; left: 0; color: #f472b6; font-size: 0.75rem; }

  /* EDUCATION */
  .edu-block { display: grid; grid-template-columns: 190px 1fr; gap: 2rem; padding: 1rem 0 2rem; }
  .edu-left { font-family: 'DM Mono', monospace; font-size: 0.72rem; color: #7060a0; line-height: 1.9; }
  .edu-year { color: #a78bfa; font-weight: 500; }
  .edu-school {
    font-family: 'Fraunces', serif; font-size: 1.05rem; font-weight: 700;
    color: #f0eaff; margin-bottom: 0.3rem; letter-spacing: -0.02em;
  }
  .edu-degree { font-size: 0.85rem; color: #8070b0; margin-bottom: 0.7rem; }
  .edu-courses { font-size: 0.82rem; color: #7060a0; line-height: 1.85; }

  .cert {
    margin-top: 2rem;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 1.5rem;
    background: rgba(139,92,246,0.08);
    border: 1px solid rgba(139,92,246,0.2); border-radius: 14px;
    transition: transform 0.2s, border-color 0.2s;
  }
  .cert:hover { transform: translateY(-2px); border-color: rgba(139,92,246,0.35); }
  .cert-name { font-size: 0.88rem; font-weight: 600; color: #e0d0ff; }
  .cert-issuer { font-family: 'DM Mono', monospace; font-size: 0.67rem; color: #7060a0; margin-top: 0.2rem; }
  .cert-badge {
    display: flex; align-items: center; gap: 0.4rem;
    font-size: 0.72rem; font-weight: 600; color: #a78bfa;
    background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.25);
    padding: 0.3rem 0.8rem; border-radius: 20px;
  }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem; }
  .contact-item {
    background: rgba(20, 10, 45, 0.6);
    border: 1px solid rgba(140,80,255,0.18);
    border-radius: 16px; padding: 1.5rem; text-decoration: none;
    backdrop-filter: blur(8px);
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    display: flex; flex-direction: column; gap: 0.3rem;
  }
  .contact-item:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(100,40,200,0.18); }
  .cp { border-color: rgba(168,85,247,0.2); }  .cp:hover { border-color: rgba(168,85,247,0.5); }
  .ci { border-color: rgba(99,102,241,0.2); }  .ci:hover { border-color: rgba(99,102,241,0.5); }
  .ck { border-color: rgba(236,72,153,0.2); }  .ck:hover { border-color: rgba(236,72,153,0.5); }
  .cv { border-color: rgba(139,92,246,0.2); }  .cv:hover { border-color: rgba(139,92,246,0.5); }
  .contact-label {
    font-family: 'DM Mono', monospace; font-size: 0.62rem;
    letter-spacing: 0.12em; text-transform: uppercase; color: #6050a0;
  }
  .contact-value { font-size: 0.88rem; font-weight: 500; color: #c0b0e0; transition: color 0.2s; }
  .cp:hover .contact-value { color: #c084fc; }
  .ci:hover .contact-value { color: #818cf8; }
  .ck:hover .contact-value { color: #f472b6; }
  .cv:hover .contact-value { color: #a78bfa; }

  /* FOOTER */
  footer {
    padding: 2.5rem 0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-copy { font-family: 'DM Mono', monospace; font-size: 0.68rem; color: #5040a0; }
  .avail { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; font-weight: 500; color: #a78bfa; }
  .avail-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #a855f7; box-shadow: 0 0 8px rgba(168,85,247,0.6);
    animation: blink 2.4s ease-in-out infinite; flex-shrink: 0;
  }

  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0.3} }

  @media (max-width: 700px) {
    .nav-inner, .page { padding: 0 1.5rem; }
    .hero { grid-template-columns: 1fr; padding: 4rem 0 3rem; }
    .hero-right { display: none; }
    .skill-groups, .contact-grid { grid-template-columns: 1fr; }
    .exp-item, .edu-block { grid-template-columns: 1fr; gap: 0.5rem; }
    .project { grid-template-columns: 1fr; }
  }
`;

const skills = [
  { icon: "☕", bg: "rgba(168,85,247,0.15)",  title: "Languages",    items: ["Java","Python","JavaScript","TypeScript","C#","C++","Swift","Kotlin","PHP"] },
  { icon: "🌐", bg: "rgba(99,102,241,0.15)",  title: "Web & Mobile", items: ["React","Node.js","Angular","Django","ASP.NET","HTML/CSS","SwiftUI","iOS","Android","MAUI"] },
  { icon: "🗄️", bg: "rgba(236,72,153,0.15)",  title: "Databases",    items: ["PostgreSQL","MySQL","MongoDB","Firebase","Oracle","MariaDB","PL/SQL"] },
  { icon: "🛠️", bg: "rgba(139,92,246,0.15)",  title: "Tools & Infra", items: ["Git","GitHub","Docker","VS Code","IntelliJ","Xcode","DHCP/DNS"] },
];

const projects = [
  {
    cls: "proj-p", lCls: "pl-p",
    title: "TradeLab — Stock Market Simulator", period: "Oct – Dec 2025",
    desc: "iOS app simulating a real stock market experience using live data. Implemented backend logic in Swift with Finnhub WebSocket integration for real-time price updates. Designed models, service layers, and calculation functions in a clean, modular architecture.",
    tags: [
      {l:"Swift",c:"tpurple"},{l:"SwiftUI",c:"tpurple"},{l:"Firebase",c:"tpink"},
      {l:"WebSocket",c:"tindigo"},{l:"Finnhub API",c:"tindigo"},{l:"Xcode",c:"tviolet"},
    ],
    link: "https://github.com/UND34TAK3R/TradeLab"
  },
  {
    cls: "proj-i", lCls: "pl-i",
    title: "KitsuRec — AI Anime Recommender", period: "Mar – May 2025",
    desc: "Java web application that recommends anime using an AI-powered recommendation engine. Built backend models and API servlets to handle data flow and recommendation logic. Integrated OAuth 2.0 for secure access to external anime APIs.",
    tags: [
      {l:"Java",c:"tpink"},{l:"Firebase",c:"tpink"},{l:"OAuth 2.0",c:"tviolet"},
      {l:"REST API",c:"tindigo"},{l:"IntelliJ",c:"trose"},
    ],
    link: "https://github.com/UND34TAK3R/KitsuRec"
  },
];

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function Section({ id, children }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section ref={ref} className={`section${visible ? " visible" : ""}`} id={id}>
      {children}
    </section>
  );
}

export default function Portfolio() {
  return (
    <>
      <style>{style}</style>
      <div className="portfolio">

        <nav className="nav">
          <div className="nav-inner">
            <div className="nav-logo"><div className="nav-dot" />Derrick Mangari</div>
            <ul className="nav-links">
              {["Skills","Projects","Experience","Education","Contact"].map(s => (
                <li key={s}><a href={`#${s.toLowerCase()}`}>{s}</a></li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="page">

          <section className="hero">
            <div className="hero-left">
              <div className="hero-tag">📍 Montreal, QC · CS → Software Eng.</div>
              <h1>Building things<br/>that <span className="wavy">actually</span><br/>work.</h1>
              <p className="hero-bio">
                CS student at Collège LaSalle, heading to Software Engineering at Concordia.
                Full-stack developer comfortable across Swift, Java, React, and everything in between.
              </p>
              <div className="hero-actions">
                <a href="mailto:dmangari@live.fr" className="hero-email">dmangari@live.fr</a>
                <div className="hero-social">
                  <a href="https://www.linkedin.com/in/dermang/" target="_blank" rel="noreferrer">↗ LinkedIn</a>
                  <a href="https://github.com/UND34TAK3R" target="_blank" rel="noreferrer">↗ GitHub</a>
                  <a href="tel:5146613703">(514) 661-3703</a>
                </div>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-card">
                <div className="hero-card-label">Quick Stats</div>
                <div className="stat-row">
                  <div className="stat s1"><span className="stat-label">Languages</span>  <span className="stat-value">9 languages</span></div>
                  <div className="stat s2"><span className="stat-label">Frameworks</span> <span className="stat-value">10 frameworks</span></div>
                  <div className="stat s3"><span className="stat-label">Projects</span>    <span className="stat-value">2 shipped</span></div>
                  <div className="stat s4"><span className="stat-label">Status</span>      <span className="stat-value">Open to work ✦</span></div>
                </div>
              </div>
            </div>
          </section>

          <Section id="skills">
            <div className="section-header">
              <span className="section-pill p1">01</span>
              <span className="section-title">Skills</span>
              <div className="section-line" />
            </div>
            <div className="skill-groups">
              {skills.map(g => (
                <div className="skill-group" key={g.title}>
                  <div className="sg-top">
                    <div className="sg-icon" style={{ background: g.bg }}>{g.icon}</div>
                    <span className="sg-title">{g.title}</span>
                  </div>
                  <div className="chips">
                    {g.items.map(item => <span className="chip" key={item}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="projects">
            <div className="section-header">
              <span className="section-pill p2">02</span>
              <span className="section-title">Projects</span>
              <div className="section-line" />
            </div>
            <div className="projects">
              {projects.map((p, i) => (
                <div className={`project ${p.cls}`} key={i}>
                  <div>
                    <div className="project-title">{p.title}</div>
                    <div className="project-period">{p.period}</div>
                    <p className="project-desc">{p.desc}</p>
                    <div className="project-stack">
                      {p.tags.map(t => <span className={`tag ${t.c}`} key={t.l}>{t.l}</span>)}
                    </div>
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" className={`proj-link ${p.lCls}`}>GitHub ↗</a>
                </div>
              ))}
            </div>
          </Section>

          <Section id="experience">
            <div className="section-header">
              <span className="section-pill p3">03</span>
              <span className="section-title">Experience</span>
              <div className="section-line" />
            </div>
            <div className="exp-item">
              <div>
                <div className="exp-period">Jan 2023 – Jun 2023</div>
                <div className="exp-company">Pxier · Remote</div>
              </div>
              <div>
                <div className="exp-role">Tech Intern</div>
                <ul className="exp-bullets">
                  <li>Tested booking engine features in staging and documented edge cases — failed payments, invalid dates, double bookings — reducing defects by 40% before release.</li>
                  <li>Created and maintained HTML/CSS help pages explaining end-to-end booking flows, reducing repetitive user support inquiries by 30%.</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="education">
            <div className="section-header">
              <span className="section-pill p4">04</span>
              <span className="section-title">Education</span>
              <div className="section-line" />
            </div>
            <div className="edu-block">
              <div className="edu-left">
                Collège LaSalle<br/>Montreal, QC<br/>
                <span className="edu-year">Expected Jun 2026</span>
              </div>
              <div>
                <div className="edu-school">DEC in Computer Science</div>
                <div className="edu-degree">Diploma of College Studies</div>
                <div className="edu-courses">
                  OOP · Data Structures & Algorithms · Software Design · Software Documentation ·
                  Database Systems · Web Development · Operating Systems · Computer Networks
                </div>
              </div>
            </div>
            <div className="cert">
              <div>
                <div className="cert-name">Google AI Essentials</div>
                <div className="cert-issuer">Google Certification</div>
              </div>
              <div className="cert-badge">✓ Certified</div>
            </div>
          </Section>

          <Section id="contact">
            <div className="section-header">
              <span className="section-pill p5">05</span>
              <span className="section-title">Contact</span>
              <div className="section-line" />
            </div>
            <div className="contact-grid">
              <a href="mailto:dmangari@live.fr" className="contact-item cp">
                <span className="contact-label">Email</span>
                <span className="contact-value">dmangari@live.fr</span>
              </a>
              <a href="tel:5146613703" className="contact-item ck">
                <span className="contact-label">Phone</span>
                <span className="contact-value">(514) 661-3703</span>
              </a>
              <a href="https://www.linkedin.com/in/dermang/" target="_blank" rel="noreferrer" className="contact-item ci">
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">linkedin.com/in/dermang</span>
              </a>
              <a href="https://github.com/UND34TAK3R" target="_blank" rel="noreferrer" className="contact-item cv">
                <span className="contact-label">GitHub</span>
                <span className="contact-value">github.com/UND34TAK3R</span>
              </a>
            </div>
          </Section>

          <footer>
            <span className="footer-copy">© 2025 Derrick Mangari</span>
            <span className="avail"><span className="avail-dot" />Open to internships & opportunities</span>
          </footer>

        </div>
      </div>
    </>
  );
}
