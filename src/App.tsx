 import React, { useMemo, useState } from "react";

type PageName = "home" | "impressum";
type IconName = "arrow" | "check" | "globe" | "phone" | "store" | "mail" | "shield" | "clock" | "star" | "legal";
type TestResult = { name: string; pass: boolean };
type ServiceItem = { icon: IconName; title: string; text: string };
type PackageItem = { name: string; price: string; text: string; points: string[] };
type BenefitItem = { icon: IconName; title: string; text: string };
type AgbSection = { title: string; text: string };
type CaseStudyItem = { title: string; problem: string; solution: string; result: string; metric: string };

const contactData = {
  companyName: "DZ Studio",
  addressLine1: "Bolligenstrasse 19a",
  addressLine2: "3326 Krauchthal",
  country: "Schweiz",
  email: "info@dzstudio.ch",
  whatsappNumber: "41763054144",
  whatsappText: "Hallo DZ Studio, ich interessiere mich für eine Website und möchte gerne eine Anfrage senden.",
  partners: [
    { role: "Ansprechpartner", name: "Kavin Dhamodharam", phoneDisplay: "+41 76 305 41 44", phoneHref: "tel:+41763054144" },
    { role: "Partner", name: "Flynn Zürcher", phoneDisplay: "+41 76 459 16 08", phoneHref: "tel:+41764591608" },
  ],
};

const emailBody = [
  "Hallo DZ Studio,",
  "",
  "ich interessiere mich für eine Website. Bitte kontaktieren Sie mich.",
  "",
  "Name:",
  "Firma / Shop:",
  "Telefon:",
  "Nachricht:",
].join("\n");

const whatsappLink = `https://wa.me/${contactData.whatsappNumber}?text=${encodeURIComponent(contactData.whatsappText)}`;
const emailLink = `mailto:${contactData.email}?subject=${encodeURIComponent("Website Anfrage")}&body=${encodeURIComponent(emailBody)}`;

const agbSections: AgbSection[] = [
  { title: "1. Geltungsbereich", text: "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Dienstleistungen im Bereich Web Consulting, die von den Betreibern dieser Website angeboten werden." },
  { title: "2. Anbieter", text: "Die Dienstleistungen werden von zwei privaten, minderjährigen Personen mit Wohnsitz in der Schweiz erbracht. Die rechtliche Vertretung erfolgt durch die gesetzlichen Vertreter (Eltern oder Erziehungsberechtigte)." },
  { title: "3. Leistungen", text: "Das Web Consulting umfasst insbesondere Beratung, Planung und einfache Umsetzung von Webprojekten, zum Beispiel Webseiten, digitale Lösungen und technische Unterstützung." },
  { title: "4. Vertragsschluss", text: "Ein Vertrag kommt durch schriftliche oder elektronische Bestätigung beider Parteien zustande. Bei Minderjährigen ist die Zustimmung der gesetzlichen Vertreter erforderlich." },
  { title: "5. Preise und Zahlung", text: "Preise werden individuell vereinbart. Zahlungen erfolgen nach Absprache und sind innerhalb der vereinbarten Frist zu leisten." },
  { title: "6. Haftung", text: "Die Anbieter haften nur für vorsätzliches oder grob fahrlässiges Verhalten. Für leichte Fahrlässigkeit wird die Haftung ausgeschlossen, soweit gesetzlich zulässig." },
  { title: "7. Gewährleistung", text: "Es wird keine Garantie für die vollständige Fehlerfreiheit oder den dauerhaften Betrieb von erstellten oder beratenen Weblösungen übernommen." },
  { title: "8. Datenschutz", text: "Personenbezogene Daten werden vertraulich behandelt und nicht an Dritte weitergegeben, ausser dies ist zur Vertragserfüllung notwendig." },
  { title: "9. Schlussbestimmungen", text: "Es gilt schweizerisches Recht. Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt." },
];

