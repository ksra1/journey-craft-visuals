import { useScrollReveal } from "./useScrollReveal";

const modes = [
  {
    id: "qualification",
    icon: "⚡",
    title: "Audience Qualification",
    subtitle: "Real-time trigger",
    description:
      "AJO listens for profile entry/exit events from AEP. The moment a profile qualifies for a segment (or exits), a journey is triggered instantly — ideal for cart abandonment or real-time alerts.",
    whenToUse: "Use when immediacy matters: cart abandonment, real-time fraud alerts, booking drop-offs.",
    color: "border-aep bg-aep-light",
    labelColor: "bg-aep text-aep-foreground",
  },
  {
    id: "read-audience",
    icon: "🗓️",
    title: "Read Audience",
    subtitle: "Scheduled batch",
    description:
      "AJO reads the full audience snapshot on a schedule (daily, hourly). All matching profiles are entered into the journey or campaign at once — ideal for newsletters, weekly digests, or loyalty campaigns.",
    whenToUse: "Use for scheduled comms: weekly deals, nightly loyalty emails, re-engagement campaigns.",
    color: "border-border bg-surface",
    labelColor: "bg-muted-foreground text-background",
  },
];

export const AEPAJOBridge = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="aep-ajo-bridge" className="py-20 px-6 bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ajo-muted rounded-full text-xs font-semibold text-ajo mb-3">
            AEP → AJO BRIDGE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Segment Activation</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            AEP segments don't stay in AEP — they're activated into AJO via two mechanisms. Choosing
            the right one is a key architectural decision.
          </p>
        </div>

        {/* Animated handoff */}
        <div
          className={`flex items-center justify-center gap-4 mb-10 p-6 bg-surface rounded-2xl border border-border transition-all duration-700 delay-200 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-aep-light border-2 border-aep flex items-center justify-center text-2xl mb-2">🧠</div>
            <div className="text-xs font-bold text-aep">AEP</div>
            <div className="text-xs text-muted-foreground">Segment Ready</div>
          </div>

          {/* Animated arrow */}
          <div className="flex-1 max-w-32 h-0.5 bg-border relative overflow-hidden">
            {visible && (
              <>
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-ajo animate-flow-right" style={{ animationDelay: "0s" }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-ajo animate-flow-right" style={{ animationDelay: "1s" }} />
              </>
            )}
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-ajo-light border-2 border-ajo flex items-center justify-center text-2xl mb-2">🚀</div>
            <div className="text-xs font-bold text-ajo">AJO</div>
            <div className="text-xs text-muted-foreground">Journey Triggered</div>
          </div>
        </div>

        {/* Two modes */}
        <div className="grid md:grid-cols-2 gap-6">
          {modes.map((mode, i) => (
            <div
              key={mode.id}
              className={`p-6 rounded-2xl border-2 transition-all duration-700 ${mode.color} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 150 + 300}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{mode.icon}</span>
                <div>
                  <div className="font-bold text-foreground">{mode.title}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${mode.labelColor}`}>
                    {mode.subtitle}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{mode.description}</p>
              <div className="p-3 bg-background rounded-lg border border-border">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">When to use</div>
                <p className="text-xs text-foreground">{mode.whenToUse}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
