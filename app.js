/**
 * LokVyapar (लोकव्यापार) - Main Application Controller
 * Government of Maharashtra & Nagpur Municipal Corporation (NMC)
 * Student Capstone & Civic Tech Platform (Batch 2025-26)
 * Complete Bilingual (English - Default / Marathi) Localization Engine,
 * Leaflet GIS Map, Time Simulation, Vendor Management, and Grievance Triage.
 */

// Global Application State
let appState = {
  currentLang: 'en',            // 'en' (English - default) | 'mr' (Marathi)
  currentView: 'citizen',       // 'citizen' | 'vendor' | 'nmc'
  currentHour: 19,              // 07:00 PM (Evening Peak)
  isPlayingTime: false,
  timePlayInterval: null,
  selectedMarketId: 'Sitabuldi',
  selectedCategoryFilter: 'all',
  selectedZoneFilter: 'all',
  mapCategoryFilter: 'all',
  searchQuery: '',
  map: null,
  marketCircles: [],
  vendorMarkers: [],
  selectedReviewStar: 5
};

// ==================== BILINGUAL TRANSLATION DICTIONARY ====================
const TRANSLATIONS = {
  en: {
    // Document Title
    doc_title: "LokVyapar Mahaportal | Smart Street Vendor & Crowd Intelligence Platform",

    // Top Bar & Identity
    gov_maha: "MANTHAN 4 YUVA",
    nmc_title: "Nagpur Municipal Corporation (NMC)",
    sub_title: "Smart Street Vendor Footfall & Oversight Hub",
    student_badge: "🎓 Student Project (B.Tech AI&DS. 2026-27)",
    live_zones: "10 NMC Zones Online",
    live_upi_stat: "38,400+ Daily UPI Payments Logged",
    live_time_suffix: "IST",

    // Accessibility
    acc_screen_reader: "Screen Reader",
    acc_high_contrast: "Contrast",

    // Navigation Tabs & Header
    brand_tag: "MANTHAN 4 YUVA ; Nagpur Municipal Corporation.",
    nav_citizen: "Citizen Portal",
    nav_vendor: "Vendor Portal",
    nav_nmc: "NMC Municipal",
    tab_stall: "Stall",
    tab_admin: "Admin",
    btn_vendor_login: "Vendor Login",
    btn_nmc_login: "NMC Officer Login",
    btn_student_dossier: "Student Project Dossier",

    // Marquee Notices
    ticker_badge: "Latest Circular",
    ticker_text: "Nagpur Municipal Corporation Town Vending Committee (TVC) Circular 2026: Free QR Smart Cards and PM-SVANidhi 7% interest subsidies now directly credited to verified street vendor bank accounts across Sitabuldi, Sadar, and Itwari.",

    // Schemes Ribbon
    scheme_svanidhi_title: "PM SVANidhi Scheme",
    scheme_svanidhi_sub: "₹10,000 to ₹50,000 Micro-credit",
    scheme_fssai_title: "Clean Street Food Hub",
    scheme_fssai_sub: "FSSAI Grade A+ Certified",
    scheme_tvc_title: "TVC Vending By-Laws",
    scheme_tvc_sub: "Designated Nagpur Zones",
    scheme_grievance_title: "Aaple Sarkar Grievance",
    scheme_grievance_sub: "24-48 hr TVC Resolution",

    // Hero Section
    hero_badge: "🏛️ NMC & Engineering College Joint Civic Tech Initiative",
    hero_title: "Nagpur's Smart Street Vendor Economy & <span class=\"highlight-gold\">Live Footfall Map</span>",
    hero_desc: "Track real-time market rush hours, discover verified local street vendors, rate your favorite food stalls, and report civic cleanliness issues directly to the Nagpur Municipal Corporation (NMC).",
    hero_btn_map: "Explore Live Nagpur Map",
    hero_btn_complaint: "File Citizen Complaint",
    hero_btn_vendors: "Top Rated Vendors",
    hero_stats_title: "Nagpur Live City Pulse",
    stat_markets_label: "Monitored Market Hubs",
    stat_vendors_label: "Registered Street Vendors",
    stat_upi_label: "Today's UPI Volume (41,200 txn)",
    stat_grievance_label: "NMC Grievance Resolution",
    stat_footer_note: "Calibrated via UPI/POS transaction density & TVC geolocation census 2026.",

    // Map Section
    map_tag: "Real-time Geolocation Engine",
    map_heading: "Nagpur Market Foot-Traffic & UPI Transaction Density Map",
    map_subtext: "Select any hour of the day to visualize market rush hours, crowd density, and active street vendor clusters across Sitabuldi, Sadar, Dharampeth, Itwari, and Mahal.",
    filter_all: "All Markets",
    filter_food: "Food Streets",
    filter_shopping: "Shopping Hubs",
    filter_mandi: "Mandis",
    sim_time_label: "Simulated Time of Day:",
    btn_mandi_rush: "08:00 AM (Mandi Rush)",
    btn_lunch_rush: "01:00 PM (Lunch)",
    btn_evening_rush: "07:00 PM (Evening Peak)",
    btn_night_food: "09:00 PM (Night Food)",
    legend_low: "Low Rush (< 2,000/hr)",
    legend_mod: "Moderate (2,000 - 5,000/hr)",
    legend_heavy: "Heavy Rush (5,000 - 8,000/hr)",
    legend_peak: "Peak Congestion (> 8,000/hr)",
    legend_live_hint: "Live Heatmap driven by UPI payments/min",
    map_layer_title: "Layer Overview",
    detail_visitors: "Visitors / Hour",
    detail_digital: "Digital Payment Vol",
    detail_vendors: "Active Street Vendors",
    detail_peak: "Peak Rush Window",
    spark_title: "Footfall Curve Today",
    spark_sub: "UPI Transaction Volume vs Hour",
    btn_view_vendors_here: "View Vendors in this Market",

    // Directory
    dir_tag: "Registered Hawkers Directory",
    dir_heading: "Nagpur Street Vendors Directory",
    dir_subtext: "Discover verified local street entrepreneurs, filter by specialty, inspect cleanliness certifications, and share your direct feedback.",
    search_placeholder: "Search vendor name, market, or food item (e.g. Tarri Pohe, Chaat, Sadar, Mahal)...",
    cat_all: "All Categories",
    cat_food: "🍲 Street Food & Snacks",
    cat_fruits: "🥦 Fruits & Fresh Vegetables",
    cat_clothes: "👕 Clothes & Garments",
    cat_tea: "☕ Tea, Juices & Beverages",
    cat_art: "🎨 Traditional Artisans & Crafts",
    cat_mobile: "📱 Mobile & Accessories",
    zone_all: "All Nagpur Zones",
    no_vendors_title: "No Vendors Found",
    no_vendors_desc: "Try searching with another keyword or resetting the category filter.",
    btn_reset_filters: "Reset Filters",

    // Top Rated
    top_tag: "People's Choice",
    top_heading: "Top Rated Nagpur Vendors",
    top_subtext: "Celebrated street food pioneers and trusted traders with verified 5-star citizen reviews, FSSAI hygiene grades, and 100% digital payment acceptance.",
    top_crown: "5.0 Rated",

    // Grievance
    grv_tag: "NMC Citizen Redressal Desk",
    grv_heading: "Submit Complaint or Civic Feedback",
    grv_desc: "Report pathway congestion, garbage dumping, hygiene violations, or rate vendor service. Generates a trackable NMC Ticket ID.",
    lbl_name: "Your Full Name",
    lbl_phone: "Phone Number",
    lbl_market: "Market Location",
    lbl_vendor_opt: "Specific Vendor (Optional)",
    lbl_category: "Issue Category",
    lbl_desc: "Detailed Description",
    opt_select_market: "Select Market Area...",
    opt_gen_market_issue: "General Market Area Issue (No specific vendor)",
    opt_issue_encroach: "🚶 Footpath Encroachment / Walking Obstruction",
    opt_issue_garbage: "🗑️ Garbage & Food Waste Dumping",
    opt_issue_hygiene: "🧼 Hygiene / Food Safety Concern",
    opt_issue_price: "💰 Overcharging / Unfair Pricing",
    opt_issue_praise: "🌟 Positive Vendor Appreciation / Praise",
    ph_complaint_desc: "Describe the exact location, problem observed, or appreciation note...",
    btn_submit_complaint: "Submit to Nagpur Municipal TVC",
    grv_track_tag: "Live Grievance Status",
    grv_track_heading: "Track Your Ticket",
    grv_track_desc: "Check the real-time resolution progress of complaints lodged with NMC TVC inspectors.",
    track_placeholder: "Enter Ticket ID (e.g. NMC-LV-8821)",
    btn_track: "Track",
    community_feed_heading: "Recent Public Complaints & Resolutions",

    // Technical / Student Project Section
    inno_tag: "Engineering Student Project & Technical Innovation",
    inno_heading: "How LokVyapar Transforms Nagpur's Urban Economy",
    inno_subtext: "Merging Digital Payment Footprints, Street Vendor Empowerment, and Municipal Crowd Intelligence without expensive CCTV hardware.",
    inno_card1_title: "UPI Footfall Proxy Algorithm",
    inno_card1_desc: "Instead of expensive camera hardware, LokVyapar correlates real-time digital UPI/QR payment frequency to calculate accurate pedestrian density and rush hours.",
    inno_card2_title: "PM SVANidhi Integration",
    inno_card2_desc: "Every registered vendor is linked to central PM-SVANidhi credit scheme and issued an NMC TVC digital verification badge for micro-loan facilitation.",
    inno_card3_title: "Smart Vending Zones",
    inno_card3_desc: "Dynamic zoning (Green / Yellow / Red) prevents stampedes at Sitabuldi and Sadar, directing shoppers to authorized hawking squares.",
    inno_card4_title: "Two-Way Accountability",
    inno_card4_desc: "Citizens submit verified ratings and complaints; vendors get rush forecasts to reduce food waste, and NMC officers resolve tickets with audited timestamps.",

    // Vendor Portal
    vendor_stall_open: "Stall Open & Trading",
    vendor_svanidhi_badge: "PM SVANidhi ID",
    vendor_green_badge: "Green Vending Zone Certified",
    vendor_test_upi_btn: "Test UPI Txn (+₹60)",
    vp_stat_earnings: "Today's Digital Earnings",
    vp_stat_trend_earn: "+14% vs yesterday",
    vp_stat_txns: "Digital UPI Transactions",
    vp_stat_trend_txns: "8 mins ago",
    vp_stat_rating: "People's Rating",
    vp_stat_trend_rating: "★ 342 Reviews",
    vp_stat_complaints: "Complaints",
    vp_stat_trend_comp: "All Resolved",
    vp_forecast_title: "Sitabuldi Market Footfall Rush Forecast",
    vp_forecast_badge: "Evening Peak Rush Ahead",
    vp_forecast_alert_title: "High Footfall Alert (06:30 PM - 09:30 PM)",
    vp_forecast_alert_desc: "Sitabuldi Metro foot-traffic is projected at 8,450 people/hour tonight. Recommended raw material prep: +25% Pani Puri puris & Sev stock.",
    vp_svanidhi_title: "PM SVANidhi Loan Tranche 2 (₹20,000)",
    vp_svanidhi_desc: "On-time Digital UPI Repayment Incentive: 7% Interest Subsidy Credited to Bank of Maharashtra.",
    vp_svanidhi_repaid: "Repaid: ₹15,600",
    vp_svanidhi_remaining: "Remaining: ₹4,400",
    vp_reviews_title: "Customer Reviews & Feedback",
    vp_reviews_feed_badge: "Live Feed",

    // NMC Municipal Admin Portal
    nmc_cmd_active: "NMC TVC Command Room Active",
    nmc_city_corp: "Nagpur Municipal Corporation",
    nmc_tvc_badge: "Town Vending Committee (TVC)",
    nmc_cmd_title: "NMC Street Vendor Oversight & Crowd Management Console",
    nmc_office_loc: "Civil Lines, Head Office, Nagpur 440001",
    nmc_officer_incharge: "Officer Incharge: TVC Executive Director",
    btn_register_vendor: "Register New Vendor",
    btn_export_csv: "Export TVC Audit (CSV)",
    nmc_stat_total_vendors: "Total Registered Vendors",
    nmc_stat_trend_vendors: "+120 new this month",
    nmc_stat_digital_flow: "Today's Tracked Digital Flow",
    nmc_stat_trend_flow: "41,200 UPI txns",
    nmc_stat_queue: "Citizen Complaints in Queue",
    nmc_stat_trend_queue: "2 High Urgency",
    nmc_stat_hubs: "Designated Vending Hubs",
    nmc_stat_trend_hubs: "Zero Red Zone Encroachments",
    nmc_tab_triage: "Citizen Complaints Triage",
    nmc_tab_census: "Nagpur Vendor Census & Zones",
    nmc_tab_heat: "Live UPI Crowd Heat Analytics",
    nmc_triage_title: "Citizen Grievances & Redressal Queue",
    nmc_triage_sub: "Review, investigate, assign TVC field inspectors, and mark complaints resolved.",
    th_ticket_id: "Ticket ID",
    th_citizen_phone: "Citizen / Phone",
    th_market_area: "Market Area",
    th_vendor_involved: "Vendor Involved",
    th_category: "Category",
    th_status: "Status",
    th_actions: "Actions",
    nmc_census_title: "Registered Street Hawkers Master Census 2026",
    nmc_census_sub: "NMC Town Vending Committee Geocoded Registry",
    th_svanidhi_id: "Vendor / TVC ID",
    th_stall_proprietor: "Stall Name & Proprietor",
    th_zone_market: "NMC Zone & Market",
    th_cat: "Category",
    th_rating: "Rating",
    th_daily_upi: "Daily UPI Avg",
    th_zoning_policy: "Vending Zone",
    th_qr_code: "QR Code",
    nmc_heat_title: "Nagpur Municipal Crowd Density & UPI Heat Index",
    nmc_heat_npci_sync: "Live Sync with NPCI / POS aggregators",

    // Footer
    footer_gov_dept: "Government of Maharashtra Urban Development Dept. &bull; Nagpur Municipal Corporation",
    footer_nic_compliant: "Compliant with National Informatics Centre (NIC) Web Guidelines",
    footer_col1_title: "LokVyapar Mahaportal",
    footer_col1_desc: "A Smart Urban Governance & Vendor Empowerment Initiative designed for Nagpur City. Developed by Final Year Computer Engineering Students in academic collaboration with Nagpur Municipal Corporation.",
    footer_student_dev: "🎓 Developed by: Department of Computer Science & Engineering, Nagpur",
    footer_academic_note: "Maharashtra State University Final Year Capstone Project 2025-26",
    footer_col2_title: "Key Markets in Nagpur",
    footer_col3_title: "Portals & Services",
    footer_col4_title: "Civic Emergency & Help",
    footer_helpline: "NMC TVC Helpline: 1800-233-3764",
    footer_email: "Email: support@lokvyapar-nagpur.gov.in",
    footer_office: "Address: NMC Head Office, Civil Lines, Nagpur 440001",
    footer_rest_ready: "REST API Architecture Ready &bull; LocalStorage Data Baseline",
    footer_copyright: "© 2026 LokVyapar Nagpur. All Rights Reserved. Compliant with Maharashtra Gov Standards.",
    footer_rti: "Right to Information (RTI 2005)",
    footer_charter: "Citizen Charter",
    footer_bylaws: "TVC By-Laws 2014",
    link_sitabuldi: "Sitabuldi Main Road & Metro",
    link_sadar: "Sadar Bazar & Residency Road",
    link_dharampeth: "Dharampeth Traffic Park Promenade",
    link_itwari: "Itwari Sarafa & Kirana Oli",
    link_mahal: "Mahal Badkas Chowk & Shivaji Statue",
    link_cotton: "Cotton Market Fresh Produce Mandi",
    link_citizen_portal: "Citizen Public Portal",
    link_vendor_login: "Vendor Stall Login",
    link_nmc_console: "NMC Officer Admin Console",
    link_file_complaint: "File Citizen Grievance",
    link_student_dossier: "Student Project Dossier & Report",

    // Modals
    dossier_title: "Student Project Dossier & Technical Report",
    dossier_intro: "<strong>Project Name:</strong> LokVyapar - Smart Urban Street Vendor Footfall & UPI Intelligence Platform.<br />Developed by final year <strong>B.Tech Computer Science & Engineering</strong> students in academic collaboration with Nagpur Municipal Corporation Town Vending Committee (TVC).",
    dossier_inst_lbl: "Academic Institution & Department",
    dossier_inst_val: "Department of Computer Science & Engineering, Nagpur",
    dossier_batch_lbl: "Academic Year & Batch",
    dossier_batch_val: "Final Year Capstone (2025-2026)",
    dossier_mentor_lbl: "Project Mentors",
    dossier_mentor_val: "Faculty Guides & TVC Executive Director, NMC",
    dossier_stack_lbl: "Technology Stack",
    dossier_team_title: "🎓 Student Developer Team Contributors",
    btn_close_dossier: "Close Dossier",
    vlogin_title: "Vendor Stall Login",
    vlogin_intro: "Login with your registered PM SVANidhi ID or mobile number to access your stall earnings and footfall alerts.",
    lbl_vlogin_id: "PM-SVANidhi ID / Mobile",
    lbl_vlogin_pin: "Security PIN / OTP",
    demo_vendor_note: "<strong>Demo Credential:</strong> Pre-filled for <em>Ramesh Chaat Corner (Sitabuldi)</em>.",
    btn_vlogin_submit: "Login to Vendor Portal",
    nlogin_title: "Nagpur Municipal TVC Officer Login",
    nlogin_intro: "Town Vending Committee administrative access for vendor zoning, grievance resolution, and crowd management.",
    lbl_nlogin_id: "NMC Officer ID",
    lbl_nlogin_pin: "Passcode",
    demo_nmc_note: "<strong>Demo Credential:</strong> Pre-filled for <em>TVC Admin Officer</em>.",
    btn_nlogin_submit: "Enter NMC Admin Console",
    rmodal_intro: "Your transparent rating helps honest street vendors build community trust and maintain quality standards.",
    lbl_overall_rating: "Overall Star Rating",
    lbl_reviewer_name: "Your Full Name",
    lbl_key_highlight: "Key Highlight",
    lbl_review_comment: "Your Review & Experience",
    ph_review_comment: "Share what you liked about their food, items, cleanliness, and service...",
    btn_publish_review: "Publish Review",
    opt_tag_taste: "🍲 Superb Taste & Freshness",
    opt_tag_clean: "🧼 100% Clean & Hygienic",
    opt_tag_upi: "💳 Quick UPI Payment",
    opt_tag_polite: "🤝 Very Polite & Friendly",
    opt_tag_price: "💰 Affordable Pricing",
    cmodal_title: "File Citizen Grievance / Feedback",
    cmodal_intro: "Report civic issues directly to the Nagpur Municipal Town Vending Committee (TVC).",
    btn_cmodal_submit: "Submit Grievance",
    reg_modal_title: "Register New Street Vendor (NMC TVC)",
    lbl_stall_name: "Stall / Business Name",
    lbl_proprietor_name: "Proprietor Name",
    lbl_category_select: "Category",
    lbl_market_select: "Market Zone",
    lbl_stall_address: "Specific Stall Address",
    ph_stall_name: "e.g. Nagpur Orange Juice Corner",
    ph_proprietor_name: "e.g. Vikas Raut",
    btn_register_save: "Issue TVC Registration ID & Save",

    // PM SVANidhi Scheme Modal
    svanidhi_modal_title: "PM SVANidhi Scheme (PM Street Vendor's AtmaNirbhar Nidhi)",
    svanidhi_hero_title: "PM SVANidhi Micro-Credit Scheme for Street Vendors",
    svanidhi_hero_desc: "A flagship Central Sector Scheme by the Ministry of Housing and Urban Affairs (MoHUA), Government of India, implemented in Nagpur by NMC Town Vending Committee to empower street vendors with working capital loans, 7% interest subsidy, and digital cashback.",
    svanidhi_badge_collateral: "Zero Collateral",
    svanidhi_badge_dbt: "7% Interest Subsidy (DBT)",
    svanidhi_badge_cashback: "Up to ₹1,200/yr Cashback",
    svanidhi_badge_nmc: "Nagpur Municipal TVC Verified",
    svanidhi_sec_tranches: "3-Tier Working Capital Loan Facility",
    svanidhi_t1_title: "Tranche 1 (Initial Loan)",
    svanidhi_t1_sub: "12 Months Tenure • Collateral Free • Timely repayment qualifies for next tranche",
    svanidhi_t2_title: "Tranche 2 (Enhanced Loan)",
    svanidhi_t2_sub: "18 Months Tenure • For business inventory and stall expansion",
    svanidhi_t3_title: "Tranche 3 (Growth Capital)",
    svanidhi_t3_sub: "36 Months Tenure • Scaled business operations with flexible EMI",
    svanidhi_sec_benefits: "Key Financial Subsidies & Benefits",
    svanidhi_b1_title: "7% Annual Interest Subsidy",
    svanidhi_b1_desc: "Paid quarterly directly into your bank account through Direct Benefit Transfer (DBT) upon on-time monthly EMI repayment.",
    svanidhi_b2_title: "Digital UPI Cashback Rewards",
    svanidhi_b2_desc: "Earn ₹1 cashback per digital customer transaction (GPay, PhonePe, Paytm, BHIM) up to ₹100 per month (₹1,200 per year).",
    svanidhi_b3_title: "Credit Score & CIBIL Building",
    svanidhi_b3_desc: "Timely repayment establishes an official formal credit history, enabling future access to larger MSME and bank loans.",
    svanidhi_b4_title: "Zero Collateral & Zero Penalty",
    svanidhi_b4_desc: "No guarantor, asset pledge, or property mortgage required. No penalty charges for early pre-closure of the loan.",
    svanidhi_sec_eligibility: "Eligibility & Required Documents",
    svanidhi_doc1: "Aadhaar Card (Mobile OTP linked)",
    svanidhi_doc2: "Bank Passbook / Account Statement",
    svanidhi_doc3: "NMC TVC Hawkers ID / Survey Smart Card or LoR",
    svanidhi_doc4: "Voter ID Card or Ration Card",
    svanidhi_sec_steps: "How to Apply in Nagpur (4 Simple Steps)",
    svanidhi_step1_title: "1. Verify TVC Hawking Survey Status",
    svanidhi_step1_desc: "Check your registration at nearest NMC Zonal Office (Zone 1 to 10) or obtain Letter of Recommendation (LoR).",
    svanidhi_step2_title: "2. Online Portal or CSC Application",
    svanidhi_step2_desc: "Submit application on official portal (pmsvanidhi.mohua.gov.in) or visit any Aaple Sarkar Seva Kendra.",
    svanidhi_step3_title: "3. Partner Bank Verification",
    svanidhi_step3_desc: "Select partner banks (Bank of Maharashtra, SBI, PNB, Canara Bank, Union Bank, etc.) operating across Nagpur.",
    svanidhi_step4_title: "4. Direct Account Disbursement (7-10 Days)",
    svanidhi_step4_desc: "Loan is approved by NMC TVC and disbursed directly into your Aadhaar-linked savings account.",
    svanidhi_helpline_text: "MoHUA National Helpline: 1800 11 1979 | Nagpur TVC Cell: 1800-233-3764",
    svanidhi_btn_official_portal: "Visit Official PM SVANidhi Portal (pmsvanidhi.mohua.gov.in)",
    svanidhi_btn_close: "Close Scheme Details"
  },
  mr: {
    // Document Title
    doc_title: "लोकव्यापार महापोर्टल | LokVyapar - महाराष्ट्र पथविक्रेता व गर्दी नियंत्रण प्रणाली",

    // Top Bar & Identity
    gov_maha: "महाराष्ट्र शासन | Government of Maharashtra",
    nmc_title: "नागपूर महानगरपालिका (NMC)",
    sub_title: "स्मार्ट फेरीवाला व्यवस्थापन व गर्दी नियंत्रण महापोर्टल",
    student_badge: "🎓 विद्यार्थी प्रकल्प (B.Tech Computer Engg. २०२५-२६)",
    live_zones: "१० मनपा झोन ऑनलाइन",
    live_upi_stat: "३८,४००+ दैनंदिन डिजिटल UPI व्यवहार",
    live_time_suffix: "भारतीय प्रमाणवेळ",

    // Accessibility
    acc_screen_reader: "स्क्रीन रीडर",
    acc_high_contrast: "कॉन्ट्रास्ट",

    // Navigation Tabs & Header
    brand_tag: "नागपूर महानगरपालिका &bull; नगर फेरीवाला समिती (TVC)",
    nav_citizen: "नागरिक पोर्टल",
    nav_vendor: "व्यापारी डॅशबोर्ड",
    nav_nmc: "मनपा प्रशासन",
    tab_stall: "स्टॉल",
    tab_admin: "प्रशासन",
    btn_vendor_login: "व्यापारी लॉगिन",
    btn_nmc_login: "मनपा अधिकारी लॉगिन",
    btn_student_dossier: "विद्यार्थी प्रकल्प तपशील",

    // Marquee Notices
    ticker_badge: "नवीन सूचना",
    ticker_text: "नागपूर महानगरपालिका फेरीवाला समिती (TVC) अधिसूचना २०२६: सीताबर्डी, सदर व इतवारी परिसरातील सर्व नोंदणीकृत पथविक्रेत्यांना मोफत QR स्मार्ट कार्ड व PM-SVANidhi अंतर्गत ७% व्याज अनुदान थेट बँक खात्यात उपलब्ध.",

    // Schemes Ribbon
    scheme_svanidhi_title: "पीएम स्वनिधी योजना",
    scheme_svanidhi_sub: "१०,००० ते ५०,००० सूक्ष्म कर्ज",
    scheme_fssai_title: "स्वच्छ पथखाद्य मोहीम",
    scheme_fssai_sub: "FSSAI अ+ स्वच्छता प्रमाणपत्र",
    scheme_tvc_title: "TVC फेरीवाला धोरण",
    scheme_tvc_sub: "नागपूर मनपा अधिकृत झोनिंग",
    scheme_grievance_title: "आपले सरकार / तक्रार निवारण",
    scheme_grievance_sub: "२४ ते ४८ तासांत चौकशी",

    // Hero Section
    hero_badge: "🏛️ मनपा व अभियांत्रिकी महाविद्यालय संयुक्त नागरी उपक्रम",
    hero_title: "नागपूर स्मार्ट फेरीवाला अर्थव्यवस्था आणि <span class=\"highlight-gold\">थेट गर्दी नकाशा</span>",
    hero_desc: "शहरातील मुख्य बाजारपेठांमधील थेट गर्दी तपासा, अधिकृत व स्वच्छ प्रमाणित पथविक्रेते शोधा, तुमच्या लाडक्या खाद्यपदार्थांना रेटिंग द्या आणि रस्त्यावरील अस्वच्छता किंवा अडथळ्यांची तक्रार थेट नागपूर महानगरपालिकेकडे नोंदवा.",
    hero_btn_map: "थेट गर्दी नकाशा पहा",
    hero_btn_complaint: "नागरी तक्रार नोंदवा",
    hero_btn_vendors: "लोकप्रिय व्यापारी",
    hero_stats_title: "नागपूर शहर थेट आकडेवारी",
    stat_markets_label: "निगराणीखालील मुख्य बाजारपेठा",
    stat_vendors_label: "नोंदणीकृत पथविक्रेते",
    stat_upi_label: "आजची डिजिटल उलाढाल (४१,२०० व्यवहार)",
    stat_grievance_label: "मनपा तक्रार निवारण दर",
    stat_footer_note: "माहिती स्रोत: एनपीसीआय यूपीआय व्यवहार वारंवारता व मनपा फेरीवाला सर्वेक्षण २०२६.",

    // Map Section
    map_tag: "भू-स्थानिक गर्दी विश्लेषण प्रणाली",
    map_heading: "नागपूर बाजारपेठ गर्दी व UPI व्यवहार घनता नकाशा",
    map_subtext: "सीताबर्डी, सदर, धरमपेठ, इतवारी, महाल व कॉटन मार्केटमधील वेळेनुसार गर्दीचे प्रमाण व फेरीवाल्यांचे स्टॉल्स पाहण्यासाठी वेळेचा स्लायडर बदला.",
    filter_all: "सर्व बाजारपेठा",
    filter_food: "खाद्यपदार्थ गल्ली",
    filter_shopping: "खरेदी केंद्र",
    filter_mandi: "भाजी मंडई",
    sim_time_label: "अनुमानित वेळ:",
    btn_mandi_rush: "सकाळी ०८:०० (मंडई गर्दी)",
    btn_lunch_rush: "दुपारी ०१:०० (दुपार)",
    btn_evening_rush: "संध्याकाळी ०७:०० (मुख्य गर्दी)",
    btn_night_food: "रात्री ०९:०० (रात्रीचे खाऊ)",
    legend_low: "कमी गर्दी (< २,०००/तास)",
    legend_mod: "मध्यम (२,००० - ५,०००/तास)",
    legend_heavy: "जास्त गर्दी (५,००० - ८,०००/तास)",
    legend_peak: "प्रचंड गर्दी (> ८,०००/तास)",
    legend_live_hint: "थेट यूपीआय व्यवहारांनुसार गर्दीचा अंदाज",
    map_layer_title: "स्तर माहिती (Layers)",
    detail_visitors: "नागरिक / तास",
    detail_digital: "डिजिटल पेमेंट वेग",
    detail_vendors: "सक्रिय फेरीवाले",
    detail_peak: "सर्वोच्च गर्दीची वेळ",
    spark_title: "आजचा गर्दीचा आलेख (Footfall Curve)",
    spark_sub: "वेळेनुसार UPI व्यवहारांची संख्या",
    btn_view_vendors_here: "या बाजारातील विक्रेते पहा",

    // Directory
    dir_tag: "अधिकृत फेरीवाला सूची",
    dir_heading: "नागपूर पथविक्रेते डिरेक्टरी (शोध व पडताळणी)",
    dir_subtext: "स्वच्छता प्रमाणित विक्रेते शोधा, दरपत्रक तपासा, थेट फोन किंवा पत्ता मिळवा आणि तुमचे अभिप्राय द्या.",
    search_placeholder: "नाव, बाजारपेठ किंवा खाद्यपदार्थ शोधा (उदा. तर्री पोहे, चाट, सीताबर्डी, संत्रा, महाल)...",
    cat_all: "सर्व वर्ग (All Categories)",
    cat_food: "🍲 खाद्यपदार्थ व नाश्ता",
    cat_fruits: "🥦 ताजी फळे व भाजीपाला",
    cat_clothes: "👕 वस्त्र व कपडे",
    cat_tea: "☕ चहा, रस व शीतपेये",
    cat_art: "🎨 पारंपरिक हस्तकला व मूर्ती",
    cat_mobile: "📱 मोबाईल व इलेक्ट्रॉनिक्स",
    zone_all: "सर्व नागपूर झोन (All Zones)",
    no_vendors_title: "कोणतेही विक्रेते आढळले नाहीत",
    no_vendors_desc: "कृपया वेगळा शब्द शोधून पहा किंवा फिल्टर रीसेट करा.",
    btn_reset_filters: "फिल्टर रीसेट करा",

    // Top Rated
    top_tag: "नागरिकांची पहिली पसंती",
    top_heading: "नागपुरातील लोकप्रिय पथविक्रेते (Top Rated Vendors)",
    top_subtext: "शहरातील प्रसिद्ध खाद्यसंस्कृतीचे शिलेदार, ज्यांना नागरिकांनी दिले आहेत ५-स्टार मानांकन आणि FSSAI अ+ स्वच्छता प्रमाणपत्र.",
    top_crown: "५.० मानांकन",

    // Grievance
    grv_tag: "मनपा नागरी तक्रार निवारण कक्ष",
    grv_heading: "तक्रार नोंदणी व नागरी अभिप्राय फॉर्म",
    grv_desc: "रस्त्यावरील अतिक्रमण, कचरा, अस्वच्छता किंवा जादा दराची तक्रार करा. तत्काळ ट्रॅक करता येणारा मनपा टोकन आयडी दिला जाईल.",
    lbl_name: "आपले पूर्ण नाव",
    lbl_phone: "मोबाईल क्रमांक",
    lbl_market: "बाजारपेठ परिसर",
    lbl_vendor_opt: "विशिष्ट विक्रेता (ऐच्छिक)",
    lbl_category: "तक्रारीचा प्रकार",
    lbl_desc: "सविस्तर माहिती / तक्रार",
    opt_select_market: "परिसर निवडा...",
    opt_gen_market_issue: "सामान्य परिसर अडथळा (कोणताही विशिष्ट विक्रेता नाही)",
    opt_issue_encroach: "🚶 पादचारी मार्ग अडथळा / अतिक्रमण",
    opt_issue_garbage: "🗑️ कचरा व अस्वच्छता / अन्नाचा कचरा",
    opt_issue_hygiene: "🧼 अन्न सुरक्षा व स्वच्छता समस्या",
    opt_issue_price: "💰 जादा दर आकारणी / गैरव्यवहार",
    opt_issue_praise: "🌟 विक्रेत्याचे कौतुक व उत्तम सेवेचा अभिप्राय",
    ph_complaint_desc: "अडथळ्याचे नेमके ठिकाण व स्वरूप येथे लिहा...",
    btn_submit_complaint: "नागपूर मनपा TVC कक्षाकडे तक्रार पाठवा",
    grv_track_tag: "थेट तक्रार स्थिती",
    grv_track_heading: "तक्रार ट्रॅक करा (Track Ticket)",
    grv_track_desc: "मनपा क्षेत्रीय निरीक्षकांकडून तक्रारीवर झालेल्या कारवाईची सद्यस्थिती जाणून घ्या.",
    track_placeholder: "तक्रार क्रमांक टाका (उदा. NMC-LV-8821)",
    btn_track: "तपासा",
    community_feed_heading: "नुकत्याच सोडवलेल्या नागरी तक्रारी",

    // Technical / Student Project Section
    inno_tag: "अभियांत्रिकी विद्यार्थी प्रकल्प व तांत्रिक नावीन्यता",
    inno_heading: "लोकव्यापार महापोर्टलची तांत्रिक वैशिष्ट्ये",
    inno_subtext: "महागड्या सीसीटीव्हीशिवाय केवळ यूपीआय व्यवहार फ्रिक्वेन्सी व जिओ-फेंसिंगचा वापर करून तयार केलेली स्वदेशी प्रणाली.",
    inno_card1_title: "UPI गर्दी प्रॉक्सी अल्गोरिदम",
    inno_card1_desc: "महागड्या कॅमेऱ्यांऐवजी प्रतिमिनिट होणाऱ्या डिजिटल क्यूआर पेमेंट्सच्या आधारे गर्दीची अचूक घनता मोजली जाते.",
    inno_card2_title: "पीएम स्वनिधी डेटाबेस जोडणी",
    inno_card2_desc: "प्रत्येक नोंदणीकृत फेरीवाल्याला मनपा TVC आयडी देऊन केंद्र सरकारच्या ७% व्याज अनुदान योजनेशी जोडले गेले आहे.",
    inno_card3_title: "डायनॅमिक झोनिंग व्यवस्था",
    inno_card3_desc: "सीताबर्डी व सदरमध्ये चेंगराचेंगरी टाळण्यासाठी हिरवा, पिवळा व लाल झोन पद्धत लागू केली आहे.",
    inno_card4_title: "दोन-मार्गी पारदर्शकता",
    inno_card4_desc: "नागरिकांना रेटिंग व तक्रारीची सुविधा, विक्रेत्यांना गर्दीचा अंदाज आणि मनपा अधिकाऱ्यांना डिजिटल ऑडिट डॅशबोर्ड.",

    // Vendor Portal
    vendor_stall_open: "स्टॉल सुरू (Open & Trading)",
    vendor_svanidhi_badge: "पीएम स्वनिधी आयडी",
    vendor_green_badge: "मनपा हिरवा झोन अधिकृत",
    vendor_test_upi_btn: "चाचणी UPI पेमेंट (+₹६०)",
    vp_stat_earnings: "आजची डिजिटल कमाई",
    vp_stat_trend_earn: "कालपेक्षा +१४% जास्त",
    vp_stat_txns: "UPI व्यवहार संख्या",
    vp_stat_trend_txns: "शेवटचा व्यवहार ८ मि. पूर्वी",
    vp_stat_rating: "नागरिक रेटिंग",
    vp_stat_trend_rating: "★ ३४२ नागरिकांची मते",
    vp_stat_complaints: "प्रलंबित तक्रारी",
    vp_stat_trend_comp: "सर्व तक्रारी निकाली",
    vp_forecast_title: "सीताबर्डी बाजारपेठ गर्दी अंदाज (Forecast)",
    vp_forecast_badge: "संध्याकाळी उच्च गर्दी अपेक्षित",
    vp_forecast_alert_title: "उच्च गर्दी सूचना (संध्याकाळी ०६:३० ते ०९:३०)",
    vp_forecast_alert_desc: "सीताबर्डी मेट्रो परिसरात आज रात्री प्रतितास ८,४५० नागरिक अपेक्षित आहेत. अतिरिक्त कच्चा माल व पुऱ्या तयार ठेवण्याचा सल्ला.",
    vp_svanidhi_title: "पीएम स्वनिधी कर्ज हप्ता २ (₹२०,०००)",
    vp_svanidhi_desc: "नियमित डिजिटल परतफेडीवर ७% व्याज सबसिडी बँक ऑफ महाराष्ट्र खात्यात जमा झाली आहे.",
    vp_svanidhi_repaid: "परतफेड: ₹१५,६००",
    vp_svanidhi_remaining: "शिल्लक: ₹४,४००",
    vp_reviews_title: "ग्राहकांचे थेट अभिप्राय व रेटिंग",
    vp_reviews_feed_badge: "थेट फीड",

    // NMC Municipal Admin Portal
    nmc_cmd_active: "मनपा TVC नियंत्रण कक्ष सक्रिय",
    nmc_city_corp: "नागपूर महानगरपालिका",
    nmc_tvc_badge: "नगर फेरीवाला समिती (TVC)",
    nmc_cmd_title: "नागपूर मनपा पथविक्रेता व गर्दी नियंत्रण प्रशासन कन्सोल",
    nmc_office_loc: "मनपा मुख्य कार्यालय, सिव्हिल लाईन्स, नागपूर ४४०००१",
    nmc_officer_incharge: "प्रभारी अधिकारी: TVC कार्यकारी संचालक",
    btn_register_vendor: "नवीन विक्रेता नोंदणी",
    btn_export_csv: "TVC ऑडिट अहवाल (CSV)",
    nmc_stat_total_vendors: "एकूण नोंदणीकृत फेरीवाले",
    nmc_stat_trend_vendors: "या महिन्यात +१२० नवीन नोंदणी",
    nmc_stat_digital_flow: "आजची ट्रॅक केलेली डिजिटल उलाढाल",
    nmc_stat_trend_flow: "४१,२०० यूपीआय व्यवहार",
    nmc_stat_queue: "नागरी तक्रारी रांग",
    nmc_stat_trend_queue: "२ तातडीच्या चौकशीत",
    nmc_stat_hubs: "अधिकृत फेरीवाला झोन",
    nmc_stat_trend_hubs: "शून्य लाल झोन अतिक्रमण",
    nmc_tab_triage: "नागरी तक्रार निवारण (Triage Queue)",
    nmc_tab_census: "फेरीवाला जनगणना व झोन मास्टर",
    nmc_tab_heat: "थेट UPI गर्दी हीट इंडेक्स",
    nmc_triage_title: "नागरी तक्रारी व कारवाई कक्ष",
    nmc_triage_sub: "तक्रारींची पडताळणी करा, क्षेत्रीय निरीक्षक पाठवा आणि निवारण स्थिती अपडेट करा.",
    th_ticket_id: "तक्रार क्र. (Ticket ID)",
    th_citizen_phone: "नागरिक / फोन",
    th_market_area: "परिसर (Market)",
    th_vendor_involved: "संबंधित विक्रेता",
    th_category: "प्रकार (Category)",
    th_status: "स्थिती (Status)",
    th_actions: "कारवाई (Action)",
    nmc_census_title: "नागपूर फेरीवाला मास्टर जनगणना रजिस्टर २०२६",
    nmc_census_sub: "मनपा नगर फेरीवाला समिती (TVC) जिओ-टॅग केलेली अधिकृत सूची",
    th_svanidhi_id: "स्वनिधी / TVC आयडी",
    th_stall_proprietor: "स्टॉल नाव व मालक",
    th_zone_market: "मनपा झोन व बाजार",
    th_cat: "प्रकार",
    th_rating: "रेटिंग",
    th_daily_upi: "दैनंदिन UPI सरासरी",
    th_zoning_policy: "झोन धोरण",
    th_qr_code: "QR कोड",
    nmc_heat_title: "नागपूर शहर गर्दी व यूपीआय हीट इंडेक्स",
    nmc_heat_npci_sync: "NPCI द्वारे थेट सिंक",

    // Footer
    footer_gov_dept: "महाराष्ट्र शासन नगर विकास विभाग &bull; नागपूर महानगरपालिका",
    footer_nic_compliant: "राष्ट्रीय माहिती विज्ञान केंद्र (NIC) वेब मार्गदर्शक तत्त्वांशी सुसंगत",
    footer_col1_title: "लोकव्यापार महापोर्टल",
    footer_col1_desc: "नागपूर महानगरपालिका आणि संगणक अभियांत्रिकी पदवी अंतिम वर्ष विद्यार्थ्यांचा संयुक्त उपक्रम. पथविक्रेते, नागरिक व स्थानिक प्रशासन यांच्यात डिजिटल पारदर्शकता निर्माण करणारे व्यासपीठ.",
    footer_student_dev: "🎓 विकासक: डिपार्टमेंट ऑफ कॉम्प्युटर सायन्स अँड इंजिनिअरिंग, नागपूर",
    footer_academic_note: "महाराष्ट्र राज्य विद्यापीठ अंतिम वर्ष प्रकल्प २०२५-२६",
    footer_col2_title: "नागपुरातील प्रमुख बाजारपेठा",
    footer_col3_title: "पोर्टल्स व सेवा",
    footer_col4_title: "मनपा मदत केंद्र व संपर्क",
    footer_helpline: "मनपा TVC टोल फ्री: १८००-२३३-३७६४",
    footer_email: "ईमेल: contact@lokvyapar-nagpur.gov.in",
    footer_office: "पत्ता: मनपा मुख्य प्रशासकीय इमारत, सिव्हिल लाईन्स, नागपूर ४४०००१",
    footer_rest_ready: "REST API आर्किटेक्चर सज्ज &bull; LocalStorage डेटा बेसलाइन",
    footer_copyright: "© २०२६ लोकव्यापार नागपूर. सर्व हक्क राखीव. महाराष्ट्र शासन मानकांनुसार विकसित.",
    footer_rti: "माहितीचा अधिकार (RTI २००५)",
    footer_charter: "नागरिक सनद",
    footer_bylaws: "फेरीवाला उपविधी २०१४",
    link_sitabuldi: "सीताबर्डी मेन रोड व मेट्रो",
    link_sadar: "सदर बाजार व रेसिडेन्सी रोड",
    link_dharampeth: "धरमपेठ ट्रॅफिक पार्क परिसर",
    link_itwari: "इतवारी सराफा व किराणा ओळ",
    link_mahal: "महाल बडकस चौक व शिवाजी पुतळा",
    link_cotton: "कॉटन मार्केट भाजी मंडई",
    link_citizen_portal: "नागरिक सार्वजनिक पोर्टल",
    link_vendor_login: "फेरीवाला स्टॉल लॉगिन",
    link_nmc_console: "मनपा अधिकारी कन्सोल",
    link_file_complaint: "नागरी तक्रार नोंदणी",
    link_student_dossier: "विद्यार्थी प्रकल्प तपशील व अहवाल",

    // Modals
    dossier_title: "विद्यार्थी प्रकल्प तपशील व तांत्रिक माहिती (Project Dossier)",
    dossier_intro: "<strong>प्रकल्पाचे नाव:</strong> लोकव्यापार (LokVyapar) - स्मार्ट स्ट्रीट वेंडर फूटफॉल आणि यूपीआय क्राउड इंटेलिजन्स प्लॅटफॉर्म.<br />हा प्रकल्प अंतिम वर्ष <strong>B.Tech Computer Science & Engineering</strong> च्या विद्यार्थ्यांनी नागपूर महानगरपालिकेच्या नगर फेरीवाला समिती (TVC) सहकार्याने विकसित केला आहे.",
    dossier_inst_lbl: "शैक्षणिक संस्था व विभाग",
    dossier_inst_val: "Department of Computer Science & Engineering, Nagpur",
    dossier_batch_lbl: "शैक्षणिक वर्ष व बॅच",
    dossier_batch_val: "अंतिम वर्ष पदवी (२०२५-२०२६)",
    dossier_mentor_lbl: "प्रकल्प मार्गदर्शक (Mentors)",
    dossier_mentor_val: "महाविद्यालयीन प्राध्यापक व TVC संचालक, NMC",
    dossier_stack_lbl: "तांत्रिक घटक (Tech Stack)",
    dossier_team_title: "🎓 विद्यार्थी विकासक संघ (Student Project Contributors)",
    btn_close_dossier: "बंद करा (Close)",
    vlogin_title: "फेरीवाला स्टॉल लॉगिन (Vendor Login)",
    vlogin_intro: "आपला नोंदणीकृत पीएम स्वनिधी क्रमांक किंवा मोबाईल क्रमांक वापरून डॅशबोर्डमध्ये प्रवेश करा.",
    lbl_vlogin_id: "पीएम स्वनिधी आयडी / मोबाईल",
    lbl_vlogin_pin: "सुरक्षा पिन (PIN) / OTP",
    demo_vendor_note: "<strong>डेमो लॉगिन:</strong> <em>रमेश चाट कॉर्नर (सीताबर्डी)</em> साठी प्री-फिल्ड केलेले आहे.",
    btn_vlogin_submit: "व्यापारी पोर्टलमध्ये प्रवेश करा",
    nlogin_title: "नागपूर मनपा TVC अधिकारी लॉगिन",
    nlogin_intro: "नगर फेरीवाला समिती (TVC) प्रशासकीय नियंत्रणासाठी अधिकृत अधिकारी आयडी व पासवर्ड प्रविष्ट करा.",
    lbl_nlogin_id: "मनपा अधिकारी आयडी",
    lbl_nlogin_pin: "पासकोड",
    demo_nmc_note: "<strong>डेमो लॉगिन:</strong> <em>TVC Admin Officer</em> साठी प्री-फिल्ड केलेले आहे.",
    btn_nlogin_submit: "मनपा प्रशासन कन्सोल उघडा",
    rmodal_intro: "आपले पारदर्शक मत प्रामाणिक फेरीवाल्यांना ओळख मिळवून देण्यास व स्वच्छता राखण्यास मदत करते.",
    lbl_overall_rating: "एकूण स्टार रेटिंग",
    lbl_reviewer_name: "आपले नाव",
    lbl_key_highlight: "विशेष पसंती",
    lbl_review_comment: "आपला अनुभव व पुनरावलोकन",
    ph_review_comment: "चव, स्वच्छता आणि सेवेबद्दल आपले मत येथे लिहा...",
    btn_publish_review: "पुनरावलोकन प्रसिद्ध करा",
    opt_tag_taste: "🍲 उत्कृष्ट चव व ताजेपणा",
    opt_tag_clean: "🧼 १००% स्वच्छ व निर्जंतुक",
    opt_tag_upi: "💳 जलद यूपीआय व्यवहार",
    opt_tag_polite: "🤝 नम्र व तत्पर सेवा",
    opt_tag_price: "💰 रास्त व परवडणारे दर",
    cmodal_title: "नागरी तक्रार नोंदणी फॉर्म",
    cmodal_intro: "नागपूर महानगरपालिका फेरीवाला कक्षाकडे थेट तक्रार नोंदवा.",
    btn_cmodal_submit: "तक्रार नोंदवा",
    reg_modal_title: "नवीन पथविक्रेता नोंदणी (NMC TVC)",
    lbl_stall_name: "स्टॉल / दुकानाचे नाव",
    lbl_proprietor_name: "मालकाचे नाव",
    lbl_category_select: "वर्ग",
    lbl_market_select: "बाजार झोन",
    lbl_stall_address: "स्टॉलचा नेमका पत्ता",
    ph_stall_name: "उदा. नागपूर संत्रा ज्यूस कॉर्नर",
    ph_proprietor_name: "उदा. विकास राऊत",
    btn_register_save: "TVC नोंदणी आयडी जारी करा व सेव्ह करा",

    // PM SVANidhi Scheme Modal
    svanidhi_modal_title: "पीएम स्वनिधी योजना (PM Street Vendor's AtmaNirbhar Nidhi)",
    svanidhi_hero_title: "फेरीवाल्यांसाठी पीएम स्वनिधी सूक्ष्म-कर्ज योजना",
    svanidhi_hero_desc: "फेरीवाल्यांना खेळते भांडवल, ७% व्याज अनुदान आणि डिजिटल कॅशबॅक देऊन सक्षम करण्यासाठी भारत सरकारच्या गृहनिर्माण आणि नगर विकास मंत्रालय (MoHUA) व नागपूर मनपा नगर फेरीवाला समितीची अधिकृत योजना.",
    svanidhi_badge_collateral: "विनातारण कर्ज",
    svanidhi_badge_dbt: "७% थेट व्याज अनुदान (DBT)",
    svanidhi_badge_cashback: "वार्षिक ₹१,२०० पर्यंत कॅशबॅक",
    svanidhi_badge_nmc: "नागपूर मनपा TVC प्रमाणित",
    svanidhi_sec_tranches: "३ टप्प्यातील खेळते भांडवल कर्ज सुविधा",
    svanidhi_t1_title: "टप्पा १ (सुरुवातीचे कर्ज)",
    svanidhi_t1_sub: "१२ महिने मुदत • विनातारण • वेळेवर परतफेडीवर पुढील टप्प्यासाठी पात्र",
    svanidhi_t2_title: "टप्पा २ (वाढीव कर्ज)",
    svanidhi_t2_sub: "१८ महिने मुदत • दुकानातील माल व व्यवसाय विस्तारासाठी",
    svanidhi_t3_title: "टप्पा ३ (उद्योग विस्तार कर्ज)",
    svanidhi_t3_sub: "३६ महिने मुदत • सुलभ हप्त्यांसह मोठ्या व्यवसाय विस्तारासाठी",
    svanidhi_sec_benefits: "प्रमुख आर्थिक अनुदान व फायदे",
    svanidhi_b1_title: "७% वार्षिक व्याज अनुदान",
    svanidhi_b1_desc: "वेळेवर हप्ता भरल्यास दर तिमाहीला थेट तुमच्या बँक खात्यात Direct Benefit Transfer (DBT) द्वारे ७% व्याज अनुदान जमा होते.",
    svanidhi_b2_title: "डिजिटल यूपीआय कॅशबॅक बक्षीस",
    svanidhi_b2_desc: "प्रत्येक डिजिटल ग्राहक व्यवहारावर (PhonePe, GPay, Paytm, BHIM) ₹१ कॅशबॅक, महिन्याला ₹१०० पर्यंत (वार्षिक ₹१,२००) मिळवा.",
    svanidhi_b3_title: "क्रेडिट स्कोअर व सिबिल सुधारणा",
    svanidhi_b3_desc: "वेळेवर परतफेडीमुळे अधिकृत सिबिल स्कोअर तयार होतो, ज्यामुळे भविष्यात मोठ्या व्यापारी कर्जासाठी बँकांचे दरवाजे उघडतात.",
    svanidhi_b4_title: "विनातारण व मुदतपूर्व परतफेड शुल्क शून्य",
    svanidhi_b4_desc: "कोणताही जामीनदार किंवा तारण ठेवण्याची गरज नाही. मुदतीपूर्वी कर्ज परतफेड केल्यास कोणतेही अतिरिक्त शुल्क आकारले जात नाही.",
    svanidhi_sec_eligibility: "पात्रता व आवश्यक कागदपत्रे",
    svanidhi_doc1: "आधार कार्ड (मोबाईल लिंक असलेले)",
    svanidhi_doc2: "बँक पासबुक / खात्याचा तपशील",
    svanidhi_doc3: "नागपूर मनपा TVC फेरीवाला ओळखपत्र / सर्वेक्षण स्मार्ट कार्ड",
    svanidhi_doc4: "मतदान ओळखपत्र किंवा रेशन कार्ड",
    svanidhi_sec_steps: "नागपूरमध्ये अर्ज कसा करावा (४ सोप्या पायऱ्या)",
    svanidhi_step1_title: "१. मनपा TVC सर्वेक्षण नोंदणी तपासा",
    svanidhi_step1_desc: "तुमच्या जवळच्या मनपा झोन कार्यालयात जाऊन TVC नोंदणी तपासा किंवा शिफारस पत्र (LoR) मिळवा.",
    svanidhi_step2_title: "२. ऑनलाइन पोर्टल किंवा ग्राहक सेवा केंद्रावर अर्ज",
    svanidhi_step2_desc: "अधिकृत पोर्टलवर (pmsvanidhi.mohua.gov.in) अर्ज करा किंवा कोणत्याही 'आपले सरकार' केंद्रावर जा.",
    svanidhi_step3_title: "३. भागीदार बँकेकडून पडताळणी",
    svanidhi_step3_desc: "नागपुरातील बँक ऑफ महाराष्ट्र, SBI, PNB किंवा कॅनरा बँक यांपैकी तुमच्या आवडीची बँक निवडा.",
    svanidhi_step4_title: "४. थेट बँक खात्यात रक्कम जमा (७-१० दिवस)",
    svanidhi_step4_desc: "मनपा TVC कडून मंजुरी मिळताच कर्जाची रक्कम थेट तुमच्या बँक खात्यात जमा केली जाते.",
    svanidhi_helpline_text: "राष्ट्रीय हेल्पलाइन: १८०० ११ १९७९ | नागपूर मनपा मदत कक्ष: १८००-२३३-३७६४",
    svanidhi_btn_official_portal: "अधिकृत पीएम स्वनिधी पोर्टलला भेट द्या (pmsvanidhi.mohua.gov.in)",
    svanidhi_btn_close: "माहिती बंद करा"
  }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', async () => {
  const savedLang = LokVyaparAPI.getLanguage() || 'en';
  appState.currentLang = savedLang;

  initClock();
  initLeafletMap();
  await refreshAllData();
  setupEventListeners();
  restoreSession();

  setLanguage(savedLang);
});

