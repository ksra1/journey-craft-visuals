import { useEffect, useRef, useState } from "react";

export const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Gradient blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-aep-light rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-ajo-light rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div
        ref={ref}
        className={`relative z-10 text-center max-w-4xl transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-aep text-aep-foreground shadow-sm">
            AEP
          </span>
          <span className="text-2xl text-muted-foreground font-light">+</span>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-ajo text-ajo-foreground shadow-sm">
            AJO
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
          Understanding AEP + AJO
          <br />
          <span className="text-aep">A Developer's</span>{" "}
          <span className="text-ajo">Visual Guide</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
          Explore how data flows from raw sources into{" "}
          <strong className="text-aep">Adobe Experience Platform</strong> — where it's ingested,
          unified, and segmented — then activates personalized experiences through{" "}
          <strong className="text-ajo">Adobe Journey Optimizer</strong>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg border border-border text-sm">
            <span className="w-2 h-2 rounded-full bg-aep"></span>
            <span className="text-muted-foreground">AEP = the brain (data + intelligence)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg border border-border text-sm">
            <span className="w-2 h-2 rounded-full bg-ajo"></span>
            <span className="text-muted-foreground">AJO = the hands (execution + delivery)</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { label: "🛒 E-commerce", desc: "Cart abandonment journeys" },
            { label: "✈️ Travel", desc: "Loyalty re-engagement" },
          ].map((uc) => (
            <div
              key={uc.label}
              className="px-5 py-3 bg-background border border-border rounded-xl shadow-sm text-sm"
            >
              <span className="font-semibold text-foreground">{uc.label}</span>
              <span className="text-muted-foreground ml-2">{uc.desc}</span>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button
            onClick={() => document.querySelector("#overview")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-aep text-aep-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            Explore the Architecture
            <svg className="w-4 h-4 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
