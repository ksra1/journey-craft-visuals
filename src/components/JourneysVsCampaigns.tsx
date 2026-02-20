import { useScrollReveal } from "./useScrollReveal";

const items = [
  {
    type: "journeys",
    icon: "🔀",
    title: "Journeys",
    tagline: "Real-time orchestration",
    color: "border-aep bg-aep-light",
    titleColor: "text-aep",
    badge: "bg-aep text-aep-foreground",
    points: [
      "Flow-based, multi-step sequences",
      "Triggered by a specific event or audience entry",
      "Execute actions in order with waits & conditions",
      "Highly personalized per individual profile",
    ],
    example: "Cart abandoned → wait 1hr → email → if opened: push offer → else: 24hr SMS",
  },
  {
    type: "campaigns",
    icon: "📣",
    title: "Campaigns",
    tagline: "One-time or recurring delivery",
    color: "border-ajo bg-ajo-light",
    titleColor: "text-ajo",
    badge: "bg-ajo text-ajo-foreground",
    points: [
      "Deliver content to an entire audience at once",
      "Actions execute simultaneously for all profiles",
      "Simple ad-hoc or recurring batch sends",
      "Requires a schedule (not an event trigger)",
    ],
    example: "Every Monday → send weekly flight deals email to 'Gold Members' segment",
  },
];

export const JourneysVsCampaigns = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="ajo-journeys" className="py-20 px-6 bg-surface" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ajo-muted rounded-full text-xs font-semibold text-ajo mb-3">
            AJO · CORE CONCEPT
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Journeys vs. Campaigns
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            AJO has two distinct execution models. Knowing which to use is the first architectural
            decision every developer faces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={item.type}
              className={`p-6 rounded-2xl border-2 transition-all duration-700 ${item.color} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <div className={`text-xl font-bold ${item.titleColor}`}>{item.title}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.badge}`}>
                    {item.tagline}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-5">
                {item.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-0.5 text-aep shrink-0">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="p-3 bg-background/70 rounded-xl border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Developer Example
                </div>
                <p className="text-xs text-foreground font-mono leading-relaxed">{item.example}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick decision guide */}
        <div
          className={`mt-8 p-5 bg-background rounded-2xl border border-border transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            💡 Quick Decision Guide
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-aep">Use a Journey when:</span>
              <span className="text-muted-foreground ml-2">an event triggers the interaction (cart add, page view, booking drop-off)</span>
            </div>
            <div>
              <span className="font-semibold text-ajo">Use a Campaign when:</span>
              <span className="text-muted-foreground ml-2">you need to reach all audience members at a specific time (weekly email, flash sale)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
