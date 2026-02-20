import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

const activityGroups = [
  {
    id: "events",
    label: "Events",
    icon: "⚡",
    color: "bg-aep text-aep-foreground",
    borderColor: "border-aep",
    bgLight: "bg-aep-light",
    desc: "Entry triggers for the journey. The journey starts when one of these fires.",
    activities: [
      {
        id: "reactions",
        name: "Reactions",
        icon: "💬",
        desc: "Reacts to tracking data from a previously sent message (email opens, link clicks, push reactions). Use to branch logic based on engagement.",
        devNote: "eventType: message.tracking.subscribe or message.tracking.click",
      },
      {
        id: "aud-qual",
        name: "Audience Qualification",
        icon: "🎯",
        desc: "Triggers when a profile enters or exits an AEP segment in real-time. The most common event trigger for behavioral journeys.",
        devNote: "Powered by AEP Streaming Segmentation. Profile must be on Edge Network.",
      },
      {
        id: "generic",
        name: "Generic Events",
        icon: "📡",
        desc: "Any custom business event sent via the AJO Event API. Examples: backend order confirmations, IoT sensor triggers, payment gateway callbacks.",
        devNote: "POST /events — configure schema in AJO Admin. Supports XDM or custom schema.",
      },
    ],
  },
  {
    id: "orchestration",
    label: "Orchestration",
    icon: "🔀",
    color: "bg-muted text-foreground",
    borderColor: "border-border",
    bgLight: "bg-surface",
    desc: "Control the flow, timing, and branching logic within the journey.",
    activities: [
      {
        id: "condition",
        name: "Condition",
        icon: "🔱",
        desc: "Splits the journey into multiple branches based on profile attributes, events, or segment membership. Each branch can have its own action path.",
        devNote: "Supports: profile attributes, segment membership, event data, journey context",
      },
      {
        id: "read-audience",
        name: "Read Audience",
        icon: "👥",
        desc: "Sets the journey to read profiles from a full AEP segment on a schedule. All matching profiles enter simultaneously — a batch mode entry point.",
        devNote: "Schedule: daily/hourly/on-demand. Pairs with Campaign or scheduled journeys.",
      },
      {
        id: "wait",
        name: "Wait",
        icon: "⏱️",
        desc: "Pauses the individual profile's journey for a fixed duration or until a specific date/time. Supports dynamic wait based on profile data.",
        devNote: "Types: Fixed duration · Until specific time · Custom (expression-based)",
      },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    icon: "🚀",
    color: "bg-ajo text-ajo-foreground",
    borderColor: "border-ajo",
    bgLight: "bg-ajo-light",
    desc: "Deliver experiences or update data at any step in the journey.",
    activities: [
      {
        id: "email",
        name: "Email",
        icon: "✉️",
        desc: "Send a transactional or marketing email using AJO's built-in email designer. Supports dynamic personalization via profile attributes and event context.",
        devNote: "Template language: AJO Expression (Handlebars-like). Unsubscribe managed via Suppression List.",
      },
      {
        id: "sms",
        name: "SMS / MMS",
        icon: "📱",
        desc: "Send text messages via Twilio, Sinch, or Infobip. Ideal for high-urgency nudges like price drop alerts or booking reminders.",
        devNote: "Configure provider in AJO Admin. Supports opt-out keyword handling.",
      },
      {
        id: "push",
        name: "Push Notification",
        icon: "🔔",
        desc: "Send mobile push to iOS/Android via AEP Mobile SDK. Rich push with images, CTAs, and deep links supported.",
        devNote: "Requires: app surface configured · AEP Mobile SDK · Push token in profile",
      },
      {
        id: "inapp",
        name: "In-App Message",
        icon: "📲",
        desc: "Display rich in-app messages while the user is active in the mobile app. Triggered by journey step, no notification permission required.",
        devNote: "Requires AEP Mobile SDK with Messaging extension. Message shown on next app open.",
      },
      {
        id: "jump",
        name: "Jump",
        icon: "↗️",
        desc: "Transfer a profile from the current journey to a separate, independent journey. Allows modular journey design without complex branching in one canvas.",
        devNote: "Target journey must be Live. Profile carries over context data as journey parameters.",
      },
      {
        id: "custom-action",
        name: "Custom Action",
        icon: "🔌",
        desc: "Call any third-party REST API endpoint. Use to trigger Salesforce, SAP, Twilio, Slack, or any internal microservice as part of the journey.",
        devNote: "Configure endpoint, auth (Bearer/API Key/Basic), and payload mapping in AJO Admin.",
      },
      {
        id: "update-profile",
        name: "Update Profile",
        icon: "✏️",
        desc: "Write back to the AEP profile — update attributes like loyalty tier, consent flags, or custom fields. Only available in journeys starting with a namespace-scoped event.",
        devNote: "Writes via AEP Profile Update API. Triggering event must have an identity namespace.",
      },
    ],
  },
];

export const JourneyBuilder = () => {
  const { ref, visible } = useScrollReveal();
  const [activeGroup, setActiveGroup] = useState("events");
  const [activeActivity, setActiveActivity] = useState<string | null>("aud-qual");

  const group = activityGroups.find((g) => g.id === activeGroup)!;
  const activity = group.activities.find((a) => a.id === activeActivity);

  return (
    <section id="journey-builder" className="py-20 px-6 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ajo-muted rounded-full text-xs font-semibold text-ajo mb-3">
            AJO · JOURNEY BUILDER
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Activity Types</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Every journey is built from three categories of activities. Click any node to explore
            what it does and how to configure it.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Group selector + activity list */}
          <div className="lg:w-80 shrink-0">
            {/* Group tabs */}
            <div className="flex gap-2 mb-4">
              {activityGroups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setActiveGroup(g.id);
                    setActiveActivity(g.activities[0].id);
                  }}
                  className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                    activeGroup === g.id
                      ? g.color + " border-transparent shadow-sm"
                      : "bg-surface border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <span>{g.icon}</span>
                  <span>{g.label}</span>
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mb-3 px-1">{group.desc}</p>

            {/* Activity nodes */}
            <div className="space-y-2">
              {group.activities.map((act) => (
                <button
                  key={act.id}
                  onClick={() => setActiveActivity(act.id === activeActivity ? null : act.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    activeActivity === act.id
                      ? group.borderColor + " " + group.bgLight + " shadow-sm"
                      : "border-border bg-surface hover:bg-muted"
                  }`}
                >
                  <span className="text-lg shrink-0">{act.icon}</span>
                  <span className="text-sm font-medium text-foreground">{act.name}</span>
                  <svg
                    className={`ml-auto w-4 h-4 text-muted-foreground transition-transform ${activeActivity === act.id ? "rotate-90" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Detail panel */}
          <div className="flex-1">
            {activity ? (
              <div
                className={`h-full p-6 rounded-2xl border-2 ${group.borderColor} ${group.bgLight} transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl">{activity.icon}</span>
                  <div>
                    <div className="text-xl font-bold text-foreground">{activity.name}</div>
                    <div className="text-sm text-muted-foreground">{group.label} Activity</div>
                  </div>
                </div>

                <p className="text-sm text-foreground leading-relaxed mb-5">{activity.desc}</p>

                <div className="p-4 bg-foreground rounded-xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    🧑‍💻 Developer Note
                  </div>
                  <p className="text-xs font-mono text-aep leading-relaxed">{activity.devNote}</p>
                </div>

                {/* Visual canvas preview for orchestration */}
                {activeGroup === "orchestration" && activity.id === "condition" && (
                  <div className="mt-5 p-4 bg-background rounded-xl border border-border">
                    <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Visual: Condition Branching</div>
                    <div className="flex flex-col items-center gap-2 text-xs">
                      <div className="px-3 py-1.5 bg-aep text-aep-foreground rounded-lg font-mono">⚡ Entry Event</div>
                      <div className="h-4 w-0.5 bg-border" />
                      <div className="px-3 py-1.5 bg-foreground text-background rounded-lg font-bold">🔱 Condition</div>
                      <div className="flex gap-6">
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-4 w-0.5 bg-border" />
                          <div className="px-2 py-1 bg-aep-muted text-aep rounded text-xs font-mono">Path A: email opened</div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-4 w-0.5 bg-border" />
                          <div className="px-2 py-1 bg-ajo-muted text-ajo rounded text-xs font-mono">Path B: no interaction</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-48 flex items-center justify-center p-6 rounded-2xl border-2 border-dashed border-border text-muted-foreground text-sm">
                Select an activity to see details
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
