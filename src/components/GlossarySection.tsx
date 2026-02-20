import { useScrollReveal } from "./useScrollReveal";

const terms = [
  // AEP terms
  { label: "XDM", system: "AEP", desc: "Experience Data Model — the standard schema framework for all AEP data" },
  { label: "Schema", system: "AEP", desc: "The 'Blueprint'. Defines the structure, fields, and data types (e.g., Individual Profile or ExperienceEvent)." },
  { label: "Dataset", system: "AEP", desc: "The 'Storage Bin'. A container for the actual data records or files, tied to a specific Schema." },
  { label: "Datastream", system: "AEP", desc: "The 'Router'. Server-side config that tells the Edge Network which Schema and Dataset to use for Web SDK events." },
  { label: "Real-Time Profile", system: "AEP", desc: "A unified, stitched view of a customer across all channels and devices" },
  { label: "Segment / Audience", system: "AEP", desc: "A named group of profiles matching defined attribute + event rules" },
  { label: "Streaming Segmentation", system: "AEP", desc: "Real-time segment evaluation as profile events arrive (<1s latency)" },
  { label: "Batch Segmentation", system: "AEP", desc: "Scheduled segment evaluation run on a defined interval (hourly/daily)" },
  { label: "Streaming Ingestion", system: "AEP", desc: "Real-time data ingestion via HTTP API or alloy.js Web SDK" },
  { label: "Batch Ingestion", system: "AEP", desc: "Scheduled file-based import via SFTP, S3, Azure, or API" },
  { label: "Identity Graph", system: "AEP", desc: "Stitches multiple identifiers (ECID, email, loyaltyId) to one profile" },
  { label: "alloy.js", system: "AEP", desc: "Adobe's Web SDK for collecting events from browser/mobile apps" },
  // AJO terms
  { label: "Journey", system: "AJO", desc: "A real-time, event-driven multi-step orchestration flow for individual profiles" },
  { label: "Campaign", system: "AJO", desc: "A scheduled one-time or recurring message delivery to a full audience" },
  { label: "Audience Qualification", system: "AJO", desc: "Journey entry trigger fired when a profile enters/exits an AEP segment" },
  { label: "Read Audience", system: "AJO", desc: "Journey/Campaign entry that reads all profiles from a segment on a schedule" },
  { label: "Condition Activity", system: "AJO", desc: "Splits the journey into branches based on profile data or event context" },
  { label: "Wait Activity", system: "AJO", desc: "Pauses a profile's journey for a fixed or dynamic time period" },
  { label: "Reaction Event", system: "AJO", desc: "Tracks engagement with a sent message: opens, clicks, unsubscribes" },
  { label: "Jump Activity", system: "AJO", desc: "Moves a profile from one journey to another, enabling modular design" },
  { label: "Custom Action", system: "AJO", desc: "Calls a third-party REST API endpoint from within a journey step" },
  { label: "Update Profile", system: "AJO", desc: "Writes attribute values back to the AEP profile during a journey" },
  { label: "Surface", system: "AJO", desc: "A configured channel endpoint: email, push token, SMS number, or in-app" },
  { label: "Suppression List", system: "AJO", desc: "A blocklist of addresses/devices that should never receive messages" },
];

export const GlossarySection = () => {
  const { ref, visible } = useScrollReveal();

  const aepTerms = terms.filter((t) => t.system === "AEP");
  const ajoTerms = terms.filter((t) => t.system === "AJO");

  return (
    <section id="glossary" className="py-20 px-6 bg-surface border-t border-border" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground mb-3">
            QUICK REFERENCE
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">Developer Glossary</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Key terms color-coded by platform. Hover any term for a definition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* AEP terms */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-aep" />
              <span className="font-bold text-aep text-sm uppercase tracking-wide">AEP Terms</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {aepTerms.map((term) => (
                <div key={term.label} className="group relative">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-aep-muted text-aep text-xs font-semibold cursor-default hover:bg-aep hover:text-aep-foreground transition-all">
                    {term.label}
                  </span>
                  <div className="absolute bottom-full left-0 mb-2 w-56 p-2.5 bg-foreground text-background text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 leading-relaxed">
                    {term.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AJO terms */}
          <div
            className={`transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-ajo" />
              <span className="font-bold text-ajo text-sm uppercase tracking-wide">AJO Terms</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ajoTerms.map((term) => (
                <div key={term.label} className="group relative">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-ajo-muted text-ajo text-xs font-semibold cursor-default hover:bg-ajo hover:text-ajo-foreground transition-all">
                    {term.label}
                  </span>
                  <div className="absolute bottom-full left-0 mb-2 w-56 p-2.5 bg-foreground text-background text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 leading-relaxed">
                    {term.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-16 pt-8 border-t border-border text-center transition-all duration-700 delay-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-sm font-bold text-aep">AEP</span>
            <span className="text-muted-foreground">+</span>
            <span className="text-sm font-bold text-ajo">AJO</span>
            <span className="text-muted-foreground text-sm">Developer Visual Guide</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Built to help developers understand the data flow between Adobe Experience Platform and
            Adobe Journey Optimizer with real-world use cases.
          </p>
        </div>
      </div>
    </section>
  );
};
