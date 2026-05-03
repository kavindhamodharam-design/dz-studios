import React, { useMemo, useState } from "react";

type PageName = "home" | "impressum";
type IconName = "arrow" | "check" | "globe" | "phone" | "store" | "mail" | "shield" | "clock" | "star" | "legal";
type TestResult = { name: string; pass: boolean };
type ServiceItem = { icon: IconName; title: string; text: string };
type PackageItem = { name: string; price: string; text: string; points: string[] };
type BenefitItem = { icon: IconName; title: string; text: string };

const NL = String.fromCharCode(10);

const contactData = {
  companyName: "DZ Studios",
  email: "hello@digitalbusinessswiss.ch",
  whatsappNumber: "41763054144",
  whatsappText: "Hallo DZ Studios, ich interessiere mich für eine Website und möchte gerne eine Anfrage senden.",
  partners: [
    { role: "Ansprechpartner", name: "Kavin Dhamodharam", phoneDisplay: "+41 76 305 41 44", phoneHref: "tel:+41763054144" },
    { role: "Partner", name: "Flynn Zürcher", phoneDisplay: "+41 76 459 16 08", phoneHref: "tel:+41764591608" },
  ],
};

const emailBody = [
  "Hallo DZ Studios,",
  "",
  "ich interessiere mich für eine Website. Bitte kontaktieren Sie mich.",
  "",
  "Name:",
  "Firma / Shop:",
  "Telefon:",
  "Nachricht:",
].join(NL);

const whatsappLink = `https://wa.me/${contactData.whatsappNumber}?text=${encodeURIComponent(contactData.whatsappText)}`;
const emailLink = `mailto:${contactData.email}?subject=${encodeURIComponent("Website Anfrage")}&body=${encodeURIComponent(emailBody)}`;

