import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

const segments = [
  {
    id: "ecommerce",
    emoji: "🛒",
    label: "E-commerce",
    name: "Cart Abandoners — High Value",
    definition: {
      attributes: [
        { field: "commerce.checkouts.value", op: "= 0" },
        { field: "productListItems.priceTotal", op: "> 100" },
      ],
      events: [
        { field: "eventType", op: "= commerce.productListAdds", window: "last 48hrs" },
        { field: "eventType", op: "≠ commerce.purchases", window: "last 48hrs" },
      ],
      logic: "AND",
    },
    count: "14,280",
    color: "border-aep bg-aep-light",
    badge: "bg-aep text-aep-foreground",
  },
  {
    id: "travel",
    emoji: "✈️",
    label: "Travel & Hospitality",
    name: "Gold Members · Searched Flights · No Booking",
    definition: {
      attributes: [
        { field: "loyaltyDetails.tier", op: '= "Gold"' },
        { field: "loyaltyDetails.points", op: "> 5000" },
      ],
      events: [
        { field: "eventType", op: "= web.webpagedetails.flightSearch", window: "last 7 days" },
        { field: "eventType", op: "≠ travel.bookingConfirmed", window: "last 7 days" },
      ],
      logic: "AND",
    },
    count: "3,941",
    color: "border-ajo bg-ajo-light",
    badge: "bg-ajo text-ajo-foreground",
  },
];

export const AEPSegmentation = () => {
  const { ref, visible } = useScrollReveal();
  const [active, setActive] = useState("ecommerce");
  const [exporting, setExporting] = useState(false);

  const seg = segments.find((s) => s.id === active)!;

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2200);
  };

  return (
    <section id="aep-segmentation" className="py-20 px-6 bg-surface" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-aep-muted rounded-full text-xs font-semibold text-aep mb-3">
            AEP · STEP 2
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Segment Building</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Combine profile attributes and behavioral events with AND/OR logic to define reusable
            audiences. AEP evaluates membership in real-time as profiles update.
          </p>
        </div>

        {/* Segment tabs */}
        <div className="flex gap-3 mb-6">
          {segments.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                active === s.id
                  ? s.color + " shadow-sm"
                  : "border-border bg-background text-muted-foreground hover:bg-surface"
              }`}
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Segment builder visual */}
        <div
          className={`bg-background rounded-2xl border-2 border-border p-6 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Segment Name
              </div>
              <div className="font-bold text-foreground">{seg.name}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-1">Estimated Audience</div>
              <div className="text-2xl font-bold text-foreground">{seg.count}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile attributes */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded bg-aep-muted flex items-center justify-center text-aep">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-aep uppercase tracking-wide">Profile Attributes</span>
              </div>
              <div className="space-y-2">
                {seg.definition.attributes.map((attr, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-aep-muted rounded-lg">
                    <code className="text-xs font-mono text-aep flex-1">{attr.field}</code>
                    <span className="text-xs font-semibold text-foreground shrink-0">{attr.op}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Behavioral events */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded bg-ajo-muted flex items-center justify-center text-ajo">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-ajo uppercase tracking-wide">Behavioral Events</span>
              </div>
              <div className="space-y-2">
                {seg.definition.events.map((ev, i) => (
                  <div key={i} className="p-2.5 bg-ajo-muted rounded-lg">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-xs font-mono text-ajo">{ev.field}</code>
                      <span className="text-xs font-semibold text-foreground">{ev.op}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">Window: {ev.window}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Logic connector */}
          <div className="flex items-center justify-center my-4">
            <div className="px-3 py-1 bg-foreground text-background rounded-full text-xs font-bold">
              {seg.definition.logic}
            </div>
          </div>

          {/* Export to AJO */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="flex-1 text-sm text-muted-foreground">
              ✅ Segment evaluated · Ready to activate in AJO
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-ajo text-ajo-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-all"
            >
              {exporting ? (
                <>
                  <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Exporting to AJO…
                </>
              ) : (
                <>Send to AJO →</>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
