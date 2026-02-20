import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

const sources = [
  {
    id: "sdk",
    icon: "🌐",
    label: "Web / Mobile SDK",
    tech: "alloy.js / Adobe Experience SDK",
    desc: "Real-time behavioral events triggered by user actions in the browser or app",
    color: "border-aep bg-aep-light",
    payload: `// 1. Implementation (Client-Side)
import { createInstance } from "@adobe/alloy";
const alloy = createInstance({ name: "alloy" });

alloy("configure", {
  datastreamId: "eff0-562-b12", // Metadata handled by Edge
  orgId: "ADB-ORG-88@AdobeOrg"
});

// 2. Execution
alloy("sendEvent", {
  xdm: {
    "eventType": "commerce.productViews",
    "commerce": {
      "productViews": { "value": 1 }
    },
    "productListItems": [{
      "SKU": "CC-100",
      "name": "Carry-On Luggage",
      "priceTotal": 199.00
    }]
  }
});`,
  },
  {
    id: "batch",
    icon: "📦",
    label: "Batch Ingestion",
    tech: "SFTP / S3 / API · CSV / Parquet",
    desc: "Historical CRM records, purchase history, loyalty data — scheduled daily/hourly",
    color: "border-border bg-surface",
    payload: `// 1. Create Batch (Server-Side API)
// POST https://platform.adobe.io/data/foundation/import/batches
// Body: { "datasetId": "ds-loyalty-records" }

// 2. Upload File (Flat JSON/CSV mapping to XDM)
[
  {
    "identityMap": {
      "Email": [{ "id": "user@example.com" }]
    },
    "person": {
      "name": { "firstName": "Sarah" }
    },
    "loyaltyDetails": {
      "tier": "Gold",
      "points": 8420
    }
  }
]`,
  },
  {
    id: "stream",
    icon: "⚡",
    label: "Streaming API",
    tech: "HTTP Data Collection API / Kafka",
    desc: "Transactional events from backend systems — order confirmations, payments, status updates",
    color: "border-border bg-surface",
    payload: `// Server-Side Streaming Request
// POST https://platform.adobe.io/data/core/edge/events

{
  "header": {
    "schemaRef": { 
      "id": "https://ns.adobe.com/tenant/schemas/order-schema",
      "contentType": "application/vnd.adobe.xed-full+json;version=1"
    },
    "imsOrgId": "{ORG_ID}"
  },
  "body": {
    "xdm": {
      "eventType": "commerce.purchases",
      "orderId": "ORD-98712",
      "timestamp": "2023-10-27T10:30:00Z"
    }
  }
}`,
  },
];

export const AEPIngestion = () => {
  const { ref, visible } = useScrollReveal();
  const [selected, setSelected] = useState<string | null>("sdk");
  const [profileLit, setProfileLit] = useState(false);

  const handleSelect = (id: string) => {
    setSelected(id === selected ? null : id);
    setProfileLit(true);
    setTimeout(() => setProfileLit(false), 2000);
  };

  const activeSource = sources.find((s) => s.id === selected);

  return (
    <section id="aep-ingestion" className="py-20 px-6 bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-aep-muted rounded-full text-xs font-semibold text-aep mb-3">
            AEP · STEP 1
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Data Ingestion</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Three lanes carry data into AEP. Each is normalized against an{" "}
            <strong>XDM schema</strong> before merging into the Real-Time Customer Profile.
          </p>
          
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border inline-block max-w-3xl">
            <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="text-blue-500">💡</span> Why does the JSON structure change?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
              <div>
                <span className="text-primary block mb-1">Web SDK (alloy.js)</span>
                <p className="text-muted-foreground leading-relaxed">
                  Uses <code className="bg-muted px-1 rounded">"xdm": {}</code> wrapper. Metadata (OrgID, Schema) is handled by the <strong>Datastream</strong> config.
                </p>
              </div>
              <div>
                <span className="text-primary block mb-1">Batch Ingestion</span>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Flat JSON</strong>. No wrapper needed because Metadata is provided externally via the <strong>Batch API/Dataset ID</strong>.
                </p>
              </div>
              <div>
                <span className="text-primary block mb-1">Streaming API</span>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Wrapped JSON</strong>. Each message is independent and must include a <code className="bg-muted px-1 rounded">header</code> with the <strong>Schema Reference</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sources column */}
          <div className="flex flex-col gap-4 lg:w-80 shrink-0">
            {sources.map((src, i) => (
              <button
                key={src.id}
                onClick={() => handleSelect(src.id)}
                className={`group text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-6"
                } ${
                  selected === src.id
                    ? "border-aep bg-aep-light shadow-md"
                    : src.color + " hover:shadow-sm"
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl">{src.icon}</span>
                  <span className="font-semibold text-sm text-foreground">{src.label}</span>
                </div>
                <div className="text-xs text-muted-foreground font-mono mb-1">{src.tech}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{src.desc}</div>
              </button>
            ))}
          </div>

          {/* Right side: flow + payload */}
          <div className="flex-1 flex flex-col gap-4">
            {/* XDM Schema box */}
            <div className={`p-5 rounded-xl border-2 border-aep bg-aep-light transition-all duration-500 ${selected ? "opacity-100" : "opacity-50"}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-aep flex items-center justify-center text-white text-sm font-bold">X</div>
                <div>
                  <div className="font-semibold text-aep text-sm">XDM Schema</div>
                  <div className="text-xs text-muted-foreground">Experience Data Model — standardizes all incoming data</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Every data source maps its fields to a standard XDM schema (e.g., <code className="bg-aep-muted px-1 rounded font-mono">XDM ExperienceEvent</code> or <code className="bg-aep-muted px-1 rounded font-mono">XDM Individual Profile</code>). This ensures all data speaks the same language before merging.
              </p>
            </div>

            {/* Real-Time Profile */}
            <div className={`p-5 rounded-xl border-2 transition-all duration-500 ${profileLit ? "border-aep bg-aep-light shadow-lg scale-[1.02]" : "border-border bg-surface"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${profileLit ? "bg-aep text-white" : "bg-muted text-muted-foreground"}`}>
                  👤
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">Real-Time Customer Profile</div>
                  <div className="text-xs text-muted-foreground">
                    {profileLit ? "✨ Profile updated! Segment membership re-evaluated." : "Unified stitched view of a customer across all touchpoints"}
                  </div>
                </div>
                {profileLit && (
                  <div className="ml-auto">
                    <div className="w-3 h-3 rounded-full bg-aep animate-pulse-ring" />
                  </div>
                )}
              </div>
            </div>

            {/* Payload viewer */}
            {activeSource && (
              <div className="p-4 bg-foreground rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-aep font-mono uppercase">
                    {activeSource.label} · Sample Payload
                  </span>
                </div>
                <pre className="text-xs text-aep font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {activeSource.payload}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