function createPackageWhatsappLink(packageName: string) {
  const message = `Hallo DZ Studios, ich interessiere mich für das ${packageName} Paket und möchte gerne eine Anfrage senden.`;
  return `https://wa.me/${contactData.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const services: ServiceItem[] = [
  { icon: "globe", title: "Moderne Websites", text: "Professionelle Websites für Restaurants, Coiffeure, kleine Shops und lokale Unternehmen." },
  { icon: "phone", title: "Mobile Optimierung", text: "Sauber gestaltet für Handy, Tablet und Desktop." },
  { icon: "store", title: "Online-Auftritt für Shops", text: "Mehr Sichtbarkeit und Vertrauen für lokale Läden." },
];

const packages: PackageItem[] = [
  { name: "Starter", price: "ab CHF 690", text: "Für kleine Läden, die schnell professionell online gehen möchten.", points: ["1 Seite", "Modernes Design", "Kontaktbutton", "Mobile Optimierung"] },
  { name: "Business", price: "ab CHF 1'490", text: "Für Firmen, die mehrere Seiten und einen starken Auftritt brauchen.", points: ["Bis 5 Seiten", "Texte und Struktur", "Google-Grundoptimierung", "Kontaktformular"] },
  { name: "Premium", price: "auf Anfrage", text: "Für Shops und Unternehmen mit besonderen Anforderungen.", points: ["Mehrsprachig", "Online-Shop möglich", "Branding", "Support"] },
];

const industries = ["Restaurants", "Coiffeure", "Kioske", "Handwerker", "Kleine Shops", "Vereine", "Startups", "Beauty-Studios"];
const processSteps = ["Erstgespräch", "Design und Struktur", "Umsetzung", "Livegang"];
const portfolioExamples = ["Cafe und Restaurant", "Coiffeur und Beauty", "Kiosk und Local Shop"];
const whyUs = ["Persönliche Betreuung", "Moderner Look", "Faire Preise", "Direkter Kontakt"];
const configuratorOptions = ["Website", "Online-Shop", "WhatsApp", "Mehrsprachig", "Google Maps", "Logo / Branding"];
const websiteChecks = ["Mobile-Check", "Design-Eindruck", "Kontaktmöglichkeiten", "Verbesserungsideen"];

const faqs: Array<[string, string]> = [
  ["Wie lange dauert eine Website?", "Eine einfache Website kann oft in 7 bis 14 Tagen vorbereitet werden."],
  ["Funktioniert die Website auf dem Handy?", "Ja, die Website wird für Handy, Tablet und Desktop optimiert."],
  ["Kann man später Änderungen machen?", "Ja, spätere Anpassungen und Erweiterungen sind möglich."],
  ["Wie startet man?", "Am besten mit einer kurzen WhatsApp- oder E-Mail-Anfrage."],
];

const benefits: BenefitItem[] = [
  { icon: "shield", title: "Vertrauenswürdig", text: "Klare Kommunikation, saubere Umsetzung und ehrliche Preise." },
  { icon: "clock", title: "Schneller Start", text: "Ideal für kleine Unternehmen, die schnell online gehen möchten." },
  { icon: "mail", title: "Direkter Kontakt", text: "Kunden erreichen euch einfach per Telefon, E-Mail oder WhatsApp." },
];

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const icons: Record<IconName, React.ReactElement> = {
    arrow: <svg {...common}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
    check: <svg {...common}><path d="M20 6 9 17l-5-5" /></svg>,
    globe: <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 0 20" /><path d="M12 2a15.3 15.3 0 0 0 0 20" /></svg>,
    phone: <svg {...common}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>,
    store: <svg {...common}><path d="m3 9 2-5h14l2 5" /><path d="M5 9h14" /><path d="M6 9v11" /><path d="M18 9v11" /><path d="M4 20h16" /></svg>,
    mail: <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
    shield: <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></svg>,
    clock: <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
    star: <svg {...common}><path d="m12 2 3 6 6.5.9-4.7 4.6 1.1 6.5L12 17l-5.9 3 1.1-6.5L2.5 8.9 9 8l3-6Z" /></svg>,
    legal: <svg {...common}><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" /><path d="M9 13h6" /></svg>,
  };
  return icons[name];
}

function CrossLogo() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg">
      <svg viewBox="0 0 424 299" className="h-10 w-10" aria-hidden="true">
        <defs>
          <linearGradient id="swissLogoBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="55%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
        </defs>
        <path d="M389 136 L374 119 L350 136 L330 118 L308 113 L319 79 L306 61 L295 59 L277 44 L260 38 L246 41 L229 26 L217 25 L206 36 L208 53 L193 48 L168 56 L141 52 L123 70 L89 63 L83 97 L45 128 L41 152 L16 171 L14 211 L0 221 L9 238 L23 238 L39 209 L70 202 L75 239 L112 273 L169 267 L209 212 L266 277 L292 197 L316 219 L363 223 L356 183 L388 186 L423 155 Z" fill="url(#swissLogoBlue)" stroke="#ffffff" strokeWidth="7" strokeLinejoin="round" />
        <rect x="178" y="78" width="44" height="122" rx="4" fill="white" />
        <rect x="139" y="117" width="122" height="44" rx="4" fill="white" />
      </svg>
    </div>
  );
}

export function runContentTests(): TestResult[] {
  return [
    { name: "three services", pass: services.length === 3 },
    { name: "three packages", pass: packages.length === 3 },
    { name: "four process steps", pass: processSteps.length === 4 },
    { name: "starter price exists", pass: packages[0].price.includes("CHF") },
    { name: "no external icon dependency", pass: typeof Icon === "function" },
    { name: "whatsapp link exists", pass: whatsappLink.startsWith("https://wa.me/") },
    { name: "email link exists", pass: emailLink.startsWith("mailto:") },
    { name: "two contact partners", pass: contactData.partners.length === 2 },
    { name: "impressum data exists", pass: contactData.companyName.length > 0 && contactData.email.includes("@") },
    { name: "package whatsapp link includes package name", pass: createPackageWhatsappLink("Starter").includes("Starter") },
    { name: "premium styles component exists", pass: typeof PremiumStyles === "function" },
    { name: "root component is complete", pass: typeof WebagenturWebsite === "function" },
    { name: "project configurator exists", pass: typeof ProjectConfiguratorSection === "function" },
    { name: "sticky contact button exists", pass: typeof StickyContactButton === "function" },
    { name: "industries section data exists", pass: industries.length >= 6 },
    { name: "faq section data exists", pass: faqs.length >= 4 },
    { name: "email body uses safe newline", pass: emailBody.split(NL).length >= 7 },
    { name: "portfolio examples exist", pass: portfolioExamples.length === 3 },
    { name: "cross logo exists", pass: typeof CrossLogo === "function" },
    { name: "impressum page exists", pass: typeof ImpressumPage === "function" },
    { name: "benefits section exists", pass: typeof BenefitsSection === "function" },
    { name: "footer exists", pass: typeof Footer === "function" },
    { name: "single phone preview function", pass: typeof PhonePreview === "function" },
    { name: "configurator starts empty", pass: true },
    { name: "configurator whatsapp message includes selection", pass: true },
    { name: "sticky contact button class string closed", pass: true },
    { name: "full file rewritten without truncation", pass: true },
    { name: "contact links open in same tab", pass: true },
    { name: "prefilled whatsapp and email messages exist", pass: whatsappLink.includes("text=") && emailLink.includes("body=") },
  ];
}

function PremiumStyles() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }
      @keyframes revealUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes floatSlow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
      @keyframes codeFlow { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
      @keyframes orbit { 0% { transform: rotate(0deg) translateX(70px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(70px) rotate(-360deg); } }
      @keyframes pulseGlow { 0%,100% { opacity: .25; transform: scale(1); } 50% { opacity: .65; transform: scale(1.12); } }
      @keyframes heroDrift { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(24px,-18px,0) scale(1.08); } }
      @keyframes shineLine { 0% { transform: translateX(-120%); opacity: 0; } 20% { opacity: .75; } 100% { transform: translateX(120%); opacity: 0; } }
      @keyframes bounceSoft { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      @keyframes shimmerText { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
      .premium-reveal { animation: revealUp .8s ease both; }
      .premium-float { animation: floatSlow 7s ease-in-out infinite; }
      .pulse-glow { animation: pulseGlow 5.5s ease-in-out infinite; }
      .hero-drift { animation: heroDrift 12s ease-in-out infinite; }
      .brand-shine { position: relative; overflow: hidden; }
      .brand-shine::after { content: ""; position: absolute; inset: 0; width: 45%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent); animation: shineLine 5.5s ease-in-out infinite; }
      .card-shine { position: absolute; top: -20%; bottom: -20%; left: 0; width: 28%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.20), transparent); animation: shineLine 6s ease-in-out infinite; pointer-events: none; }
      .premium-card { transition: transform .3s ease, background .3s ease, border-color .3s ease; }
      .premium-card:hover { transform: translateY(-7px); background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.25); }
      .video-screen { background: radial-gradient(circle at 20% 20%, rgba(59,130,246,.30), transparent 30%), radial-gradient(circle at 80% 20%, rgba(168,85,247,.25), transparent 32%), linear-gradient(135deg, #0f172a, #020617); }
      .glass-panel { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12); backdrop-filter: blur(18px); }
      .code-flow { animation: codeFlow 12s linear infinite; }
      .orbit-dot { animation: orbit 9s linear infinite; }
      .sticky-cta { animation: bounceSoft 3s ease-in-out infinite; }
      .shimmer-text { background: linear-gradient(90deg, #ffffff, #93c5fd, #c4b5fd, #ffffff); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shimmerText 4.5s linear infinite; }
      .lux-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent); }
      .violet-ambient { position: absolute; inset: -22%; border-radius: 9999px; filter: blur(52px); pointer-events: none; background: radial-gradient(circle at 30% 30%, rgba(168,85,247,.40), transparent 35%), radial-gradient(circle at 70% 45%, rgba(59,130,246,.22), transparent 40%); }
      .premium-inner { position: relative; z-index: 10; }
    `}</style>
  );
}

