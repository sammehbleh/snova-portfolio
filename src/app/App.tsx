import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Menu, X, ChevronDown, Star, Mail, MapPin, Instagram, Facebook, Twitter, Sun, Moon, Check, AlertCircle, Printer, Frame, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";
import heroBg from "../imports/image.png";
import logo from "../img/snovalogo.png";
import profile from "../img/profile.jpg";
import authenticityImg from "../img/authenticity.jpg";
import seriesOneImg from "../img/wip.jpg";
import { DARK, LIGHT, applyTokens, v } from "./theme";
import { FEATURED_ARTWORKS as ARTWORKS } from "./data/artworks";

const NAV_LINKS = ["Home", "Services", "Portfolio", "About Us", "Testimonials", "Contact Us"];

/* Toggle to re-enable the artwork detail modal from the showcase grids */
const ARTWORK_DETAIL_ENABLED = true;

const SERVICES = [
  {
    label: "Collector's Poster Edition",
    icon: Printer,
    tagline: "An affordable collectible piece",
    description:
      "Printed copy of the original artwork limited to authenticated copies in 2 x 2.5ft. (size will depend on the artwork’s size without changing the orientation and overall size)", // Description from prompt
    features: ["Premium poster print", "Artist's signature", "Limited to 7 Copies", "Artwork details on the reverse side", "Authenticity Card", "3-Day Creation", "Note: An affordable way to own a collectible piece from the collection."],
    tags: ["Collectible", "Limited Edition", "Affordable"]
  },
  {
    label: "Collector's Replica Framed Edition",
    icon: Frame,
    tagline: "Gallery-inspired presentation",
    description:
      "Full-size reproduction matching the original artwork.", // Concise description, details in features
    features: ["Full-size printed reproduction matching the original artwork", "Limited to 7 Copies", "With Frame", "Artist's signature", "Artwork details on the reverse side", "Authenticity Card", "3-Day Creation", "Note: Designed for collectors seeking a gallery-inspired presentation."],
    tags: ["Framed", "Reproduction", "Limited Edition", "Customizable"],
    priceNote: "(Price varies depending on frame selection and artwork size.)"
  },
  {
    label: "Original Masterpiece",
    icon: Sparkles,
    tagline: "One-of-a-Kind Originals",
    description:
      "Own a singular, irreplaceable piece. Each original artwork is a unique expression—no two are alike. Comes with full provenance documentation and lifetime artist support.",
    features: ["original artwork/painting itself", "Full provenance papers", "Artist-signed & dated", "3-Day Shipping Process", "Collector investment value"],
    tags: ["Exclusive", "One-of-a-kind", "Investment"]
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

const HERO_SLIDES = ARTWORKS.map((art) => ({
  img: art.img,
  title: art.title,
  medium: art.medium,
}));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeSection, setActive] = useState("Home");
  const [dark, setDark]           = useState(true);
  const [heroSlide, setHeroSlide] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState<(typeof ARTWORKS)[number] | null>(null);
  const [selectedService, setSelectedService] = useState<(typeof SERVICES)[number] | null>(null);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [authenticityOpen, setAuthenticityOpen] = useState(false);

  useEffect(() => {
    applyTokens(dark ? DARK : LIGHT);
    document.documentElement.style.setProperty("--site-scheme", dark ? "dark" : "light");
  }, [dark]);

  // Scroll to the section named in the URL hash when arriving from another
  // page (e.g. the Collection page links here via "/#contact-us").
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, [location.hash]);

  useEffect(() => {
    // Switch the floating/opaque nav style only once the hero has mostly scrolled
    // out of view, so it never sits as a solid block over the hero heading.
    const onScroll = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      setScrolled(heroBottom < 90);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
        form,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "" }
      )
    .then(() => {
      setShowSuccess(true);
      form.reset();
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
                  SNØVA Select
                </span>
              </div>
              <span className="text-[9px] tracking-[0.3em] uppercase -mt-0.5 transition-colors duration-300" style={{ color: scrolled ? v("site-muted") : "rgba(245, 229, 0, 0.8)" }}>
               Art Website
              </span>
            </div>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-4 lg:gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link} className={link === "Testimonials" ? "hidden" : undefined}>
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
                  className={`text-left text-sm tracking-[0.2em] uppercase transition-colors ${link === "Testimonials" ? "hidden" : ""}`}
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
      <section ref={heroRef} id="home" className="relative min-h-[100svh] lg:min-h-screen flex items-center overflow-hidden">
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

        <div className="relative w-full max-w-[1500px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-16 pt-24 pb-10 lg:pt-32 lg:pb-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 xl:gap-16 items-center">
          <div>
            {/* Hero text always uses fixed light colours — never theme vars */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
              <div className="h-px w-10 sm:w-14 bg-[#f5e500]" />
              <span className="text-[10px] sm:text-[11px] lg:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#f5e500]">
                Original · Replica · Print
              </span>
            </div>

            <h1
              className="text-[2.6rem] leading-[1.05] sm:text-6xl sm:leading-[1.03] lg:text-8xl xl:text-[6.8rem] font-normal mb-4 sm:mb-7 lg:mb-8 text-[#f0e6d3]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              When <br></br>
              <em className="italic text-[#f5e500]">Creativity </em>Becomes
              <br />
              <em className="italic text-[#f5e500]">Visual</em>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mb-6 sm:mb-9 lg:mb-10 font-light text-[#c8b8a8]">
              Every piece carries a story. From collector-grade originals to museum-quality prints,
              discover works that transform your space into a living gallery.
            </p>

            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <button
                onClick={() => scrollTo("Services")}
                className="px-7 py-3.5 sm:px-9 sm:py-4 lg:px-10 lg:py-5 text-[11px] sm:text-xs lg:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase font-semibold bg-[#f5e500] text-[#1e1c1c] hover:bg-[#00c4b4] hover:text-white transition-colors duration-300"
              >
                Explore Collection
              </button>
              <button
                onClick={() => scrollTo("About Us")}
                className="px-7 py-3.5 sm:px-9 sm:py-4 lg:px-10 lg:py-5 border border-[rgba(245, 229, 0, 0.5)] text-[#f5e500] hover:border-[#00c4b4] hover:text-[#00c4b4] text-[11px] sm:text-xs lg:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-colors duration-300"
              >
                Meet the Artist
              </button>
            </div>

            <div className="mt-8 sm:mt-10 lg:hidden">
              <div className="relative">
                <div className="absolute inset-0 translate-x-3 translate-y-3 border rounded-2xl border-[rgba(122,53,184,0.3)]" />
                <div className="relative aspect-[5/6] max-h-[36vh] sm:max-h-[40vh] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.35)] z-10">
                  {HERO_SLIDES.map((slide, i) => (
                    <img
                      key={i}
                      src={slide.img}
                      alt={slide.title}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                      style={{ opacity: heroSlide === i ? 1 : 0 }}
                    />
                  ))}
                  <div
                    className="absolute inset-x-0 bottom-0 p-4 sm:p-5"
                    style={{ background: "linear-gradient(to top, rgba(4,0,10,0.92) 0%, transparent 100%)" }}
                  >
                    <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase mb-1 text-[#7a35b8]">
                      {HERO_SLIDES[heroSlide].medium}
                    </p>
                    <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-base sm:text-lg italic text-[#f0e6d3]">
                      {HERO_SLIDES[heroSlide].title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: heroSlide === i ? "22px" : "6px",
                      height: "6px",
                      background: heroSlide === i ? "#7a35b8" : "rgba(122,53,184,0.35)",
                    }}
                  />
                ))}
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
          className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#f5e500]">Scroll</span>
          <ChevronDown size={16} className="text-[#f5e500] animate-bounce" />
        </button>
      </section>

      {/* ── SERIES SPOTLIGHT ── */}
      <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden" style={{ background: v("site-bg-alt") }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${v("site-gold")}, transparent)`, opacity: 0.3 }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:ml-auto">
              <div
                className="absolute inset-0 border rounded-2xl translate-x-4 -translate-y-4 opacity-30"
                style={{ borderColor: v("site-gold") }}
              />
              <img
                src={seriesOneImg}
                alt="Series 1: Verdant Cravings"
                className="relative z-10 w-full h-auto rounded-2xl"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
              <div className="h-px w-12 sm:w-14 opacity-60" style={{ background: "#f5e500" }} />
              <span className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase" style={{ color: "#f5e500" }}>
                Series 1
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal mb-6 sm:mb-7 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
              <em className="italic" style={{ color: "#1ABC9C" }}>Verdant Cravings</em>
            </h2>
            <p className="text-lg sm:text-xl leading-relaxed font-light max-w-md mb-6 sm:mb-7" style={{ color: v("site-muted") }}>
              Green color takes center stage. A love letter to green wrappers, guilty pleasures, and everyday bites.
            </p>
            <p className="text-sm sm:text-base uppercase tracking-[0.2em] sm:tracking-[0.25em]" style={{ color: v("site-gold") }}>
              Medium <span style={{ color: "#00c4b4" }}>Acrylic on Canvas, 1 x 1.5 ft</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="relative py-16 sm:py-24 lg:py-32" style={{ background: v("site-bg") }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${v("site-gold")}, transparent)`, opacity: 0.35 }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-14 lg:mb-20">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="h-px w-8 sm:w-12 opacity-60" style={{ background: "#f5d894" }} />
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase" style={{ color: "#f5d894" }}>ART IN THREE WAYS. ONE VISION.</span>
              <div className="h-px w-8 sm:w-12 opacity-60" style={{ background: "#f5d894" }} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              Collectors' <em className="italic" style={{ color: v("site-gold") }}>Options</em>
            </h2>
            <p className="text-sm leading-relaxed max-w-xl mx-auto mt-3 sm:mt-4 font-light" style={{ color: v("site-muted") }}>
              Every artwork is a story, a moment, a piece of the artist's heart.
              Choose the way you want to own it.
              Each option is created with quality, authenticity, and exclusivity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-8">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.label}
                className={`relative group border rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-500 cursor-pointer h-full flex flex-col justify-between ${i === 2 ? "col-span-2 md:col-span-1" : ""}`}
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

                <div className="flex-1">
                  <div className="mb-3 sm:mb-4 md:mb-5" style={{ color: v("site-text") }}>
                    <svc.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-normal mb-1 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {svc.label}
                  </h3>
                  <p className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-2 sm:mb-3 md:mb-4" style={{ color: v("site-gold") }}>{svc.tagline}</p>
                  <p className="hidden md:block text-base leading-relaxed mb-6 font-light" style={{ color: v("site-muted") }}>{svc.description}</p>
                  <p className="md:hidden text-xs leading-relaxed mb-3 font-light line-clamp-2" style={{ color: v("site-muted") }}>{svc.description}</p>

                  <ul className="hidden md:block space-y-2 mb-8">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm opacity-80" style={{ color: v("site-text") }}>
                        <span className="text-[8px]" style={{ color: v("site-gold") }}>◆</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 border-t pt-3 sm:pt-4 md:pt-6" style={{ borderColor: v("site-divider") }}>
                  <div className="flex flex-col items-center text-center">
                    {svc.priceNote && (
                      <span className="hidden md:block text-[10px] font-light mt-1 opacity-80" style={{ color: "#f5d894" }}>{svc.priceNote}</span>
                    )}
                  </div>
                  <button
                    className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors"
                    style={{ color: v("site-text") }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = v("site-teal"))}
                    onMouseLeave={(e) => (e.currentTarget.style.color = v("site-text"))}
                    onClick={(e) => { e.stopPropagation(); scrollTo("Contact Us"); }}
                  >
                    Inquire →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-4">
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
            <button
              onClick={() => setAuthenticityOpen(true)}
              className="hidden items-center gap-3 px-8 py-4 rounded-xl border text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300"
              style={{ borderColor: "#f5d894", color: "#f5d894" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = v("site-teal"); e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = v("site-teal"); }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#f5d894"; }}
            >
              S`ample authenticity card
              <Sparkles size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-16 sm:py-24 lg:py-32" style={{ background: v("site-bg-alt") }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10 sm:mb-14 lg:mb-16">
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="h-px w-10 sm:w-12 opacity-60" style={{ background: "#f5d894" }} />
                <span className="text-[10px] sm:text-[12px] tracking-[0.3em] sm:tracking-[0.4em] uppercase" style={{ color: "#f5d894" }}>Portfolio</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                Selected <em className="italic" style={{ color: v("site-gold") }}>Works</em>
              </h2>
            </div>
            <button
              onClick={() => navigate("/collection")}
              className="hidden md:block text-[12px] tracking-[0.3em] uppercase border-b pb-1 transition-colors"
              style={{ color: v("site-muted"), borderColor: v("site-border") }}
              onMouseEnter={(e) => (e.currentTarget.style.color = v("site-teal"))}
              onMouseLeave={(e) => (e.currentTarget.style.color = v("site-muted"))}
            >
              View Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            {ARTWORKS.map((art) => (
              <button
                key={art.id}
                type="button"
                onClick={() => { if (ARTWORK_DETAIL_ENABLED) setSelectedArtwork(art); }}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl text-left focus:outline-none ${ARTWORK_DETAIL_ENABLED ? "cursor-pointer focus:ring-2 focus:ring-[var(--site-teal)]" : "cursor-default"}`}
                aria-label={art.category}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-xl sm:rounded-2xl" style={{ background: v("site-card") }}>
                  <img
                    src={art.img}
                    alt={art.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div
                    className="absolute inset-0 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, ${v("site-bg")} 0%, transparent 60%)` }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 translate-y-0 sm:translate-y-4 opacity-100 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p
                      className="inline-block rounded-full border px-3 py-1.5 text-[10px] sm:text-[12px] tracking-[0.25em] sm:tracking-[0.3em] uppercase backdrop-blur-md"
                      style={{ color: "#f5e500", background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}
                    >
                      {art.category}
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

          <div className="mt-10 flex justify-center md:hidden">
            <button
              onClick={() => navigate("/collection")}
              className="text-[12px] tracking-[0.3em] uppercase border-b pb-1 transition-colors"
              style={{ color: v("site-muted"), borderColor: v("site-border") }}
            >
              View Full Collection →
            </button>
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

      {/* ── AUTHENTICITY CARD POPUP ── */}
      {authenticityOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
          onClick={() => setAuthenticityOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border p-6 text-center"
            style={{ background: v("site-card"), borderColor: v("site-border") }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setAuthenticityOpen(false)}
              className="absolute right-6 top-6 text-muted-foreground hover:text-foreground"
              style={{ color: v("site-muted") }}
            >
              <X size={24} />
            </button>
            <img
              src={authenticityImg}
              alt="Sample Authenticity Card"
              className="w-full h-auto max-h-[70vh] rounded-xl object-contain mt-4"
            />
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

            <div className="min-h-[240px] sm:min-h-[320px] overflow-hidden lg:min-h-[620px]">
              <img
                src={selectedArtwork.img}
                alt={selectedArtwork.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="overflow-y-auto p-6 sm:p-8 lg:p-12">
              <div className="mb-5 sm:mb-8 flex items-center gap-3 sm:gap-4">
                <div className="h-px w-10 sm:w-12 opacity-60" style={{ background: "#f5d894" }} />
                <span className="text-[10px] sm:text-[12px] tracking-[0.3em] sm:tracking-[0.4em] uppercase" style={{ color: "#f5d894" }}>
                  Selected Work
                </span>
              </div>

              <h3
                id="artwork-detail-title"
                className="mb-3 sm:mb-4 text-3xl sm:text-5xl font-normal leading-tight lg:text-7xl"
                style={{ fontFamily: "'Playfair Display', serif", color: v("site-text") }}
              >
                {selectedArtwork.title}
              </h3>

              <div className="grid gap-3 sm:gap-4 border-y py-5 sm:py-6" style={{ borderColor: v("site-divider") }}>
                {[
                  ["Medium", selectedArtwork.medium],
                  ["Dimensions", selectedArtwork.dimensions],
                  ["Availability", selectedArtwork.availability],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-6">
                    <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.25em]" style={{ color: "#00c4b4" }}>{label}</span>
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
                className="mt-6 sm:mt-8 inline-flex items-center justify-center rounded-xl px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-colors w-full sm:w-auto"
                style={{ background: v("site-gold"), color: "white" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = v("site-teal"))}
                onMouseLeave={(e) => (e.currentTarget.style.background = v("site-gold"))}
              >
                Inquire about re-creating this piece?
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
              <em className="italic" style={{ color: v("site-gold") }}>Where creativity becomes visual.</em>
            </h2>

            <p className="text-lg leading-relaxed mb-6 font-light" style={{ color: v("site-muted") }}>
              For over a decade, I have explored acrylic, oil, and mixed media, creating works
              that capture the space between imagination and expression. Each piece invites
              viewers into stories, emotions, and moments beyond the visible.
            </p>

            <p className="text-lg leading-relaxed mb-10 font-light" style={{ color: v("site-muted") }}>
              Guided by mentorship at BHNHS and refined through years of commissioned work,
              I bring a contemporary perspective and dedicated craftsmanship to every creation.
            </p>

            <div className="grid grid-cols-2 gap-6 border-t pt-8" style={{ borderColor: v("site-divider") }}>
              {[["89+", "Artworks"], ["27+", "Commissions"]].map(([num, label]) => (
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
      <section id="testimonials" className="hidden relative py-32 overflow-hidden" style={{ background: v("site-bg-2") }}>
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
              treated with personal attention. Reach out to discuss availability or commissions.
            </p>

            <div className="space-y-5">
              {[
                { icon: <Mail size={16} />, label: "snva.co@gmail.com" },
                { icon: <MapPin size={16} />, label: "Manila, Philippines" },
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
                  name="name"
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
                  name="email"
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
                <option>Collector's Replica Framed Edition</option>
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
                <span
                  className="text-2xl font-light"
                  style={{ fontFamily: "'Cormorant Unicase', serif", color: v("site-gold"), letterSpacing: "0.25em" }}
                >
                  SNØVA Select
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: v("site-muted") }}>Art Website</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs font-light mt-4" style={{ color: v("site-muted") }}>
                Creating artworks that endure. Available as originals, replicas, and museum-quality
                prints for collectors and art lovers worldwide.
              </p>
              <div className="flex gap-4 mt-6">
                {[
                  { Icon: Instagram, href: "https://www.instagram.com/snva.co/" },
                  { Icon: Facebook,  href: "https://www.facebook.com/artsbysnva" },
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
                  <li key={link} className={link === "Testimonials" ? "hidden" : undefined}>
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
                {["Collector's Poster Edition", "Collector's Replica Framed Edition", "Original Masterpiece", "Custom Commissions"].map((s) => (
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