const services: ServiceItem[] = [
  { icon: "globe", title: "Website, die Kunden sofort verstehen", text: "Wir bauen klare One-Pager und Firmenwebsites, damit Besucher sofort sehen, wer Sie sind, was Sie anbieten und wie sie Sie kontaktieren können." },
  { icon: "phone", title: "Mobile Ansicht, die wirklich funktioniert", text: "Ihre Website wird für Handy, Tablet und Laptop optimiert — damit Kunden unterwegs schnell anrufen, schreiben oder eine Anfrage senden können." },
  { icon: "store", title: "Mehr Anfragen über WhatsApp, Mail und Google Maps", text: "Wir verbinden Ihre Website direkt mit WhatsApp, E-Mail, Google Maps und Kontaktmöglichkeiten, damit aus Besuchern echte Anfragen werden." },
];

const packages: PackageItem[] = [
  { name: "Starter", price: "ab CHF 890", text: "Die solide Visitenkarte im Web.", points: ["1-Seiten Website (One-Pager)", "Individuelles Design", "Mobil optimiert", "Kontaktformular", "Basis-SEO", "Hosting CHF 25 / Monat", "Gratis Erstgespräch"] },
  { name: "Business", price: "ab CHF 1’890", text: "Die professionelle Website für KMU.", points: ["Bis zu 5 Unterseiten", "Individuelles Design", "Erweiterte SEO-Optimierung", "Google Maps & Analytics", "Hosting CHF 25 / Monat"] },
  { name: "Premium", price: "ab CHF 3’490", text: "Massgeschneidert mit allen Extras.", points: ["Unbegrenzte Seiten", "Eigenes CMS / Blog", "Mehrsprachigkeit", "Performance-Tuning", "Hosting CHF 25 / Monat"] },
];

const industries = ["Restaurants", "Coiffeure", "Kioske", "Handwerker", "Kleine Shops", "Vereine", "Startups", "Beauty-Studios"];
const processSteps = ["Erstgespräch", "Design und Struktur", "Umsetzung", "Livegang"];
const credibilityPoints = ["Klare Paketpreise statt unklare Agentur-Angebote", "Direkter Kontakt per WhatsApp und E-Mail", "Persönliche Betreuung aus der Schweiz", "Keine erfundenen Kundenbewertungen oder falsche Referenzen"];
const configuratorOptions = ["Website", "Online-Shop", "WhatsApp", "Mehrsprachig", "Google Maps", "Logo / Branding"];
const websiteChecks = ["Mobile-Check", "Design-Eindruck", "Kontaktmöglichkeiten", "Verbesserungsideen"];

const caseStudies: CaseStudyItem[] = [
  { title: "Café & Restaurant", problem: "Gäste finden Öffnungszeiten, Standort und Kontakt nicht schnell genug.", solution: "One-Page-Website mit Öffnungszeiten, Google Maps, WhatsApp-Anfrage und klarer Menü-Struktur.", result: "Besucher verstehen in wenigen Sekunden, wo das Café ist, wann es offen ist und wie sie direkt Kontakt aufnehmen können.", metric: "Schneller Kontakt über WhatsApp und Maps" },
  { title: "Coiffeur & Beauty", problem: "Der erste Eindruck wirkt online nicht hochwertig genug und Buchungsanfragen gehen verloren.", solution: "Moderne mobile Website mit Leistungen, Preisen, Standort, Bildern und direktem Anfrage-Button.", result: "Kunden sehen sofort das Angebot und können ohne langes Suchen eine Anfrage senden.", metric: "Klarere Anfrageführung auf dem Handy" },
  { title: "Kiosk & Local Shop", problem: "Der Laden ist lokal bekannt, aber online kaum sichtbar und für neue Kunden schwer auffindbar.", solution: "Kompakte Website mit Standort, Öffnungszeiten, Sortiment, Google Maps und Kontaktmöglichkeiten.", result: "Neue Kunden finden den Shop leichter und erhalten alle wichtigen Informationen auf einer Seite.", metric: "Bessere lokale Sichtbarkeit" },
];