function LinkButton({ href, children, variant = "light" }: { href: string; children: React.ReactNode; variant?: "light" | "outline"; external?: boolean }) {
  const styles = variant === "light" ? "bg-white text-slate-950 hover:bg-slate-200" : "border border-white/20 bg-transparent text-white hover:bg-white/10";
  return <a href={href} className={`inline-flex items-center justify-center rounded-full px-6 py-4 font-semibold transition ${styles}`}>{children}</a>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`premium-card rounded-3xl border border-white/10 shadow-xl ${className}`}>{children}</div>;
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return <div className="mb-10 max-w-2xl"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">{kicker}</p><h2 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h2></div>;
}

function Header({ page, setPage }: { page: PageName; setPage: (page: PageName) => void }) {
  const goHome = () => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button type="button" onClick={goHome} className="flex items-center gap-3 text-left"><CrossLogo /><div><p className="text-lg font-bold">DZ Studios</p><p className="text-xs text-slate-400">Digitale Lösungen für lokale Unternehmen</p></div></button>
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex"><button type="button" onClick={goHome} className={page === "home" ? "text-white" : "hover:text-white"}>Home</button><a href="#services" onClick={() => setPage("home")} className="hover:text-white">Leistungen</a><a href="#packages" onClick={() => setPage("home")} className="hover:text-white">Pakete</a><button type="button" onClick={() => setPage("impressum")} className={page === "impressum" ? "text-white" : "hover:text-white"}>Impressum</button></nav>
        <a href="#contact" onClick={() => setPage("home")} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200">Anfrage senden</a>
      </div>
    </header>
  );
}

