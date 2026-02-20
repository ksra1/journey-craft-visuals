import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

const steps = [
  {
    id: 1,
    system: "AEP",
    icon: "🌐",
    title: "Web SDK Fires Event",
    desc: "User adds item to cart, then navigates away. alloy.js fires a commerce.productListAdds event.",
    payload: `alloy("sendEvent", {
  xdm: {
    eventType: "commerce.productListAdds",
    productListItems: [{
      SKU: "BAG-501",
      name: "Premium Weekender Bag",
      priceTotal: 249.00,
      quantity: 1
    }],
    identityMap: {
      ECID: [{ id: "ecid-abc123", primary: true }]
    }
  }
})`,
    color: "border-aep",
    bgColor: "bg-aep-light",
    label: "bg-aep text-aep-foreground",
  },
  {
    id: 2,
    system: "AEP",
    icon: "👤",
    title: "Profile Updated · Segment Qualified",
    desc: "AEP updates the real-time profile. The profile enters the 'Cart Abandoner — High Value' segment via Streaming Segmentation.",
    payload: `// AEP evaluates segment in <1s
// Profile now member of:
"segmentMembership": {
  "ups": {
    "cart-abandoners-hv": {
      "status": "realized",
      "lastQualificationTime": "2026-02-20T14:23:11Z"
    }
  }
}`,
    color: "border-aep",
    bgColor: "bg-aep-light",
    label: "bg-aep text-aep-foreground",
  },
  {
    id: 3,
    system: "AJO",
    icon: "⚡",
    title: "Audience Qualification Triggers Journey",
    desc: "AJO receives the segment qualification event in real-time. The 'Cart Recovery' journey is triggered for this profile.",
    payload: `// AJO Journey: Cart Recovery
// Entry: Audience Qualification Event
// Segment: "cart-abandoners-hv"
// journeyContext.segmentId = "cart-abandoners-hv"
// journeyContext.entryType = "realized"`,
    color: "border-ajo",
    bgColor: "bg-ajo-light",
    label: "bg-ajo text-ajo-foreground",
  },
  {
    id: 4,
    system: "AJO",
    icon: "⏱️",
    title: "Wait 1 Hour",
    desc: "Journey waits 1 hour — giving the customer time to return organically before sending any communication.",
    payload: `// Wait Activity Config
{
  "type": "fixed",
  "duration": "PT1H"  // ISO 8601
}`,
    color: "border-border",
    bgColor: "bg-surface",
    label: "bg-muted-foreground text-background",
  },
  {
    id: 5,
    system: "AJO",
    icon: "✉️",
    title: "Send Cart Recovery Email",
    desc: "AJO sends a personalized email with the abandoned cart items and a recovery CTA.",
    payload: `// Email personalization (AJO Expression Language)
// profile.person.name.firstName → "Sarah"
// context.journey.cartItems → product list

Subject: Sarah, you left something behind!

[Item]: Premium Weekender Bag — $249.00

// CTA Button links to cart recovery URL with
// pre-filled cart via commerce.cartId token`,
    color: "border-ajo",
    bgColor: "bg-ajo-light",
    label: "bg-ajo text-ajo-foreground",
  },
  {
    id: 6,
    system: "AJO",
    icon: "🔱",
    title: "Condition: Email Opened?",
    desc: "AJO checks the Reaction event from the email send. Branches into two paths based on engagement.",
    payload: `// Condition expression
profile.events.reactions
  .where(e => e.messageId == currentEmailId
    && e.eventType == "message.tracking.open")
  .count() > 0
// YES → Push Discount Offer
// NO  → Wait 24hr → SMS Reminder`,
    color: "border-border",
    bgColor: "bg-surface",
    label: "bg-muted-foreground text-background",
  },
];

const branchYes = {
  icon: "🔔",
  title: "YES: Push — Exclusive Discount",
  desc: "Send push notification with a 10% off code",
  color: "bg-aep-light border-aep text-aep",
};
const branchNo = {
  icon: "📱",
  title: "NO: Wait 24hr → SMS Reminder",
  desc: "Send SMS with direct cart link",
  color: "bg-ajo-light border-ajo text-ajo",
};

export const EcommerceUseCase = () => {
  const { ref, visible } = useScrollReveal();
  const [activeStep, setActiveStep] = useState<number>(1);

  const active = steps.find((s) => s.id === activeStep)!;

  return (
    <section id="use-cases" className="py-20 px-6 bg-surface" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-aep-muted rounded-full text-xs font-semibold text-aep mb-3">
            USE CASE 1 · E-COMMERCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            🛒 Cart Abandonment Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A customer adds a high-value item to their cart and leaves. Follow the full data flow
            from Web SDK event to personalized recovery journey.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Steps timeline */}
          <div className="lg:w-64 shrink-0">
            <div className="space-y-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    activeStep === step.id
                      ? step.color + " " + step.bgColor + " shadow-sm"
                      : "border-border bg-background hover:bg-surface"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      activeStep === step.id ? active.label : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-foreground truncate">{step.title}</div>
                    <div className={`text-xs px-1.5 py-0.5 rounded font-medium inline-block mt-0.5 ${
                      step.system === "AEP" ? "bg-aep-muted text-aep" : step.system === "AJO" ? "bg-ajo-muted text-ajo" : "bg-muted text-muted-foreground"
                    }`}>
                      {step.system}
                    </div>
                  </div>
                </button>
              ))}

              {/* Branch outcomes */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[branchYes, branchNo].map((branch) => (
                  <div key={branch.title} className={`p-2 rounded-lg border-2 text-xs ${branch.color}`}>
                    <div className="text-base mb-1">{branch.icon}</div>
                    <div className="font-semibold leading-tight">{branch.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="flex-1">
            <div
              className={`p-6 rounded-2xl border-2 ${active.color} ${active.bgColor} h-full transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{active.icon}</span>
                <div>
                  <div className="font-bold text-foreground text-lg">{active.title}</div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${active.label}`}
                  >
                    {active.system}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{active.desc}</p>
              <div className="bg-foreground rounded-xl p-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Code / Config
                </div>
                <pre className="text-xs font-mono text-aep leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {active.payload}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
