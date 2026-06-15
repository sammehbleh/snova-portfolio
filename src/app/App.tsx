import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Star, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Sun, Moon, Check, AlertCircle, Printer, Frame, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";
import heroBg from "../imports/image.png";
import logo from "../img/snovalogo.png";
import profile from "../img/profile.jpg";
import fear from "../img/fear.jpg";
import anger from "../img/anger.png";
import joker from "../img/joker.jpg";

const NAV_LINKS = ["Home", "Services", "Portfolio", "About Us", "Testimonials", "Contact Us"];

const ARTWORKS = [
  {
    id: 1,
    title: "Envy",
    medium: "Oil on Canvas",
    year: "2024",
    madeDate: "March 2024",
    dimensions: "36 x 48 in",
    availability: "Original available",
    description:
      "A profound exploration of the unknown, utilizing high-contrast shadows and layered textures to evoke a sense of visceral depth and introspection.",
    img: fear,
  },
  {
    id: 2,
    title: "Anger",
    medium: "Acrylic on Canvas",
    year: "2024",
    madeDate: "January 2024",
    dimensions: "30 x 40 in",
    availability: "Replica and print available",
    description:
      "Captured through vigorous brushwork and a vibrant palette, this piece translates raw emotion into a rhythmic, powerful visual experience.",
    img: anger,
  },
  {
    id: 3,
    title: "Joker",
    medium: "Mixed Media",
    year: "2024",
    madeDate: "May 2024",
    dimensions: "24 x 36 in",
    availability: "Print available",
    description:
      "A complex character study that balances light and darkness, employing mixed media to provide a contemporary edge and architectural depth.",
    img: joker,
  },
];

const SERVICES = [
  {
    label: "Collector's Poster Edition",
    icon: Printer,
    tagline: "An affordable collectible piece",
    description:
      "Printed copy of the original artwork limited to authenticated copies in 2 x 2.5ft. (size will depend on the artwork’s size without changing the orientation and overall size)", // Description from prompt
    features: ["Premium poster print", "Artist's signature", "Artwork details on the reverse side", "Authenticity Card", "Limited to only 7 copies worldwide", "3-Day Creation", "Note: An affordable way to own a collectible piece from the collection."],
    tags: ["Collectible", "Limited Edition", "Affordable"],
    price: "₱499",
  },
  {
    label: "Signature Framed Edition",
    icon: Frame,
    tagline: "Gallery-inspired presentation",
    description:
      "Full-size reproduction matching the original artwork.", // Concise description, details in features
    features: ["Full-size reproduction matching the original artwork", "Premium frame of your choice", "Artist's signature", "Artwork details on the reverse side", "Authenticity Card", "Limited to only 7 copies worldwide", "3-Day Creation", "Note: Designed for collectors seeking a gallery-inspired presentation."],
    tags: ["Framed", "Reproduction", "Limited Edition", "Customizable"],
    price: "₱729",
    priceNote: "(Price varies depending on frame selection and artwork size.)",
  },
  {
    label: "Original Masterpiece",
    icon: Sparkles,
    tagline: "One-of-a-Kind Originals",
    description:
      "Own a singular, irreplaceable piece. Each original artwork is a unique expression—no two are alike. Comes with full provenance documentation and lifetime artist support.",
    features: ["Unique, never reproduced", "Full provenance papers", "Artist-signed & dated", "5-Day Creation", "Collector investment value"],
    tags: ["Exclusive", "One-of-a-kind", "Investment"],
    price: "From $1,200",
  },
];

const TESTIMONIALS = [
  {
    name: "A***** R.",
    role: "Private Collector",
    title: "A centerpiece with presence",
    description:
      "The original piece became the quiet anchor of our living room. The color, texture, and framing guidance made the entire acquisition feel personal and considered.",
  },
  {
    name: "M***** S.",
    role: "Interior Designer",
    title: "Beautifully handled from start to finish",
    description:
      "The replica commission captured the mood of the reference work while still feeling alive in the room. Communication was clear, polished, and deeply attentive.",
  },
  {
    name: "J***** L.",
    role: "First-Time Buyer",
    title: "The print exceeded expectations",
    description:
      "I wanted something meaningful but approachable. The archival print arrived with rich color, clean details, and a certificate that made it feel special.",
  },
  {
    name: "C***** T.",
    role: "Gallery Patron",
    title: "Layered, expressive, and refined",
    description:
      "The work has a rare balance of restraint and emotion. It rewards close looking, and guests always ask about the story behind it.",
  },
];

const POLICY_DATA: Record<string, { title: string; content: string }> = {
  "Privacy Policy": {
    title: "Privacy Policy",
    content: "At SNØVA, we respect your privacy. This site collects information through inquiries and acquisition forms to provide you with the best possible service. We do not sell or share your data with third parties for marketing purposes. All personal information is handled with strict confidentiality.",
  },
  "Terms of Sale": {
    title: "Terms of Sale",
    content: "Artworks are sold as-is. For original pieces, a certificate of authenticity is included. Replicas and prints are produced to order. Once an order is processed, cancellations are not permitted. Returns are only accepted for items that arrive damaged, provided we are notified within 48 hours of delivery.",
  },
  "Shipping Info": {
    title: "Shipping Information",
    content: "We offer secure domestic and international shipping. Original canvases are professionally crated. Prints and posters are shipped in heavy-duty tubes. Shipping costs and estimated delivery times are calculated at checkout or discussed during the inquiry process. Tracking is provided for all orders.",
  },
};

