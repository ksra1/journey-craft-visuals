import { useState, useEffect } from "react";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "AEP Data Flow", href: "#aep-ingestion" },
  { label: "Segmentation", href: "#aep-segmentation" },
  { label: "AJO Journeys", href: "#ajo-journeys" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Glossary", href: "#glossary" },
];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-wide text-foreground">AEP</span>
          <span className="text-muted-foreground">+</span>
          <span className="text-sm font-bold tracking-wide text-foreground">AJO</span>
          <span className="ml-2 hidden sm:inline text-xs text-muted-foreground font-medium">Developer Guide</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                active === item.href
                  ? "bg-aep text-aep-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
