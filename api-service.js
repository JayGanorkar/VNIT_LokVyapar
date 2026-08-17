/**
 * LokVyapar (लोकव्यापार) - API Service & Data Layer
 * Government of Maharashtra & Nagpur Municipal Corporation (NMC) Civic Platform
 * Developed by Final Year Computer Engineering Students (Batch 2025-26)
 * Handles data fetching, state persistence (LocalStorage), and bilingual models (मराठी / English).
 */

const STORAGE_KEYS = {
  VENDORS: 'lokvyapar_vendors_data_v2',
  MARKETS: 'lokvyapar_markets_data_v2',
  REVIEWS: 'lokvyapar_reviews_data_v2',
  COMPLAINTS: 'lokvyapar_complaints_data_v2',
  ACTIVE_SESSION: 'lokvyapar_user_session_v2',
  LANGUAGE: 'lokvyapar_app_lang_v2'
};

// ==================== INITIAL SEED DATA (NAGPUR SPECIFIC & BILINGUAL) ====================

const DEFAULT_MARKETS = [
  {
    id: 'Sitabuldi',
    name: 'Sitabuldi Main Road & Metro Plaza',
    name_mr: 'सीताबर्डी मेन रोड आणि मेट्रो प्लाझा',
    zone: 'NMC Zone 2 (Dharampeth/Sitabuldi)',
    zone_mr: 'मनपा झोन क्र. २ (धरमपेठ / सीताबर्डी)',
    lat: 21.1458,
    lng: 79.0882,
    category: 'shopping',
    category_mr: 'खरेदी केंद्र',
    activeVendors: 380,
    zoningPolicy: 'Green Vending Zone',
    zoningPolicy_mr: 'हिरवा फेरीवाला विभाग (अधिकृत)',
    policyDesc: 'Designated hawkers street with smart digital QR kiosks. Vending active 06:00 AM - 10:30 PM.',
    policyDesc_mr: 'मनपा अधिकृत फेरीवाला क्षेत्र. डिजिटल क्यूआर कोडसह सकाळी ०६:०० ते रात्री १०:३० पर्यंत सुरू राहण्यास परवानगी.',
    hourlyFootfall: [
      350, 850, 1800, 2400, 2900, 3100, 3400, 2800, 2900, 4200, 6800, 8450, 7800, 5200, 3100, 1400, 600, 200
    ],
    hourlyUpi: [
      25, 70, 140, 190, 220, 240, 260, 210, 230, 340, 520, 640, 590, 410, 240, 110, 40, 10
    ]
  },
  {
    id: 'Sadar',
    name: 'Sadar Bazar & Residency Road Food Street',
    name_mr: 'सदर बाजार आणि रेसिडेन्सी रोड खाऊ गल्ली',
    zone: 'NMC Zone 1 (Mangalwari / Sadar)',
    zone_mr: 'मनपा झोन क्र. १ (मंगळवारी / सदर)',
    lat: 21.1625,
    lng: 79.0825,
    category: 'food',
    category_mr: 'खाद्यपदार्थ गल्ली',
    activeVendors: 260,
    zoningPolicy: 'Green Vending Hub',
    zoningPolicy_mr: 'स्वच्छ पथखाद्य हब (फूड सेफ्टी)',
    policyDesc: 'Clean Street Food Hub certified by FSSAI & NMC. Evening dining hotspot from 04:00 PM - 11:00 PM.',
    policyDesc_mr: 'एफएसएसएआय व मनपा प्रमाणित स्वच्छ खाऊ गल्ली. संध्याकाळी ०४:०० ते रात्री ११:०० वाजेपर्यंत खाद्यपदार्थ विक्री.',
    hourlyFootfall: [
      200, 450, 900, 1200, 1600, 2200, 2100, 1800, 2200, 3800, 5120, 6900, 7200, 6100, 3800, 1900, 700, 150
    ],
    hourlyUpi: [
      15, 35, 75, 110, 140, 180, 170, 150, 190, 310, 430, 580, 610, 510, 290, 130, 45, 10
    ]
  },
  {
    id: 'Dharampeth',
    name: 'Dharampeth WHC Road & Coffee Street',
    name_mr: 'धरमपेठ डब्ल्यूएचसी रोड व कॉफी कॉर्नर',
    zone: 'NMC Zone 2 (Dharampeth)',
    zone_mr: 'मनपा झोन क्र. २ (धरमपेठ)',
    lat: 21.1415,
    lng: 79.0625,
    category: 'food',
    category_mr: 'सकाळचा नाश्ता व कॅफे',
    activeVendors: 195,
    zoningPolicy: 'Green Vending Zone',
    zoningPolicy_mr: 'हिरवा फेरीवाला विभाग',
    policyDesc: 'Popular morning breakfast (Tarri Pohe) & youth evening cafe/snack promenade.',
    policyDesc_mr: 'प्रसिद्ध सकाळचा तर्री पोहे नाश्ता व संध्याकाळी तरुणांचा नाश्ता कॉर्नर.',
    hourlyFootfall: [
      600, 1400, 2800, 3100, 2200, 1500, 1200, 1100, 1400, 2200, 3200, 4400, 4800, 3600, 2200, 1100, 400, 100
    ],
    hourlyUpi: [
      50, 120, 230, 260, 180, 110, 90, 85, 120, 180, 260, 360, 390, 280, 160, 75, 25, 5
    ]
  },
  {
    id: 'Itwari',
    name: 'Itwari Sarafa & Kirana Oli Wholesale Mandi',
    name_mr: 'इतवारी सराफा आणि किराणा ओळ घाऊक बाजार',
    zone: 'NMC Zone 6 (Gandhibagh / Itwari)',
    zone_mr: 'मनपा झोन क्र. ६ (गांधीबाग / इतवारी)',
    lat: 21.1540,
    lng: 79.1120,
    category: 'shopping',
    category_mr: 'सराफा व घाऊक बाजार',
    activeVendors: 420,
    zoningPolicy: 'Yellow Restricted Zone',
    zoningPolicy_mr: 'पिवळा मर्यादित विभाग (वेळेचे बंधन)',
    policyDesc: 'Restricted handcart timings between 11:00 AM - 08:30 PM to maintain traffic flow.',
    policyDesc_mr: 'वाहतूक सुरळीत राहण्यासाठी हातगाड्यांना सकाळी ११:०० ते रात्री ०८:३० अशी मर्यादित मुभा.',
    hourlyFootfall: [
      400, 900, 2100, 3800, 4900, 5400, 5100, 4800, 5200, 6400, 6800, 5900, 4200, 2600, 1200, 500, 150, 50
    ],
    hourlyUpi: [
      30, 80, 180, 310, 420, 460, 430, 390, 440, 530, 560, 480, 320, 190, 80, 30, 10, 2
    ]
  },
  {
    id: 'Mahal',
    name: 'Mahal Badkas Chowk & Shivaji Statue Market',
    name_mr: 'महाल बडकस चौक आणि शिवाजी पुतळा परिसर',
    zone: 'NMC Zone 4 (Dhantoli / Mahal)',
    zone_mr: 'मनपा झोन क्र. ४ (धंतोली / महाल)',
    lat: 21.1420,
    lng: 79.1080,
    category: 'shopping',
    category_mr: 'पारंपरिक बाजारपेठ',
    activeVendors: 310,
    zoningPolicy: 'Green Vending Zone',
    zoningPolicy_mr: 'हिरवा फेरीवाला विभाग',
    policyDesc: 'Traditional historic bazaar. Heritage crafts, puja samagri, street snacks.',
    policyDesc_mr: 'ऐतिहासिक बाजारपेठ. पूजा साहित्य, हस्तकला, संत्रा बर्फी व पारंपरिक खाद्यपदार्थ.',
    hourlyFootfall: [
      300, 700, 1500, 2200, 2800, 3200, 3100, 2800, 3300, 4500, 5600, 6100, 5200, 3400, 1800, 800, 250, 80
    ],
    hourlyUpi: [
      20, 55, 120, 180, 230, 260, 250, 220, 270, 370, 450, 490, 410, 260, 130, 50, 15, 5
    ]
  },
  {
    id: 'Gandhibagh',
    name: 'Gandhibagh Wholesale Cloth & Handloom Hub',
    name_mr: 'गांधीबाग घाऊक कापड व हातमाग बाजार',
    zone: 'NMC Zone 6 (Gandhibagh)',
    zone_mr: 'मनपा झोन क्र. ६ (गांधीबाग)',
    lat: 21.1500,
    lng: 79.1020,
    category: 'shopping',
    category_mr: 'कापड बाजार',
    activeVendors: 240,
    zoningPolicy: 'Green Vending Zone',
    zoningPolicy_mr: 'हिरवा फेरीवाला विभाग',
    policyDesc: 'Textiles, Vidarbha cotton sarees, apparel hawking corridor.',
    policyDesc_mr: 'विदर्भ कॉटन साड्या, कपडे व गारमेंट्स फेरीवाला कॉरिडॉर.',
    hourlyFootfall: [
      150, 400, 1100, 2200, 3400, 4100, 4000, 3800, 4200, 5100, 5400, 4600, 3100, 1800, 800, 300, 100, 30
    ],
    hourlyUpi: [
      10, 30, 90, 170, 270, 330, 320, 300, 340, 410, 430, 360, 230, 120, 50, 20, 5, 2
    ]
  },
  {
    id: 'Cotton Market',
    name: 'Cotton Market & Railway Station Sabzi Mandi',
    name_mr: 'कॉटन मार्केट व रेल्वे स्टेशन भाजी मंडई',
    zone: 'NMC Zone 5 (Nehru Nagar)',
    zone_mr: 'मनपा झोन क्र. ५ (नेहरू नगर)',
    lat: 21.1505,
    lng: 79.0910,
    category: 'mandi',
    category_mr: 'घाऊक भाजीपाला मंडई',
    activeVendors: 510,
    zoningPolicy: 'Green Vending Zone',
    zoningPolicy_mr: 'शेतकरी थेट विक्री विभाग',
    policyDesc: 'Nagpur largest fresh produce wholesale and retail farmer market.',
    policyDesc_mr: 'नागपुरातील सर्वात मोठी ताजी भाजीपाला व फळांची शेतकरी थेट विक्री मंडई.',
    hourlyFootfall: [
      2200, 4800, 6800, 7900, 6200, 4500, 3100, 2800, 3200, 4100, 5200, 5800, 4600, 2900, 1400, 600, 200, 80
    ],
    hourlyUpi: [
      160, 360, 510, 620, 480, 340, 230, 210, 240, 310, 390, 440, 330, 190, 85, 35, 10, 5
    ]
  }
];

