# LokVyapar (लोकव्यापार) - Nagpur Smart Street Vendor & Footfall Platform

> **"सशक्त पथविक्रेता, समृद्ध नागपूर"**  
> *Empowering 14,800+ street vendors through UPI-powered crowd intelligence, transparent citizen ratings, and municipal zoning compliance.*

---

## 🌟 Hackathon Project Overview

**LokVyapar** is an urban civic-tech platform tailored specifically for **Nagpur, Maharashtra**. It tackles two major urban challenges:
1. **Unregulated Pedestrian Congestion & Foot-traffic in Street Markets**: Instead of deploying expensive AI CCTV surveillance, LokVyapar correlates high-frequency **digital UPI/QR payment transactions** across market clusters (Sitabuldi, Sadar, Dharampeth, Itwari, Mahal, Gandhibagh, Cotton Market) to estimate real-time footfall density and predict hourly rush curves (6 AM to 11 PM).
2. **Street Vendor Empowerment & Citizen Oversight**: Connects street vendors to the central **PM-SVANidhi micro-credit scheme**, displays verified FSSAI Clean Street Food hygiene grades, provides a public rating and review forum, and establishes an audited civic grievance redressal system with the **Nagpur Municipal Corporation (NMC) Town Vending Committee (TVC)**.

---

## 🚀 Key Features & Modules

### 1. 👥 Citizen Public Portal
- **Interactive Nagpur Market Footfall Map**:
  - Live Leaflet.js map with Nagpur landmarks and custom vendor markers.
  - **Hourly Time Slider (06:00 AM – 11:00 PM)**: Dynamically simulates pedestrian rush hours, adjusting heat radiuses and UPI transaction counts in real time.
  - Interactive Market drawer showing live visitors/hr, peak rush window, and green/yellow vending zoning policies.
- **Street Vendor Directory & Filter Engine**:
  - Search by trade (*Street Food, Fruits & Veggies, Apparel, Tea & Beverages, Artisans, Mobile Accessories*).
  - Filter by Nagpur zone (*Sitabuldi, Sadar, Dharampeth, Itwari, Mahal, Gandhibagh, Cotton Market*).
- **Top Rated Nagpur Vendors Spotlight (लोकप्रिय व्यापारी)**:
  - Highlights city favorites (Shriram Tarri Poha, Ramesh Chaat, Santosh Pav Bhaji, Ramji Chai) with verified citizen quotes and 5-star ratings.
- **Citizen Review & Rating Modal**:
  - 5-star interactive picker with quality tags (*Hygiene, Taste, Fair Price, Polite Behavior, Quick UPI*).
- **Grievance Redressal & Live Ticket Tracker**:
  - Submit complaints on pathway blockage, garbage dumping, or hygiene issues.
  - Instant ticket generation (`NMC-LV-XXXX`) with real-time status tracker (*Pending, Investigating, Resolved*).

### 2. 🛍️ Vendor Stall Dashboard (व्यापारी डॅशबोर्ड)
- **Pre-filled Demo**: *Ramesh Chaat Corner (Sitabuldi Main Road, Stall #42)*.
- **Live UPI Tracker**: Simulated QR payment trigger (`+₹60`), daily income graph, and NPCI transaction logs.
- **Market Footfall Rush Forecast**: Advises vendor on upcoming rush windows to minimize food waste and optimize raw materials.
- **Customer Feedback Stream**: Read citizen reviews with star ratings and respond directly.
- **PM-SVANidhi Compliance**: Loan repayment tracker with 7% interest subsidy status.

### 3. 🏛️ Nagpur Municipal Corporation (NMC) Admin Console (महानगरपालिका)
- **City-wide Vending Census**: Zone-by-zone registry of 14,820 vendors across 10 NMC zones.
- **Grievance Triage Desk**: Action complaints with one click (*Investigate*, *Mark Resolved*, *Assign TVC Field Inspector*).
- **Live Crowd Heat Index**: Monitors crowd density bottlenecks at key metro stations and shopping streets.
- **Register New Street Vendor**: Fast onboarding modal that generates unique TVC registration IDs.
- **Audit Export**: One-click TVC Census download in standard CSV format.

---

## 🛠️ Technology Stack

- **Structure**: HTML5 (Semantic, Accessible, SEO optimized)
- **Styling**: Vanilla CSS3 (Modern design system, custom CSS properties, responsive flexbox & grid, zero external CSS framework bloat)
- **Logic**: Vanilla JavaScript (ES6+, asynchronous API service layer, LocalStorage state persistence)
- **Mapping**: Leaflet.js with CartoDB Positron basemap tiles and custom SVG markers
- **Icons & Typography**: Google Fonts (*Plus Jakarta Sans*, *Yantramanav* for Marathi/Hindi) & Font Awesome 6.5

---

## 🔌 Connecting to a Live Backend (Node.js / Python / FastAPI / Firebase)

The codebase is designed with a **dedicated service layer** in `api-service.js`. To replace the mock LocalStorage storage with real REST API endpoints, simply update the methods in `api-service.js`:

```javascript
// Example: Replace mock getMarkets in api-service.js
async getMarkets() {
  const response = await fetch('http://localhost:5000/api/v1/markets');
  return await response.json();
}

// Example: Replace mock submitReview in api-service.js
async submitReview(reviewData) {
  const response = await fetch('http://localhost:5000/api/v1/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  });
  return await response.json();
}
```

---

## 🏃 How to Run the Project

1. Open the project folder in your browser:
   - Simply double click or open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).
   - Alternatively, serve via live-server or Python:
     ```bash
     python -m http.server 8080
     ```
2. **Demo Quick Switcher**:
   - Use the top navigation tabs:
     - Click **"Citizen Portal"** to explore the public map, time slider, vendor directory, and complaint forms.
     - Click **"Vendor Portal"** or use the **"Vendor Login"** button (Demo credentials pre-filled for *Ramesh Chaat Corner*).
     - Click **"NMC Municipal"** or use the **"NMC Portal"** button (Demo credentials pre-filled for *TVC Admin Officer*).