/* ── theme token sets ── */
const DARK = {
  siteBg:         "#2a2828",
  siteBgAlt:      "#1e1c1c",
  siteBg2:        "#242222",
  siteCard:       "#333030",
  siteText:       "#f0e6d3",
  siteMuted:      "#b0a090",
  sitePlaceholder:"#4a4545",
  siteBigText:    "#3d3939",
  siteGold:       "#7a35b8",
  siteGoldHover:  "#9a5ad6",
  siteTeal:       "#00c4b4",
  siteYellow:     "#f5d894",
  siteGoldDim:    "rgba(122,53,184,0.13)",
  siteBorder:     "rgba(122,53,184,0.2)",
  siteBorderHover:"rgba(0,196,180,0.5)",
  siteNavBg:      "rgba(42,40,40,0.45)",
  siteMobileBg:   "rgba(42,40,40,0.75)",
  siteDivider:    "rgba(122,53,184,0.15)",
  siteHeroBg:     "rgba(42,40,40,0.7)",
  siteHeroFrom:   "rgba(42,40,40,1)",
  siteHeroVia:    "rgba(42,40,40,0.7)",
  siteInputBg:    "#1e1c1c",
  siteRingFocus:  "rgba(0,196,180,0.18)",
};

const LIGHT = {
  siteBg:         "#e4e0ee",
  siteBgAlt:      "#dad6e6",
  siteBg2:        "#d4cfe2",
  siteCard:       "#ffffff",
  siteText:       "#2a2828",
  siteMuted:      "#5a5565",
  sitePlaceholder:"#b0acc0",
  siteBigText:    "#d0cbe0",
  siteGold:       "#7a35b8",
  siteGoldHover:  "#5d2491",
  siteTeal:       "#009e90",
  siteYellow:     "#b8a800",
  siteGoldDim:    "rgba(122,53,184,0.1)",
  siteBorder:     "rgba(122,53,184,0.18)",
  siteBorderHover:"rgba(0,158,144,0.45)",
  siteNavBg:      "rgba(228,224,238,0.72)",
  siteMobileBg:   "rgba(228,224,238,0.92)",
  siteDivider:    "rgba(122,53,184,0.13)",
  siteHeroBg:     "rgba(228,224,238,0.5)",
  siteHeroFrom:   "rgba(218,214,230,0.95)",
  siteHeroVia:    "rgba(218,214,230,0.6)",
  siteInputBg:    "#fdfbff",
  siteRingFocus:  "rgba(0,158,144,0.15)",
};

function applyTokens(t: typeof DARK) {
  const r = document.documentElement.style;
  r.setProperty("--site-bg",          t.siteBg);
  r.setProperty("--site-bg-alt",      t.siteBgAlt);
  r.setProperty("--site-bg-2",        t.siteBg2);
  r.setProperty("--site-card",        t.siteCard);
  r.setProperty("--site-text",        t.siteText);
  r.setProperty("--site-muted",       t.siteMuted);
  r.setProperty("--site-placeholder", t.sitePlaceholder);
  r.setProperty("--site-big-text",    t.siteBigText);
  r.setProperty("--site-gold",        t.siteGold);
  r.setProperty("--site-gold-hover",  t.siteGoldHover);
  r.setProperty("--site-teal",        t.siteTeal);
  r.setProperty("--site-yellow",      t.siteYellow);
  r.setProperty("--site-gold-dim",    t.siteGoldDim);
  r.setProperty("--site-border",      t.siteBorder);
  r.setProperty("--site-border-hover",t.siteBorderHover);
  r.setProperty("--site-nav-bg",      t.siteNavBg);
  r.setProperty("--site-mobile-bg",   t.siteMobileBg);
  r.setProperty("--site-divider",     t.siteDivider);
  r.setProperty("--site-hero-bg",     t.siteHeroBg);
  r.setProperty("--site-hero-from",   t.siteHeroFrom);
  r.setProperty("--site-hero-via",    t.siteHeroVia);
  r.setProperty("--site-input-bg",    t.siteInputBg);
  r.setProperty("--site-ring-focus",  t.siteRingFocus);
}

/* shorthand style helpers */
const v = (name: string) => `var(--${name})`;

const HERO_SLIDES = [
  { img: fear,  title: "Fear",   medium: "Oil on Canvas" },
  { img: anger, title: "Anger",  medium: "Acrylic on Canvas" },
  { img: joker, title: "Joker",  medium: "Mixed Media" },
];