const DEFAULT_VENDORS = [
  {
    id: 1,
    name: 'Ramesh Chaat & Snack Corner',
    name_mr: 'रमेश चाट आणि स्नॅक्स कॉर्नर',
    proprietor: 'Ramesh Kumar Gupta',
    proprietor_mr: 'रमेश कुमार गुप्ता',
    marketId: 'Sitabuldi',
    marketName: 'Sitabuldi Main Road',
    marketName_mr: 'सीताबर्डी मेन रोड',
    category: 'Street Food',
    category_mr: 'खाद्यपदार्थ',
    rating: 4.8,
    reviewCount: 342,
    specialties: 'Sev Puri, Pani Puri, Dahi Papdi Chaat',
    specialties_mr: 'शेव पुरी, पाणी पुरी, दही पापडी चाट',
    priceRange: '₹30 - ₹80',
    svanidhiId: 'NAG-SVN-8812',
    fssaiGrade: 'Grade A+ Clean Street Food',
    fssaiGrade_mr: 'अ+ श्रेणी स्वच्छ अन्न प्रमाणपत्र',
    upiId: 'rameshchaat@okhdfcbank',
    dailyUpiAvg: '₹4,850 (72 txns)',
    lat: 21.1462,
    lng: 79.0886,
    address: 'Stall #42, Opp. Variety Square, Sitabuldi Metro Station, Nagpur',
    address_mr: 'स्टॉल क्र. ४२, व्हरायटी चौकासमोर, सीताबर्डी मेट्रो स्टेशन, नागपूर',
    isTopRated: true,
    topQuote: '"Best tangy Pani Puri water in Sitabuldi! Hygienic gloves and instant UPI payment."',
    topQuote_mr: '"सीताबर्डीतील सर्वात चवदार पाणी पुरी! स्वच्छ ग्लोव्ह्ज आणि तत्काळ यूपीआय पेमेंट सुविधा."',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Shriram Pohe & Chana Tarri Centre',
    name_mr: 'श्रीराम पोहे आणि चना तर्री सेंटर',
    proprietor: 'Shriram Shinde',
    proprietor_mr: 'श्रीराम शिंदे',
    marketId: 'Dharampeth',
    marketName: 'Dharampeth WHC Road',
    marketName_mr: 'धरमपेठ डब्ल्यूएचसी रोड',
    category: 'Street Food',
    category_mr: 'खाद्यपदार्थ',
    rating: 4.9,
    reviewCount: 512,
    specialties: 'Authentic Nagpur Tarri Poha, Sambar Vada, Masala Chai',
    specialties_mr: 'नागपुरी अस्सल तर्री पोहा, सांबार वडा, मसाला चहा',
    priceRange: '₹25 - ₹50',
    svanidhiId: 'NAG-SVN-7741',
    fssaiGrade: 'Grade A+ Clean Food Hub',
    fssaiGrade_mr: 'अ+ श्रेणी स्वच्छ अन्न प्रमाणपत्र',
    upiId: 'shrirampohe@ybl',
    dailyUpiAvg: '₹6,200 (110 txns)',
    lat: 21.1418,
    lng: 79.0628,
    address: 'Stall #12, Near Traffic Park Corner, Dharampeth, Nagpur',
    address_mr: 'स्टॉल क्र. १२, ट्रॅफिक पार्क कॉर्नर, धरमपेठ, नागपूर',
    isTopRated: true,
    topQuote: '"Iconic spicy tarri poha with boiled chana. Morning breakfast heaven since 1998."',
    topQuote_mr: '"१९९८ पासून नागपूरकरांचा लाडका झणझणीत तर्री पोहा आणि सांबार वडा!"',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Santosh Chat & Pav Bhaji Centre',
    name_mr: 'संतोष चाट आणि पावभाजी सेंटर',
    proprietor: 'Santosh Jaiswal',
    proprietor_mr: 'संतोष जयस्वाल',
    marketId: 'Sadar',
    marketName: 'Sadar Bazar',
    marketName_mr: 'सदर बाजार',
    category: 'Street Food',
    category_mr: 'खाद्यपदार्थ',
    rating: 4.8,
    reviewCount: 428,
    specialties: 'Butter Pav Bhaji, Ragda Patties, Tawa Pulao',
    specialties_mr: 'स्पेशल बटर पावभाजी, रगडा पॅटिस, तवा पुलाव',
    priceRange: '₹50 - ₹120',
    svanidhiId: 'NAG-SVN-9014',
    fssaiGrade: 'Grade A Clean Street Food',
    fssaiGrade_mr: 'अ श्रेणी स्वच्छ पथखाद्य',
    upiId: 'santoshjaiswal@paytm',
    dailyUpiAvg: '₹5,400 (85 txns)',
    lat: 21.1628,
    lng: 79.0831,
    address: 'Stall #08, Residency Road, Near Mount Road Extension, Sadar, Nagpur',
    address_mr: 'स्टॉल क्र. ०८, रेसिडेन्सी रोड, माउंट रोडजवळ, सदर, नागपूर',
    isTopRated: true,
    topQuote: '"Rich buttery pav bhaji and quick QR scanning. Always bustling in the evenings!"',
    topQuote_mr: '"अप्रतिम बटर पावभाजी आणि तत्काळ क्यूआर कोड पेमेंट सुविधा!"',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'Nagpur Organic Orange & Fruit Mandi',
    name_mr: 'नागपूर ऑरगॅनिक संत्रा व फळ विक्री केंद्र',
    proprietor: 'Ganesh Raut',
    proprietor_mr: 'गणेश राऊत',
    marketId: 'Cotton Market',
    marketName: 'Cotton Market',
    marketName_mr: 'कॉटन मार्केट',
    category: 'Fruits & Veggies',
    category_mr: 'फळे व भाजीपाला',
    rating: 4.7,
    reviewCount: 289,
    specialties: 'Nagpur GI Orange (Santra), Sweet Limes, Fresh Pomegranates',
    specialties_mr: 'अस्सल नागपुरी संत्री (जीआय टॅग), मोसंबी, ताजे डाळिंब',
    priceRange: '₹60 - ₹150 / kg',
    svanidhiId: 'NAG-SVN-6612',
    fssaiGrade: 'NMC Organic Certified',
    fssaiGrade_mr: 'मनपा सेंद्रिय प्रमाणित',
    upiId: 'ganeshfruits@sbi',
    dailyUpiAvg: '₹7,100 (65 txns)',
    lat: 21.1508,
    lng: 79.0914,
    address: 'Sabzi Block #14, Main Gate, Cotton Market, Nagpur',
    address_mr: 'भाजीपाला ब्लॉक क्र. १४, मुख्य गेट, कॉटन मार्केट, नागपूर',
    isTopRated: true,
    topQuote: '"Sweet, juicy authentic Nagpur oranges straight from Katol orchards."',
    topQuote_mr: '"काटोलच्या बागांमधून थेट आलेली गोड आणि रसाळ अस्सल नागपुरी संत्री."',
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    name: 'Ramji Bun Maska & Irani Chai Stall',
    name_mr: 'रामजी बन मस्का व इराणी चहा स्टॉल',
    proprietor: 'Ramji Patil',
    proprietor_mr: 'रामजी पाटील',
    marketId: 'Mahal',
    marketName: 'Mahal Badkas Chowk',
    marketName_mr: 'महाल बडकस चौक',
    category: 'Tea & Beverages',
    category_mr: 'चहा व शीतपेये',
    rating: 4.8,
    reviewCount: 310,
    specialties: 'Kadak Irani Chai, Bun Maska, Khari Biscuit, Poha',
    specialties_mr: 'कडक इराणी चहा, बन मस्का, खारी बिस्कीट, पोहे',
    priceRange: '₹15 - ₹40',
    svanidhiId: 'NAG-SVN-5520',
    fssaiGrade: 'Grade A Hygiene',
    fssaiGrade_mr: 'अ श्रेणी स्वच्छता',
    upiId: 'ramjichai@okaxis',
    dailyUpiAvg: '₹3,900 (140 txns)',
    lat: 21.1422,
    lng: 79.1084,
    address: 'Near Shivaji Statue, Badkas Chowk, Mahal, Nagpur',
    address_mr: 'शिवाजी पुतळ्याजवळ, बडकस चौक, महाल, नागपूर',
    isTopRated: true,
    topQuote: '"The morning spot for Nagpur senior citizens and students alike. Kadak chai!"',
    topQuote_mr: '"नागपूरकर ज्येष्ठ नागरिक व विद्यार्थ्यांचे आवडते कडक चहाचे ठिकाण!"',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    name: 'Vidarbha Handloom & Handicrafts',
    name_mr: 'विदर्भ हातमाग व हस्तकला केंद्र',
    proprietor: 'Sunita Bawankule',
    proprietor_mr: 'सुनिता बावनकुळे',
    marketId: 'Gandhibagh',
    marketName: 'Gandhibagh Wholesale Market',
    marketName_mr: 'गांधीबाग कापड बाजार',
    category: 'Handicrafts & Artisans',
    category_mr: 'हस्तकला व कापड',
    rating: 4.7,
    reviewCount: 195,
    specialties: 'Hand-woven Cotton Dupattas, Terracotta Idols, Bamboo Artifacts',
    specialties_mr: 'हातमाग कॉटन दुपट्टे, मातीची शिल्पे, बांबू हस्तकला',
    priceRange: '₹100 - ₹600',
    svanidhiId: 'NAG-SVN-4418',
    fssaiGrade: 'NMC Artisan Guild',
    fssaiGrade_mr: 'मनपा हस्तकला संघ मान्यता',
    upiId: 'vidarbhaart@icici',
    dailyUpiAvg: '₹4,100 (28 txns)',
    lat: 21.1502,
    lng: 79.1025,
    address: 'Stall #66, Cloth Market Lane, Gandhibagh, Nagpur',
    address_mr: 'स्टॉल क्र. ६६, क्लॉथ मार्केट गल्ली, गांधीबाग, नागपूर',
    isTopRated: true,
    topQuote: '"Beautiful traditional Vidarbha handloom prints directly from rural weaver collectives."',
    topQuote_mr: '"ग्रामीण विणकर बांधवांकडून थेट तयार केलेले सुंदर पारंपरिक हातमाग वस्त्र."',
    image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 7,
    name: 'Sitabuldi Bombay Kulfi & Falooda',
    name_mr: 'सीताबर्डी बॉम्बे कुल्फी व फालुदा',
    proprietor: 'Iqbal Mansoori',
    proprietor_mr: 'इक्बाल मन्सुरी',
    marketId: 'Sitabuldi',
    marketName: 'Sitabuldi Main Road',
    marketName_mr: 'सीताबर्डी मेन रोड',
    category: 'Street Food',
    category_mr: 'खाद्यपदार्थ',
    rating: 4.8,
    reviewCount: 380,
    specialties: 'Malai Rabdi Kulfi, Kesar Pista Falooda, Matka Kulfi',
    specialties_mr: 'मलाई रबडी कुल्फी, केशर पिस्ता फालुदा, मटका कुल्फी',
    priceRange: '₹40 - ₹90',
    svanidhiId: 'NAG-SVN-8844',
    fssaiGrade: 'Grade A+ Clean Food',
    fssaiGrade_mr: 'अ+ श्रेणी स्वच्छ अन्न',
    upiId: 'iqbalkulfi@paytm',
    dailyUpiAvg: '₹4,600 (78 txns)',
    lat: 21.1455,
    lng: 79.0879,
    address: 'Stall #29, Near Eternity Mall Crossing, Sitabuldi, Nagpur',
    address_mr: 'स्टॉल क्र. २९, इटर्निटी मॉलजवळ, सीताबर्डी, नागपूर',
    isTopRated: false,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    name: 'Kalamkar Fresh Veggies & Greens',
    name_mr: 'कळमकर ताजी भाजीपाला व पालेभाज्या',
    proprietor: 'Manoj Kalamkar',
    proprietor_mr: 'मनोज कळमकर',
    marketId: 'Dharampeth',
    marketName: 'Dharampeth WHC Road',
    marketName_mr: 'धरमपेठ डब्ल्यूएचसी रोड',
    category: 'Fruits & Veggies',
    category_mr: 'फळे व भाजीपाला',
    rating: 4.6,
    reviewCount: 160,
    specialties: 'Farm-fresh Methi, Palak, Tomatoes, Vidarbha Brinjal (Vangi)',
    specialties_mr: 'ताजी मेथी, पालक, टोमॅटो, काटेरी वांगी',
    priceRange: '₹20 - ₹80',
    svanidhiId: 'NAG-SVN-7789',
    fssaiGrade: 'NMC Green Verified',
    fssaiGrade_mr: 'मनपा शेतीमाल प्रमाणित',
    upiId: 'kalamkarveg@ybl',
    dailyUpiAvg: '₹3,400 (52 txns)',
    lat: 21.1412,
    lng: 79.0621,
    address: 'Corner Stall #03, Gokulpeth Ext., Dharampeth, Nagpur',
    address_mr: 'कॉर्नर स्टॉल क्र. ०३, गोकुळपेठ, धरमपेठ, नागपूर',
    isTopRated: false,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 9,
    name: 'Sarafa Mobile Accessories & Gadget Hub',
    name_mr: 'सराफा मोबाईल ॲक्सेसरीज व गॅजेट्स',
    proprietor: 'Deepak Agrawal',
    proprietor_mr: 'दीपक अग्रवाल',
    marketId: 'Itwari',
    marketName: 'Itwari Sarafa',
    marketName_mr: 'इतवारी सराफा',
    category: 'Accessories & Hardware',
    category_mr: 'मोबाईल व इलेक्ट्रॉनिक्स',
    rating: 4.5,
    reviewCount: 145,
    specialties: 'Phone Cases, Screen Guards, Fast USB Chargers, Earphones',
    specialties_mr: 'मोबाईल कव्हर, स्क्रीन गार्ड, फास्ट चार्जर्स, इयरफोन्स',
    priceRange: '₹50 - ₹350',
    svanidhiId: 'NAG-SVN-3312',
    fssaiGrade: 'NMC Retail Certified',
    fssaiGrade_mr: 'मनपा किरकोळ व्यापार नोंदणी',
    upiId: 'deepakgadgets@upi',
    dailyUpiAvg: '₹3,100 (34 txns)',
    lat: 21.1538,
    lng: 79.1126,
    address: 'Stall #19, Sarafa Bazar Main Lane, Itwari, Nagpur',
    address_mr: 'स्टॉल क्र. १९, सराफा बाजार मुख्य गल्ली, इतवारी, नागपूर',
    isTopRated: false,
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=500&auto=format&fit=crop&q=80'
  }
];

