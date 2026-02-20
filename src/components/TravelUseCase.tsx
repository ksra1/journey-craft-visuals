import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

const steps = [
  {
    id: 1,
    system: "AEP",
    icon: "✈️",
    title: "Behavioral Event: Flight Search",
    desc: "Gold-tier loyalty member visits the flight search page. The Web SDK fires a custom pageView event with flight search context.",
    payload: `alloy("sendEvent", {
  xdm: {
    eventType: "web.webpagedetails.flightSearch",
    web: {
      webPageDetails: { name: "Flight Search" }
    },
    _airline: {
      search: {
        origin: "SFO",
        destination: "NYC",
        departureDate: "2026-03-15",
        cabinClass: "Business"
      }
    },
    identityMap: {
      loyaltyId: [{ id: "GOLD-98124", primary: true }]
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
    icon: "📦",
    title: "Read Audience: Nightly Batch Job",
    desc: "AEP runs a scheduled batch segmentation job each night at midnight. Profiles matching the 'Gold + Searched + No Book' segment are exported.",
    payload: `// Segment: Gold Members · Flight Search · No Booking
// Evaluation: Batch (nightly at 00:00 UTC)
// Export: AJO Audience Destination

{
  "loyaltyDetails.tier": "Gold",
  "events": [
    { "type": "flightSearch", "window": "7d" }
  ],
  "excludeEvents": [
    { "type": "bookingConfirmed", "window": "7d" }
  ],
  "estimatedSize": 3941
}`,
    color: "border-aep",
    bgColor: "bg-aep-light",
    label: "bg-aep text-aep-foreground",
  },
  {
    id: 3,
    system: "AJO",
    icon: "📣",
    title: "AJO Campaign: Personalized Flight Deals",
    desc: "An AJO Campaign is scheduled to run after the nightly audience export. All 3,941 profiles receive a personalized flight deals email simultaneously.",
    payload: `// AJO Campaign Config
{
  "name": "Gold Member Flight Deals",
  "type": "scheduled",
  "audience": "gold-flight-searchers",
  "schedule": "0 2 * * *",  // 2am UTC
  "action": {
    "type": "email",
    "template": "flight-deals-personalized",
    "personalization": {
      "origin": "{{profile._airline.lastSearch.origin}}",
      "deals": "{{recs.flightDeals.top3}}"
    }
  }
}`,
    color: "border-ajo",
    bgColor: "bg-ajo-light",
    label: "bg-ajo text-ajo-foreground",
  },
  {
    id: 4,
    system: "AJO",
    icon: "🔱",
    title: "Condition: Email Link Clicked?",
    desc: "AJO captures the Reaction event. If the user clicked a flight deal link in the email, they enter a personalized upsell Journey.",
    payload: `// Reaction event captured in <30s
// If profile.tracking.click.url contains "flight-deal"
// → Enter "Upsell Hotel Bundle" Journey

// AJO Jump Activity config:
{
  "targetJourneyId": "hotel-upsell-journey",
  "params": {
    "flightOrigin": "{{profile._airline.lastSearch.origin}}",
    "flightDest": "{{profile._airline.lastSearch.destination}}"
  }
}`,
    color: "border-border",
    bgColor: "bg-surface",
    label: "bg-muted-foreground text-background",
  },
  {
    id: 5,
    system: "AJO",
    icon: "🔔",
    title: "Journey: Hotel Bundle Push + In-App",
    desc: "The upsell Journey triggers a push notification about a hotel bundle deal. After 2 hours, an in-app message appears on next app open with an exclusive offer.",
    payload: `// Step 1: Push Notification
{
  "title": "Complete your NYC trip, Sarah!",
  "body": "Add a hotel for 15% off. Limited time.",
  "deepLink": "app://hotel-bundle/nyc"
}

// Step 2: Wait 2hrs
// Step 3: In-App Message (shown on next app open)
{
  "type": "banner",
  "content": "Your exclusive bundle: SFO→NYC + Hotel",
  "cta": "Book Now — Offer expires in 24hr"
}`,
    color: "border-ajo",
    bgColor: "bg-ajo-light",
    label: "bg-ajo text-ajo-foreground",
  },
  {
    id: 6,
    system: "AEP",
    icon: "🔁",
    title: "Interaction Data Flows Back to AEP",
    desc: "AJO writes all interaction events (sends, opens, clicks, bookings) back to AEP. The profile is enriched with engagement data, potentially qualifying for new segments.",
    payload: `// AJO → AEP feedback loop
// Automatically via Connected Experience Events
{
  "eventType": "message.tracking.click",
  "channel": "push",
  "campaignId": "hotel-upsell-journey",
  "timestamp": "2026-02-21T04:12:33Z"
}
// Profile updated → may exit "unconverted" segment
// → enter "high-intent bookers" segment`,
    color: "border-aep",
    bgColor: "bg-aep-light",
    label: "bg-aep text-aep-foreground",
  },
];

export const TravelUseCase = () => {
  const { ref, visible } = useScrollReveal();
  const [activeStep, setActiveStep] = useState<number>(1);

  const active = steps.find((s) => s.id === activeStep)!;

  return (
    <section id="travel-use-case" className="py-20 px-6 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ajo-muted rounded-full text-xs font-semibold text-ajo mb-3">
            USE CASE 2 · TRAVEL & HOSPITALITY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            ✈️ Loyalty Member Re-engagement
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A Gold loyalty member searches for flights but doesn't book. See how AEP + AJO combine
            a Campaign and a Journey to drive conversion — and write results back to close the loop.
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
                      : "border-border bg-surface hover:bg-muted"
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
                    <div
                      className={`text-xs px-1.5 py-0.5 rounded font-medium inline-block mt-0.5 ${
                        step.system === "AEP"
                          ? "bg-aep-muted text-aep"
                          : step.system === "AJO"
                          ? "bg-ajo-muted text-ajo"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.system}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-surface rounded-xl border border-border text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">💡 Key insight:</span> This scenario
              uses both a <span className="text-ajo font-medium">Campaign</span> (batch email) AND a{" "}
              <span className="text-aep font-medium">Journey</span> (event-driven upsell) — showing
              they work together.
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