const faqs: Array<[string, string]> = [
  ["Wie schnell kann eine einfache Website online sein?", "Ein One-Pager kann oft in 7 bis 14 Tagen vorbereitet werden, wenn Texte, Bilder und Angaben rechtzeitig vorhanden sind."],
  ["Ist die Website auch für Handy und Tablet optimiert?", "Ja. Die Website wird für Handy, Tablet und Laptop aufgebaut, damit Kunden auch unterwegs schnell Kontakt aufnehmen können."],
  ["Was kostet die laufende Betreuung?", "Das Hosting kostet CHF 25 pro Monat. Weitere Änderungen oder Erweiterungen werden vorher klar abgesprochen."],
  ["Muss ich schon genau wissen, was ich brauche?", "Nein. Sie können uns kurz schreiben, was Ihr Geschäft macht. Wir sagen Ihnen ehrlich, ob Starter, Business oder Premium besser passt."],
];

const benefits: BenefitItem[] = [
  { icon: "shield", title: "Klarer erster Eindruck", text: "Besucher verstehen sofort, wer Sie sind, was Sie anbieten und wie sie Kontakt aufnehmen können." },
  { icon: "clock", title: "Schnell online", text: "Einfache Websites können oft in 7 bis 14 Tagen vorbereitet werden, wenn Inhalte bereitstehen." },
  { icon: "mail", title: "Direkte Anfragen", text: "WhatsApp, E-Mail, Telefon und Standort werden so platziert, dass Kunden nicht lange suchen müssen." },
];

function createPackageWhatsappLink(packageName: string) {
  const message = `Hallo DZ Studio, ich interessiere mich für das ${packageName} Paket und möchte gerne eine Anfrage senden.`;
  return `https://wa.me/${contactData.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function runContentTests(): TestResult[] {
  return [
    { name: "three services", pass: services.length === 3 },
    { name: "services are conversion focused", pass: services[0].title.includes("Kunden") && services[2].title.includes("Anfragen") },
    { name: "three packages", pass: packages.length === 3 },
    { name: "updated package prices", pass: packages[0].price === "ab CHF 890" && packages[1].price === "ab CHF 1’890" && packages[2].price === "ab CHF 3’490" },
    { name: "hosting included in all packages", pass: packages.every((pack) => pack.points.includes("Hosting CHF 25 / Monat")) },
    { name: "four process steps", pass: processSteps.length === 4 },
    { name: "agb has nine sections", pass: agbSections.length === 9 },
    { name: "agb contains Swiss law", pass: agbSections[8].text.includes("schweizerisches Recht") },
    { name: "umlauts are restored", pass: contactData.whatsappText.includes("für") && contactData.partners[1].name.includes("ü") },
    { name: "email link exists", pass: emailLink.startsWith("mailto:") },
    { name: "fixed email address is used", pass: contactData.email === "info@dzstudio.ch" && emailLink.includes("info@dzstudio.ch") },
    { name: "brand name is singular", pass: contactData.companyName === "DZ Studio" },
    { name: "impressum address exists", pass: contactData.addressLine1.includes("Bolligenstrasse") && contactData.addressLine2.includes("3326 Krauchthal") },
    { name: "whatsapp link exists", pass: whatsappLink.startsWith("https://wa.me/") },
    { name: "two partners", pass: contactData.partners.length === 2 },
    { name: "problem section exists", pass: typeof ProblemSection === "function" },
    { name: "case studies exist", pass: caseStudies.length === 3 && caseStudies[0].problem.length > 0 },
    { name: "honest credibility exists", pass: credibilityPoints[3].includes("Keine erfundenen") },
    { name: "configurator website required", pass: configuratorOptions[0] === "Website" },
    { name: "home page component exists", pass: typeof HomePage === "function" },
    { name: "footer component exists", pass: typeof Footer === "function" },
    { name: "sticky contact icons exist", pass: typeof StickyContactButton === "function" },
  ];
}

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const icons: Record<IconName, React.ReactElement> = {
    arrow: <svg {...common}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
    check: <svg {...common}><path d="M20 6 9 17l-5-5" /></svg>,
    globe: <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15 15 0 0 1 0 20" /><path d="M12 2a15 15 0 0 0 0 20" /></svg>,
    phone: <svg {...common}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>,
    store: <svg {...common}><path d="m3 9 2-5h14l2 5" /><path d="M5 9h14" /><path d="M6 9v11" /><path d="M18 9v11" /><path d="M4 20h16" /></svg>,
    mail: <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
    shield: <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></svg>,
    clock: <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
    star: <svg {...common}><path d="m12 2 3 6 6 .9-4.5 4.3 1 6.2L12 16.8 6.5 19.4l1-6.2L3 8.9 9 8l3-6Z" /></svg>,
    legal: <svg {...common}><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" /><path d="M9 13h6" /></svg>,
  };
  return icons[name];
}

function PremiumStyles() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }
      @keyframes revealUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes floatSlow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
      @keyframes shineLine { 0% { transform: translateX(-120%); opacity: 0; } 20% { opacity: .75; } 100% { transform: translateX(120%); opacity: 0; } }
      @keyframes bounceSoft { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      .premium-reveal { animation: revealUp .8s ease both; }
      .premium-float { animation: floatSlow 7s ease-in-out infinite; }
      .premium-card { transition: transform .3s ease, background .3s ease, border-color .3s ease; }
      .premium-card:hover { transform: translateY(-7px); background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.25); }
      .brand-shine { position: relative; overflow: hidden; }
      .brand-shine::after { content: ""; position: absolute; inset: 0; width: 45%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent); animation: shineLine 5.5s ease-in-out infinite; }
      .sticky-cta { animation: bounceSoft 3s ease-in-out infinite; }
      .lux-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent); }
    `}</style>
  );
}