const DEFAULT_REVIEWS = [
  {
    id: 1,
    vendorId: 1,
    vendorName: 'Ramesh Chaat & Snack Corner',
    vendorName_mr: 'रमेश चाट आणि स्नॅक्स कॉर्नर',
    reviewerName: 'Shruti Deshpande (श्रुती देशपांडे)',
    rating: 5,
    tag: 'Superb Taste & Freshness',
    tag_mr: 'उत्कृष्ट चव व ताजेपणा',
    comment: 'The Dahi Puri here is unbeatable! Crispy puris, chilled sweet curd and super clean stall. Payment was seamless via UPI QR code.',
    comment_mr: 'येथील दही पुरी अप्रतिम आहे! कुरकुरीत पुरी, थंड गोड दही आणि अत्यंत स्वच्छ स्टॉल. यूपीआय क्यूआर कोडने लगेच पेमेंट झाले.',
    date: 'Today, 15:20 IST'
  },
  {
    id: 2,
    vendorId: 1,
    vendorName: 'Ramesh Chaat & Snack Corner',
    vendorName_mr: 'रमेश चाट आणि स्नॅक्स कॉर्नर',
    reviewerName: 'Rohit Meshram (रोहित मेश्राम)',
    rating: 5,
    tag: '100% Clean & Hygienic',
    tag_mr: '१००% स्वच्छ व निर्जंतुक',
    comment: 'Wears gloves while making Pani Puri, uses filtered RO water. Proud to see Nagpur street food at this standard!',
    comment_mr: 'पाणी पुरी बनवताना ग्लोव्ह्ज वापरतात आणि आरओ पाण्याचा वापर करतात. नागपुरातील पथखाद्याचा हा दर्जा पाहून आनंद झाला!',
    date: 'Yesterday, 19:40 IST'
  },
  {
    id: 3,
    vendorId: 2,
    vendorName: 'Shriram Pohe & Chana Tarri Centre',
    vendorName_mr: 'श्रीराम पोहे आणि चना तर्री सेंटर',
    reviewerName: 'Amitabh Sen (अमिताभ सेन)',
    rating: 5,
    tag: 'Superb Taste & Freshness',
    tag_mr: 'अस्सल नागपुरी चव',
    comment: 'Nagpur ka asli swaad! The tarri has just the right amount of heat and flavour. Fast service even during heavy morning 8 AM rush.',
    comment_mr: 'नागपूरचा खरा अस्सल झणझणीत स्वाद! सकाळी ८ च्या प्रचंड गर्दीतही जलद सेवा.',
    date: 'Today, 08:30 IST'
  },
  {
    id: 4,
    vendorId: 3,
    vendorName: 'Santosh Chat & Pav Bhaji Centre',
    vendorName_mr: 'संतोष चाट आणि पावभाजी सेंटर',
    reviewerName: 'Pooja Kulkarni (पूजा कुलकर्णी)',
    rating: 5,
    tag: 'Quick UPI Payment',
    tag_mr: 'जलद यूपीआय व्यवहार',
    comment: 'Huge crowd around 8 PM, but the token system and digital payments make everything smooth. Delicious Pav Bhaji!',
    comment_mr: 'संध्याकाळी ८ वाजता मोठी गर्दी असते, पण टोकन सिस्टीम आणि डिजिटल पेमेंटमुळे काम सोपे होते. स्वादिष्ट पावभाजी!',
    date: '2 days ago'
  }
];