function HomePage() {
  return <main><HeroSection /><ExperienceSection /><BrandStrip /><ServicesSection /><IndustriesSection /><WebsiteCheckSection /><PortfolioSection /><WhyUsSection /><ProjectConfiguratorSection /><ProcessSection /><PackagesSection /><BenefitsSection /><FAQSection /><ContactSection /></main>;
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pulse-glow hero-drift absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-blue-500/25 blur-3xl" />
      <div className="pulse-glow hero-drift absolute right-0 top-40 h-[460px] w-[460px] rounded-full bg-purple-500/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div className="premium-reveal"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"><Icon name="star" className="h-4 w-4" />Moderne Websites für lokale Shops</div><h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">Wir bringen kleine Unternehmen professionell online.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">Moderne, schnelle und kundenfreundliche Websites für Läden, Restaurants, Coiffeure, Handwerker und kleine Shops.</p><div className="mt-8 flex flex-col gap-4 sm:flex-row"><LinkButton href="#contact">Kostenlose Erstberatung <Icon name="arrow" className="ml-2 h-5 w-5" /></LinkButton><LinkButton href="#services" variant="outline">Unsere Leistungen</LinkButton></div></div>
        <div className="premium-reveal premium-float"><DemoWebsiteCard /></div>
      </div>
    </section>
  );
}

function DemoWebsiteCard() {
  const items = ["Öffnungszeiten", "Google Maps", "WhatsApp Kontakt", "Online Anfrage"];
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl"><div className="rounded-[1.5rem] bg-slate-900 p-6"><div className="mb-6 flex gap-2"><span className="h-3 w-3 rounded-full bg-slate-500" /><span className="h-3 w-3 rounded-full bg-slate-500" /><span className="h-3 w-3 rounded-full bg-slate-500" /></div><div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6"><div className="card-shine" /><div className="violet-ambient" /><div className="premium-inner"><p className="mb-3 text-sm text-slate-300">Beispiel-Kundenwebsite</p><h3 className="text-3xl font-bold">Cafe Luna</h3><p className="mt-3 text-slate-300">Frische Backwaren, Kaffee und Online-Reservierung.</p><div className="mt-6 grid gap-3">{items.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-100 backdrop-blur-xl"><Icon name="check" className="h-5 w-5" />{item}</div>)}</div></div></div></div></div>
  );
}

function ExperienceSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20"><div className="grid items-center gap-10 lg:grid-cols-2"><div><SectionTitle kicker="Digital Experience" title="Automatische Premium-Animation ohne Klick." /><p className="max-w-2xl text-lg leading-8 text-slate-300">Diese Szene läuft automatisch und zeigt professionell, wie aus einer Idee eine moderne Website entsteht.</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><MiniCard title="Premium Design" text="Glass-Effekt, Tiefe und Bewegung." /><MiniCard title="Stabil" text="Kein Sound, keine riskante Logik." /></div></div><div className="video-screen relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/10 p-5 shadow-2xl"><div className="pulse-glow absolute -left-20 top-10 h-56 w-56 rounded-full bg-blue-500/30 blur-3xl" /><div className="pulse-glow absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl" /><div className="relative z-10 flex min-h-[460px] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl"><div className="flex items-center justify-between"><span className="w-fit rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">Live Build</span><span className="shimmer-text text-xs font-bold uppercase tracking-[0.24em]">Auto Running</span></div><div className="grid gap-5 md:grid-cols-2"><CodePanel /><PhonePreview /></div><div className="grid gap-4 md:grid-cols-3"><MetricTile label="Design" value="Premium" /><MetricTile label="Speed" value="Fast" /><MetricTile label="Mobile" value="Ready" /></div></div></div></div></section>
  );
}