// Update live clock badge
function initClock() {
  const badge = document.getElementById('liveTimeBadge');
  const update = () => {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    if (badge) {
      const suffix = appState.currentLang === 'mr' ? 'भारतीय प्रमाणवेळ' : 'IST';
      badge.innerHTML = `<i class="fa-solid fa-clock"></i> ${hrs}:${mins} ${suffix}`;
    }
  };
  update();
  setInterval(update, 30000);
}

// ==================== LANGUAGE SWITCHER (ENGLISH / MARATHI) ====================
function setLanguage(lang) {
  appState.currentLang = lang;
  LokVyaparAPI.setLanguage(lang);

  // Update HTML tag lang attribute and body class
  document.documentElement.setAttribute('lang', lang);
  if (lang === 'mr') {
    document.body.classList.add('lang-mr');
  } else {
    document.body.classList.remove('lang-mr');
  }

  // Update Language Switcher Button active classes
  const btnMr = document.getElementById('langBtnMr');
  const btnEn = document.getElementById('langBtnEn');
  if (btnMr && btnEn) {
    btnMr.classList.toggle('active', lang === 'mr');
    btnEn.classList.toggle('active', lang === 'en');
  }

  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Update document title
  if (dict.doc_title) {
    document.title = dict.doc_title;
  }

  // 1. Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // 2. Update all elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.placeholder = dict[key];
    }
  });

  // 3. Update all elements with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key] !== undefined) {
      el.title = dict[key];
    }
  });

  // 4. Update Select Options with data-i18n-opt
  document.querySelectorAll('option[data-i18n-opt]').forEach(opt => {
    const key = opt.getAttribute('data-i18n-opt');
    if (dict[key] !== undefined) {
      opt.textContent = dict[key];
    }
  });

  // 5. Update Time Slider readout badge
  updateTimeDisplays();

  // 6. Refresh dynamic views
  renderMapData();
  renderMarketDetails(appState.selectedMarketId);
  renderVendorCards();
  renderTopRatedVendors();
  renderCommunityComplaints();
  renderNmcComplaintsTable();
  renderNmcCensusTable();
  initClock();
}