const DEFAULT_COMPLAINTS = [
  {
    ticketId: 'NMC-LV-8821',
    citizenName: 'Devendra Joshi (देवेंद्र जोशी)',
    citizenPhone: '98224XXXXX',
    marketId: 'Sitabuldi',
    marketName: 'Sitabuldi Main Road',
    marketName_mr: 'सीताबर्डी मेन रोड',
    vendorId: null,
    vendorName: 'General Market Walkway (पादचारी मार्ग)',
    category: 'Footpath Encroachment',
    category_mr: 'पादचारी मार्ग अडथळा',
    description: 'Temporary plastic tarpaulins erected across the metro exit pathway causing pedestrian bottleneck during evening rush hour.',
    description_mr: 'मेट्रो गेटजवळ तात्पुरते ताडपत्री शेड उभारल्याने संध्याकाळी गर्दीच्या वेळी पादचाऱ्यांना चालण्यास अडचण येत आहे.',
    status: 'Investigating',
    status_mr: 'तपास सुरू',
    date: 'Today, 14:10 IST',
    assignedOfficer: 'TVC Inspector V. K. Ingle (Zone 2)'
  },
  {
    ticketId: 'NMC-LV-8904',
    citizenName: 'Sunil Thakre (सुनील ठाकरे)',
    citizenPhone: '94231XXXXX',
    marketId: 'Sadar',
    marketName: 'Sadar Bazar',
    marketName_mr: 'सदर बाजार',
    vendorId: 3,
    vendorName: 'Santosh Chat & Pav Bhaji Centre',
    category: 'Garbage & Cleanliness',
    category_mr: 'कचरा व स्वच्छता',
    description: 'Disposed paper plates accumulating near the electric transformer pole. Needs additional municipal bin placement.',
    description_mr: 'विद्युत पोलजवळ कागदी प्लेट्स साचल्या आहेत. तेथे मनपाची अतिरिक्त कचराकुंडी लावण्याची आवश्यकता आहे.',
    status: 'Resolved',
    status_mr: 'निवारण झाले',
    date: 'Yesterday, 18:30 IST',
    resolutionNote: 'NMC Green Bin installed at Mount Road corner; stall owner cautioned.',
    assignedOfficer: 'TVC Sanitary Inspector P. S. More'
  },
  {
    ticketId: 'NMC-LV-9012',
    citizenName: 'Priya Wardhan (प्रिया वर्धन)',
    citizenPhone: '97665XXXXX',
    marketId: 'Itwari',
    marketName: 'Itwari Sarafa & Kirana',
    marketName_mr: 'इतवारी सराफा व किराणा',
    vendorId: null,
    vendorName: 'Sarafa Handcarts (सराफा हातगाड्या)',
    category: 'Footpath Encroachment',
    category_mr: 'पादचारी मार्ग अडथळा',
    description: 'Two unauthorized sugarcane juice carts blocking the entry of Sarafa lane.',
    description_mr: 'सराफा बाजाराच्या प्रवेशद्वारावर अनधिकृत उसाच्या रसाच्या गाड्यांमुळे वाट अडवली आहे.',
    status: 'Pending',
    status_mr: 'प्रलंबित',
    date: 'Today, 16:05 IST',
    assignedOfficer: 'TVC Zone 6 Triage Desk'
  }
];