function CrossLogo() {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg">
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

function LinkButton({ href, children, variant = "light" }: { href: string; children: React.ReactNode; variant?: "light" | "outline" }) {
  const styles = variant === "light" ? "bg-white text-slate-950 hover:bg-slate-200" : "border border-white/20 bg-transparent text-white hover:bg-white/10";
  return <a href={href} className={`inline-flex items-center justify-center rounded-full px-6 py-4 text-center font-semibold transition ${styles}`}>{children}</a>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`premium-card rounded-3xl border border-white/10 shadow-xl ${className}`}>{children}</div>;
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">{kicker}</p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
    </div>
  );
}

function Header({ page, setPage }: { page: PageName; setPage: (page: PageName) => void }) {
  const openHome = () => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <button type="button" onClick={openHome} className="flex items-center gap-3 text-left">
          <CrossLogo />
          <div>
            <p className="text-lg font-bold">DZ Studio</p>
            <p className="hidden text-xs text-slate-400 sm:block">Digitale Lösungen für lokale Unternehmen</p>
          </div>
        </button>
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <button type="button" onClick={openHome} className={page === "home" ? "text-white" : "hover:text-white"}>Home</button>
          <a href="#services" onClick={() => setPage("home")} className="hover:text-white">Leistungen</a>
          <a href="#packages" onClick={() => setPage("home")} className="hover:text-white">Pakete</a>
          <button type="button" onClick={() => setPage("impressum")} className={page === "impressum" ? "text-white" : "hover:text-white"}>Impressum</button>
        </nav>
        <a href="#contact" onClick={() => setPage("home")} className="rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-slate-200 sm:px-5 sm:text-sm">Anfrage senden</a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-blue-500/25 blur-3xl" />
      <div className="absolute right-0 top-40 h-[460px] w-[460px] rounded-full bg-purple-500/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-32">
        <div className="premium-reveal">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <Icon name="star" className="h-4 w-4" /> Webdesign & Branding für lokale Unternehmen
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl">Websites, die seriös wirken und mehr Anfragen bringen.</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">DZ Studio erstellt moderne Websites für Restaurants, Coiffeure, Shops und KMU in der Schweiz — mobil optimiert, klar strukturiert und direkt mit WhatsApp, E-Mail und Kontakt verbunden.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <LinkButton href="#contact">Kostenlose Website-Anfrage senden <Icon name="arrow" className="ml-2 h-5 w-5" /></LinkButton>
            <LinkButton href="#packages" variant="outline">Pakete ansehen</LinkButton>
          </div>
        </div>
        <div className="premium-reveal premium-float"><DemoWebsiteCard /></div>
      </div>
    </section>
  );
}