// ==================== ACCESSIBILITY FONT SIZE SCALING ====================
function adjustFontSize(action) {
  const html = document.documentElement;
  const btnAminus = document.getElementById('btnFontMinus');
  const btnAreset = document.getElementById('btnFontReset');
  const btnAplus = document.getElementById('btnFontPlus');

  html.classList.remove('fs-small', 'fs-normal', 'fs-large');
  if (btnAminus) btnAminus.classList.remove('active');
  if (btnAreset) btnAreset.classList.remove('active');
  if (btnAplus) btnAplus.classList.remove('active');

  if (action === 'decrease') {
    html.classList.add('fs-small');
    if (btnAminus) btnAminus.classList.add('active');
  } else if (action === 'increase') {
    html.classList.add('fs-large');
    if (btnAplus) btnAplus.classList.add('active');
  } else {
    html.classList.add('fs-normal');
    if (btnAreset) btnAreset.classList.add('active');
  }
}

// ==================== STUDENT PROJECT DOSSIER MODAL ====================
function openStudentProjectModal() {
  openModal('studentProjectModal');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('hidden');
}

// ==================== LEAFLET MAP & HEAT ENGINE ====================
function initLeafletMap() {
  const mapElement = document.getElementById('nagpurLeafletMap');
  if (!mapElement) return;

  appState.map = L.map('nagpurLeafletMap', {
    center: [21.1458, 79.0882], // Zero Mile, Nagpur
    zoom: 13,
    zoomControl: true,
    attributionControl: true
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &bull; Nagpur Municipal Corporation TVC',
    maxZoom: 19
  }).addTo(appState.map);

  renderMapData();
}

