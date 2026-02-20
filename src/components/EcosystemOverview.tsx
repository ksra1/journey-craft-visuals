import { useScrollReveal } from "./useScrollReveal";

const blocks = [
  {
    id: "data-sources",
    label: "Raw Data Sources",
    sublabel: "Web SDK · Batch · Streaming API",
    color: "border-border bg-surface text-foreground",
    dotColor: "bg-muted-foreground",
    href: "#aep-ingestion",
  },
  {
    id: "aep",
    label: "AEP",
    sublabel: "Ingest → Schema → Profile → Segments",
    color: "border-aep bg-aep-light text-aep",
    dotColor: "bg-aep",
    href: "#aep-ingestion",
    badge: "AEP",
  },
  {
    id: "ajo",
    label: "AJO",
    sublabel: "Journeys · Campaigns · Actions",
    color: "border-ajo bg-ajo-light text-ajo",
    dotColor: "bg-ajo",
    href: "#ajo-journeys",
    badge: "AJO",
  },
];

const FlowArrow = ({ active }: { active: boolean }) => (
  <div className="flex items-center justify-center w-16 shrink-0 relative">
    <div className="h-0.5 w-full bg-border relative overflow-hidden">
      {active && (
        <>
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-aep animate-flow-right"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-aep animate-flow-right"
            style={{ animationDelay: "0.7s" }}
          />
        </>
      )}
    </div>
    <svg
      className="absolute right-0 w-3 h-3 text-muted-foreground"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </div>
);

export const EcosystemOverview = () => {
  const { ref, visible } = useScrollReveal();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="overview" className="py-20 px-6 bg-surface" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground mb-4">
            ECOSYSTEM OVERVIEW
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">The Big Picture</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            AEP collects, unifies, and segments customer data. AJO activates that intelligence into
            real-time, personalized experiences. Together they form a closed loop.
          </p>
        </div>

        {/* Architecture flow */}
        <div
          className={`flex flex-col md:flex-row items-center justify-center gap-0 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {blocks.map((block, i) => (
            <div key={block.id} className="flex items-center gap-0 w-full md:w-auto">
              <button
                onClick={() => scrollTo(block.href)}
                className={`group flex flex-col items-center text-center px-6 py-5 rounded-2xl border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer w-full md:w-48 ${block.color}`}
              >
                {block.badge && (
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${
                      block.badge === "AEP"
                        ? "bg-aep text-aep-foreground"
                        : "bg-ajo text-ajo-foreground"
                    }`}
                  >
                    {block.badge}
                  </span>
                )}
                <div className="font-bold text-base mb-1">{block.label}</div>
                <div className="text-xs opacity-70 leading-tight">{block.sublabel}</div>
                <div className="mt-3 text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                  Click to explore →
                </div>
              </button>

              {i < blocks.length - 1 && (
                <div className="flex md:items-center w-full md:w-16 my-4 md:my-0">
                  <FlowArrow active={visible} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Developer mental model */}
        <div
          className={`mt-12 p-6 bg-background rounded-2xl border border-border transition-all duration-700 delay-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl">🧠</div>
            <div>
              <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                Developer Mental Model
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Think of <span className="font-semibold text-aep">AEP</span> as the intelligence
                layer — it ingests events from your web/mobile properties via the{" "}
                <code className="text-xs bg-aep-muted px-1.5 py-0.5 rounded font-mono">
                  alloy.js
                </code>{" "}
                SDK, normalizes them against XDM schemas, builds unified customer profiles, and
                evaluates segment membership in real-time.{" "}
                <span className="font-semibold text-ajo">AJO</span> then reads those audiences and
                triggers journeys or campaigns — sending emails, SMS, push, or calling custom
                endpoints — and writes interaction events back to AEP to close the loop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