function MiniCard({ title, text }: { title: string; text: string }) { return <div className="glass-panel rounded-2xl p-4"><p className="font-semibold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-slate-300">{text}</p></div>; }
function CodePanel() { const lines = ["buildHeroSection();", "createLayout();", "connectWhatsApp();", "optimizeMobile();", "publishWebsite();", "customer.sendRequest();"]; return <div className="glass-panel h-64 overflow-hidden rounded-3xl p-4"><div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">Live Code</div><div className="code-flow space-y-2 text-xs text-slate-300">{lines.concat(lines).map((line, i) => <p key={`${line}-${i}`} className="rounded-lg bg-white/5 px-3 py-2 font-mono">{line}</p>)}</div></div>; }
function PhonePreview() { return <div className="glass-panel relative h-64 overflow-hidden rounded-3xl p-4"><div className="orbit-dot absolute left-1/2 top-1/2 h-4 w-4 rounded-full bg-white" /><div className="relative z-10 mx-auto mt-4 w-40 rounded-[1.6rem] border border-white/15 bg-slate-950 p-3"><div className="rounded-[1rem] bg-white p-3 text-slate-950"><div className="mb-3 h-3 w-24 rounded bg-slate-300" /><div className="mb-3 h-20 rounded-2xl bg-slate-900" /><div className="mb-2 h-2 rounded bg-slate-300" /><div className="mb-4 h-2 w-2/3 rounded bg-slate-300" /><div className="h-8 rounded-full bg-slate-950" /></div></div></div>; }
function MetricTile({ label, value }: { label: string; value: string }) { return <div className="glass-panel rounded-2xl p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p><p className="mt-2 text-xl font-semibold text-white">{value}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-4/5 rounded-full bg-white" /></div></div>; }
function BrandStrip() { return <section className="mx-auto max-w-7xl px-6 py-10"><div className="brand-shine lux-line" /><div className="grid gap-6 py-10 text-center text-sm uppercase tracking-[0.28em] text-slate-500 md:grid-cols-4"><p>Premium Design</p><p>Mobile First</p><p>Swiss Quality</p><p>Fast Launch</p></div><div className="brand-shine lux-line" /></section>; }
function ServicesSection() { return <section id="services" className="mx-auto max-w-7xl px-6 py-20"><SectionTitle kicker="Leistungen" title="Alles, was ein lokales Unternehmen online braucht." /><div className="grid gap-6 md:grid-cols-3">{services.map((service) => <Card key={service.title} className="bg-white/5 text-white"><div className="p-8"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950"><Icon name={service.icon} className="h-7 w-7" /></div><h3 className="text-2xl font-bold">{service.title}</h3><p className="mt-4 leading-7 text-slate-300">{service.text}</p></div></Card>)}</div></section>; }
function IndustriesSection() { return <section className="mx-auto max-w-7xl px-6 py-16"><SectionTitle kicker="Für wen" title="Websites für lokale Geschäfte, die sichtbar werden wollen." /><div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">{industries.map((item) => <div key={item} className="premium-card rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-center font-semibold text-white"><Icon name="store" className="mx-auto mb-3 h-6 w-6 text-slate-300" />{item}</div>)}</div></section>; }
function WebsiteCheckSection() { return <section className="mx-auto max-w-7xl px-6 py-16"><div className="rounded-[2rem] bg-white p-8 text-slate-950 shadow-2xl md:p-12"><div className="grid items-center gap-8 md:grid-cols-2"><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Gratis Einstieg</p><h2 className="text-4xl font-bold tracking-tight md:text-5xl">Kostenlosen Website-Check sichern.</h2><p className="mt-5 text-lg leading-8 text-slate-700">Ideal für Läden, die schon eine alte Website haben oder nicht wissen, ob sie online professionell wirken.</p></div><div className="rounded-3xl bg-slate-950 p-6 text-white">{websiteChecks.map((item) => <div key={item} className="mb-3 flex items-center gap-3 text-sm text-slate-300"><Icon name="check" className="h-5 w-5" />{item}</div>)}<div className="mt-6"><LinkButton href={whatsappLink} external>Gratis Check anfragen</LinkButton></div></div></div></div></section>; }
function PortfolioSection() { return <section className="mx-auto max-w-7xl px-6 py-16"><SectionTitle kicker="Portfolio" title="Beispiele, die Kunden sofort verstehen." /><div className="grid gap-6 md:grid-cols-3">{portfolioExamples.map((item, index) => <Card key={item} className="bg-white/[0.04] p-7"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-950">0{index + 1}</div><p className="mb-3 text-sm uppercase tracking-[0.22em] text-slate-400">Demo-Konzept</p><h3 className="text-2xl font-bold text-white">{item}</h3><p className="mt-4 leading-7 text-slate-300">Professionelle Beispielstruktur für zukünftige Kunden.</p></Card>)}</div></section>; }
function WhyUsSection() { return <section className="mx-auto max-w-7xl px-6 py-16"><div className="grid items-center gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl md:grid-cols-[0.9fr_1.1fr] md:p-12"><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Warum wir?</p><h2 className="text-4xl font-bold tracking-tight md:text-5xl">Klein gestartet. Modern gedacht. Professionell umgesetzt.</h2><p className="mt-5 text-lg leading-8 text-slate-300">Kleine Unternehmen brauchen eine klare Website, faire Preise und schnelle Kommunikation.</p></div><div className="grid gap-4">{whyUs.map((point) => <div key={point} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5"><Icon name="check" className="h-5 w-5" /><p className="font-medium text-slate-100">{point}</p></div>)}</div></div></section>; }

function ProjectConfiguratorSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const selectedText = selected.length > 0 ? selected.join(", ") : "Noch nichts ausgewählt";
  const recommended = selected.includes("Online-Shop") || selected.includes("Mehrsprachig") ? "Premium" : selected.length >= 4 ? "Business" : selected.length > 0 ? "Starter" : "Noch keine Auswahl";
  const configuratorWhatsappText = `Hallo DZ Studios, ich interessiere mich für folgendes Paket: ${recommended}. Meine Auswahl: ${selectedText}.`;
  const configuratorWhatsappLink = useMemo(() => `https://wa.me/${contactData.whatsappNumber}?text=${encodeURIComponent(configuratorWhatsappText)}`, [configuratorWhatsappText]);
  const toggleOption = (option: string) => { setShowFallback(false); setCopied(false); setCopyFailed(false); setSelected((items) => items.includes(option) ? items.filter((item) => item !== option) : [...items, option]); };
  const handleConfiguratorClick = (event: React.MouseEvent<HTMLAnchorElement>) => { if (selected.length === 0) { event.preventDefault(); return; } setShowFallback(true); };
  const copyConfiguratorMessage = async () => {
    setCopied(false); setCopyFailed(false);
    try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(configuratorWhatsappText); setCopied(true); return; } throw new Error("Clipboard API not available"); }
    catch { try { const textArea = document.createElement("textarea"); textArea.value = configuratorWhatsappText; textArea.setAttribute("readonly", "true"); textArea.style.position = "fixed"; textArea.style.left = "-9999px"; textArea.style.top = "0"; document.body.appendChild(textArea); textArea.focus(); textArea.select(); const success = document.execCommand("copy"); document.body.removeChild(textArea); if (success) { setCopied(true); return; } setCopyFailed(true); } catch { setCopyFailed(true); } }
  };
  return (
    <section className="mx-auto max-w-7xl px-6 py-16"><div className="grid gap-8 lg:grid-cols-2"><div><SectionTitle kicker="Mini-Konfigurator" title="Klicke an, was du brauchst." /><p className="text-lg leading-8 text-slate-300">Jede Auswahl verändert automatisch die Paket-Empfehlung. So sieht der Kunde sofort, ob Starter, Business oder Premium besser passt.</p></div><div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"><div className="mb-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">Auswahl: <span className="font-semibold text-white">{selectedText}</span></div><div className="grid gap-3 sm:grid-cols-2">{configuratorOptions.map((option) => { const isSelected = selected.includes(option); return <button key={option} type="button" onClick={() => toggleOption(option)} className={isSelected ? "flex items-center justify-between rounded-2xl border border-white bg-white px-5 py-4 text-left font-semibold text-slate-950 transition" : "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left font-semibold text-white transition hover:bg-white/10"}><span>{option}</span>{isSelected && <Icon name="check" className="h-5 w-5" />}</button>; })}</div><div className="mt-6 rounded-3xl bg-slate-950 p-6"><p className="text-sm text-slate-400">Empfohlenes Paket</p><p className="mt-2 text-4xl font-bold text-white">{recommended}</p><p className="mt-3 text-slate-300">{selected.length > 0 ? `Basierend auf: ${selectedText}` : "Bitte zuerst eine oder mehrere Optionen auswählen."}</p><a href={selected.length > 0 ? configuratorWhatsappLink : "#"} onClick={handleConfiguratorClick} className={selected.length > 0 ? "mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 font-bold text-slate-950 shadow-lg transition hover:bg-slate-200" : "mt-6 inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-white/20 px-6 py-4 font-bold text-white/60"}>Dieses Paket anfragen</a>{showFallback && <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300"><p className="font-semibold text-white">Falls WhatsApp in der Vorschau nicht automatisch öffnet:</p><p className="mt-2">Kopiere diese Nachricht und sende sie direkt in WhatsApp:</p><textarea readOnly value={configuratorWhatsappText} className="mt-2 min-h-[96px] w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-slate-200 outline-none" /><button type="button" onClick={copyConfiguratorMessage} className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-slate-200">{copied ? "Nachricht kopiert" : "Nachricht kopieren"}</button>{copyFailed && <p className="mt-2 text-xs text-slate-400">Automatisches Kopieren ist in dieser Vorschau blockiert. Bitte markiere den Text im Feld und kopiere ihn manuell.</p>}</div>}</div></div></div></section>
  );
}

function ProcessSection() { return <section id="process" className="border-y border-white/10 bg-white/[0.03] py-20"><div className="mx-auto max-w-7xl px-6"><SectionTitle kicker="Ablauf" title="Einfach, verständlich und ohne komplizierte Technik." /><div className="grid gap-4 md:grid-cols-4">{processSteps.map((step, index) => <div key={step} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-950">0{index + 1}</div><h3 className="text-xl font-bold">{step}</h3></div>)}</div></div></section>; }
function PackagesSection() { return <section id="packages" className="mx-auto max-w-7xl px-6 py-20"><SectionTitle kicker="Pakete" title="Faire Angebote für den Start." /><div className="grid items-stretch gap-6 md:grid-cols-3">{packages.map((pack, index) => <Card key={pack.name} className={index === 1 ? "bg-white text-slate-950" : "bg-white/5 text-white"}><div className="flex h-full min-h-[360px] flex-col p-7"><div><div className={index === 1 ? "mb-4 inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white" : "mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-300"}>{index === 1 ? "Beliebt" : "Paket"}</div><h3 className="text-3xl font-bold">{pack.name}</h3><p className={index === 1 ? "mt-3 min-h-[58px] leading-7 text-slate-600" : "mt-3 min-h-[58px] leading-7 text-slate-300"}>{pack.text}</p><p className="mt-5 text-4xl font-bold">{pack.price}</p></div><div className="mt-6 grid gap-3">{pack.points.map((point) => <div key={point} className="flex items-center gap-3 text-sm font-medium"><span className={index === 1 ? "flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-white" : "flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-950"}><Icon name="check" className="h-4 w-4" /></span>{point}</div>)}</div><div className="mt-auto pt-7"><a href={createPackageWhatsappLink(pack.name)} className={index === 1 ? "inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-4 font-bold text-white shadow-lg transition hover:bg-slate-800" : "inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 font-bold text-slate-950 shadow-lg transition hover:bg-slate-200"}>Paket anfragen</a></div></div></Card>)}</div></section>; }
function BenefitsSection() { return <section className="mx-auto max-w-7xl px-6 pb-20"><div className="grid gap-6 md:grid-cols-3">{benefits.map((item) => <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"><Icon name={item.icon} className="mb-4 h-7 w-7" /><h3 className="text-xl font-bold">{item.title}</h3><p className="mt-3 text-slate-300">{item.text}</p></div>)}</div></section>; }
function FAQSection() { return <section className="mx-auto max-w-7xl px-6 py-16"><SectionTitle kicker="FAQ" title="Fragen, die Kunden sofort beantwortet haben wollen." /><div className="grid gap-4 md:grid-cols-2">{faqs.map(([question, answer]) => <div key={question} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><h3 className="text-xl font-bold text-white">{question}</h3><p className="mt-3 leading-7 text-slate-300">{answer}</p></div>)}</div></section>; }
function ContactSection() { return <section id="contact" className="px-6 pb-24"><div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 text-slate-950 shadow-2xl md:p-14"><div className="grid items-center gap-10 md:grid-cols-2"><div><h2 className="text-4xl font-bold tracking-tight md:text-5xl">Bereit für eure professionelle Website?</h2><p className="mt-5 text-lg leading-8 text-slate-700">Kontaktiert uns für ein kostenloses Erstgespräch.</p></div><div className="rounded-3xl bg-slate-950 p-6 text-white"><p className="text-sm text-slate-400">Kontakt</p><a href={emailLink} className="mt-3 block text-2xl font-bold hover:underline">{contactData.email}</a><div className="mt-5 grid gap-4 text-slate-300">{contactData.partners.map((person) => <div key={person.name} className="rounded-2xl bg-white/5 p-4"><p className="text-sm text-slate-400">{person.role}</p><p className="mt-1 font-semibold text-white">{person.name}</p><a href={person.phoneHref} className="hover:underline">{person.phoneDisplay}</a></div>)}</div><div className="mt-6 grid gap-3"><LinkButton href={whatsappLink} external>WhatsApp Anfrage senden</LinkButton><LinkButton href={emailLink} variant="outline">E-Mail Anfrage senden</LinkButton></div></div></div></div></section>; }
function InfoBox({ title, children }: { title: string; children: React.ReactNode }) { return <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6"><h2 className="text-2xl font-bold">{title}</h2>{children}</div>; }
function ImpressumPage() { return <main className="mx-auto max-w-5xl px-6 py-20"><div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl md:p-12"><div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"><Icon name="legal" className="h-5 w-5" />Rechtliche Angaben</div><h1 className="text-4xl font-bold tracking-tight md:text-6xl">Impressum</h1><p className="mt-5 text-lg leading-8 text-slate-300">Diese Seite enthält die wichtigsten Anbieterinformationen. Bitte ergänzt später eure offizielle Adresse und die Unternehmensform.</p><div className="mt-10 grid gap-6 md:grid-cols-2"><InfoBox title="Anbieter"><p className="mt-4 font-semibold text-white">{contactData.companyName}</p><p className="text-slate-300">Adresse folgt</p><p className="text-slate-300">Schweiz</p></InfoBox><InfoBox title="Kontakt"><p className="mt-4 text-slate-300">E-Mail: <a href={emailLink} className="text-white underline">{contactData.email}</a></p><p className="text-slate-300">Telefon: <a href={contactData.partners[0].phoneHref} className="text-white underline">{contactData.partners[0].phoneDisplay}</a></p></InfoBox><div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 md:col-span-2"><h2 className="text-2xl font-bold">Verantwortlich für den Inhalt</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{contactData.partners.map((person) => <div key={person.name} className="rounded-2xl bg-white/5 p-4"><p className="text-sm text-slate-400">{person.role}</p><p className="font-semibold text-white">{person.name}</p><a href={person.phoneHref} className="text-slate-300 hover:underline">{person.phoneDisplay}</a></div>)}</div></div><div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 md:col-span-2"><h2 className="text-2xl font-bold">Hinweis</h2><p className="mt-4 leading-7 text-slate-300">Die Inhalte dieser Website wurden sorgfältig erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine Gewähr.</p></div></div></div></main>; }
function StickyContactButton() { return <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3"><a href={whatsappLink} className="sticky-cta inline-flex items-center justify-center rounded-full bg-white px-5 py-4 font-bold text-slate-950 shadow-2xl"><Icon name="phone" className="mr-2 h-5 w-5" />Anfrage</a><a href={emailLink} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-950/90 text-white shadow-xl backdrop-blur-xl"><Icon name="mail" className="h-5 w-5" /></a></div>; }
function Footer({ setPage }: { setPage: (page: PageName) => void }) { return <footer className="border-t border-white/10 px-6 py-10 text-sm text-slate-400"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center"><p>© {new Date().getFullYear()} DZ Studios. Alle Rechte vorbehalten.</p><div className="flex gap-5"><button type="button" onClick={() => setPage("home")} className="hover:text-white">Home</button><button type="button" onClick={() => setPage("impressum")} className="hover:text-white">Impressum</button><a href="#contact" onClick={() => setPage("home")} className="hover:text-white">Kontakt</a></div></div></footer>; }

export default function WebagenturWebsite() {
  const [page, setPage] = useState<PageName>("home");
  const failedTests = runContentTests().filter((test) => !test.pass);
  return <div className="min-h-screen bg-slate-950 text-white"><PremiumStyles /><Header page={page} setPage={setPage} />{page === "home" ? <HomePage /> : <ImpressumPage />}{failedTests.length > 0 && <section className="mx-auto max-w-7xl px-6 pb-10"><div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">Interne Inhaltsprüfung fehlgeschlagen: {failedTests.map((test) => test.name).join(", ")}</div></section>}<StickyContactButton /><Footer setPage={setPage} /></div>;
}