// ==================== REPOSITORY / STORAGE WRAPPER ====================

const Storage = {
  get(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn('LocalStorage read error, returning fallback:', e);
      return fallback;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  }
};

// ==================== LOKVYAPAR PUBLIC API SERVICE ====================

window.LokVyaparAPI = {
  
  // 1. Markets & Geolocation
  async getMarkets() {
    return Storage.get(STORAGE_KEYS.MARKETS, DEFAULT_MARKETS);
  },

  async getMarketById(marketId) {
    const markets = await this.getMarkets();
    return markets.find(m => m.id.toLowerCase() === marketId.toLowerCase()) || markets[0];
  },

  // 2. Vendors
  async getVendors() {
    return Storage.get(STORAGE_KEYS.VENDORS, DEFAULT_VENDORS);
  },

  async getVendorById(id) {
    const vendors = await this.getVendors();
    return vendors.find(v => v.id === parseInt(id, 10)) || null;
  },

  async registerVendor(newVendorData) {
    const vendors = await this.getVendors();
    const newId = vendors.length > 0 ? Math.max(...vendors.map(v => v.id)) + 1 : 1;
    const svanidhiId = `NAG-SVN-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const vendorRecord = {
      id: newId,
      name: newVendorData.name,
      name_mr: newVendorData.name_mr || newVendorData.name,
      proprietor: newVendorData.proprietor,
      proprietor_mr: newVendorData.proprietor_mr || newVendorData.proprietor,
      marketId: newVendorData.marketId,
      marketName: newVendorData.marketName || newVendorData.marketId,
      marketName_mr: newVendorData.marketName_mr || newVendorData.marketName || newVendorData.marketId,
      category: newVendorData.category,
      category_mr: newVendorData.category_mr || newVendorData.category,
      rating: 5.0,
      reviewCount: 0,
      specialties: newVendorData.specialties || 'Quality local street goods',
      specialties_mr: newVendorData.specialties_mr || 'स्थानिक गुणवत्तापूर्ण वस्तू',
      priceRange: newVendorData.priceRange || '₹30 - ₹150',
      svanidhiId: svanidhiId,
      fssaiGrade: 'NMC Green Vending Certified',
      fssaiGrade_mr: 'मनपा हरित फेरीवाला अधिकृत',
      upiId: `${newVendorData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@okupi`,
      dailyUpiAvg: '₹0 (New Registration)',
      lat: 21.1458 + (Math.random() - 0.5) * 0.02,
      lng: 79.0882 + (Math.random() - 0.5) * 0.02,
      address: newVendorData.address,
      address_mr: newVendorData.address_mr || newVendorData.address,
      isTopRated: false,
      image: newVendorData.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80'
    };

    vendors.unshift(vendorRecord);
    Storage.set(STORAGE_KEYS.VENDORS, vendors);
    return vendorRecord;
  },

  // 3. Citizen Reviews
  async getReviews(vendorId = null) {
    const reviews = Storage.get(STORAGE_KEYS.REVIEWS, DEFAULT_REVIEWS);
    if (vendorId) {
      return reviews.filter(r => r.vendorId === parseInt(vendorId, 10));
    }
    return reviews;
  },

  async submitReview(reviewData) {
    const reviews = Storage.get(STORAGE_KEYS.REVIEWS, DEFAULT_REVIEWS);
    const vendors = await this.getVendors();
    
    const newReview = {
      id: Date.now(),
      vendorId: parseInt(reviewData.vendorId, 10),
      vendorName: reviewData.vendorName || 'Verified Vendor',
      vendorName_mr: reviewData.vendorName_mr || reviewData.vendorName || 'प्रमाणित विक्रेता',
      reviewerName: reviewData.reviewerName,
      rating: parseInt(reviewData.rating, 10),
      tag: reviewData.tag || 'Service Excellence',
      tag_mr: reviewData.tag_mr || 'उत्कृष्ट सेवा',
      comment: reviewData.comment,
      comment_mr: reviewData.comment,
      date: 'Just now'
    };

    reviews.unshift(newReview);
    Storage.set(STORAGE_KEYS.REVIEWS, reviews);

    // Recalculate Vendor Rating
    const targetVendor = vendors.find(v => v.id === newReview.vendorId);
    if (targetVendor) {
      const vendorReviews = reviews.filter(r => r.vendorId === targetVendor.id);
      const totalStars = vendorReviews.reduce((sum, r) => sum + r.rating, 0);
      targetVendor.rating = parseFloat((totalStars / vendorReviews.length).toFixed(1));
      targetVendor.reviewCount = vendorReviews.length;
      Storage.set(STORAGE_KEYS.VENDORS, vendors);
    }

    return { review: newReview, updatedVendor: targetVendor };
  },

  // 4. Citizen Grievances / Complaints
  async getComplaints() {
    return Storage.get(STORAGE_KEYS.COMPLAINTS, DEFAULT_COMPLAINTS);
  },

  async getComplaintByTicket(ticketId) {
    const complaints = await this.getComplaints();
    return complaints.find(c => c.ticketId.trim().toUpperCase() === ticketId.trim().toUpperCase()) || null;
  },

  async submitComplaint(complaintData) {
    const complaints = await this.getComplaints();
    const ticketId = `NMC-LV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newComplaint = {
      ticketId: ticketId,
      citizenName: complaintData.citizenName,
      citizenPhone: complaintData.citizenPhone,
      marketId: complaintData.marketId,
      marketName: complaintData.marketName || complaintData.marketId,
      marketName_mr: complaintData.marketName_mr || complaintData.marketName || complaintData.marketId,
      vendorId: complaintData.vendorId ? parseInt(complaintData.vendorId, 10) : null,
      vendorName: complaintData.vendorName || 'General Market Zone',
      vendorName_mr: complaintData.vendorName_mr || complaintData.vendorName || 'सामान्य बाजार क्षेत्र',
      category: complaintData.category,
      category_mr: complaintData.category_mr || complaintData.category,
      description: complaintData.description,
      description_mr: complaintData.description,
      status: 'Pending',
      status_mr: 'प्रलंबित',
      date: 'Just now',
      assignedOfficer: `TVC Zone Desk (${complaintData.marketId})`
    };

    complaints.unshift(newComplaint);
    Storage.set(STORAGE_KEYS.COMPLAINTS, complaints);
    return newComplaint;
  },

  async updateComplaintStatus(ticketId, newStatus, resolutionNote = '') {
    const complaints = await this.getComplaints();
    const target = complaints.find(c => c.ticketId === ticketId);
    if (target) {
      target.status = newStatus;
      if (newStatus === 'Investigating') target.status_mr = 'तपास सुरू';
      else if (newStatus === 'Resolved') target.status_mr = 'निवारण झाले';
      else target.status_mr = 'प्रलंबित';

      if (resolutionNote) target.resolutionNote = resolutionNote;
      Storage.set(STORAGE_KEYS.COMPLAINTS, complaints);
    }
    return target;
  },

  // 5. Auth / Session Management
  getActiveSession() {
    return Storage.get(STORAGE_KEYS.ACTIVE_SESSION, null);
  },

  setActiveSession(session) {
    Storage.set(STORAGE_KEYS.ACTIVE_SESSION, session);
  },

  clearActiveSession() {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    } catch(e) {}
  },

  // 6. Language Preference
  getLanguage() {
    return Storage.get(STORAGE_KEYS.LANGUAGE, 'en'); // Default to English
  },

  setLanguage(lang) {
    Storage.set(STORAGE_KEYS.LANGUAGE, lang);
  }
};