export default function App() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeSection, setActive] = useState("Home");
  const [dark, setDark]           = useState(true);
  const [heroSlide, setHeroSlide] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState<(typeof ARTWORKS)[number] | null>(null);
  const [selectedService, setSelectedService] = useState<(typeof SERVICES)[number] | null>(null);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    applyTokens(dark ? DARK : LIGHT);
    document.documentElement.style.setProperty("--site-scheme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-cycle hero slides
  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % HERO_SLIDES.length), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!selectedArtwork) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedArtwork(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedArtwork]);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((link) => document.getElementById(link.toLowerCase().replace(/\s/g, "-")))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const link = NAV_LINKS.find((item) => item.toLowerCase().replace(/\s/g, "-") === visible.target.id);
          if (link) setActive(link);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.12, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Nav text: always white over the dark hero; switches to theme colour when scrolled
  const navText    = scrolled ? (dark ? "#f0e6d3" : "#1a0030") : "#f0e6d3";
  const navSubtext = scrolled ? (dark ? "#b0a090" : "#5a5565") : "rgba(245, 229, 0, 0.75)";
  const navPurple  = "#7a35b8";
  const navYellow  = dark ? "#f5e500" : "#b8a800";

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase().replace(/\s/g, "-"))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActive(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setSending(true);
    // Accessing environment variables typed in vite-env.d.ts
    
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
      form,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
    )
    .then(() => {
      setShowSuccess(true);
      formRef.current?.reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      setShowError(true);
    })
    .finally(() => {
      setSending(false);
    });
  };

  /* base css injected once */
  return (
    <div
      className="min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{
        background: v("site-bg"),
        color:      v("site-text"),
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      <style>{`
        @keyframes testimonial-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── NAV ── */}
      <div
        className={`fixed z-50 flex justify-center transition-all duration-500 ${
          scrolled ? "top-3 left-4 right-4 lg:left-8 lg:right-8" : "top-0 left-0 right-0"
        }`}
      >
        <nav
          className={`w-full transition-all duration-500 ${
            scrolled ? "max-w-6xl rounded-2xl border shadow-[0_8px_32px_rgba(0,0,0,0.2)]" : "rounded-none"
          }`}
          style={{
            background: scrolled ? v("site-nav-bg") : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderColor: scrolled ? v("site-border") : "transparent",
          }}
        >
          <div className="px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex flex-col cursor-pointer select-none ml-2 lg:ml-12" onClick={() => scrollTo("Home")}>
              <div className="flex items-center gap-2">            
                <span
                  className="text-xl lg:text-2xl font-light transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Unicase', serif", color: "white", letterSpacing: "0.25em" }}
                >
                  SNØVA
                </span>
              </div>
              <span className="text-[9px] tracking-[0.3em] uppercase -mt-0.5 transition-colors duration-300" style={{ color: scrolled ? v("site-muted") : "rgba(245, 229, 0, 0.8)" }}>
                Art Website
              </span>
            </div>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-4 lg:gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                    style={{ color: activeSection === link ? navYellow : navText }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = navYellow)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = activeSection === link ? navYellow : navText)}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={() => setDark(!dark)}
                className="inline-flex items-center justify-center w-9 h-9 rounded-md border transition-all duration-200"
                style={{ borderColor: navYellow, color: navYellow }}
                onMouseEnter={(e) => { e.currentTarget.style.background = v("site-teal"); e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = v("site-teal"); }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = navYellow; e.currentTarget.style.borderColor = navYellow; }}
                aria-label="Toggle theme"
              >
                {dark ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* CTA */}
              <button
                onClick={() => scrollTo("Contact Us")}
                className="inline-flex items-center h-9 px-5 rounded-md border text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300"
                style={{ borderColor: navYellow, color: navYellow }}
                onMouseEnter={(e) => { e.currentTarget.style.background = v("site-teal"); e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = v("site-teal"); }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = navYellow; e.currentTarget.style.borderColor = navYellow; }}
              >
                Acquire Art
              </button>
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setDark(!dark)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md border"
                style={{ borderColor: "rgba(122,53,184,0.35)", color: navPurple }}
                aria-label="Toggle theme"
              >
                {dark ? <Sun size={13} /> : <Moon size={13} />}
              </button>
              <button
                className="p-1.5 transition-colors duration-300"
                style={{ color: navText }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div
              className={`md:hidden border-t px-6 pb-6 pt-4 flex flex-col gap-4 ${scrolled ? "rounded-b-2xl" : ""}`}
              style={{
                borderColor:    v("site-divider"),
                background:     dark ? "rgba(7,0,14,0.88)" : "rgba(255,252,247,0.96)",
                backdropFilter: "blur(16px)",
              }}
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left text-sm tracking-[0.2em] uppercase transition-colors"
                  style={{ color: activeSection === link ? v("site-gold") : v("site-text") }}
                >
                  {link}
                </button>
              ))}
            </div>
          )}
        </nav>
      </div>

      {/* ── HERO ── always dark regardless of theme — it's a photo bg */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Artist workspace"
            className="w-full h-full object-cover"
            style={{ opacity: 0.65 }}
          />
          {/* Always-dark overlay — keeps text legible in both light and dark mode */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, rgba(4,0,10,0.93) 0%, rgba(25,0,50,0.82) 55%, rgba(4,0,10,0.60) 100%)" }}
          />
          {/* Bottom fade — dynamic base so it blends into the site background in both themes */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${v("site-bg")} 0%, transparent 48%)` }}
          />
        </div>

        {/* Gold left rule */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] opacity-50"
          style={{ background: `linear-gradient(to bottom, transparent, ${navPurple}, transparent)` }}
        />

        <div className="relative w-full max-w-[1500px] mx-auto px-6 lg:px-10 xl:px-16 pt-28 pb-20 lg:pt-32 lg:pb-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 xl:gap-16 items-center">
          <div>
            {/* Hero text always uses fixed light colours — never theme vars */}
            <div className="flex items-center gap-4 mb-6 lg:mb-8">
              <div className="h-px w-14 bg-[#f5e500]" />
              <span className="text-[11px] lg:text-xs tracking-[0.4em] uppercase text-[#f5e500]">
                Original · Replica · Print
              </span>
            </div>

            <h1
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-[6.8rem] font-normal leading-[1.02] mb-7 lg:mb-8 text-[#f0e6d3]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              When <br></br>
              <em className="italic text-[#f5e500]">Creativity </em>Becomes
              <br />
              <em className="italic text-[#f5e500]">Visual</em> 
              <br />
            </h1>

            <p className="text-lg lg:text-xl leading-relaxed max-w-2xl mb-9 lg:mb-10 font-light text-[#c8b8a8]">
              Every piece carries a story. From collector-grade originals to museum-quality prints,
              discover works that transform your space into a living gallery.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => scrollTo("Services")}
                className="px-9 py-4 lg:px-10 lg:py-5 text-xs lg:text-sm tracking-[0.25em] uppercase font-semibold bg-[#f5e500] text-[#1e1c1c] hover:bg-[#00c4b4] hover:text-white transition-colors duration-300"
              >
                Explore Collection
              </button>
              <button
                onClick={() => scrollTo("About Us")}
                className="px-9 py-4 lg:px-10 lg:py-5 border border-[rgba(245, 229, 0, 0.5)] text-[#f5e500] hover:border-[#00c4b4] hover:text-[#00c4b4] text-xs lg:text-sm tracking-[0.25em] uppercase transition-colors duration-300"
              >
                Meet the Artist
              </button>
            </div>

            <div className="mt-10 lg:hidden">
              <div className="relative aspect-[4/5] max-h-[42vh] overflow-hidden rounded-2xl">
                <img
                  src={HERO_SLIDES[heroSlide].img}
                  alt={HERO_SLIDES[heroSlide].title}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(4,0,10,0.92) 0%, transparent 100%)" }}
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1 text-[#7a35b8]">
                    {HERO_SLIDES[heroSlide].medium}
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg italic text-[#f0e6d3]">
                    {HERO_SLIDES[heroSlide].title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero artwork carousel */}
          <div className="hidden lg:flex flex-col gap-4 items-end">
            {/* Main large image */}
            <div className="relative w-full max-w-[480px] xl:max-w-[540px] ml-auto">
              <div className="absolute inset-0 translate-x-4 translate-y-4 border rounded-2xl border-[rgba(122,53,184,0.3)]" />
              <div className="relative aspect-[4/5] max-h-[60vh] rounded-2xl overflow-hidden z-10">
                {HERO_SLIDES.map((slide, i) => (
                  <img
                    key={i}
                    src={slide.img}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: heroSlide === i ? 1 : 0 }}
                  />
                ))}
                {/* Label overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 lg:p-7 rounded-b-2xl z-10"
                  style={{ background: "linear-gradient(to top, rgba(4,0,10,0.92) 0%, transparent 100%)" }}
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1 text-[#7a35b8]">
                    {HERO_SLIDES[heroSlide].medium}
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl italic text-[#f0e6d3]">
                    {HERO_SLIDES[heroSlide].title}
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 max-w-[480px] xl:max-w-[540px] w-full">
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => setHeroSlide(i)}
                  className="flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300"
                  style={{ borderColor: heroSlide === i ? "#7a35b8" : "rgba(122,53,184,0.2)", opacity: heroSlide === i ? 1 : 0.55 }}
                >
                  <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroSlide(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: heroSlide === i ? "24px" : "6px",
                    height: "6px",
                    background: heroSlide === i ? "#7a35b8" : "rgba(122,53,184,0.35)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo("Services")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#f5e500]">Scroll</span>
          <ChevronDown size={16} className="text-[#f5e500] animate-bounce" />
        </button>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="relative py-32" style={{ background: v("site-bg") }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${v("site-gold")}, transparent)`, opacity: 0.35 }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 opacity-60" style={{ background: "#f5d894" }} />
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#f5d894" }}>ART IN THREE WAYS. ONE VISION.</span>
              <div className="h-px w-12 opacity-60" style={{ background: "#f5d894" }} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              Collectors' <em className="italic" style={{ color: v("site-gold") }}>Options</em>
            </h2>
            <p className="text-sm leading-relaxed max-w-xl mx-auto mt-4 font-light" style={{ color: v("site-muted") }}>
              Every artwork is a story, a moment, a piece of the artist's heart.
              Choose the way you want to own it.
              Each option is created with quality, authenticity, and exclusivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.label}
                className={`relative group border rounded-2xl p-8 transition-all duration-500 cursor-pointer ${i === 1 ? "md:-mt-6 md:mb-6" : ""}`}
                style={{
                  background:  v("site-card"),
                  borderColor: v("site-border"),
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = v("site-teal"))}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = v("site-border"))}
                onClick={() => setSelectedService(svc)}
              >
                {/* top gradient accent on hover */}
                <div
                  className="absolute top-0 left-8 right-8 h-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${v("site-teal")}, transparent)` }}
                />

                <div className="mb-5" style={{ color: v("site-text") }}>
                  <svc.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-normal mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {svc.label}
                </h3>
                <p className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: v("site-gold") }}>{svc.tagline}</p>
                <p className="text-sm leading-relaxed mb-6 font-light" style={{ color: v("site-muted") }}>{svc.description}</p>

                <ul className="space-y-2 mb-8">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs opacity-80" style={{ color: v("site-text") }}>
                      <span className="text-[8px]" style={{ color: v("site-gold") }}>◆</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col items-center gap-4 border-t pt-6" style={{ borderColor: v("site-divider") }}>
                  <div className="flex flex-col items-center text-center">
                    <span className="font-semibold tracking-wide" style={{ color: "#f5d894" }}>{svc.price}</span>
                    {svc.priceNote && (
                      <span className="text-[10px] font-light mt-1 opacity-80" style={{ color: "#f5d894" }}>{svc.priceNote}</span>
                    )}
                  </div>
                  <button
                    className="text-[10px] tracking-[0.2em] uppercase transition-colors"
                    style={{ color: v("site-text") }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = v("site-teal"))}
                    onMouseLeave={(e) => (e.currentTarget.style.color = v("site-text"))}
                    onClick={() => scrollTo("Contact Us")}
                  >
                    Inquire →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <button
              onClick={() => scrollTo("Portfolio")}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300"
              style={{ borderColor: "#f5d894", color: "#f5d894" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = v("site-teal"); e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = v("site-teal"); }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f5d894"; }}
            >
              View Portfolio
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-32" style={{ background: v("site-bg-alt") }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 opacity-60" style={{ background: "#f5d894" }} />
                <span className="text-[12px] tracking-[0.4em] uppercase" style={{ color: "#f5d894" }}>Portfolio</span>
              </div>
              <h2 className="text-6xl lg:text-7xl font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                Selected <em className="italic" style={{ color: v("site-gold") }}>Works</em>
              </h2>
            </div>
            <button
              className="hidden md:block text-[12px] tracking-[0.3em] uppercase border-b pb-1 transition-colors"
              style={{ color: v("site-muted"), borderColor: v("site-border") }}
              onMouseEnter={(e) => (e.currentTarget.style.color = v("site-teal"))}
              onMouseLeave={(e) => (e.currentTarget.style.color = v("site-muted"))}
            >
              View Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {ARTWORKS.map((art) => (
              <button
                key={art.id}
                type="button"
                onClick={() => setSelectedArtwork(art)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[var(--site-teal)]"
                aria-label={`View details for ${art.title}`}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-2xl" style={{ background: v("site-card") }}>
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, ${v("site-bg")} 0%, transparent 60%)` }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[11px] tracking-[0.3em] uppercase mb-1" style={{ color: v("site-gold") }}>
                      {art.medium} · {art.year}
                    </p>
                    <p style={{ fontFamily: "'Playfair Display', serif", color: v("site-text") }} className="text-2xl italic">
                      {art.title}
                    </p>
                  </div>
                  <div
                    className="absolute top-3 right-3 w-6 h-6 border-t border-r opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ borderColor: v("site-teal") }}
                  />
                  <div
                    className="absolute bottom-3 left-3 w-6 h-6 border-b border-l opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ borderColor: v("site-teal") }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES POPUP ── */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
          onClick={() => setSelectedService(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border p-8 lg:p-12"
            style={{ background: v("site-card"), borderColor: v("site-border") }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute right-6 top-6 text-muted-foreground hover:text-foreground"
              style={{ color: v("site-muted") }}
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex flex-col items-center px-6 py-2 rounded-2xl mb-6 border" style={{ borderColor: "#f5d894", color: "#f5d894" }}>
                <span className="text-2xl font-bold">{selectedService.price}</span>
                {selectedService.priceNote && (
                  <span className="text-[13px] font-normal mt-1 max-w-[220px] leading-tight opacity-90">
                    {selectedService.priceNote}
                  </span>
                )}
              </div>
              <div className="mb-4" style={{ color: v("site-text") }}>
                <selectedService.icon size={56} strokeWidth={1.2} />
              </div>
              <h3 className="text-5xl font-normal mb-2" style={{ fontFamily: "'Playfair Display', serif", color: v("site-text") }}>
                {selectedService.label}
              </h3>
              <p className="text-[13px] tracking-[0.3em] uppercase" style={{ color: v("site-gold") }}>{selectedService.tagline}</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {selectedService.tags.map(tag => (
                <span key={tag} className="text-[12px] uppercase tracking-wider px-3 py-1 rounded-md border" style={{ borderColor: v("site-divider"), color: v("site-muted") }}>
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-lg leading-relaxed mb-8 text-center font-light" style={{ color: v("site-muted") }}>
              {selectedService.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {selectedService.features.map(feature => (
                <div key={feature} className="flex items-center gap-3 text-sm" style={{ color: v("site-text") }}>
                  <div className="h-1 w-1 rounded-full" style={{ background: v("site-teal") }} />
                  {feature}
                </div>
              ))}
            </div>

            <button
              onClick={() => { setSelectedService(null); scrollTo("Contact Us"); }}
              className="w-full py-4 rounded-xl text-base font-semibold uppercase tracking-[0.25em] transition-all"
              style={{ background: v("site-gold"), color: "white" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = v("site-teal"))}
              onMouseLeave={(e) => (e.currentTarget.style.background = v("site-gold"))}
            >
              Book this Service
            </button>
          </div>
        </div>
      )}

      {/* ── POLICY POPUP ── */}
      {activePolicy && POLICY_DATA[activePolicy] && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
          onClick={() => setActivePolicy(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border p-8 lg:p-10"
            style={{ background: v("site-card"), borderColor: v("site-border") }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePolicy(null)}
              className="absolute right-6 top-6 text-muted-foreground hover:text-foreground"
              style={{ color: v("site-muted") }}
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-normal mb-6" style={{ fontFamily: "'Playfair Display', serif", color: v("site-text") }}>
              {POLICY_DATA[activePolicy].title}
            </h3>

            <p className="text-sm leading-relaxed font-light" style={{ color: v("site-muted") }}>
              {POLICY_DATA[activePolicy].content}
            </p>
          </div>
        </div>
      )}

      {/* ── SUCCESS POPUP ── */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border p-10 text-center"
            style={{ background: v("site-card"), borderColor: v("site-border") }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: v("site-gold-dim"), color: v("site-teal") }}
            >
              <Check size={32} />
            </div>
            
            <h3 className="mb-2 text-2xl font-normal" style={{ fontFamily: "'Playfair Display', serif", color: v("site-text") }}>
              Inquiry Sent
            </h3>
            
            <p className="mb-8 text-sm leading-relaxed font-light" style={{ color: v("site-muted") }}>
              Your message has been received. We will get back to you soon.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] transition-all"
              style={{ background: v("site-gold"), color: "white" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = v("site-teal"))}
              onMouseLeave={(e) => (e.currentTarget.style.background = v("site-gold"))}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── ERROR POPUP ── */}
      {showError && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
          onClick={() => setShowError(false)}
        >
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border p-10 text-center"
            style={{ background: v("site-card"), borderColor: v("site-border") }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}
            >
              <AlertCircle size={32} />
            </div>
            
            <h3 className="mb-2 text-2xl font-normal" style={{ fontFamily: "'Playfair Display', serif", color: v("site-text") }}>
              Something went wrong
            </h3>
            
            <p className="mb-8 text-sm leading-relaxed font-light" style={{ color: v("site-muted") }}>
              We couldn't send your inquiry. Please try again later or contact us directly via email.
            </p>

            <button
              onClick={() => setShowError(false)}
              className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] transition-all"
              style={{ background: "#ef4444", color: "white" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedArtwork && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6 lg:px-8"
          style={{ background: dark ? "rgba(5,0,10,0.82)" : "rgba(26,0,48,0.45)", backdropFilter: "blur(14px)" }}
          onClick={() => setSelectedArtwork(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="artwork-detail-title"
        >
          <div
            className="relative grid max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border lg:grid-cols-[1.1fr_0.9fr]"
            style={{ background: v("site-card"), borderColor: v("site-border") }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedArtwork(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-all"
              style={{ background: v("site-card"), borderColor: v("site-border"), color: v("site-gold") }}
              aria-label="Close artwork details"
            >
              <X size={18} />
            </button>

            <div className="min-h-[320px] overflow-hidden lg:min-h-[620px]">
              <img
                src={selectedArtwork.img}
                alt={selectedArtwork.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="overflow-y-auto p-8 lg:p-12">
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px w-12 opacity-60" style={{ background: "#f5d894" }} />
                <span className="text-[12px] tracking-[0.4em] uppercase" style={{ color: "#f5d894" }}>
                  Selected Work
                </span>
              </div>

              <h3
                id="artwork-detail-title"
                className="mb-4 text-6xl font-normal leading-tight lg:text-7xl"
                style={{ fontFamily: "'Playfair Display', serif", color: v("site-text") }}
              >
                {selectedArtwork.title}
              </h3>

              <p className="mb-8 text-lg leading-relaxed font-light" style={{ color: v("site-muted") }}>
                {selectedArtwork.description}
              </p>

              <div className="grid gap-4 border-y py-6" style={{ borderColor: v("site-divider") }}>
                {[
                  ["Medium", selectedArtwork.medium],
                  ["Made Date", selectedArtwork.madeDate],
                  ["Year", selectedArtwork.year],
                  ["Dimensions", selectedArtwork.dimensions],
                  ["Availability", selectedArtwork.availability],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-6">
                    <span className="text-[12px] uppercase tracking-[0.25em]" style={{ color: "#00c4b4" }}>{label}</span>
                    <span className="text-right text-sm" style={{ color: "#f5d894" }}>{value}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedArtwork(null);
                  setTimeout(() => scrollTo("Contact Us"), 120);
                }}
                className="mt-8 inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold uppercase tracking-[0.25em] transition-colors"
                style={{ background: v("site-gold"), color: "white" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = v("site-teal"))}
                onMouseLeave={(e) => (e.currentTarget.style.background = v("site-gold"))}
              >
                Inquire About This Piece
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ABOUT US ── */}
      <section id="about-us" className="relative py-32 overflow-hidden" style={{ background: v("site-bg") }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${v("site-gold")}, transparent)`, opacity: 0.3 }} />

        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-bold select-none pointer-events-none leading-none"
          style={{ fontFamily: "'Playfair Display', serif", color: v("site-big-text") }}
        >
          ART
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square relative max-w-lg mx-auto lg:ml-0">
              <div
                className="absolute inset-0 border rounded-2xl translate-x-6 translate-y-6 opacity-30"
                style={{ borderColor: v("site-gold") }}
              />
              <img
                src={profile}
                alt="Artist at work"
                className="w-full h-full object-cover relative z-10 rounded-2xl"
              />
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 opacity-60" style={{ background: "#f5d894" }} />
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#f5d894" }}>About the Artist</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-normal mb-6 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
              Where Passion
              <br />
              <em className="italic" style={{ color: v("site-gold") }}>Meets Mastery</em>
            </h2>

            <p className="text-lg leading-relaxed mb-6 font-light" style={{ color: v("site-muted") }}>
              With over a decade of dedicated practice across oil, acrylic, and mixed media,
              my work explores the tension between silence and movement—the moment a thought
              becomes form. Each piece is an invitation into that liminal space.
            </p>

            <p className="text-lg leading-relaxed mb-10 font-light" style={{ color: v("site-muted") }}>
              Trained at the Manila Fine Arts Institute and later at the Florence Academy of Art,
              I bring both classical discipline and contemporary vision to every canvas. My works
              have been exhibited in galleries across Southeast Asia and Europe.
            </p>

            <div className="grid grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: v("site-divider") }}>
              {[["12+", "Years"], ["200+", "Artworks"], ["40+", "Collectors"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-5xl font-normal mb-1" style={{ fontFamily: "'Playfair Display', serif", color: v("site-teal") }}>
                    {num}
                  </p>
                  <p className="text-[12px] tracking-[0.3em] uppercase" style={{ color: v("site-muted") }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

            {/* TESTIMONIALS */}
      <section id="testimonials" className="relative py-32 overflow-hidden" style={{ background: v("site-bg-2") }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${v("site-gold")}, transparent)`, opacity: 0.3 }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 opacity-60" style={{ background: "#f5d894" }} />
                <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#f5d894" }}>Testimonials</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                Collector <em className="italic" style={{ color: v("site-gold") }}>Impressions</em>
              </h2>
            </div>
          </div>

          <div className="relative -mx-6 lg:-mx-12 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20" style={{ background: `linear-gradient(to right, ${v("site-bg-2")}, transparent)` }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20" style={{ background: `linear-gradient(to left, ${v("site-bg-2")}, transparent)` }} />
            <div
              className="flex w-max gap-6 px-6 lg:px-12"
              style={{ animation: "testimonial-marquee 34s linear infinite" }}
            >
              {[...TESTIMONIALS, ...TESTIMONIALS].map((item, i) => (
                <article
                  key={`${item.name}-${i}`}
                  className="flex min-h-[295px] w-[320px] shrink-0 flex-col justify-between rounded-2xl border p-7 sm:w-[380px]"
                  style={{ background: v("site-card"), borderColor: v("site-border") }}
                >
                  <div>
                    <div className="mb-7 flex items-center justify-between gap-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, star) => (
                          <Star key={star} size={15} fill="currentColor" style={{ color: "yellow" }} />
                        ))}
                      </div>
                      <span
                        className="rounded-full border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
                        style={{ borderColor: v("site-gold"), color: v("site-gold"), background: v("site-gold-dim") }}
                      >
                        {item.role}
                      </span>
                    </div>

                    <p className="mb-4 text-lg font-semibold leading-relaxed" style={{ color: v("site-text") }}>
                      "{item.description}"
                    </p>

                    <p className="text-sm italic" style={{ fontFamily: "'Playfair Display', serif", color: v("site-gold") }}>
                      {item.title}
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between border-t pt-5" style={{ borderColor: v("site-divider") }}>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: v("site-text") }}>{item.name}</p>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: v("site-gold") }}>SNØVA Client</p>
                    </div>
                    <span className="h-2.5 w-2.5 rounded-full shadow-[0_0_18px_rgba(122,53,184,0.3)]" style={{ background: v("site-gold") }} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact-us" className="relative py-32" style={{ background: v("site-bg") }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${v("site-gold")}, transparent)`, opacity: 0.3 }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 opacity-60" style={{ background: "#f5d894" }} />
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#f5d894" }}>Get in Touch</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal mb-6 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
              Acquire a Piece of
              <br />
              <em className="italic" style={{ color: v("site-gold") }}>Your Story</em>
            </h2>
            <p className="text-lg leading-relaxed mb-10 font-light max-w-sm" style={{ color: v("site-muted") }}>
              Whether you are a first-time collector or an established patron, every inquiry is
              treated with personal attention. Reach out to discuss availability, commissions, or
              studio visits.
            </p>

            <div className="space-y-5">
              {[
                { icon: <Mail size={16} />, label: "snvaselect.art@gmail.com" },
                { icon: <Phone size={16} />, label: "+63 917 000 0000" },
                { icon: <MapPin size={16} />, label: "Quezon City, Metro Manila, Philippines" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-4 text-sm" style={{ color: v("site-muted") }}>
                  <span style={{ color: v("site-gold") }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Form — shadcn-style card */}
          <form
            ref={formRef}
            className="flex flex-col gap-5 border rounded-2xl p-8"
            style={{ background: v("site-card"), borderColor: v("site-border") }}
            onSubmit={handleSubmit}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "#f5d894" }}>Name</label>
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="Your full name"
                  className="w-full rounded-xl px-4 py-3 text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--site-ring-focus)]"
                  style={{
                    background:   v("site-input-bg"),
                    borderColor:  "#f5d894",
                    color:        v("site-text"),
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = v("site-teal"); }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "#f5d894"; }}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "#f5d894" }}>Email</label>
                <input
                  type="email"
                  name="reply_to"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-xl px-4 py-3 text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--site-ring-focus)]"
                  style={{
                    background:  v("site-input-bg"),
                    borderColor: "#f5d894",
                    color:       v("site-text"),
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = v("site-teal"); }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "#f5d894"; }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "#f5d894" }}>Interest</label>
              <select
                name="interest"
                required
                className="w-full rounded-xl px-4 py-3 text-sm border transition-all focus:outline-none appearance-none"
                style={{
                  background:  v("site-input-bg"),
                  borderColor: "#f5d894",
                  color:       v("site-text"),
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = v("site-teal"); }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "#f5d894"; }}
              >
                <option value="">Select acquisition type</option>
                <option>Collector's Poster Edition</option>
                <option>Signature Framed Edition</option>
                <option>Original Masterpiece</option>
                <option>Custom Commission</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "#f5d894" }}>Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about the artwork you are looking for..."
                className="w-full rounded-xl px-4 py-3 text-sm border transition-all focus:outline-none resize-none"
                style={{
                  background:  v("site-input-bg"),
                  borderColor: "#f5d894",
                  color:       v("site-text"),
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = v("site-teal"); }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "#f5d894"; }}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className={`self-start inline-flex items-center gap-2 px-10 py-3.5 rounded-xl text-xs tracking-[0.3em] uppercase font-semibold active:scale-[0.98] transition-all duration-200 ${sending ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                background: v("site-gold"),
                color:      "white",
                boxShadow:  `0 4px 20px ${v("site-gold-dim")}`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = v("site-teal"))}
              onMouseLeave={(e) => (e.currentTarget.style.background = v("site-gold"))}
            >
              {sending ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: v("site-bg-alt"), borderTop: `1px solid ${v("site-divider")}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <img src={logo} alt="SNØVA Logo" className="h-10 w-auto object-contain" />
                <span
                  className="text-2xl font-light"
                  style={{ fontFamily: "'Cormorant Unicase', serif", color: v("site-gold"), letterSpacing: "0.25em" }}
                >
                  SNØVA
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: v("site-muted") }}>Art Studio</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs font-light mt-4" style={{ color: v("site-muted") }}>
                Creating artworks that endure. Available as originals, replicas, and museum-quality
                prints for collectors and art lovers worldwide.
              </p>
              <div className="flex gap-4 mt-6">
                {[
                  { Icon: Instagram, href: "#" },
                  { Icon: Facebook,  href: "https://www.facebook.com/artsbysnva" },
                  { Icon: Twitter,   href: "#" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ borderColor: v("site-border"), color: v("site-gold") }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = v("site-gold"); e.currentTarget.style.borderColor = v("site-border-hover"); }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = v("site-muted"); e.currentTarget.style.borderColor = v("site-border"); }}
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: v("site-gold") }}>Navigation</p>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(link)}
                      className="text-sm transition-colors"
                      style={{ color: v("site-muted") }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = v("site-text"))}
                      onMouseLeave={(e) => (e.currentTarget.style.color = v("site-muted"))}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: v("site-gold") }}>Acquire Art</p>
              <ul className="space-y-3">
                {["Collector's Poster Edition", "Signature Framed Edition", "Original Masterpiece", "Custom Commissions"].map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => scrollTo("Contact Us")}
                      className="text-sm transition-colors"
                      style={{ color: v("site-muted") }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = v("site-text"))}
                      onMouseLeave={(e) => (e.currentTarget.style.color = v("site-muted"))}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: v("site-divider") }}>
            <p className="text-[11px] tracking-wide" style={{ color: v("site-muted"), opacity: 0.6 }}>
              © {new Date().getFullYear()} SNØVA Fine Art Studio. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Sale", "Shipping Info"].map((link) => (
                <button
                  key={link}
                  className="text-[11px] tracking-wide transition-colors"
                  onClick={() => setActivePolicy(link)}
                  style={{ color: v("site-muted"), opacity: 0.6 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
