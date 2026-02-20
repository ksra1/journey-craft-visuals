
# AEP + AJO Developer Learning Hub

A clean, minimal, single-page interactive website that visually explains Adobe Experience Platform (AEP) and Adobe Journey Optimizer (AJO) from a developer perspective, using E-commerce and Travel & Hospitality use cases as examples.

---

## Page Structure & Sections

### 1. Hero Section
- Bold headline: "Understanding AEP + AJO: A Developer's Visual Guide"
- Subtitle explaining the two-platform ecosystem at a high level
- Two pill badges: **AEP** (blue) and **AJO** (orange/red) — color-coded throughout the site
- Sticky navigation bar with section links: Overview → AEP Data Flow → Segmentation → AJO Journeys → Use Cases

---

### 2. Ecosystem Overview — "The Big Picture"
- **Animated architecture diagram** showing the full pipeline:
  - `Raw Data Sources` → `AEP (Ingest → Schema → Segments)` → `AJO (Journeys / Campaigns)`
- Animated flowing arrows (CSS animations) between each block, with data "packets" moving left to right
- Clicking any block scrolls to that detailed section
- A developer-friendly note explaining the key mental model: "AEP = the brain (data + intelligence), AJO = the hands (execution + delivery)"

---

### 3. AEP: Data Ingestion
- **How data flows INTO AEP** — animated diagram with three data source lanes:
  - Web/Mobile SDK (real-time behavioral events)
  - Batch ingestion (CRM, purchase history CSV)
  - Streaming API (transactional events)
- Each source animates a data packet flowing into an **XDM Schema** box (with a tooltip explaining what XDM is)
- A **Real-Time Customer Profile** node lights up as data merges
- Developer callout boxes: example event payload in JSON format (e.g., `web.webInteraction.type: "cart abandonment"`)

---

### 4. AEP: Segment Building
- **Visual segment builder diagram** showing:
  - Profile attributes (e.g., `loyaltyTier = "Gold"`)
  - Behavioral events (e.g., "viewed flight page 3x in 7 days")
  - Combining with AND/OR logic into a named Audience
- Animated indicator: segment is evaluated → audience list populates
- Two example segments shown as cards:
  - 🛒 **E-commerce**: "Cart Abandoners — high value items, last 48hrs"
  - ✈️ **Travel**: "Gold loyalty members who searched flights but didn't book"
- Segment export animation: audience flows out toward AJO

---

### 5. AEP → AJO Bridge
- Visual "handoff" animation: AEP audience segment flows into AJO as a trigger
- Explains two activation modes:
  - **Audience Qualification** (real-time, as profiles enter/exit segment)
  - **Read Audience** (scheduled batch read of the full segment)
- Simple comparison card: when to use each method

---

### 6. AJO: Journeys vs. Campaigns
- **Side-by-side animated comparison card**:
  - **Journeys**: flow-based, triggered by events, multistep sequences
  - **Campaigns**: one-time or recurring, scheduled, sends to full audience at once
- Each card has an animated icon and 3 bullet key characteristics

---

### 7. AJO: Journey Builder — Activity Types
- **Interactive visual journey canvas** — a simplified mock journey diagram with clickable nodes:
  - **Events** node group (Reaction, Audience Qualification, Generic Event) — click to expand with explanation
  - **Orchestration** node group (Condition/Split, Read Audience, Wait) — animated branching paths
  - **Actions** node group (Email, SMS, Push, In-App, Jump, Custom Action, Update Profile)
- Hovering/clicking each node reveals a tooltip or side panel explaining what it does and when to use it

---

### 8. Use Case Walkthrough — E-commerce (Cart Abandonment)
- **Animated step-by-step flow diagram**:
  1. User adds item to cart, then leaves site → **Web SDK** fires event into AEP
  2. AEP profile updates, user qualifies for "Cart Abandoner" segment
  3. Audience Qualification event triggers AJO journey
  4. **Wait 1hr** → Send **Email** (recover cart)
  5. **Condition**: Email opened? → Yes: Send discount push notification | No: Wait 24hrs → SMS reminder
- Developer annotations at each step showing the underlying data/event names

---

### 9. Use Case Walkthrough — Travel & Hospitality (Loyalty Re-engagement)
- **Animated step-by-step flow diagram**:
  1. Gold-tier member searches flights → behavioral event logged in AEP
  2. AEP "Read Audience" job runs nightly, picks up qualified profiles
  3. AJO Campaign sends personalized email with flight deals
  4. If user clicks → enters a Journey for upsell (hotel bundle push notification → wait → in-app offer)
- Shows how Campaigns and Journeys can work together in one scenario

---

### 10. Glossary / Quick Reference Footer
- Color-coded pill glossary of key terms:
  - AEP terms (blue): XDM, Real-Time Profile, Segment, Streaming Ingestion, Batch Ingestion
  - AJO terms (orange): Journey, Campaign, Action, Event Trigger, Condition, Wait

---

## Design System
- **Colors**: White background, AEP = indigo/blue (`#1473E6`-inspired), AJO = orange-red (`#E34850`-inspired), neutral grays for structure
- **Animations**: CSS-animated dashed arrows and moving dots to represent data flow; fade-in on scroll for each section
- **Typography**: Clean sans-serif, bold section headers, developer-style monospace for code/payload snippets
- **No backend needed** — fully static, all content hardcoded

---

## Technical Approach
- Single-page React app with smooth scroll navigation
- SVG-based flow diagrams with CSS animations for data flow arrows
- Intersection Observer for scroll-triggered fade-in animations
- Expandable/collapsible activity type nodes using accordion components
- Fully responsive (desktop-first but readable on tablet)