async function renderMapData() {
  if (!appState.map) return;

  const markets = await LokVyaparAPI.getMarkets();
  const vendors = await LokVyaparAPI.getVendors();

  // Clear previous layers
  appState.marketCircles.forEach(c => appState.map.removeLayer(c));
  appState.vendorMarkers.forEach(m => appState.map.removeLayer(m));
  appState.marketCircles = [];
  appState.vendorMarkers = [];

  const hourIndex = Math.max(0, Math.min(17, appState.currentHour - 6));
  const isMr = appState.currentLang === 'mr';

  // 1. Render Market Footfall Circles
  markets.forEach(market => {
    if (appState.mapCategoryFilter !== 'all' && market.category !== appState.mapCategoryFilter) {
      return;
    }

    const footfall = market.hourlyFootfall[hourIndex] || 1500;
    const upiTxn = market.hourlyUpi[hourIndex] || 80;

    let heatColor = '#22c55e'; // Green
    let fillOpacity = 0.25;
    let radius = 250;

    if (footfall >= 8000) {
      heatColor = '#ef4444'; // Red
      fillOpacity = 0.55;
      radius = 550;
    } else if (footfall >= 5000) {
      heatColor = '#f97316'; // Orange
      fillOpacity = 0.45;
      radius = 450;
    } else if (footfall >= 2500) {
      heatColor = '#eab308'; // Yellow
      fillOpacity = 0.35;
      radius = 350;
    }

    const circle = L.circle([market.lat, market.lng], {
      color: heatColor,
      fillColor: heatColor,
      fillOpacity: fillOpacity,
      radius: radius,
      weight: 2
    }).addTo(appState.map);

    const mName = isMr ? (market.name_mr || market.name) : market.name;
    const mZone = isMr ? (market.zone_mr || market.zone) : market.zone;
    const footfallLabel = isMr ? 'नागरिक / तास' : 'visitors / hr';
    const upiLabel = isMr ? 'UPI व्यवहार / तास' : 'UPI txn / hr';

    circle.bindTooltip(`
      <div style="font-family: inherit; font-size: 12px; font-weight: 600;">
        <strong style="color:#0f2b5c;">${mName}</strong><br/>
        <span style="color:#64748b; font-size:11px;">${mZone}</span><br/>
        👥 <strong>${footfall.toLocaleString()}</strong> ${footfallLabel}<br/>
        💳 <strong>${upiTxn}</strong> ${upiLabel}
      </div>
    `, { sticky: true });

    circle.on('click', () => {
      selectMarket(market.id);
    });

    appState.marketCircles.push(circle);
  });

  // 2. Render Street Vendor Pins
  vendors.forEach(vendor => {
    if (appState.selectedCategoryFilter !== 'all' && vendor.category !== appState.selectedCategoryFilter) {
      return;
    }

    const vName = isMr ? (vendor.name_mr || vendor.name) : vendor.name;
    const vSpec = isMr ? (vendor.specialties_mr || vendor.specialties) : vendor.specialties;
    const vGrade = isMr ? (vendor.fssaiGrade_mr || vendor.fssaiGrade) : vendor.fssaiGrade;

    const vendorIcon = L.divIcon({
      className: 'custom-vendor-pin',
      html: `
        <div style="
          background: #0f2b5c;
          color: #fff;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.35);
          border: 2px solid #d97706;
          font-size: 12px;
          cursor: pointer;
        " title="${vName}">
          <i class="fa-solid fa-shop"></i>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const marker = L.marker([vendor.lat, vendor.lng], { icon: vendorIcon }).addTo(appState.map);

    marker.bindPopup(`
      <div style="min-width: 210px; font-family: inherit;">
        <h4 style="margin:0 0 4px 0; color:#0f2b5c; font-size:13px; font-weight:800;">${vName}</h4>
        <div style="color:#d97706; font-size:12px; font-weight:700; margin-bottom:4px;">★ ${vendor.rating} (${vendor.reviewCount} ${isMr ? 'पुनरावलोकने' : 'reviews'})</div>
        <p style="margin:0 0 6px 0; font-size:11px; color:#475569;">${vSpec}</p>
        <div style="font-size:10px; color:#047857; font-weight:700; background:#ecfdf5; padding:2px 4px; border-radius:3px; display:inline-block; margin-bottom:6px;">
          ${vGrade}
        </div><br/>
        <button onclick="triggerVendorReviewModal(${vendor.id})" style="background:#0f2b5c; color:#fff; border:none; padding:4px 8px; border-radius:3px; font-size:11px; font-weight:700; cursor:pointer; width:100%;">
          ${isMr ? '⭐ रेटिंग / अभिप्राय द्या' : '⭐ Rate this Vendor'}
        </button>
      </div>
    `);

    appState.vendorMarkers.push(marker);
  });

  const countBadge = document.getElementById('mapVendorCount');
  if (countBadge) {
    countBadge.textContent = isMr ? `${appState.vendorMarkers.length} स्टॉल्स नकाशावर` : `${appState.vendorMarkers.length} Stalls Mapped`;
  }
}

// Map Category Filter Function
function filterMapCategory(cat) {
  appState.mapCategoryFilter = cat;

  const buttons = {
    'all': 'btnFilterAll',
    'food': 'btnFilterFood',
    'shopping': 'btnFilterShopping',
    'mandi': 'btnFilterMandi'
  };

  Object.keys(buttons).forEach(key => {
    const btn = document.getElementById(buttons[key]);
    if (btn) btn.classList.toggle('active', key === cat);
  });

  renderMapData();
}

// ==================== TIME SIMULATOR ====================
function setTimeHour(hour) {
  appState.currentHour = parseInt(hour, 10);
  const slider = document.getElementById('timeSlider');
  if (slider) slider.value = appState.currentHour;
  updateTimeDisplays();
  renderMapData();
  renderMarketDetails(appState.selectedMarketId);
}

function handleTimeSliderChange(val) {
  appState.currentHour = parseInt(val, 10);
  updateTimeDisplays();
  renderMapData();
  renderMarketDetails(appState.selectedMarketId);
}

function updateTimeDisplays() {
  const h = appState.currentHour;
  const isPM = h >= 12;
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const formattedH = String(displayH).padStart(2, '0');
  const period = isPM ? 'PM' : 'AM';
  const timeString = `${formattedH}:00 ${period}`;

  const timeEl = document.getElementById('currentTimeDisplay');
  if (timeEl) timeEl.textContent = timeString;

  const isMr = appState.currentLang === 'mr';
  const badgeEl = document.getElementById('timePeriodBadge');
  if (badgeEl) {
    if (h >= 6 && h <= 10) {
      badgeEl.textContent = isMr ? 'सकाळची मंडई गर्दी (Morning Mandi)' : 'Morning Mandi Rush';
      badgeEl.className = 'time-period-badge badge-green';
    } else if (h >= 11 && h <= 16) {
      badgeEl.textContent = isMr ? 'दुपारची नियमित खरेदी (Lunch & Regular)' : 'Afternoon Lunch Window';
      badgeEl.className = 'time-period-badge badge-yellow';
    } else if (h >= 17 && h <= 20) {
      badgeEl.textContent = isMr ? 'संध्याकाळची सर्वोच्च खरेदी गर्दी (Peak Shopping)' : 'Evening Shopping Peak';
      badgeEl.className = 'time-period-badge badge-orange';
    } else {
      badgeEl.textContent = isMr ? 'रात्रीचे खाऊ व समारोप (Night Food Street)' : 'Night Food Street Rush';
      badgeEl.className = 'time-period-badge badge-red';
    }
  }

  // Update preset buttons active state
  document.querySelectorAll('.time-controls .preset-btn').forEach(btn => {
    btn.classList.remove('active');
  });
}

function toggleTimeAnimation() {
  const icon = document.getElementById('playIcon');
  if (appState.isPlayingTime) {
    clearInterval(appState.timePlayInterval);
    appState.isPlayingTime = false;
    if (icon) icon.className = 'fa-solid fa-play';
  } else {
    appState.isPlayingTime = true;
    if (icon) icon.className = 'fa-solid fa-pause';
    appState.timePlayInterval = setInterval(() => {
      let nextH = appState.currentHour + 1;
      if (nextH > 23) nextH = 6;
      setTimeHour(nextH);
    }, 1400);
  }
}

// ==================== MARKET DETAILS PANEL ====================
async function selectMarket(marketId) {
  appState.selectedMarketId = marketId;
  await renderMarketDetails(marketId);

  const targetMarket = await LokVyaparAPI.getMarketById(marketId);
  if (targetMarket && appState.map) {
    appState.map.panTo([targetMarket.lat, targetMarket.lng]);
  }
}

async function renderMarketDetails(marketId) {
  const market = await LokVyaparAPI.getMarketById(marketId);
  if (!market) return;

  const isMr = appState.currentLang === 'mr';
  const hourIndex = Math.max(0, Math.min(17, appState.currentHour - 6));
  const currentFootfall = market.hourlyFootfall[hourIndex] || 2000;
  const currentUpi = market.hourlyUpi[hourIndex] || 100;

  const zoneEl = document.getElementById('detailMarketZone');
  const nameEl = document.getElementById('detailMarketName');
  const footfallEl = document.getElementById('detailFootfall');
  const upiEl = document.getElementById('detailUpiCount');
  const vendorEl = document.getElementById('detailVendorCount');
  const policyEl = document.getElementById('detailPolicyBox');

  if (zoneEl) zoneEl.textContent = isMr ? (market.zone_mr || market.zone) : market.zone;
  if (nameEl) nameEl.textContent = isMr ? (market.name_mr || market.name) : market.name;
  if (footfallEl) footfallEl.textContent = currentFootfall.toLocaleString();
  if (upiEl) upiEl.textContent = isMr ? `${currentUpi} व्यवहार/तास` : `${currentUpi} txn/hr`;
  if (vendorEl) vendorEl.textContent = market.activeVendors;

  if (policyEl) {
    const pTitle = isMr ? (market.zoningPolicy_mr || market.zoningPolicy) : market.zoningPolicy;
    const pDesc = isMr ? (market.policyDesc_mr || market.policyDesc) : market.policyDesc;
    policyEl.innerHTML = `
      <div class="policy-badge"><i class="fa-solid fa-shield-check"></i> ${pTitle}</div>
      <p class="policy-text">${pDesc}</p>
    `;
  }

  // Render Sparkline bar chart
  const barsContainer = document.getElementById('hourlyBarsContainer');
  if (barsContainer) {
    barsContainer.innerHTML = '';
    const maxVal = Math.max(...market.hourlyFootfall);
    market.hourlyFootfall.forEach((val, idx) => {
      const heightPercent = Math.max(8, (val / maxVal) * 100);
      const isCurrent = idx === hourIndex;
      const bar = document.createElement('div');
      bar.className = `spark-bar ${isCurrent ? 'active' : ''}`;
      bar.style.height = `${heightPercent}%`;
      bar.title = `${idx + 6}:00 - ${val.toLocaleString()} ${isMr ? 'नागरिक' : 'visitors'}`;
      bar.onclick = () => setTimeHour(idx + 6);
      barsContainer.appendChild(bar);
    });
  }
}

function viewMarketVendors() {
  const zoneSelect = document.getElementById('vendorZoneFilter');
  if (zoneSelect) {
    zoneSelect.value = appState.selectedMarketId;
    applyVendorFilters();
  }
  const section = document.getElementById('vendorsSection');
  if (section) section.scrollIntoView({ behavior: 'smooth' });
}

function selectMarketFromFooter(marketId) {
  selectMarket(marketId);
  const section = document.getElementById('nagpurMapSection');
  if (section) section.scrollIntoView({ behavior: 'smooth' });
}

// ==================== VENDOR DIRECTORY & SEARCH ====================
function handleVendorSearch(query) {
  appState.searchQuery = query.toLowerCase().trim();
  renderVendorCards();
}

function applyVendorFilters() {
  const catFilter = document.getElementById('vendorCategoryFilter');
  const zoneFilter = document.getElementById('vendorZoneFilter');

  if (catFilter) appState.selectedCategoryFilter = catFilter.value;
  if (zoneFilter) appState.selectedZoneFilter = zoneFilter.value;

  renderVendorCards();
  renderMapData();
}

function resetVendorFilters() {
  const catFilter = document.getElementById('vendorCategoryFilter');
  const zoneFilter = document.getElementById('vendorZoneFilter');
  const searchInput = document.getElementById('vendorSearchInput');

  if (catFilter) catFilter.value = 'all';
  if (zoneFilter) zoneFilter.value = 'all';
  if (searchInput) searchInput.value = '';

  appState.selectedCategoryFilter = 'all';
  appState.selectedZoneFilter = 'all';
  appState.searchQuery = '';

  renderVendorCards();
  renderMapData();
}

async function renderVendorCards() {
  const container = document.getElementById('vendorCardsGrid');
  const emptyState = document.getElementById('vendorEmptyState');
  if (!container) return;

  const vendors = await LokVyaparAPI.getVendors();
  const isMr = appState.currentLang === 'mr';

  const filtered = vendors.filter(v => {
    // Category match
    if (appState.selectedCategoryFilter !== 'all' && v.category !== appState.selectedCategoryFilter) {
      return false;
    }
    // Zone match
    if (appState.selectedZoneFilter !== 'all' && v.marketId.toLowerCase() !== appState.selectedZoneFilter.toLowerCase()) {
      return false;
    }
    // Query search match
    if (appState.searchQuery) {
      const q = appState.searchQuery;
      const matchName = (v.name && v.name.toLowerCase().includes(q)) || (v.name_mr && v.name_mr.toLowerCase().includes(q));
      const matchProp = (v.proprietor && v.proprietor.toLowerCase().includes(q)) || (v.proprietor_mr && v.proprietor_mr.toLowerCase().includes(q));
      const matchMarket = (v.marketName && v.marketName.toLowerCase().includes(q)) || (v.marketName_mr && v.marketName_mr.toLowerCase().includes(q));
      const matchSpec = (v.specialties && v.specialties.toLowerCase().includes(q)) || (v.specialties_mr && v.specialties_mr.toLowerCase().includes(q));
      if (!matchName && !matchProp && !matchMarket && !matchSpec) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  container.innerHTML = filtered.map(v => {
    const name = isMr ? (v.name_mr || v.name) : v.name;
    const proprietor = isMr ? (v.proprietor_mr || v.proprietor) : v.proprietor;
    const market = isMr ? (v.marketName_mr || v.marketName) : v.marketName;
    const specialties = isMr ? (v.specialties_mr || v.specialties) : v.specialties;
    const catName = isMr ? (v.category_mr || v.category) : v.category;
    const fssai = isMr ? (v.fssaiGrade_mr || v.fssaiGrade) : v.fssaiGrade;
    const btnRateText = isMr ? '⭐ अभिप्राय द्या' : '⭐ Rate Stall';
    const svanidhiLbl = isMr ? 'पीएम स्वनिधी आयडी' : 'PM SVANidhi';

    return `
      <div class="vendor-card">
        <div class="vendor-card-img-wrap">
          <img src="${v.image}" alt="${name}" loading="lazy" />
          <span class="vendor-cat-badge">${catName}</span>
          <span class="vendor-rating-pill"><i class="fa-solid fa-star"></i> ${v.rating} (${v.reviewCount})</span>
        </div>
        <div class="vendor-card-body">
          <h3 class="vendor-card-title">${name}</h3>
          <div class="vendor-proprietor"><i class="fa-solid fa-user"></i> ${proprietor} &bull; <i class="fa-solid fa-location-dot"></i> ${market}</div>
          <p class="vendor-specialties">${specialties}</p>
          
          <div class="vendor-cert-row">
            <span class="cert-tag"><i class="fa-solid fa-award"></i> ${svanidhiLbl}: ${v.svanidhiId}</span>
            <span class="cert-tag"><i class="fa-solid fa-shield-check"></i> ${fssai}</span>
          </div>

          <div class="vendor-card-footer">
            <span class="vendor-price-text">${v.priceRange}</span>
            <button class="btn btn-sm btn-gov-primary" onclick="triggerVendorReviewModal(${v.id})">
              ${btnRateText}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== TOP RATED SPOTLIGHT ====================
async function renderTopRatedVendors() {
  const container = document.getElementById('topRatedGrid');
  if (!container) return;

  const vendors = await LokVyaparAPI.getVendors();
  const isMr = appState.currentLang === 'mr';
  const topList = vendors.filter(v => v.isTopRated).slice(0, 4);

  container.innerHTML = topList.map(v => {
    const name = isMr ? (v.name_mr || v.name) : v.name;
    const quote = isMr ? (v.topQuote_mr || v.topQuote) : v.topQuote;
    const specialties = isMr ? (v.specialties_mr || v.specialties) : v.specialties;
    const market = isMr ? (v.marketName_mr || v.marketName) : v.marketName;
    const grade = isMr ? (v.fssaiGrade_mr || v.fssaiGrade) : v.fssaiGrade;
    const btnRate = isMr ? 'रेटिंग द्या' : 'Rate Vendor';
    const crownText = isMr ? '५.० मानांकन' : '5.0 Rated';

    return `
      <div class="top-vendor-card">
        <span class="top-crown-badge"><i class="fa-solid fa-crown"></i> ${crownText}</span>
        <h3 class="top-vendor-name">${name}</h3>
        <div style="font-size: 11px; color: #64748b;"><i class="fa-solid fa-location-dot"></i> ${market}</div>
        <p class="top-vendor-quote">${quote}</p>
        <div style="font-size: 12px; color: #334155; margin-bottom: 8px;"><strong>${specialties}</strong></div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #fed7aa; padding-top:8px; margin-top:auto;">
          <span style="font-size:11px; color:#047857; font-weight:700;"><i class="fa-solid fa-shield-check"></i> ${grade}</span>
          <button class="btn btn-sm btn-gov-saffron" onclick="triggerVendorReviewModal(${v.id})">${btnRate}</button>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== GRIEVANCE & CITIZEN COMPLAINTS ====================
async function handleCitizenComplaintSubmit(e) {
  e.preventDefault();
  const isMr = appState.currentLang === 'mr';

  const citizenName = document.getElementById('citizenName').value;
  const citizenPhone = document.getElementById('citizenPhone').value;
  const marketId = document.getElementById('complaintMarket').value;
  const vendorSelect = document.getElementById('complaintVendor');
  const vendorId = vendorSelect ? vendorSelect.value : null;
  const vendorName = vendorSelect && vendorSelect.selectedIndex >= 0 ? vendorSelect.options[vendorSelect.selectedIndex].text : '';
  const category = document.getElementById('complaintCategory').value;
  const description = document.getElementById('complaintDescription').value;

  const market = await LokVyaparAPI.getMarketById(marketId);

  const newTicket = await LokVyaparAPI.submitComplaint({
    citizenName,
    citizenPhone,
    marketId,
    marketName: market ? market.name : marketId,
    marketName_mr: market ? (market.name_mr || market.name) : marketId,
    vendorId: vendorId || null,
    vendorName: vendorName || 'General Market Walkway',
    category,
    description
  });

  document.getElementById('publicComplaintForm').reset();

  const successMsg = isMr
    ? `तक्रार यशस्वीरित्या नोंदवली गेली! आपला मनपा टोकन क्र. ${newTicket.ticketId} आहे.`
    : `Complaint submitted successfully! Your NMC Ticket ID is ${newTicket.ticketId}.`;

  showToast(successMsg);
  renderCommunityComplaints();
  renderNmcComplaintsTable();

  displayTicketResult(newTicket);
}

async function handleModalComplaintSubmit(e) {
  e.preventDefault();
  const citizenName = document.getElementById('mCitizenName').value;
  const citizenPhone = document.getElementById('mCitizenPhone').value;
  const marketId = document.getElementById('mComplaintMarket').value;
  const category = document.getElementById('mComplaintCategory').value;
  const description = document.getElementById('mComplaintDesc').value;

  const market = await LokVyaparAPI.getMarketById(marketId);

  const newTicket = await LokVyaparAPI.submitComplaint({
    citizenName,
    citizenPhone,
    marketId,
    marketName: market ? market.name : marketId,
    marketName_mr: market ? (market.name_mr || market.name) : marketId,
    vendorId: null,
    vendorName: 'General Market Zone',
    category,
    description
  });

  closeModal('complaintModal');
  showToast(appState.currentLang === 'mr'
    ? `तक्रार नोंदवली! टोकन क्रमांक: ${newTicket.ticketId}`
    : `Complaint Lodged! Ticket ID: ${newTicket.ticketId}`
  );
  renderCommunityComplaints();
}

async function lookupTicket() {
  const query = document.getElementById('ticketSearchInput').value.trim();
  const isMr = appState.currentLang === 'mr';
  if (!query) {
    showToast(isMr ? 'कृपया वैध तक्रार क्रमांक टाका' : 'Please enter a ticket ID');
    return;
  }

  const ticket = await LokVyaparAPI.getComplaintByTicket(query);
  const resultBox = document.getElementById('ticketResultBox');
  if (!resultBox) return;

  if (ticket) {
    displayTicketResult(ticket);
  } else {
    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `
      <div style="color: #dc2626; font-size: 13px; font-weight: 700;">
        <i class="fa-solid fa-circle-xmark"></i> ${isMr ? 'तक्रार क्रमांक सापडला नाही. कृपया पुन्हा तपासा.' : 'Ticket ID not found. Please verify the ID.'}
      </div>
    `;
  }
}

function displayTicketResult(ticket) {
  const resultBox = document.getElementById('ticketResultBox');
  if (!resultBox) return;

  const isMr = appState.currentLang === 'mr';
  const statusClass = ticket.status === 'Resolved' ? 'status-resolved' : (ticket.status === 'Investigating' ? 'status-investigating' : 'status-pending');
  const statusText = isMr ? (ticket.status_mr || ticket.status) : ticket.status;
  const officerLbl = isMr ? 'नियुक्त अधिकारी:' : 'Assigned Officer:';
  const actionLbl = isMr ? 'झालेली कारवाई:' : 'Resolution:';

  resultBox.classList.remove('hidden');
  resultBox.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
      <strong style="color:#0f2b5c; font-size:14px;">${ticket.ticketId}</strong>
      <span class="status-badge ${statusClass}">${statusText}</span>
    </div>
    <div style="font-size:12px; color:#475569; margin-bottom:4px;">
      <i class="fa-solid fa-location-dot"></i> ${isMr ? (ticket.marketName_mr || ticket.marketName) : ticket.marketName} &bull; ${ticket.category}
    </div>
    <p style="font-size:12px; color:#1e293b; background:#f8fafc; padding:6px; border-radius:3px; margin:4px 0;">${ticket.description}</p>
    <div style="font-size:11px; color:#0f2b5c; font-weight:700; margin-top:4px;">
      <i class="fa-solid fa-user-shield"></i> ${officerLbl} ${ticket.assignedOfficer || 'TVC Field Inspector'}
    </div>
    ${ticket.resolutionNote ? `<div style="font-size:11px; color:#166534; font-weight:700; margin-top:2px;"><i class="fa-solid fa-circle-check"></i> ${actionLbl} ${ticket.resolutionNote}</div>` : ''}
  `;
}

async function renderCommunityComplaints() {
  const list = document.getElementById('communityFeedList');
  if (!list) return;

  const complaints = await LokVyaparAPI.getComplaints();
  const isMr = appState.currentLang === 'mr';

  list.innerHTML = complaints.slice(0, 3).map(c => {
    const statusClass = c.status === 'Resolved' ? 'status-resolved' : (c.status === 'Investigating' ? 'status-investigating' : 'status-pending');
    const statusText = isMr ? (c.status_mr || c.status) : c.status;
    const mName = isMr ? (c.marketName_mr || c.marketName) : c.marketName;

    return `
      <div class="feed-item">
        <div class="feed-header">
          <strong style="color:#0f2b5c;">${c.ticketId}</strong>
          <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
        <div style="font-size:11px; color:#64748b; margin-bottom:3px;"><i class="fa-solid fa-location-dot"></i> ${mName} &bull; ${c.category}</div>
        <p style="font-size:12px; color:#334155; margin:0;">${c.description}</p>
      </div>
    `;
  }).join('');
}

// ==================== REVIEW MODAL & SUBMISSIONS ====================
async function triggerVendorReviewModal(vendorId) {
  const vendor = await LokVyaparAPI.getVendorById(vendorId);
  if (!vendor) return;

  const isMr = appState.currentLang === 'mr';
  const name = isMr ? (vendor.name_mr || vendor.name) : vendor.name;

  document.getElementById('reviewVendorId').value = vendor.id;
  document.getElementById('reviewModalVendorName').textContent = isMr ? `विक्रेत्याला रेटिंग द्या: ${name}` : `Rate Vendor: ${name}`;

  setStarRating(5);
  openModal('reviewModal');
}

function setStarRating(stars) {
  appState.selectedReviewStar = stars;
  const isMr = appState.currentLang === 'mr';
  const input = document.getElementById('reviewStarValue');
  if (input) input.value = stars;

  const starPicker = document.getElementById('starPicker');
  if (starPicker) {
    const starIcons = starPicker.querySelectorAll('i');
    starIcons.forEach((icon, idx) => {
      icon.classList.toggle('active', idx < stars);
    });
  }

  const feedbackText = document.getElementById('starRatingFeedback');
  if (feedbackText) {
    const feedbackMap = {
      5: isMr ? '५ स्टार - अप्रतिम व स्वच्छ अनुभव!' : '5 Stars - Outstanding Experience!',
      4: isMr ? '४ स्टार - खूप छान चव व सेवा' : '4 Stars - Very Good Taste & Service',
      3: isMr ? '३ स्टार - सरासरी अनुभव' : '3 Stars - Average Experience',
      2: isMr ? '२ स्टार - सुधारणेची गरज आहे' : '2 Stars - Needs Improvement',
      1: isMr ? '१ स्टार - असमाधानकारक' : '1 Star - Unsatisfactory'
    };
    feedbackText.textContent = feedbackMap[stars] || `${stars} Stars`;
  }
}

async function handleReviewSubmit(e) {
  e.preventDefault();
  const vendorId = document.getElementById('reviewVendorId').value;
  const rating = document.getElementById('reviewStarValue').value;
  const reviewerName = document.getElementById('reviewerName').value;
  const tag = document.getElementById('reviewQualityTag').value;
  const comment = document.getElementById('reviewComment').value;

  await LokVyaparAPI.submitReview({
    vendorId,
    reviewerName,
    rating,
    tag,
    comment
  });

  closeModal('reviewModal');
  showToast(appState.currentLang === 'mr' ? 'आपले पुनरावलोकन यशस्वीरित्या प्रसिद्ध झाले!' : 'Review published successfully!');

  renderVendorCards();
  renderTopRatedVendors();
}

// ==================== VENDOR PORTAL SIMULATION ====================
async function simulateUpiPayment() {
  const earningsEl = document.getElementById('vendorDailyEarnings');
  const txnEl = document.getElementById('vendorTxnCount');
  const isMr = appState.currentLang === 'mr';

  if (earningsEl) earningsEl.textContent = isMr ? '₹४,९८०' : '₹4,980';
  if (txnEl) txnEl.textContent = isMr ? '७३ Txns' : '73 Txns';

  showToast(isMr ? 'नवीन UPI पेमेंट प्राप्त: +₹६० (NPCI द्वारे यशस्वी)' : 'New UPI Payment Received: +₹60 (NPCI Success)');
}

function showVendorSubTab(tabName) {
  const btnReviews = document.getElementById('btnVendorSubReviews');
  const btnComplaints = document.getElementById('btnVendorSubComplaints');
  const reviewsList = document.getElementById('vendorReviewsList');
  const complaintsList = document.getElementById('vendorComplaintsList');

  if (btnReviews) btnReviews.classList.toggle('active', tabName === 'reviews');
  if (btnComplaints) btnComplaints.classList.toggle('active', tabName === 'complaints');
  if (reviewsList) reviewsList.classList.toggle('hidden', tabName !== 'reviews');
  if (complaintsList) complaintsList.classList.toggle('hidden', tabName !== 'complaints');
}

// ==================== NMC ADMIN ACTIONS ====================
async function renderNmcComplaintsTable() {
  const tbody = document.getElementById('nmcComplaintsTableBody');
  if (!tbody) return;

  const complaints = await LokVyaparAPI.getComplaints();
  const isMr = appState.currentLang === 'mr';

  tbody.innerHTML = complaints.map(c => {
    const statusClass = c.status === 'Resolved' ? 'status-resolved' : (c.status === 'Investigating' ? 'status-investigating' : 'status-pending');
    const statusText = isMr ? (c.status_mr || c.status) : c.status;
    const mName = isMr ? (c.marketName_mr || c.marketName) : c.marketName;

    return `
      <tr>
        <td><strong>${c.ticketId}</strong></td>
        <td>${c.citizenName}<br/><small class="text-muted">${c.citizenPhone}</small></td>
        <td>${mName}</td>
        <td>${c.vendorName}</td>
        <td>${c.category}</td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        <td>
          <button class="btn btn-sm btn-gov-outline" onclick="actionInvestigateComplaint('${c.ticketId}')" title="${isMr ? 'तपास सुरू करा' : 'Investigate'}"><i class="fa-solid fa-magnifying-glass"></i></button>
          <button class="btn btn-sm btn-gov-saffron" onclick="actionResolveComplaint('${c.ticketId}')" title="${isMr ? 'निवारण करा' : 'Resolve'}"><i class="fa-solid fa-check"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

async function actionInvestigateComplaint(ticketId) {
  await LokVyaparAPI.updateComplaintStatus(ticketId, 'Investigating');
  showToast(appState.currentLang === 'mr' ? `तक्रार ${ticketId} तपासणीसाठी नियुक्त!` : `Complaint ${ticketId} marked for investigation.`);
  renderNmcComplaintsTable();
  renderCommunityComplaints();
}

async function actionResolveComplaint(ticketId) {
  await LokVyaparAPI.updateComplaintStatus(ticketId, 'Resolved', 'NMC Field Inspector inspected and cleared');
  showToast(appState.currentLang === 'mr' ? `तक्रार ${ticketId} यशस्वीरित्या सोडवली!` : `Complaint ${ticketId} marked as resolved!`);
  renderNmcComplaintsTable();
  renderCommunityComplaints();
}

async function renderNmcCensusTable() {
  const tbody = document.getElementById('nmcCensusTableBody');
  if (!tbody) return;

  const vendors = await LokVyaparAPI.getVendors();
  const isMr = appState.currentLang === 'mr';

  tbody.innerHTML = vendors.map(v => {
    const name = isMr ? (v.name_mr || v.name) : v.name;
    const proprietor = isMr ? (v.proprietor_mr || v.proprietor) : v.proprietor;
    const market = isMr ? (v.marketName_mr || v.marketName) : v.marketName;
    const cat = isMr ? (v.category_mr || v.category) : v.category;

    return `
      <tr>
        <td><strong>${v.svanidhiId}</strong></td>
        <td>${name}<br/><small class="text-muted">${proprietor}</small></td>
        <td>${market}</td>
        <td>${cat}</td>
        <td>★ ${v.rating}</td>
        <td>${v.dailyUpiAvg}</td>
        <td><span class="badge-pill green-zone">Green TVC</span></td>
        <td>
          <button class="btn btn-sm btn-gov-outline" onclick="triggerVendorReviewModal(${v.id})"><i class="fa-solid fa-qrcode"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function exportNmcReport() {
  const isMr = appState.currentLang === 'mr';
  const csvContent = "data:text/csv;charset=utf-8,TVC_ID,Vendor_Name,Proprietor,Market_Zone,Category,Rating,UPI_Volume\n"
    + "NAG-SVN-8812,Ramesh Chaat Corner,Ramesh Kumar,Sitabuldi,Street Food,4.8,4850\n"
    + "NAG-SVN-7741,Shriram Tarri Poha,Shriram Shinde,Dharampeth,Street Food,4.9,6200\n"
    + "NAG-SVN-9014,Santosh Pav Bhaji,Santosh Jaiswal,Sadar,Street Food,4.8,5400\n"
    + "NAG-SVN-6612,Nagpur Orange Mandi,Ganesh Raut,Cotton Market,Fruits,4.7,7100\n";

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "NMC_TVC_Vendor_Census_Audit_2026.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(isMr ? 'मनपा फेरीवाला सर्वेक्षण ऑडिट (CSV) डाउनलोड झाले!' : 'TVC Vendor Census CSV exported successfully!');
}

function showNmcTab(tabName) {
  document.getElementById('nmcTabComplaints').classList.toggle('hidden', tabName !== 'complaints');
  document.getElementById('nmcTabCensus').classList.toggle('hidden', tabName !== 'census');
  document.getElementById('nmcTabHeat').classList.toggle('hidden', tabName !== 'heat');

  document.getElementById('btnNmcTabComplaints').classList.toggle('active', tabName === 'complaints');
  document.getElementById('btnNmcTabCensus').classList.toggle('active', tabName === 'census');
  document.getElementById('btnNmcTabHeatmap').classList.toggle('active', tabName === 'heat');
}

// ==================== VIEW & ROLE SWITCHING ====================
function switchView(viewName) {
  appState.currentView = viewName;

  document.getElementById('citizenView').classList.toggle('hidden', viewName !== 'citizen');
  document.getElementById('vendorView').classList.toggle('hidden', viewName !== 'vendor');
  document.getElementById('nmcView').classList.toggle('hidden', viewName !== 'nmc');

  document.getElementById('tab-citizen').classList.toggle('active', viewName === 'citizen');
  document.getElementById('tab-vendor').classList.toggle('active', viewName === 'vendor');
  document.getElementById('tab-nmc').classList.toggle('active', viewName === 'nmc');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// ==================== REFRESH & SETUP ====================
async function refreshAllData() {
  await renderMapData();
  await renderMarketDetails(appState.selectedMarketId);
  await renderVendorCards();
  await renderTopRatedVendors();
  await renderCommunityComplaints();
  await renderNmcComplaintsTable();
  await renderNmcCensusTable();
}

function setupEventListeners() {
  // Global backdrop listener
  window.onclick = function (event) {
    if (event.target.classList.contains('modal-backdrop')) {
      event.target.classList.add('hidden');
    }
  };
}

function restoreSession() {
  const session = LokVyaparAPI.getActiveSession();
  const chip = document.getElementById('userSessionChip');
  if (session && chip) {
    chip.classList.remove('hidden');
    document.getElementById('userSessionName').textContent = session.name;
    document.getElementById('userSessionRole').textContent = session.role;
  }
}

function logoutSession() {
  LokVyaparAPI.clearActiveSession();
  const chip = document.getElementById('userSessionChip');
  if (chip) chip.classList.add('hidden');
  showToast(appState.currentLang === 'mr' ? 'लॉगआउट यशस्वी झाले' : 'Logged out successfully');
  switchView('citizen');
}

// ==================== MODAL CONTROLS ====================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function openSvanidhiModal() {
  openModal('svanidhiModal');
}

function openStudentProjectModal() {
  openModal('studentProjectModal');
}
