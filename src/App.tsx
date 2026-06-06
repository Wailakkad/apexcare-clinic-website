import { useState, useEffect, FormEvent, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Smile, 
  Calendar, 
  User, 
  Phone, 
  Info, 
  Sparkles, 
  CheckCircle,
  X,
  ArrowUpRight,
  Shield,
  Heart,
  Star,
  Mic,
  Video,
  PhoneOff,
  ChevronRight,
  Play,
  Plus,
  ArrowLeft,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail
} from "lucide-react";

export default function App() {
  const [activeLink, setActiveLink] = useState("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [aboutInView, setAboutInView] = useState(false);
  const [committedInView, setCommittedInView] = useState(false);
  const [featuresInView, setFeaturesInView] = useState(false);
  const [confidentInView, setConfidentInView] = useState(false);
  const [meetCareInView, setMeetCareInView] = useState(false);
  const [medicalServicesInView, setMedicalServicesInView] = useState(false);
  const [whyChooseUsInView, setWhyChooseUsInView] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [activeService, setActiveService] = useState(0); // Index of active service list row
  const [isConsultationClosed, setIsConsultationClosed] = useState(false);
  const [footerEmail, setFooterEmail] = useState("");
  
  const aboutRef = useRef<HTMLDivElement>(null);
  const committedRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const confidentRef = useRef<HTMLDivElement>(null);
  const meetCareRef = useRef<HTMLDivElement>(null);
  const medicalServicesRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Intersection observer hook for About Section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Intersection observer hook for Committed Section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCommittedInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (committedRef.current) {
      observer.observe(committedRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Intersection observer hook for Features & Services Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Intersection observer hook for Confident Smiles section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setConfidentInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (confidentRef.current) {
      observer.observe(confidentRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Intersection observer hook for Meet the People Who Care Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMeetCareInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (meetCareRef.current) {
      observer.observe(meetCareRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Intersection observer hook for Our Medical Services Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMedicalServicesInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (medicalServicesRef.current) {
      observer.observe(medicalServicesRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Intersection observer hook for Why Choose Us Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWhyChooseUsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (whyChooseUsRef.current) {
      observer.observe(whyChooseUsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Intersection observer hook for Contact Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContactInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    service: "Routine Cleaning",
    doctor: "Dr. Marcus Apex",
    date: "2026-06-15",
    time: "10:00 AM"
  });

  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    dateTime: "",
    service: "Family medicine",
    message: ""
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Dynamic state for statistics count up when Why Choose Us is in view
  const [stats, setStats] = useState({ exp: 0, areas: 0, satisfaction: 0, accuracy: 0 });
  useEffect(() => {
    if (whyChooseUsInView) {
      const startTime = Date.now();
      const duration = 1200; // ms
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setStats({
          exp: Math.floor(progress * 10),
          areas: Math.floor(progress * 15),
          satisfaction: Math.floor(progress * 95),
          accuracy: Math.floor(progress * 98)
        });

        if (progress === 1) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [whyChooseUsInView]);

  // Track if page is loaded to fire entrance slide-up trigger
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingStep(2);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    // Sync the local booking state too
    setBookingData({
      name: contactForm.name,
      phone: contactForm.phone,
      service: contactForm.service || "Family medicine",
      doctor: "Dr. Marcus Apex",
      date: contactForm.dateTime.split("T")[0] || "2026-06-15",
      time: contactForm.dateTime.split("T")[1] || "10:00 AM"
    });
  };

  const navLinks = ["Home", "About", "Care Services", "Pricing", "Contacts"];

  const services = [
    "General Checkup",
    "Teeth Whitening",
    "Routine Cleaning",
    "Cosmetic Veneers",
    "Invisible Aligners"
  ];

  const doctors = [
    "Dr. Marcus Apex (Chief Surgeon)",
    "Dr. Sophia Chen (Cosmetic Dentist)",
    "Dr. Elena Rostova (Pediatric Care)"
  ];

  return (
    <div className="relative min-h-screen bg-[#fafafd] flex flex-col antialiased selection:bg-apex-blue selection:text-white font-sans text-apex-navy">
      
      {/* HEADER NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 navbar-blur border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          
          {/* Logo with Snowflake/Asterisk sign */}
          <div className="flex items-center gap-2 group cursor-pointer" id="logo-container">
            <div className="w-9 h-9 rounded-xl bg-apex-blue/10 flex items-center justify-center text-apex-blue transition-transform duration-300 group-hover:rotate-45">
              {/* Symmetrical 8-pointed asterisk vector matching reference */}
              <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="3" x2="12" y2="21" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="5.64" y1="5.64" x2="18.36" y2="18.36" />
                <line x1="5.64" y1="18.36" x2="18.36" y2="5.64" />
              </svg>
            </div>
            <span className="font-sans font-extrabold text-2xl tracking-tight text-apex-navy">
              Apex<span className="text-apex-blue">Care</span>
            </span>
          </div>

          {/* Nav Links Center */}
          <nav className="hidden md:flex items-center space-x-8" id="nav-navigation">
            {navLinks.map((link) => {
              const isActive = activeLink === link;
              return (
                <button
                  key={link}
                  id={`nav-link-${link.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setActiveLink(link)}
                  className={`relative py-2 text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                    isActive 
                      ? "text-apex-blue font-bold" 
                      : "text-apex-navy hover:text-apex-blue/80"
                  }`}
                >
                  {link}
                  {/* Underline slide animation */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-apex-blue rounded-full transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Let's Talk CTA button */}
          <div id="nav-cta-container">
            <button
              onClick={() => {
                setBookingStep(1);
                setIsModalOpen(true);
              }}
              id="btn-nav-talk"
              className="group cursor-pointer py-2.5 px-6 rounded-full bg-gray-100/90 text-apex-navy hover:bg-gray-200/90 hover:text-apex-blue text-sm font-semibold transition-all duration-300 flex items-center gap-2 border border-gray-200/40 shadow-sm"
            >
              <span>Let's talk</span>
              <span className="w-4.5 h-4.5 rounded-full bg-apex-navy text-white flex items-center justify-center text-[10px] transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-grow pt-20 relative overflow-hidden">

        {/* Full-width hero with background image + gradient overlay */}
        <section
          className="relative min-h-[90vh] flex items-center w-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 35%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 80%), url("https://res.cloudinary.com/dhkyla1rv/image/upload/v1780654121/ChatGPT_Image_5_juin_2026_11_58_43.png")`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10 py-[120px]">
            <div className="max-w-[600px]">

              {/* Eyebrow label */}
              <div
                className={`inline-flex items-center gap-1.5 uppercase tracking-[0.15em] text-[12px] font-semibold text-apex-gray/90 bg-gray-100/80 px-3.5 py-1.5 rounded-full border border-gray-200/30 mb-6 transition-all duration-700 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-apex-blue fill-apex-blue/20" />
                <span>#1 Dental Centre</span>
              </div>

              {/* Headline */}
              <h1
                className={`text-[36px] md:text-[64px] leading-[1.05] font-sans font-bold text-apex-navy tracking-tight transition-all duration-800 delay-100`}
                style={{
                  transform: isLoaded ? "translateY(0)" : "translateY(24px)",
                  opacity: isLoaded ? 1 : 0,
                  transitionProperty: "transform, opacity",
                }}
              >
                <span className="block font-black">Brighten your</span>
                <span className="block mt-1">
                  smile with <span className="font-serif italic font-normal tracking-wide text-[#33469e]">expert</span>
                </span>
                <span className="block font-serif italic font-normal text-apex-navy/95 mt-1">
                  dental care
                </span>
              </h1>

              {/* Paragraph */}
              <p
                className="mt-8 text-[18px] leading-[1.6] text-apex-gray max-w-[480px] transition-all duration-800 delay-200"
                style={{
                  transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                  opacity: isLoaded ? 1 : 0,
                  transitionProperty: "transform, opacity",
                }}
              >
                Experience world-class dental services tailored to your unique wellness. Our state-of-the-art clinic pairs innovative treatments with gentle, personalized attention.
              </p>

              {/* CTA Button */}
              <div
                className="mt-10 transition-all duration-800 delay-300"
                style={{
                  transform: isLoaded ? "translateY(0)" : "translateY(16px)",
                  opacity: isLoaded ? 1 : 0,
                  transitionProperty: "transform, opacity",
                }}
              >
                <button
                  onClick={() => {
                    setBookingStep(1);
                    setIsModalOpen(true);
                  }}
                  className="group cursor-pointer inline-flex items-center gap-5 py-[18px] px-8 rounded-[999px] bg-apex-navy text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-apex-navy/20 hover:scale-[1.03] border border-white/10"
                >
                  <span className="text-base tracking-wide">Schedule your visit</span>
                  <span className="w-10 h-10 rounded-full bg-white text-apex-navy flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                    <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                  </span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* STATS CARDS */}
        <div
          id="stats-cards-section"
          className="w-full max-w-7xl mx-auto px-6 md:px-10 pb-6 -mt-20 relative z-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8 lg:py-4">

            {/* Card 1 */}
            <div
              id="card-caring-dentists"
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up select-none"
              style={{ animationDelay: "0ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-apex-blue/10 flex items-center justify-center text-apex-blue shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2A10 10 0 0 1 22 12c-2 0-3-1-3-3s.5-2-.5-4-3 .5-4-.5c0 1.5-.5 3.5-2.5 3.5S10 6 10 4.5c-1 1-3 .5-4 .5-1 2-.5 4-.5 4s-1 3-3 3a10 10 0 0 1 10-10Z" opacity="0.15" />
                    <path d="M12.1 22c-.6 0-1.2-.2-1.6-.6-.5-.5-.8-1.1-.9-1.8l-.5-3.3c-.1-.7-.4-1.3-.9-1.8l-1.3-1.3c-.6-.6-.9-1.4-.9-2.2V6.6c0-1.8 1.4-3.2 3.2-3.2h2.2c1.8 0 3.2 1.4 3.2 3.2v6.4c0 .8-.3 1.6-.9 2.2l-1.3 1.3c-.5.5-.8 1.1-.9 1.8l-.5 3.3c-.1.7-.4 1.3-.9 1.8-.4.4-1 .6-1.6.6ZM8.5 6.6v6.4a2 2 0 0 0 .6 1.4l1.3 1.3c.7.7 1.1 1.6 1.2 2.5l.5 3.3q.05.3.2.4a.5.5 0 0 0 .7 0q.15-.1.2-.4l.5-3.3c.1-.9.5-1.8 1.2-2.5l1.3-1.3a2 2 0 0 0 .6-1.4V6.6a1.2 1.2 0 0 0-1.2-1.2h-2.2c-.7 0-1.3.5-1.3 1.2Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-extrabold text-base text-apex-navy">Caring Dentists</span>
                  <span className="text-xs text-apex-gray font-medium mt-1">Your health and safety in secure trusted hands.</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              id="card-decorative-tool"
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up select-none overflow-hidden relative group"
              style={{ animationDelay: "150ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3b82f6] via-[#10b981] to-[#6ee7b7] opacity-10 group-hover:opacity-15 transition-opacity" />
              <div className="flex items-center justify-between h-full relative z-10 w-full">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B5BDB] to-[#10b981] text-white flex items-center justify-center shadow-md">
                    <span>🦷</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-sm text-apex-navy">Modern Dental Tools</span>
                    <span className="text-[11px] text-[#10b981] font-semibold flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Fully Sterilized
                    </span>
                  </div>
                </div>
                <div className="transform rotate-12 text-apex-blue/20 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              id="card-join-members"
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up select-none"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#c5cae9]/25 flex items-center justify-center text-apex-blue shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-extrabold text-lg text-apex-navy leading-tight">Join 5,000+</span>
                  <span className="text-xs text-apex-gray font-medium mt-1">satisfied members enjoying active family plans.</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div
              id="card-best-dentist"
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up select-none"
              style={{ animationDelay: "450ms" }}
            >
              <div className="flex items-start gap-3.5">
                <div className="text-2xl pt-1 shrink-0 select-none">👑</div>
                <div className="flex flex-col">
                  <span className="font-sans font-extrabold text-sm text-apex-navy leading-normal">
                    *Best dentist experience
                  </span>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-[10px] text-apex-gray ml-1 font-semibold">5.0 Rating</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* ABOUT / TRUSTED PARTNERS SECTION */}
      <section 
        ref={aboutRef}
        id="about-section" 
        className="w-full bg-[#f8f9ff] py-20 px-6 md:px-10 overflow-hidden relative select-none"
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-[60px]">
          
          {/* Left Column (45% Width) */}
          <div 
            id="about-left-column"
            className={`w-full md:w-[45%] flex flex-col items-start text-left transition-all duration-[800ms] ease-out ${
              aboutInView 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-[40px]"
            }`}
          >
            {/* Badge Label */}
            <span 
              id="about-badge"
              className="text-[11px] font-[600] tracking-[2px] text-gray-400 uppercase mb-4"
            >
              # ABOUT METIER
            </span>

            {/* Main Headline */}
            <h2 
              id="about-headline"
              className="text-[#1a1a2e] font-sans font-[800] text-3xl sm:text-[42px] leading-[1.2] mb-6 tracking-tight"
            >
              Your trusted partners <br className="hidden sm:inline" />in dental care
            </h2>

            {/* Paragraph Description */}
            <p 
              id="about-paragraph"
              className="text-sm text-[#555555] leading-[1.7] max-w-[380px] mb-9 font-medium"
            >
              At Metir, we believe that a healthy smile is a happy smile. Our dedicated team of professionals combines years of experience, cutting-edge technology, and a warm, caring atmosphere to ensure you get the best dental care possible.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => {
                setBookingStep(1);
                setIsModalOpen(true);
              }}
              id="btn-about-schedule"
              className="group cursor-pointer inline-flex items-center gap-4 justify-between bg-[#1a1a2e] text-[#ffffff] rounded-full py-3.5 px-6 font-semibold text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(26,26,46,0.3)] border border-transparent"
            >
              <span>Schedule your visit</span>
              
              {/* White arrow circle inside element */}
              <span className="w-6 h-6 rounded-full bg-[#30304a] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-sm">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </span>
            </button>
          </div>

          {/* Right Column (55% Width) */}
          <div 
            id="about-right-column"
            className={`w-full md:w-[55%] relative flex items-center justify-center transition-all duration-[800ms] ease-out ${
              aboutInView 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-[40px]"
            }`}
          >
            {/* Outer Decorative Ring Container (Hidden on mobile) */}
            <div className="absolute w-[420px] h-[420px] border-[1.5px] border-[#cccccc] border-dashed rounded-full z-0 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
              
              {/* Badge 1 - TOP RIGHT of Ring */}
              <div 
                id="ring-badge-top-right"
                className="absolute top-[10px] right-[10px] w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#3B5BDB] font-extrabold z-10 border border-gray-100 hover:scale-110 transition-transform duration-300"
              >
                <span className="text-xl">🦷</span>
              </div>

              {/* Badge 2 - BOTTOM CENTER/RIGHT of Ring */}
              <div 
                id="ring-badge-bottom-center"
                className="absolute bottom-[20px] right-[30px] w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#3B5BDB] font-extrabold z-10 border border-gray-100 hover:scale-110 transition-transform duration-300"
              >
                <span className="text-xl text-[#3B5BDB] font-serif font-black leading-none pb-0.5">⚕</span>
              </div>

            </div>

            {/* Main Image Card */}
            <div 
              id="about-image-card"
              className="relative w-full max-w-[420px] h-[320px] rounded-3xl overflow-hidden z-10 shadow-xl bg-gradient-to-tr from-[#e8eaf6] via-[#c5cae9] to-[#9fa8da] border border-white/20 group cursor-pointer"
            >
              <img 
                src="/ABOUT METIER img.jpeg" 
                alt="ApexCare Doctor Patient Care" 
                className="w-full h-full object-cover object-center top block transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle visual gradient edge overlay inside image card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

          </div>

        </div>
      </section>

      {/* COMMITTED TO YOUR ORAL HEALTH SECTION */}
      <div 
        ref={committedRef}
        id="committed-section-wrapper"
        className="w-full bg-[#f8f9ff] py-10 px-6 md:px-10 overflow-hidden"
      >
        <div
          className="max-w-[1180px] mx-auto bg-[#e8edf5] rounded-[28px] p-8 md:p-[50px] shadow-[0_2px_20px_rgba(0,0,0,0.04)] select-none flex flex-col md:flex-row items-center justify-between gap-[48px]"
        >
          {/* Left Column Text (38% Width) */}
          <div 
            id="committed-left-column"
            className={`w-full md:w-[38%] flex flex-col items-start text-left transition-all duration-[700ms] ease-out ${
              committedInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[50px]"
            }`}
          >
            <h2 
              className="text-[#1a2e44] font-sans font-[800] text-3xl sm:text-[40px] leading-[1.2] mb-5 tracking-tight"
            >
              Committed To Your <br />Oral Health
            </h2>
            <p className="text-[13.5px] text-[#4a5568] leading-[1.75] max-w-[340px] mb-8 font-medium">
              We strive to provide exceptional dental care through advanced technology, personalized treatments, and a compassionate approach, ensuring your oral health is always our top priority for a brighter, healthier smile.
            </p>

            {/* Feature List (5 items with checkmark icons) */}
            <div className="space-y-[14px]">
              {[
                "Advanced Dental Care For Every Smile",
                "Personalized Treatments Tailored To You",
                "Modern Technology For Better Results",
                "Comfort, Safety, And Quality Guaranteed",
                "Your Smile, Our Responsibility"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-[10px]">
                  {/* Checkmark icon style */}
                  <div className="w-[20px] h-[20px] rounded-full border-2 border-[#2196F3] flex items-center justify-center shrink-0">
                    <span className="text-[#2196F3] text-[11px] font-bold leading-none pb-0.5">✓</span>
                  </div>
                  <span className="text-[13.5px] text-[#2d3748] font-[500]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (62% Width) */}
          <div 
            id="committed-right-column"
            className="w-full md:w-[62%] relative"
          >
            {/* Photo collage grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px] rounded-2xl overflow-hidden relative w-full">
              {/* Card Column 1 */}
              <div className="flex flex-col gap-[10px] md:col-start-1">
                <div 
                  style={{ transitionDelay: "100ms" }}
                  className={`rounded-xl overflow-hidden shadow-sm h-[200px] bg-[#c5cae9] transition-all duration-700 ${
                    committedInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <img 
                    src="/dental-1.jpeg" 
                    alt="Dental treatment" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  style={{ transitionDelay: "200ms" }}
                  className={`rounded-xl overflow-hidden shadow-sm h-[160px] bg-[#c5cae9] transition-all duration-700 ${
                    committedInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <img 
                    src="/dental-2.jpeg" 
                    alt="Dentist work" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Card Column 2: TALL spans 2 rows */}
              <div className="md:col-start-2 h-full">
                <div 
                  style={{ transitionDelay: "300ms" }}
                  className={`rounded-xl overflow-hidden shadow-sm h-full min-h-[300px] md:h-[370px] bg-gradient-to-br from-[#c5cae9] to-[#9fa8da] transition-all duration-700 ${
                    committedInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <img 
                    src="/dental-3.jpeg" 
                    alt="Woman client patient" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Card Column 3 */}
              <div className="flex flex-col gap-[10px] md:col-start-3">
                <div 
                  style={{ transitionDelay: "400ms" }}
                  className={`rounded-xl overflow-hidden shadow-sm h-[200px] bg-[#c5cae9] transition-all duration-700 ${
                    committedInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <img 
                    src="/dental-4.jpeg" 
                    alt="Dentist Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  style={{ transitionDelay: "500ms" }}
                  className={`rounded-xl overflow-hidden shadow-sm h-[160px] bg-[#c5cae9] transition-all duration-700 ${
                    committedInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <img 
                    src="/dental-5.jpeg" 
                    alt="Dental Equipment" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Card Column 4 */}
              <div className="flex flex-col gap-[10px] md:col-start-4">
                <div 
                  style={{ transitionDelay: "600ms" }}
                  className={`rounded-xl overflow-hidden shadow-sm h-[200px] bg-[#c5cae9] transition-all duration-700 ${
                    committedInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <img 
                    src="/dental-6.jpeg" 
                    alt="Dentist examining" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  style={{ transitionDelay: "700ms" }}
                  className={`rounded-xl overflow-hidden shadow-sm h-[160px] bg-[#c5cae9] transition-all duration-700 ${
                    committedInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <img 
                    src="/dental-7.jpeg" 
                    alt="Dental nurse" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating AI/Search Icon Badge */}
              <div 
                id="floating-search-badge"
                className="absolute -bottom-2 -right-2 w-[52px] h-[52px] rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#1a1a2e] z-10 border border-gray-100 hover:scale-110 transition-transform duration-300"
              >
                <span className="text-xl">🔍✨</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* FEATURES & SERVICES + ONLINE CONSULTATION */}
      <section 
        ref={featuresRef}
        id="features-section"
        className="w-full bg-white py-20 px-6 md:px-10 overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-stretch justify-between gap-6">
          
          {/* LEFT COLUMN: FEATURES & SERVICES (28% width) */}
          <div 
            id="features-left-column"
            className={`w-full md:w-[28%] flex flex-col transition-all duration-[650ms] ease-out ${
              featuresInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[40px]"
            }`}
          >
            <h2 className="text-[#1a2e44] font-sans font-[800] text-3xl md:text-[36px] leading-[1.2] mb-9 tracking-tight text-left">
              Features <br />& Services
            </h2>

            {/* List of 4 accordion-style rows */}
            <div className="flex flex-col w-full text-left">
              {[
                "Expert Care",
                "Advanced Technology",
                "Affordable Plans",
                "Affordable Plans"
              ].map((service, index) => {
                const isActive = activeService === index;
                return (
                  <div 
                    key={index}
                    onClick={() => setActiveService(index)}
                    className={`group w-full py-4 px-3 flex justify-between items-center cursor-pointer transition-all duration-300 border-b border-[#e8ecf0] ${
                      index === 0 ? "border-t border-[#e8ecf0]" : ""
                    } ${
                      isActive 
                        ? "bg-[#f8faff] border-l-[3px] border-l-[#3B5BDB]" 
                        : "bg-transparent border-l-[3px] border-l-transparent hover:bg-[#f8faff] hover:border-l-[#3B5BDB]/50"
                    }`}
                  >
                    <span 
                      className={`text-sm tracking-wide transition-colors ${
                        isActive 
                          ? "text-[#1a2e44] font-[600]" 
                          : "text-[#6b7280] font-[500] group-hover:text-[#1a2e44]"
                      }`}
                    >
                      {service}
                    </span>
                    
                    {/* Circle icon with Chevron */}
                    <div 
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? "border-[#3B5BDB] text-[#3B5BDB] bg-white shadow-sm" 
                          : "border-[#d1d5db] text-[#6b7280] bg-transparent group-hover:border-[#3B5BDB] group-hover:text-[#3B5BDB]"
                      }`}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CENTER COLUMN: VIDEO CONSULTATION CARD (34% width) */}
          <div 
            id="features-center-column"
            className={`w-full md:w-[34%] flex flex-col transition-all duration-[650ms] ease-out ${
              featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[40px]"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div
              onClick={() => {
                setBookingStep(1);
                setIsModalOpen(true);
              }}
              className="bg-[#1a1a2e] rounded-[24px] overflow-hidden relative w-full h-full min-h-[320px] md:min-h-[420px] flex flex-col justify-end p-5 shadow-lg hover:scale-[1.01] transition-transform duration-300 group cursor-pointer"
            >
              <img 
                src="/online-consulting image.jpeg" 
                alt="Doctor Video consultation" 
                className="absolute inset-0 w-full h-full object-cover rounded-[24px] transition-transform duration-700 group-hover:scale-105"
              />
              {/* Backlight overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

              {/* Small Video Thumbnail top-left */}
              <div className="absolute top-4 left-4 w-[72px] h-[56px] rounded-xl bg-[#c5cae9] border-[2px] border-white/30 overflow-hidden shadow-md z-10 pointer-events-none">
                <img 
                  src="https://i.pravatar.cc/100?img=47" 
                  alt="Patient Video Feed" 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Timer Badge top-center */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full py-1 px-3 flex items-center gap-2 border border-white/10 z-10 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
                <span className="text-white text-xs font-medium tracking-tight whitespace-nowrap">1h 15 min</span>
              </div>

              {/* Call Control Buttons bottom-center */}
              <div className="flex gap-3 items-center justify-center relative z-10 w-full pb-2 pointer-events-none">
                
                {/* Button 1 - Microphone Toggle */}
                <span className="w-10 h-10 rounded-full bg-white/90 text-slate-800 flex items-center justify-center hover:bg-white active:scale-95 transition-all shadow-md cursor-default">
                  <Mic className="w-4.5 h-4.5" />
                </span>

                {/* Button 2 - End Call (Red) */}
                <span 
                  className="w-12 h-12 rounded-full bg-[#ef4444] text-white flex items-center justify-center shadow-lg cursor-default"
                >
                  <PhoneOff className="w-5 h-5" />
                </span>

                {/* Button 3 - Video Feed Camera Toggle */}
                <span className="w-10 h-10 rounded-full bg-white/90 text-slate-800 flex items-center justify-center hover:bg-white active:scale-95 transition-all shadow-md cursor-default">
                  <Video className="w-4.5 h-4.5" />
                </span>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ONLINE CONSULTATION INFO CARD (34% width) */}
          <div 
            id="features-right-column"
            className={`w-full md:w-[34%] flex flex-col transition-all duration-[650ms] ease-out ${
              featuresInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[40px]"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {isConsultationClosed ? (
              /* Mini restore panel if close button clicked */
              <div className="bg-[#f0f4ff]/50 border border-dashed border-[#3B5BDB]/25 rounded-[24px] p-6 text-center flex flex-col items-center justify-center h-full min-h-[320px]">
                <Sparkles className="w-8 h-8 text-apex-blue mb-3 opacity-75" />
                <span className="text-sm font-bold text-apex-navy">Online Consultation minimized</span>
                <button 
                  onClick={() => setIsConsultationClosed(false)}
                  className="mt-3 text-xs text-[#3B5BDB] font-semibold hover:underline cursor-pointer"
                >
                  Restore Consultation View
                </button>
              </div>
            ) : (
              <div className="bg-[#f0f4ff] rounded-[24px] p-7 md:p-8 relative flex flex-col justify-between h-full select-none shadow-sm border border-white/40">
                
                {/* Close Button top-right */}
                <button 
                  onClick={() => setIsConsultationClosed(true)}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-200/60 hover:bg-gray-200/90 text-[#6b7280] flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Card Title */}
                <div className="text-left mt-1">
                  <h3 className="text-2xl md:text-[28px] font-sans font-[800] text-[#1a2e44] leading-[1.2] mb-7 tracking-tight">
                    Online <br />Consultation
                  </h3>
                </div>

                {/* 3 Interactive feature rows */}
                <div className="flex flex-col divide-y divide-[#e2e8f0] text-left">
                  
                  {/* Row 1 */}
                  <div className="py-3.5 flex justify-between items-center group/item hover:bg-white/30 rounded-lg px-2 -mx-2 transition-colors">
                    <span className="text-[12.5px] text-[#374151] font-[500] leading-[1.5] max-w-[85%]">
                      Your Gateway To Smarter, <br className="hidden sm:inline" />Patient-Friendly Telehealth
                    </span>
                    <button 
                      onClick={() => {
                        setBookingStep(1);
                        setIsModalOpen(true);
                      }}
                      className="w-8 h-8 rounded-full bg-[#1a2e44] hover:bg-[#3B5BDB] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Row 2 */}
                  <div className="py-3.5 flex justify-between items-center group/item hover:bg-white/30 rounded-lg px-2 -mx-2 transition-colors">
                    <span className="text-[12.5px] text-[#374151] font-[500] leading-[1.5]">
                      Safe & Protected
                    </span>
                    <button 
                      onClick={() => {
                        setBookingStep(1);
                        setIsModalOpen(true);
                      }}
                      className="w-8 h-8 rounded-full bg-[#1a2e44] hover:bg-[#3B5BDB] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Row 3 */}
                  <div className="py-3.5 flex justify-between items-center group/item hover:bg-white/30 rounded-lg px-2 -mx-2 transition-colors">
                    <span className="text-[12.5px] text-[#374151] font-[500] leading-[1.5]">
                      24/7 Service
                    </span>
                    <button 
                      onClick={() => {
                        setBookingStep(1);
                        setIsModalOpen(true);
                      }}
                      className="w-8 h-8 rounded-full bg-[#1a2e44] hover:bg-[#3B5BDB] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION: CONFIDENT SMILES EVERY DAY */}
      <section 
        ref={confidentRef}
        id="confident-smiles-section"
        className="w-full bg-[#f5efe8]"
      >
        {/* SECTION 1 — TOP HERO-STYLE CONTENT BLOCK */}
        <div className="max-w-[1200px] mx-auto py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: TEXT CONTENT (5 columns) */}
            <div 
              className={`md:col-span-5 flex flex-col items-start text-left transition-all duration-[700ms] ease-out ${
                confidentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"
              }`}
            >
              <h2 className="text-[#1a2e44] font-sans font-[800] text-3xl sm:text-[56px] leading-[1.1] mb-6 tracking-tight">
                Confident Smiles <br className="hidden sm:inline" />Every Day
              </h2>
              
              <p className="text-sm text-[#5b6472] leading-[1.7] max-w-[360px] mb-8 font-medium">
                Experience personalized dental care with advanced technology, gentle hands, and friendly environments designed to make your smile brighter every day.
              </p>

              {/* Avatar Row */}
              <div className="flex items-center gap-4">
                <div className="flex items-center -space-x-2.5 overflow-visible">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                      src={`https://i.pravatar.cc/100?img=${i}`}
                      alt={`Patient ${i}`}
                    />
                  ))}
                  <button 
                    onClick={() => {
                      setBookingStep(1);
                      setIsModalOpen(true);
                    }}
                    className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white border border-[#d9dee6] text-slate-600 font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer ml-3"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: MAIN IMAGE CARD & FLOATING REVIEWS (7 columns) */}
            <div 
              className={`md:col-span-7 relative flex flex-col transition-all duration-[700ms] ease-out ${
                confidentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              {/* Relative Container to hold image card & floating reviews */}
              <div className="relative w-full">
                
                {/* Main Image Card */}
                <div className="w-full h-[280px] sm:h-[320px] rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-[#c5cae9]/55 group cursor-pointer">
                  <img 
                    src="/A_professional_dentist_gently_treating_202606051433.jpeg" 
                    alt="Doctor treating active patient" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Floating Review Card */}
                <div className="static mt-4 md:absolute md:mt-0 md:top-5 md:-right-10 w-full md:w-[220px] bg-white rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-left hover:scale-[1.03] transition-transform duration-300 pointer-events-auto border border-[#f0ece5]">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-xs font-bold text-[#183153]">4.9 Rating</span>
                  </div>
                  <p className="text-xs text-[#5b6472] font-medium leading-relaxed mb-3">
                    "I am a Regular Dentist who allows to assess your inner healing power"
                  </p>
                  <div className="text-[10px] font-bold text-[#183153] uppercase tracking-wider">
                    300+ Satisfied clients
                  </div>
                </div>

              </div>

              {/* Centered Button Below Grid & Secondary We Care section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 w-full relative">
                
                <button 
                  onClick={() => {
                    setBookingStep(1);
                    setIsModalOpen(true);
                  }}
                  className="hover:bg-white border border-[#cfd6df] py-2.5 px-5 rounded-full text-sm font-semibold text-[#183153] transition-all hover:shadow-md cursor-pointer active:scale-95 whitespace-nowrap"
                >
                  View Our Services &rarr;
                </button>

                {/* The "We Care About Your Peace" text block */}
                <div className="flex items-center gap-4 text-left max-w-sm">
                  <h4 className="text-xl sm:text-[24px] font-sans font-extrabold text-[#1a2e44] leading-tight">
                    We Care About <br />Your Peace
                  </h4>
                </div>

              </div>
              
              {/* Small vertical video thumbnail card positioned bottom right (on desktop) */}
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="static mt-6 sm:mt-8 md:absolute md:-bottom-20 md:right-16 md:mt-0 w-[200px] h-[240px] rounded-[18px] overflow-hidden shadow-xl bg-slate-800 transition-all duration-300 hover:scale-105 group cursor-pointer z-10"
              >
                <video
                  src="https://res.cloudinary.com/dhkyla1rv/video/upload/v1780738055/clinic.mp4"
                  poster="/online-consulting image.jpeg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 text-[#183153] fill-current ml-0.5" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* SECTION 2 — ABOUT + CARDS GRID */}
        <div className="max-w-[1200px] mx-auto py-16 md:py-24 px-6 md:px-10 border-t border-[#183153]/5">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16">
            
            {/* Left label and Heading */}
            <div 
              className={`w-full md:w-1/2 flex flex-col items-start text-left transition-all duration-[750ms] ease-out ${
                confidentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <span className="text-[12px] font-[700] tracking-[2px] text-gray-500 uppercase">
                + ABOUT US
              </span>
              <h3 className="text-3xl md:text-[36px] font-sans font-[800] text-[#1a2e44] mt-4 leading-[1.2] tracking-tight">
                Where Every Smile <br />Begins with Care
              </h3>
            </div>

            {/* Right text, Button & Avatars */}
            <div 
              className={`w-full md:w-1/2 flex flex-col items-start text-left transition-all duration-[750ms] ease-out ${
                confidentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              <p className="text-sm sm:text-base text-[#5b6472] leading-[1.7] mb-8 font-medium max-w-xl">
                We believe every smile tells a story. With gentle hands, modern technology, and genuine care, we make every dental visit calm, comfortable, and truly personal.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <button 
                  onClick={() => {
                    setBookingStep(1);
                    setIsModalOpen(true);
                  }}
                  className="bg-[#183153] text-white hover:bg-[#1a2c4e] shadow-lg hover:shadow-xl hover:translate-y-[-2px] py-3 px-6 rounded-full text-sm font-semibold transition-all cursor-pointer active:scale-95"
                >
                  About Us &rarr;
                </button>

                {/* Small Review Badge */}
                <div className="flex items-center gap-2 bg-white/60 py-1.5 px-3.5 rounded-full border border-[#183153]/5">
                  <div className="flex -space-x-2">
                    {[5, 6, 7].map((num) => (
                      <img 
                        key={num}
                        className="h-6 w-6 rounded-full ring-2 ring-white object-cover"
                        src={`https://i.pravatar.cc/100?img=${num+20}`}
                        alt="Audience reviewer"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#183153] ml-1">853+ Positive Reviews</span>
                </div>
              </div>

            </div>

          </div>

          {/* BOTTOM IMAGE CARD GRID (3 CARDS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-16 w-full">
            
            {/* CARD 1 */}
            <div 
              className={`relative h-[260px] rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] bg-[#c5cae9]/50 group transition-all duration-700 ${
                confidentInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "450ms" }}
            >
              <img 
                src="/NEW ABOUT IMAGE (1).jpeg" 
                alt="Dentist examining patient teeth" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Bottom Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              
              <span className="absolute bottom-5 left-5 text-white font-medium text-sm text-left leading-snug max-w-[80%]">
                Dentist examining patient's teeth.
              </span>

              <button 
                onClick={() => {
                  setBookingStep(1);
                  setIsModalOpen(true);
                }}
                className="absolute bottom-4 right-4 w-9 h-9 bg-white text-[#183153] hover:text-[#3B5BDB] flex items-center justify-center rounded-full shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer"
              >
                <Plus className="w-5 h-5 font-bold" />
              </button>
            </div>

            {/* CARD 2 */}
            <div 
              className={`relative h-[260px] rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] bg-[#c5cae9]/50 group transition-all duration-700 ${
                confidentInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "550ms" }}
            >
              <img 
                src="/NEW ABOUT IMAGE (2).jpeg" 
                alt="Dentist treating smiling child" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              
              <span className="absolute bottom-5 left-5 text-white font-medium text-sm text-left leading-snug max-w-[80%]">
                Dentist treating smiling child.
              </span>

              <button 
                onClick={() => {
                  setBookingStep(1);
                  setIsModalOpen(true);
                }}
                className="absolute bottom-4 right-4 w-9 h-9 bg-white text-[#183153] hover:text-[#3B5BDB] flex items-center justify-center rounded-full shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer"
              >
                <Plus className="w-5 h-5 font-bold" />
              </button>
            </div>

            {/* CARD 3 */}
            <div 
              className={`relative h-[260px] rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] bg-[#c5cae9]/50 group transition-all duration-700 ${
                confidentInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "650ms" }}
            >
              <img 
                src="/NEW ABOUT IMAGE (3).jpeg" 
                alt="Bright white teeth cosmetic result" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              
              <span className="absolute bottom-5 left-5 text-white font-medium text-sm text-left leading-snug max-w-[80%]">
                Bright white teeth cosmetic result.
              </span>

              <button 
                onClick={() => {
                  setBookingStep(1);
                  setIsModalOpen(true);
                }}
                className="absolute bottom-4 right-4 w-9 h-9 bg-white text-[#183153] hover:text-[#3B5BDB] flex items-center justify-center rounded-full shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer"
              >
                <Plus className="w-5 h-5 font-bold" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: MEET THE PEOPLE WHO CARE */}
      <section 
        ref={meetCareRef}
        id="meet-the-people-section"
        className="w-full bg-[#eef2f7] py-12 md:py-20 select-none overflow-hidden relative"
      >
        {/* TOP MINI HERO STRIP */}
        <div 
          id="mini-hero-strip"
          className="max-w-[1200px] mx-auto px-6 md:px-10 text-center relative pb-10"
        >
          {/* Decorative floating transparent doctor PNG */}
          <div className="absolute right-[8%] sm:right-[12%] top-[10%] w-[80px] sm:w-[100px] h-auto transform rotate-[8deg] opacity-75 hidden md:block select-none pointer-events-none hover:scale-105 transition-transform duration-300">
            <img 
              src="https://pngimg.com/uploads/doctor/doctor_PNG15992.png" 
              alt="Decorative doctor transparency" 
              className="w-full h-auto object-contain"
            />
          </div>

          <h3 
            className={`font-sans text-2xl sm:text-[42px] leading-[1.3] text-[#1a1a1a] font-[500] max-w-[900px] mx-auto mb-8 tracking-tight transition-all duration-[750ms] ${
              meetCareInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Medicine <span className="font-[800] text-black">starts</span> with science — but true healing <span className="font-[800] text-black">begins with</span> trust
          </h3>

          <div
            className={`transition-all duration-[750ms] delay-100 ${
              meetCareInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <button 
              onClick={() => {
                setBookingStep(1);
                setIsModalOpen(true);
              }}
              className="group inline-flex items-center gap-3.5 bg-gradient-to-r from-[#3B5BDB] to-[#5C7CFA] text-white hover:scale-[1.03] active:scale-95 py-3.5 px-7 rounded-full text-sm font-semibold transition-all shadow-[0_8px_20px_rgba(59,91,219,0.35)] cursor-pointer"
            >
              <span>Make an appointment</span>
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-800 transition-transform duration-300 group-hover:rotate-12 shadow-sm font-semibold shrink-0">
                <User className="w-3.5 h-3.5 text-slate-800 fill-current" />
              </span>
            </button>
          </div>
        </div>

        {/* DOCTORS SECTION MAIN AREA */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-10 md:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            
            {/* LEFT SIDE: INTRO TEXT (5 columns) */}
            <div 
              className={`md:col-span-5 flex flex-col items-start text-left transition-all duration-[750ms] ${
                meetCareInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[40px]"
              }`}
            >
              {/* Brand Label Row */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-5 h-5 rounded-full bg-[#3B5BDB] flex items-center justify-center text-white text-[10px] font-bold">🩺</span>
                <span className="text-sm font-semibold text-slate-700 tracking-wide font-sans">SalvaMedic</span>
              </div>

              {/* Main Heading with Small Inline Doctors Muted string */}
              <h2 className="text-[#111827] font-sans font-[800] text-3xl sm:text-[40px] leading-[1.2] mb-5 tracking-tight">
                Meet the people <br />who care <span className="text-sm font-medium text-[#6b7280] block sm:inline-block sm:ml-2">({` our doctors `})</span>
              </h2>

              <p className="text-sm text-[#6b7280] leading-[1.7] max-w-[320px] mb-8 font-medium">
                Our team brings together expertise, empathy, and a deep passion for helping others.
              </p>

              {/* Navigation arrows for doctor list */}
              <div className="flex items-center">
                <button 
                  onClick={() => {
                    setBookingStep(1);
                    setIsModalOpen(true);
                  }}
                  className="w-[42px] h-[42px] rounded-full border border-[#cfd6df] bg-white text-slate-700 hover:bg-[#3B5BDB] hover:border-[#3B5BDB] hover:text-white flex items-center justify-center transform transition-all duration-300 cursor-pointer active:scale-95 hover:shadow-sm"
                >
                  <ArrowLeft className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => {
                    setBookingStep(1);
                    setIsModalOpen(true);
                  }}
                  className="w-[42px] h-[42px] rounded-full border border-[#cfd6df] bg-white text-slate-700 hover:bg-[#3B5BDB] hover:border-[#3B5BDB] hover:text-white flex items-center justify-center transform transition-all duration-300 cursor-pointer active:scale-95 hover:shadow-sm ml-3"
                >
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: DOCTORS SUMMARY CARDS (7 columns) */}
            <div 
              className={`md:col-span-7 transition-all duration-[750ms] ${
                meetCareInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[40px]"
              }`}
              style={{ transitionDelay: "150px" }}
            >
              {/* Doctor cards flexible list, horizontal scroll on mobile */}
              <div className="flex flex-row gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-none md:overflow-x-visible md:flex-nowrap justify-start items-stretch">
                
                {/* CARD 1 (FEATURED DOCTOR) */}
                <div className="w-[280px] h-[360px] rounded-[24px] flex-shrink-0 bg-gradient-to-br from-[#3B5BDB] to-[#1e3a8a] p-5 relative overflow-hidden flex flex-col justify-end group cursor-pointer hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
                  
                  {/* Doctor badge at top-right */}
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 bg-opacity-20 rounded-xl border border-white/10 flex flex-col items-center justify-center text-white min-w-[50px] z-20">
                    <span className="text-xs font-black leading-none text-white">8+</span>
                    <span className="text-[8px] font-medium tracking-tight text-white/80 mt-0.5 leading-none">Years in practice</span>
                  </div>

                  {/* Doctor transparent PNG image */}
                  <img 
                    src="https://pngimg.com/uploads/doctor/doctor_PNG16041.png" 
                    alt="Dr. Oleh Marchenko Cardiologist" 
                    className="absolute bottom-[80px] left-1/2 -translate-x-1/2 h-[220px] object-contain pointer-events-none z-10 transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Name Card bottom overlay panel */}
                  <div className="bg-white rounded-[16px] p-4 shadow-lg text-left relative z-20">
                    <h4 className="font-bold text-sm text-[#111827] leading-tight">Dr. Oleh Marchenko</h4>
                    <p className="text-[11px] text-[#6b7280] font-medium mt-1 leading-normal">
                      Cardiologist · Personalized treatment and diagnostics
                    </p>

                    {/* Small circular play button bottom-right of overlay */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setBookingStep(1);
                        setIsModalOpen(true);
                      }}
                      className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#3B5BDB] hover:bg-[#3B5BDB]/90 text-white flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
                    >
                      <Play className="w-3 h-3 text-white fill-current ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* CARD 2 (STANDARD DOCTOR Chen) */}
                <div className="w-[240px] h-[360px] rounded-[24px] flex-shrink-0 bg-white shadow-md border border-slate-100 p-5 relative overflow-hidden flex items-end justify-center group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                  
                  {/* Subtle radial light background behind image */}
                  <div 
                    className="absolute inset-0 bg-no-repeat bg-cover pointer-events-none opacity-50 z-0"
                    style={{ background: "radial-gradient(circle at top, #f1f5f9, #ffffff)" }}
                  />

                  {/* Standard Doctor SVG placeholder / transparent PNG image */}
                  <img 
                    src="https://pngimg.com/uploads/doctor/doctor_PNG15999.png" 
                    alt="SalvaMedic Doctor Sophie" 
                    className="h-[260px] object-contain relative z-10 py-1 transition-transform duration-500 group-hover:scale-103"
                  />
                </div>

                {/* CARD 3 (STANDARD DOCTOR Elena) */}
                <div className="w-[240px] h-[360px] rounded-[24px] flex-shrink-0 bg-white shadow-md border border-slate-100 p-5 relative overflow-hidden flex items-end justify-center group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                  
                  {/* Subtle radial light background behind image */}
                  <div 
                    className="absolute inset-0 bg-no-repeat bg-cover pointer-events-none opacity-50 z-0"
                    style={{ background: "radial-gradient(circle at top, #f1f5f9, #ffffff)" }}
                  />

                  {/* Standard Doctor SVG placeholder / transparent PNG image */}
                  <img 
                    src="https://pngimg.com/uploads/doctor/doctor_PNG16010.png" 
                    alt="SalvaMedic Doctor Rostova" 
                    className="h-[260px] object-contain relative z-10 py-1 transition-transform duration-500 group-hover:scale-103"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: OUR MEDICAL SERVICES */}
      <section
        ref={medicalServicesRef}
        id="medical-services-section"
        className="w-full bg-[#eef2f7]"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-[120px]">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-[60px]">

            {/* Left */}
            <div className={`text-left transition-all duration-[750ms] ${
              medicalServicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <h2 className="text-[48px] font-bold text-apex-navy leading-[1.1] tracking-tight">
                Our medical services
              </h2>
              <p className="text-[15px] text-apex-gray mt-2 font-medium">
                (What you get)
              </p>
            </div>

            {/* Right */}
            <div className={`flex flex-col items-start md:items-end text-left md:text-right max-w-[380px] transition-all duration-[750ms] delay-100 ${
              medicalServicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <p className="text-[15px] text-apex-gray leading-relaxed">
                We provide a full range of medical services — from consultation to diagnosis and treatment, all in one place.
              </p>
              <button
                onClick={() => {
                  setBookingStep(1);
                  setIsModalOpen(true);
                }}
                className="text-apex-blue hover:text-blue-600 text-[15px] font-semibold mt-3 transition-colors cursor-pointer inline-flex items-center gap-1 group self-start md:self-end"
              >
                <span>See all services</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>

          </div>

          {/* CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Card 1: Family medicine */}
            <div
              className={`group relative bg-white rounded-[24px] p-8 overflow-hidden transition-all duration-[400ms] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,99,235,0.25)] ${
                medicalServicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb] to-[#1e40af] opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]" />
              <span className="absolute top-4 right-6 text-[80px] font-bold text-gray-200/50 group-hover:text-white/10 transition-colors duration-[400ms] select-none pointer-events-none leading-none">
                01
              </span>
              <div className="relative z-10 h-full flex flex-col">
                <h4 className="text-[20px] font-semibold text-apex-navy group-hover:text-white transition-colors duration-[400ms]">
                  Family medicine
                </h4>
                <p className="text-[15px] text-apex-gray group-hover:text-white/80 mt-3 leading-[1.6] transition-colors duration-[400ms]">
                  Comprehensive medical care for individuals and families, with a focus on preventive health.
                </p>
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={() => { setBookingStep(1); setIsModalOpen(true); }}
                    className="text-[13px] font-semibold text-apex-blue group-hover:text-white cursor-pointer text-left transition-colors duration-[400ms]"
                  >
                    Make an appointment
                  </button>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-apex-blue/70 group-hover:text-white/70 transition-colors duration-[400ms]">
                    Price
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Blue Card (center top) */}
            <div
              className={`relative bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-white rounded-[24px] p-8 overflow-hidden flex flex-col items-center justify-center text-center min-h-[280px] ${
                medicalServicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-white/10 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-widest uppercase">
                  SalvaMedic
                </h3>
                <p className="text-sm text-white/80 font-medium leading-relaxed mt-3 max-w-[220px] mx-auto">
                  Professional and diagnostic treatment with modern care
                </p>
              </div>
            </div>

            {/* Card 2: Pediatrics */}
            <div
              className={`group relative bg-white rounded-[24px] p-8 overflow-hidden transition-all duration-[400ms] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,99,235,0.25)] ${
                medicalServicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb] to-[#1e40af] opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]" />
              <span className="absolute top-4 right-6 text-[80px] font-bold text-gray-200/50 group-hover:text-white/10 transition-colors duration-[400ms] select-none pointer-events-none leading-none">
                02
              </span>
              <div className="relative z-10 h-full flex flex-col">
                <h4 className="text-[20px] font-semibold text-apex-navy group-hover:text-white transition-colors duration-[400ms]">
                  Pediatrics
                </h4>
                <p className="text-[15px] text-apex-gray group-hover:text-white/80 mt-3 leading-[1.6] transition-colors duration-[400ms]">
                  Caring for children's health from infancy through adolescence with gentle expertise.
                </p>
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={() => { setBookingStep(1); setIsModalOpen(true); }}
                    className="text-[13px] font-semibold text-apex-blue group-hover:text-white cursor-pointer text-left transition-colors duration-[400ms]"
                  >
                    Make an appointment
                  </button>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-apex-blue/70 group-hover:text-white/70 transition-colors duration-[400ms]">
                    Price
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Cardiology */}
            <div
              className={`group relative bg-white rounded-[24px] p-8 overflow-hidden transition-all duration-[400ms] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,99,235,0.25)] ${
                medicalServicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb] to-[#1e40af] opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]" />
              <span className="absolute top-4 right-6 text-[80px] font-bold text-gray-200/50 group-hover:text-white/10 transition-colors duration-[400ms] select-none pointer-events-none leading-none">
                03
              </span>
              <div className="relative z-10 h-full flex flex-col">
                <h4 className="text-[20px] font-semibold text-apex-navy group-hover:text-white transition-colors duration-[400ms]">
                  Cardiology
                </h4>
                <p className="text-[15px] text-apex-gray group-hover:text-white/80 mt-3 leading-[1.6] transition-colors duration-[400ms]">
                  Diagnosis and treatment of cardiovascular diseases with advanced technology.
                </p>
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={() => { setBookingStep(1); setIsModalOpen(true); }}
                    className="text-[13px] font-semibold text-apex-blue group-hover:text-white cursor-pointer text-left transition-colors duration-[400ms]"
                  >
                    Make an appointment
                  </button>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-apex-blue/70 group-hover:text-white/70 transition-colors duration-[400ms]">
                    Price
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Ultrasound & Lab */}
            <div
              className={`group relative bg-white rounded-[24px] p-8 overflow-hidden transition-all duration-[400ms] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,99,235,0.25)] ${
                medicalServicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb] to-[#1e40af] opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]" />
              <span className="absolute top-4 right-6 text-[80px] font-bold text-gray-200/50 group-hover:text-white/10 transition-colors duration-[400ms] select-none pointer-events-none leading-none">
                04
              </span>
              <div className="relative z-10 h-full flex flex-col">
                <h4 className="text-[20px] font-semibold text-apex-navy group-hover:text-white transition-colors duration-[400ms]">
                  Ultrasound & Lab
                </h4>
                <p className="text-[15px] text-apex-gray group-hover:text-white/80 mt-3 leading-[1.6] transition-colors duration-[400ms]">
                  Fast and accurate tests with modern laboratory diagnostics and imaging.
                </p>
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={() => { setBookingStep(1); setIsModalOpen(true); }}
                    className="text-[13px] font-semibold text-apex-blue group-hover:text-white cursor-pointer text-left transition-colors duration-[400ms]"
                  >
                    Make an appointment
                  </button>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-apex-blue/70 group-hover:text-white/70 transition-colors duration-[400ms]">
                    Price
                  </span>
                </div>
              </div>
            </div>

            {/* Large Image Card */}
            <div
              className={`relative rounded-[24px] overflow-hidden min-h-[400px] lg:min-h-[500px] group cursor-pointer ${
                medicalServicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "600ms" }}
              onClick={() => { setBookingStep(1); setIsModalOpen(true); }}
            >
              <img
                src="/dental-1.jpeg"
                alt="Clinic equipment"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: WHY CHOOSE US */}
      <section 
        ref={whyChooseUsRef}
        id="why-choose-us-section"
        className="w-full bg-[#eef2f7] py-16 md:py-28 relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            
            {/* LEFT SIDE — DOCTORS PNG HERO CARD */}
            <div 
              className={`md:col-span-6 relative rounded-[28px] p-8 md:p-10 bg-gradient-to-br from-[#3B5BDB] to-[#1e3a8a] overflow-hidden min-h-[420px] flex flex-col justify-between shadow-xl transition-all duration-[800ms] ${
                whyChooseUsInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[50px]"
              }`}
            >
              <div>
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#93a5f5] uppercase select-none">
                  PROVIDED BY licensed medical experts
                </span>
                <h3 className="text-3xl sm:text-[36px] font-sans font-[800] text-white mt-1 leading-tight tracking-tight">
                  Why choose us
                </h3>
              </div>

              {/* OVERLAPPING Doctors PNG images in bottom area */}
              <div className="absolute bottom-0 inset-x-0 h-[280px] pointer-events-none z-10 overflow-hidden">
                <img 
                  src="/DOCTOR WOMEN.png" 
                  alt="Doctor Expert 1" 
                  className={`absolute bottom-0 left-[40px] sm:left-[100px] h-[250px] sm:h-[300px] object-contain transition-all duration-[1000ms] delay-200 ${
                    whyChooseUsInView ? "translate-y-0 opacity-100" : "translate-y-[80px] opacity-0"
                  }`}
                />

              </div>

              {/* FLOATING BADGES OVER DOCS */}
              <div className="relative z-20 w-full h-full min-h-[180px] sm:min-h-[220px]">
                
                {/* Badge 1: Experienced Doctors */}
                <div 
                  onClick={() => {
                    setBookingStep(1);
                    setIsModalOpen(true);
                  }}
                  className="absolute top-10 -left-2 bg-white text-[#183153] hover:scale-105 transition-transform duration-300 py-1.5 px-3 rounded-full text-[11px] sm:text-xs font-bold shadow-lg flex items-center gap-1.5 border border-slate-100 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Experienced Doctors</span>
                </div>

                {/* Badge 2: Certified Clinic */}
                <div 
                  onClick={() => {
                    setBookingStep(1);
                    setIsModalOpen(true);
                  }}
                  className="absolute top-24 right-0 bg-white text-[#183153] hover:scale-105 transition-transform duration-300 py-1.5 px-3 rounded-full text-[11px] sm:text-xs font-bold shadow-lg flex items-center gap-1.5 border border-slate-100 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>Certified Clinic</span>
                </div>

                {/* Badge 3: Modern Equipment */}
                <div 
                  onClick={() => {
                    setBookingStep(1);
                    setIsModalOpen(true);
                  }}
                  className="absolute bottom-6 right-[15%] bg-white text-[#183153] hover:scale-105 transition-transform duration-300 py-1.5 px-3 rounded-full text-[11px] sm:text-xs font-bold shadow-lg flex items-center gap-1.5 border border-slate-100 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span>Modern Equipment</span>
                </div>

              </div>

            </div>

            {/* RIGHT SIDE — STATISTICS GRID */}
            <div 
              className={`md:col-span-6 flex flex-col items-start text-left relative transition-all duration-[800ms] ${
                whyChooseUsInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[50px]"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              <svg className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none z-0 text-[#183153]" width="340" height="340" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <path d="M50,10 L80,27 L80,63 L50,80 L20,63 L20,27 Z M80,27 L110,10 M80,63 L110,80 M20,63 L-10,80 M20,27 L-10,10 M50,10 L50,-20 M50,80 L50,110" strokeWidth="0.5" />
                <path d="M110,10 L140,-7 L140,29" strokeWidth="0.5" />
                <path d="M50,-20 L80,-37" strokeWidth="0.5" />
              </svg>

              <span className="text-[12px] font-[500] text-[#6b7280] select-none">
                ( Advantages )
              </span>

              {/* 2X2 GRID OF STATS */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 mt-8 w-full relative z-10">
                
                {/* Stat 1 */}
                <div className="flex flex-col items-start border-l-2 border-slate-200 pl-4">
                  <span className="text-4xl sm:text-[48px] font-sans font-[800] text-[#111827] leading-none mb-1">
                    {stats.exp}+
                  </span>
                  <span className="text-[13px] font-[700] text-slate-800 leading-snug">
                    Years of experience
                  </span>
                  <p className="text-[11px] text-[#6b7280] mt-1.5 leading-normal">
                    We have been working since 2012, improving the quality of services every day.
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-start border-l-2 border-slate-200 pl-4">
                  <span className="text-4xl sm:text-[48px] font-sans font-[800] text-[#111827] leading-none mb-1">
                    {stats.areas}+
                  </span>
                  <span className="text-[13px] font-[700] text-slate-800 leading-snug">
                    Areas of medicine
                  </span>
                  <p className="text-[11px] text-[#6b7280] mt-1.5 leading-normal">
                    From family medicine to cardiology and laboratory diagnostics.
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-start border-l-2 border-slate-200 pl-4">
                  <span className="text-4xl sm:text-[48px] font-sans font-[800] text-[#111827] leading-none mb-1">
                    {stats.satisfaction}%
                  </span>
                  <span className="text-[13px] font-[700] text-slate-800 leading-snug">
                    Satisfied patients
                  </span>
                  <p className="text-[11px] text-[#6b7280] mt-1.5 leading-normal">
                    According to internal surveys over the past year.
                  </p>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col items-start border-l-2 border-slate-200 pl-4">
                  <span className="text-4xl sm:text-[48px] font-sans font-[800] text-[#111827] leading-none mb-1">
                    {stats.accuracy}%
                  </span>
                  <span className="text-[13px] font-[700] text-slate-800 leading-snug">
                    Diagnostic accuracy
                  </span>
                  <p className="text-[11px] text-[#6b7280] mt-1.5 leading-normal">
                    Thanks to modern equipment and experienced specialists.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: CONTACT / APPOINTMENT */}
      <section 
        ref={contactRef}
        id="contact-appointment-section"
        className="w-full bg-[#f3f6fb] py-16 md:py-28 px-6 md:px-10 relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT SIDE — CONTACT FORM */}
            <div 
              className={`lg:col-span-7 transition-all duration-[800ms] ${
                contactInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[50px]"
              }`}
            >
              <div className="text-left mb-8">
                <h2 className="text-[#111827] font-sans font-[800] text-3xl sm:text-[42px] leading-[1.2] tracking-tight relative inline-flex items-center flex-wrap gap-2">
                  Are you ready to <br className="hidden sm:inline" />
                  make an appointment?
                  <span className="text-xs sm:text-sm font-medium text-[#6b7280] ml-1 sm:ml-4 mt-2">
                    ( Book your visit )
                  </span>
                </h2>
              </div>

              {/* FORM CONTAINER */}
              <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.05)]">
                {contactSubmitted ? (
                  <div className="text-center py-10 px-4 flex flex-col items-center justify-center space-y-4 animate-scale-up">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-[#111827]">Appointment Requested!</h4>
                      <p className="text-sm text-[#6b7280] max-w-xs mx-auto">
                        Thank you <strong className="text-[#111827]">{contactForm.name}</strong>. Your request for <span className="font-semibold text-indigo-600">{contactForm.service}</span> has been received! Our support staff will call or text you shortly at <span className="font-semibold text-slate-800">{contactForm.phone}</span>.
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactForm({ name: "", phone: "", dateTime: "", service: "Family medicine", message: "" });
                      }}
                      className="mt-4 inline-flex items-center gap-1.5 py-2 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-[#3B5BDB] font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Book another appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name input */}
                      <div className="space-y-1 text-left">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Name
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="Your full name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full py-3 px-4 rounded-[14px] border border-[#e5e7eb] text-sm bg-[#f9fafb] focus:border-[#3B5BDB] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#3B5BDB]/10 transition-all duration-200 text-[#111827]"
                        />
                      </div>

                      {/* Phone number input */}
                      <div className="space-y-1 text-left">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Phone number
                        </label>
                        <input 
                          type="tel" 
                          required
                          placeholder="+1 (555) 019-2834"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full py-3 px-4 rounded-[14px] border border-[#e5e7eb] text-sm bg-[#f9fafb] focus:border-[#3B5BDB] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#3B5BDB]/10 transition-all duration-200 text-[#111827]"
                        />
                      </div>

                      {/* Service needed select dropdown */}
                      <div className="space-y-1 text-left">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Service needed
                        </label>
                        <select 
                          value={contactForm.service}
                          onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                          className="w-full py-3 px-4 rounded-[14px] border border-[#e5e7eb] text-sm bg-[#f9fafb] focus:border-[#3B5BDB] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#3B5BDB]/10 transition-all duration-200 text-[#111827] font-medium"
                        >
                          <option value="Family medicine">Family medicine</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Ultrasound & Lab">Ultrasound & Lab</option>
                          <option value="Other service">Other service</option>
                        </select>
                      </div>

                      {/* Preferred date/time input */}
                      <div className="space-y-1 text-left">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Preferred date/time
                        </label>
                        <input 
                          type="datetime-local" 
                          required
                          value={contactForm.dateTime}
                          onChange={(e) => setContactForm({ ...contactForm, dateTime: e.target.value })}
                          className="w-full py-3 px-4 rounded-[14px] border border-[#e5e7eb] text-sm bg-[#f9fafb] focus:border-[#3B5BDB] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#3B5BDB]/10 transition-all duration-200 text-[#111827]"
                        />
                      </div>

                      {/* Message textarea spanning 2 columns */}
                      <div className="space-y-1 text-left sm:col-span-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Message
                        </label>
                        <textarea 
                          placeholder="Please briefly describe your specific requirements or medical notes"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full py-3 px-4 rounded-[14px] border border-[#e5e7eb] text-sm bg-[#f9fafb] focus:border-[#3B5BDB] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#3B5BDB]/10 transition-all duration-200 h-[100px] resize-none text-[#111827]"
                        />
                      </div>

                    </div>

                    {/* Submit Row */}
                    <div className="flex flex-wrap items-center mt-6 pt-2">
                      <button 
                        type="submit"
                        className="bg-gradient-to-r from-[#3B5BDB] to-[#5C7CFA] text-white py-3 px-6 rounded-full font-semibold text-sm cursor-pointer shadow-md inline-flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                      >
                        <span>Make an appointment</span>
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#3B5BDB]">
                          <User className="w-3 h-3 stroke-[3]" />
                        </div>
                      </button>

                      <span className="ml-[14px] text-xs text-[#6b7280] font-medium flex items-center gap-1 mt-2 sm:mt-0">
                        ✳ It only takes 1 minute to book your visit
                      </span>
                    </div>

                  </form>
                )}
              </div>
            </div>

            {/* RIGHT SIDE — DOCTOR PNG VISUAL */}
            <div 
              className={`lg:col-span-5 relative rounded-[28px] bg-gradient-to-br from-[#3B5BDB] to-[#1e3a8a] min-h-[480px] sm:min-h-[500px] p-10 overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-[800ms] ${
                contactInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[50px]"
              }`}
            >
              <div>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#93a5f5] uppercase select-none">
                  STATE-OF-THE-ART CLINIC
                </span>
                <h3 className="text-3xl font-sans font-[800] text-white mt-1 leading-tight tracking-tight">
                  Premium Care
                </h3>
              </div>

              {/* Doctor PNG visual overlays bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[340px] pointer-events-none z-10 overflow-hidden">
                <img 
                  src="https://pngimg.com/uploads/doctor/doctor_PNG16040.png" 
                  alt="Specialist Doctor Visual" 
                  className={`absolute bottom-0 right-[40px] h-[270px] sm:h-[340px] object-contain transition-all duration-[1000ms] delay-200 ${
                    contactInView ? "translate-y-0 opacity-100" : "translate-y-[80px] opacity-0"
                  }`}
                />
              </div>

              {/* Floating badges around doc */}
              <div className="relative z-20 w-full h-full min-h-[220px]">
                
                {/* Badge 2 */}
                <div 
                  onClick={() => {
                    const inputEl = document.querySelector('input[placeholder="Your full name"]');
                    if (inputEl instanceof HTMLElement) inputEl.focus();
                  }}
                  className="absolute top-28 right-0 bg-white text-[#1e3a8a] hover:scale-105 transition-transform duration-300 py-1.5 px-3.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 border border-slate-100 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>Certified Clinic</span>
                </div>

                {/* Badge 3 */}
                <div 
                  onClick={() => {
                    const inputEl = document.querySelector('input[placeholder="Your full name"]');
                    if (inputEl instanceof HTMLElement) inputEl.focus();
                  }}
                  className="absolute bottom-6 left-4 bg-white text-[#1e3a8a] hover:scale-105 transition-transform duration-300 py-1.5 px-3.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 border border-slate-100 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-700 animate-pulse" />
                  <span>Modern Equipment</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: PREMIUM DARK NEWSLETTER FOOTER */}
      <motion.footer
        id="modern-professional-footer"
        className="relative w-full bg-[#0B0F14] text-slate-300 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* Large background brand watermark */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[200px] sm:text-[300px] font-black text-white/5 leading-none pointer-events-none select-none z-0 whitespace-nowrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          animate={{ x: [0, 10, 0] }}
          style={{ translateX: "-50%" }}
        >
          SalvaMedic
        </motion.div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-20 pt-[120px] pb-[60px]">

          {/* SECTION 1 — NEWSLETTER CTA */}
          <div className="flex flex-col items-center text-center">
            <motion.h2
              className="text-[48px] leading-[1.1] font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Stay Ahead with Financial
            </motion.h2>
            <motion.h2
              className="text-[48px] leading-[1.1] font-serif italic text-white"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Insights and Updates
            </motion.h2>
            <motion.p
              className="text-[#9CA3AF] text-base max-w-[520px] mx-auto mt-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              Subscribe to receive exclusive health insights, clinic updates, and special offers straight to your inbox.
            </motion.p>

            {/* Email form */}
            <motion.form
              onSubmit={(e) => {
                e.preventDefault();
                setFooterEmail("");
              }}
              className="flex items-center justify-center gap-4 mt-8 w-full max-w-[520px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            >
              <input
                type="email"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-[320px] h-14 bg-[#1F2937] rounded-full px-5 text-white text-sm outline-none border-none placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#3B5BDB]/50 focus:shadow-[0_0_0_3px_rgba(59,91,219,0.15)] transition-all duration-300 ease-out"
              />
              <motion.button
                type="submit"
                className="h-14 px-7 bg-[#3B5BDB] hover:bg-[#2e4abf] text-white font-medium rounded-full whitespace-nowrap cursor-pointer"
                whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(59,91,219,0.3)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>

          {/* SECTION 2 — DIVIDER */}
          <motion.div
            className="w-full h-px bg-white/10 mt-20 mb-16 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* SECTION 3 — LINKS GRID */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >

            {/* Column 1 — Brand */}
            <motion.div
              className="flex flex-col items-start text-left"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
            >
              <span className="font-sans font-[800] text-[22px] text-white tracking-widest mb-4">
                SalvaMedic
              </span>
              <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-[260px]">
                Advanced diagnostic treatments and comprehensive healthcare solutions centered around safety and clinical excellence.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-6">
                {[
                  { Icon: Facebook, href: "https://facebook.com" },
                  { Icon: Instagram, href: "https://instagram.com" },
                  { Icon: Linkedin, href: "https://linkedin.com" }
                ].map(({ Icon, href }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-300"
                    whileHover={{ scale: 1.08, backgroundColor: "rgba(59,91,219,1)" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Column 2 — Services */}
            <motion.div
              className="flex flex-col items-start text-left"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
            >
              <h4 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-[#9CA3AF] mb-6">
                Services
              </h4>
              <ul className="flex flex-col items-start gap-3">
                {["Family medicine", "Cardiology", "Pediatrics", "Diagnostics"].map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.a
                      href="#medical-services-section"
                      className="text-sm text-slate-300 inline-block cursor-pointer"
                      whileHover={{ x: 2, color: "#ffffff" }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3 — Company */}
            <motion.div
              className="flex flex-col items-start text-left"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
            >
              <h4 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-[#9CA3AF] mb-6">
                Company
              </h4>
              <ul className="flex flex-col items-start gap-3">
                {["About us", "Our doctors", "Contact", "Careers"].map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.span
                      className="text-sm text-slate-300 inline-block cursor-pointer"
                      whileHover={{ x: 2, color: "#ffffff" }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {item}
                    </motion.span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4 — Contact */}
            <motion.div
              className="flex flex-col items-start text-left"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
            >
              <h4 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-[#9CA3AF] mb-6">
                Contact
              </h4>
              <ul className="flex flex-col items-start gap-3 text-sm text-slate-300">
                <motion.li
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>742 Evergreen Terrace, Medical District, NY 10021</span>
                </motion.li>
                <motion.li
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <User className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>+1 (555) 019-2834</span>
                </motion.li>
                <motion.li
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>care@salvamedic.com</span>
                </motion.li>
              </ul>
            </motion.div>

          </motion.div>

          {/* SECTION 4 — BOTTOM ROW */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-6 border-t border-white/10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <span className="text-sm text-[#9CA3AF]">© 2026 SalvaMedic. All rights reserved.</span>
            <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </motion.div>

        </div>
      </motion.footer>

      {/* REACTIVE MODAL FOR CHAT / BOOKING ENGAGEMENT */}
      {/* VIDEO MODAL OVERLAY */}
      {isVideoModalOpen && (
        <div
          onClick={() => setIsVideoModalOpen(false)}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-apex-navy/70 backdrop-blur-sm animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-slide-up"
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              src="https://res.cloudinary.com/dhkyla1rv/video/upload/v1780738055/clinic.mp4"
              poster="/online-consulting image.jpeg"
              controls
              autoPlay
              playsInline
              className="w-full aspect-video object-cover"
            />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-apex-navy/50 backdrop-blur-md animate-fade-in">
          
          <div 
            id="modal-booking-panel"
            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 animate-slide-up relative"
          >
            {/* Modal header */}
            <div className="p-6 bg-gradient-to-r from-apex-navy to-[#2c2c4e] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-apex-blue">
                  <span className="text-base">✳</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Book Appointment</h3>
                  <p className="text-[11px] text-white/70">ApexCare Smart Booking Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingStep === 1 ? (
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-apex-navy uppercase tracking-wider block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-apex-gray" />
                    <input 
                      type="text" 
                      required 
                      placeholder="Jane Doe"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-apex-blue focus:bg-white transition-colors text-apex-navy"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-apex-navy uppercase tracking-wider block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-apex-gray" />
                    <input 
                      type="tel" 
                      required
                      placeholder="+1 (555) 019-2834"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-apex-blue focus:bg-white transition-colors text-apex-navy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-apex-navy uppercase tracking-wider block">Preferred Care</label>
                    <select 
                      value={bookingData.service}
                      onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-apex-blue focus:bg-white transition-colors text-apex-navy font-medium"
                    >
                      {services.map(srv => <option key={srv} value={srv}>{srv}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-apex-navy uppercase tracking-wider block">Assigned Doctor</label>
                    <select 
                      value={bookingData.doctor}
                      onChange={(e) => setBookingData({ ...bookingData, doctor: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-apex-blue focus:bg-white transition-colors text-apex-navy font-medium"
                    >
                      {doctors.map(doc => <option key={doc} value={doc}>{doc}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-apex-navy uppercase tracking-wider block">Date</label>
                    <input 
                      type="date" 
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-apex-blue focus:bg-white transition-colors text-apex-navy font-semibold"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-apex-navy uppercase tracking-wider block">Preferred Slot</label>
                    <select 
                      value={bookingData.time}
                      onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-apex-blue focus:bg-white transition-colors text-apex-navy font-semibold"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:30 PM">03:30 PM</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-apex-blue text-white py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:bg-apex-blue/90 hover:shadow-lg active:scale-98 cursor-pointer mt-4"
                >
                  Confirm Visit Appointment
                </button>

              </form>
            ) : (
              <div className="p-8 text-center flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-apex-navy">Appointment Booked!</h4>
                  <p className="text-sm text-apex-gray max-w-xs mx-auto">
                    Thank you <span className="font-bold text-apex-navy">{bookingData.name}</span>. Your dental visit is scheduled has been added to our queue.
                  </p>
                </div>

                <div className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4.5 text-left space-y-2.5 text-xs text-apex-navy font-medium">
                  <div className="flex justify-between">
                    <span className="text-apex-gray">Dentist:</span>
                    <span>{bookingData.doctor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apex-gray">Care Type:</span>
                    <span className="text-apex-blue font-bold">{bookingData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apex-gray">Date & Time:</span>
                    <span>{bookingData.date} • {bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apex-gray">Patient Phone:</span>
                    <span>{bookingData.phone}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-apex-navy text-white py-3 px-4 rounded-xl font-bold text-sm hover:bg-apex-navy/90 transition-all cursor-pointer"
                >
                  Done, close explorer
                </button>
              </div>
            )}

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-[10px] text-apex-gray flex items-center justify-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#10b981]" /> HIPAA Compliant & Secure Medical Data Storage
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