function DemoWebsiteCard() {
  const items = ["Öffnungszeiten", "Google Maps", "WhatsApp Kontakt", "Online Anfrage"];
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
      <div className="rounded-[1.5rem] bg-slate-900 p-6">
        <div className="mb-6 flex gap-2">
          <span className="h-3 w-3 rounded-full bg-slate-500" />
          <span className="h-3 w-3 rounded-full bg-slate-500" />
          <span className="h-3 w-3 rounded-full bg-slate-500" />
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6">
          <p className="mb-3 text-sm text-slate-300">Beispiel-Kundenwebsite</p>
          <h3 className="text-3xl font-bold">Café Luna</h3>
          <p className="mt-3 text-slate-300">Frische Backwaren, Kaffee und Online-Reservierung.</p>
          <div className="mt-6 grid gap-3">
            {items.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-100 backdrop-blur-xl">
                <Icon name="check" className="h-5 w-5" /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemSection() {
  const problems = ["Kunden finden online keine klaren Informationen.", "Die Website wirkt alt oder nicht seriös genug.", "Kontakt, Standort und Angebot sind nicht sofort sichtbar."];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl md:p-12">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Das Problem</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Viele gute Unternehmen verlieren Kunden, weil ihr Online-Auftritt nicht überzeugt.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">Wenn eine Website unklar, veraltet oder auf dem Handy schlecht lesbar ist, springen Besucher ab — bevor sie überhaupt anfragen.</p>
          </div>
          <div className="grid gap-4">
            {problems.map((problem) => (
              <div key={problem} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <Icon name="check" className="mt-1 h-5 w-5 shrink-0" />
                <p className="leading-7 text-slate-200">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionTitle kicker="Leistungen" title="Was Sie konkret bekommen — ohne Agentur-Blabla." />
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="bg-white/5 text-white">
            <div className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950">
                <Icon name={service.icon} className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold">{service.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{service.text}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function BrandStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="brand-shine lux-line" />
      <div className="grid gap-6 py-10 text-center text-sm uppercase tracking-[0.28em] text-slate-500 md:grid-cols-4">
        <p>Premium Design</p>
        <p>Mobile First</p>
        <p>Swiss Quality</p>
        <p>Fast Launch</p>
      </div>
      <div className="brand-shine lux-line" />
    </section>
  );
}

function IndustriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionTitle kicker="Für wen" title="Websites für lokale Geschäfte, die sichtbar werden wollen." />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {industries.map((item) => (
          <div key={item} className="premium-card rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-center font-semibold text-white">
            <Icon name="store" className="mx-auto mb-3 h-6 w-6 text-slate-300" />{item}
          </div>
        ))}
      </div>
    </section>
  );
}

function WebsiteCheckSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl sm:p-8 md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Gratis Einstieg</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Kostenlosen Website-Check sichern.</h2>
            <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">Ideal für Läden, die schon eine alte Website haben oder nicht wissen, ob sie online professionell wirken.</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-6 text-white">
            {websiteChecks.map((item) => (
              <div key={item} className="mb-3 flex items-center gap-3 text-sm text-slate-300"><Icon name="check" className="h-5 w-5" /> {item}</div>
            ))}
            <div className="mt-6"><LinkButton href={whatsappLink}>Gratis Check anfragen</LinkButton></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionTitle kicker="Case Studies" title="So wird aus einer unklaren Website eine echte Anfrage-Seite." />
      <div className="grid gap-6 md:grid-cols-3">
        {caseStudies.map((item, index) => (
          <Card key={item.title} className="bg-white/[0.04] p-7">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-950">0{index + 1}</div>
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-slate-400">Beispiel-Projekt</p>
            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
            <div className="mt-6 grid gap-4 text-sm leading-6">
              <div><p className="font-bold text-white">Problem</p><p className="mt-1 text-slate-300">{item.problem}</p></div>
              <div><p className="font-bold text-white">Lösung</p><p className="mt-1 text-slate-300">{item.solution}</p></div>
              <div><p className="font-bold text-white">Ergebnis</p><p className="mt-1 text-slate-300">{item.result}</p></div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm font-semibold text-white">{item.metric}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl md:p-12">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Warum DZ Studio?</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ehrlich, direkt und ohne erfundene Kundenstimmen.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">Wir haben noch keine echten Kundenbewertungen. Deshalb zeigen wir keine Fake-Testimonials, sondern klare Preise, einen einfachen Ablauf und direkte Kontaktmöglichkeiten.</p>
          </div>
          <div className="grid gap-4">
            {credibilityPoints.map((point) => (
              <div key={point} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <Icon name="shield" className="mt-1 h-5 w-5 shrink-0" />
                <p className="leading-7 text-slate-100">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectConfiguratorSection() {
  const requiredOption = "Website";
  const [selected, setSelected] = useState<string[]>([requiredOption]);
  const selectedText = selected.join(", ");
  const recommended = selected.includes("Online-Shop") || selected.includes("Mehrsprachig") ? "Premium" : selected.length >= 4 ? "Business" : "Starter";
  const configuratorWhatsappText = `Hallo DZ Studio, ich interessiere mich für folgendes Paket: ${recommended}. Meine Auswahl: ${selectedText}.`;
  const configuratorWhatsappLink = useMemo(() => `https://wa.me/${contactData.whatsappNumber}?text=${encodeURIComponent(configuratorWhatsappText)}`, [configuratorWhatsappText]);

  function toggleOption(option: string) {
    if (option === requiredOption) return;
    setSelected((items) => items.includes(option) ? items.filter((item) => item !== option) : [...items, option]);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionTitle kicker="Mini-Konfigurator" title="Klicke an, was du brauchst." />
          <p className="text-base leading-8 text-slate-300 sm:text-lg">Jede Auswahl verändert automatisch die Paket-Empfehlung. So sieht der Kunde sofort, ob Starter, Business oder Premium besser passt.</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">Auswahl: <span className="font-semibold text-white">{selectedText}</span></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {configuratorOptions.map((option) => {
              const isSelected = selected.includes(option);
              const isRequired = option === requiredOption;
              const selectedClass = `flex items-center justify-between rounded-2xl border border-white bg-white px-5 py-4 text-left font-semibold text-slate-950 transition${isRequired ? " cursor-not-allowed opacity-90" : ""}`;
              const normalClass = "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left font-semibold text-white transition hover:bg-white/10";
              return (
                <button key={option} type="button" onClick={() => toggleOption(option)} aria-pressed={isSelected} aria-disabled={isRequired} className={isSelected ? selectedClass : normalClass}>
                  <span>{option}{isRequired ? " (Pflicht)" : ""}</span>
                  {isSelected && <Icon name="check" className="h-5 w-5" />}
                </button>
              );
            })}
          </div>
          <div className="mt-6 rounded-3xl bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Empfohlenes Paket</p>
            <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">{recommended}</p>
            <p className="mt-3 text-slate-300">Basierend auf: {selectedText}</p>
            <a href={configuratorWhatsappLink} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-center font-bold text-slate-950 shadow-lg transition hover:bg-slate-200">Dieses Paket anfragen</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="border-y border-white/10 bg-white/[0.03] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle kicker="Ablauf" title="Einfach, verständlich und ohne komplizierte Technik." />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-950">0{index + 1}</div>
              <h3 className="text-xl font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  return (
    <section id="packages" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionTitle kicker="Pakete" title="Faire Angebote für den Start." />
      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {packages.map((pack, index) => (
          <Card key={pack.name} className={index === 1 ? "bg-white text-slate-950" : "bg-white/5 text-white"}>
            <div className="flex h-full min-h-[360px] flex-col p-7">
              <div>
                <div className={index === 1 ? "mb-4 inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white" : "mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-300"}>{index === 1 ? "Beliebt" : "Paket"}</div>
                <h3 className="text-3xl font-bold">{pack.name}</h3>
                <p className={index === 1 ? "mt-3 min-h-[58px] leading-7 text-slate-600" : "mt-3 min-h-[58px] leading-7 text-slate-300"}>{pack.text}</p>
                <p className="mt-5 text-4xl font-bold">{pack.price}</p>
              </div>
              <div className="mt-6 grid gap-3">
                {pack.points.map((point) => (
                  <div key={point} className="flex items-center gap-3 text-sm font-medium"><span className={index === 1 ? "flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-white" : "flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-950"}><Icon name="check" className="h-4 w-4" /></span>{point}</div>
                ))}
              </div>
              <div className="mt-auto pt-7"><a href={createPackageWhatsappLink(pack.name)} className={index === 1 ? "inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-center font-bold text-white shadow-lg transition hover:bg-slate-800" : "inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-center font-bold text-slate-950 shadow-lg transition hover:bg-slate-200"}>Paket anfragen</a></div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <SectionTitle kicker="Ergebnis" title="Was Ihre Website nach dem Launch leisten soll." />
      <div className="grid gap-6 md:grid-cols-3">
        {benefits.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"><Icon name={item.icon} className="mb-4 h-7 w-7" /><h3 className="text-xl font-bold">{item.title}</h3><p className="mt-3 leading-7 text-slate-300">{item.text}</p></div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionTitle kicker="FAQ" title="Kurz beantwortet, bevor Sie anfragen." />
      <div className="grid gap-4 md:grid-cols-2">
        {faqs.map(([question, answer]) => (
          <div key={question} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><h3 className="text-xl font-bold text-white">{question}</h3><p className="mt-3 leading-7 text-slate-300">{answer}</p></div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="px-4 pb-24 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl sm:p-8 md:p-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Nächster Schritt</p><h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Senden Sie uns kurz, welche Website Sie brauchen.</h2><p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">Wir melden uns persönlich und sagen Ihnen ehrlich, welches Paket passt — ohne Verkaufsdruck und ohne komplizierte Agentur-Sprache.</p></div>
          <div className="rounded-3xl bg-slate-950 p-6 text-white">
            <p className="text-sm text-slate-400">Direkte Anfrage</p>
            <a href={emailLink} className="mt-3 block break-words text-xl font-bold hover:underline sm:text-2xl">{contactData.email}</a>
            <div className="mt-5 grid gap-4 text-slate-300">
              {contactData.partners.map((person) => (
                <div key={person.name} className="rounded-2xl bg-white/5 p-4"><p className="text-sm text-slate-400">{person.role}</p><p className="mt-1 font-semibold text-white">{person.name}</p><a href={person.phoneHref} className="hover:underline">{person.phoneDisplay}</a></div>
              ))}
            </div>
            <div className="mt-6 grid gap-3"><LinkButton href={whatsappLink}>Jetzt unverbindlich per WhatsApp anfragen</LinkButton><LinkButton href={emailLink} variant="outline">Website-Projekt per E-Mail senden</LinkButton></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6"><h2 className="text-2xl font-bold">{title}</h2>{children}</div>;
}

function ImpressumPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-8 md:p-12">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"><Icon name="legal" className="h-5 w-5" /> Rechtliche Angaben</div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">Impressum</h1>
        <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">Diese Seite enthält die wichtigsten Anbieterinformationen.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <InfoBox title="Anbieter"><p className="mt-4 font-semibold text-white">{contactData.companyName}</p><p className="text-slate-300">{contactData.addressLine1}</p><p className="text-slate-300">{contactData.addressLine2}</p><p className="text-slate-300">{contactData.country}</p></InfoBox>
          <InfoBox title="Kontakt"><p className="mt-4 break-words text-slate-300">E-Mail: <a href={emailLink} className="text-white underline">{contactData.email}</a></p><p className="text-slate-300">Telefon: <a href={contactData.partners[0].phoneHref} className="text-white underline">{contactData.partners[0].phoneDisplay}</a></p></InfoBox>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 md:col-span-2"><h2 className="text-2xl font-bold">Verantwortlich für den Inhalt</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{contactData.partners.map((person) => <div key={person.name} className="rounded-2xl bg-white/5 p-4"><p className="text-sm text-slate-400">{person.role}</p><p className="font-semibold text-white">{person.name}</p><a href={person.phoneHref} className="text-slate-300 hover:underline">{person.phoneDisplay}</a></div>)}</div></div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 md:col-span-2"><h2 className="text-2xl font-bold">Hinweis</h2><p className="mt-4 leading-7 text-slate-300">Die Inhalte dieser Website wurden sorgfältig erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine Gewähr.</p></div>
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-slate-950/90 p-6 shadow-2xl md:col-span-2 md:p-8"><div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"><Icon name="shield" className="h-5 w-5" /> AGB</div><h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Allgemeine Geschäftsbedingungen (AGB) – Web Consulting</h2><p className="mt-4 leading-7 text-slate-300">Diese AGB regeln die wichtigsten Bedingungen für Web-Consulting-Dienstleistungen von DZ Studio.</p><div className="mt-8 grid gap-4">{agbSections.map((section) => <div key={section.title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-5"><h3 className="font-bold text-white">{section.title}</h3><p className="mt-2 leading-7 text-slate-300">{section.text}</p></div>)}</div></div>
        </div>
      </div>
    </main>
  );
}

function HomePage() {
  return <main><HeroSection /><ProblemSection /><BrandStrip /><ServicesSection /><IndustriesSection /><WebsiteCheckSection /><PortfolioSection /><WhyUsSection /><ProjectConfiguratorSection /><ProcessSection /><PackagesSection /><BenefitsSection /><FAQSection /><ContactSection /></main>;
}

function Footer({ setPage }: { setPage: (page: PageName) => void }) {
  return <footer className="border-t border-white/10 px-4 py-10 sm:px-6"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} DZ Studio. Alle Rechte vorbehalten.</p><button type="button" onClick={() => setPage("impressum")} className="w-fit hover:text-white">Impressum & AGB</button></div></footer>;
}

function StickyContactButton() {
  return <div className="fixed bottom-5 right-5 z-50 hidden flex-col gap-3 md:flex"><a href={emailLink} aria-label="E-Mail Anfrage senden" title="E-Mail Anfrage senden" className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-slate-950 text-white shadow-2xl transition hover:bg-white/10"><Icon name="mail" className="h-6 w-6" /></a><a href={whatsappLink} aria-label="WhatsApp Anfrage senden" title="WhatsApp Anfrage senden" className="sticky-cta inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-950 shadow-2xl transition hover:bg-slate-200"><Icon name="phone" className="h-6 w-6" /></a></div>;
}

function WebagenturWebsite() {
  const [page, setPage] = useState<PageName>("home");
  return <div className="min-h-screen bg-slate-950 text-white"><PremiumStyles /><Header page={page} setPage={setPage} />{page === "home" ? <HomePage /> : <ImpressumPage />}<Footer setPage={setPage} /><StickyContactButton /></div>;
}

export default WebagenturWebsite;
