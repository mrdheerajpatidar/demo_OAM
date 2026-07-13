export interface Builder {
  id: string;
  name: string;
  logo: string;
  rating: number;
  projectsCount: number;
  experienceYears: number;
  description: string;
  featured: boolean;
}

export interface LocationInfo {
  id: string;
  name: string;
  image: string;
  propertiesCount: number;
  avgPricePerSqFt: string;
  description: string;
  growthRate: string;
}

export interface Project {
  id: string;
  name: string;
  price: string;
  priceMin: number;
  priceMax: number;
  location: string;
  builderId: string;
  builderName: string;
  type: 'Residential Plot' | 'Commercial Plot' | 'Apartment' | 'Villa' | 'Row House' | 'Penthouse' | 'Farm House' | 'Shop' | 'Office' | 'Showroom' | 'Warehouse' | 'Industrial Land' | 'Investment Property' | 'New Launch Projects';
  category: 'plot' | 'apartment' | 'commercial' | 'villa';
  area: string;
  areaSqFt: number;
  possession: string;
  possessionYear: number;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  roi: string;
  emi: string;
  nearby: {
    schools: string[];
    hospitals: string[];
    metro: string[];
  };
  featured?: boolean;
  trending?: boolean;
  hotDeal?: boolean;
  newLaunch?: boolean;

  // Category specific fields
  plotDetails?: {
    plotSize: string;
    facing: string;
    isCornerPlot: boolean;
    registryStatus: string;
    colonyApproval: string;
    roadWidth: string;
    hasWater: boolean;
    hasElectricity: boolean;
    nearbyDevelopment: string;
    appreciationPotential: string;
  };
  apartmentDetails?: {
    bhk: number[];
    towerName: string;
    maintenance: string;
    parkingCount: number;
    hasClubhouse: boolean;
    hasLift: boolean;
  };
  commercialDetails?: {
    frontage: string;
    footfall: string;
    suitableBusiness: string[];
    rentalYield: string;
    nearbyHubs: string[];
  };
  villaDetails?: {
    landArea: string;
    constructionArea: string;
    bedroomsCount: number;
    hasGarden: boolean;
    privateParking: boolean;
    isGated: boolean;
  };
}

export const builders: Builder[] = [
  { id: "b1", name: "Shalimar Group", logo: "SG", rating: 4.8, projectsCount: 15, experienceYears: 25, description: "Indore's leading builder of ultra-luxury apartments and commercial spaces with a legacy of structural brilliance.", featured: true },
  { id: "b2", name: "Sarthak Singapore Group", logo: "SS", rating: 4.6, projectsCount: 22, experienceYears: 18, description: "Famous for massive township projects and affordable high-quality colonies in Indore.", featured: true },
  { id: "b3", name: "Kalani Infrastructure", logo: "KI", rating: 4.7, projectsCount: 12, experienceYears: 30, description: "Pioneers in high-end structural excellence and premium residential gated societies.", featured: true },
  { id: "b4", name: "Skyline Developers", logo: "SD", rating: 4.5, projectsCount: 9, experienceYears: 12, description: "Modern builders focusing on smart-home automation and corporate commercial spaces.", featured: false },
  { id: "b5", name: "Apollo Realty", logo: "AR", rating: 4.7, projectsCount: 14, experienceYears: 20, description: "Premium builder specializing in integrated townships on the Bypass Road.", featured: true },
  { id: "b6", name: "Royal Developers Indore", logo: "RD", rating: 4.4, projectsCount: 8, experienceYears: 10, description: "Young and dynamic builder delivering premium row houses and penthouses.", featured: false },
  { id: "b7", name: "Omaxe Group Indore", logo: "OG", rating: 4.6, projectsCount: 18, experienceYears: 22, description: "Delivering massive micro-townships and premium plot schemes.", featured: false },
  { id: "b8", name: "Pinnacle Builders", logo: "PB", rating: 4.3, projectsCount: 6, experienceYears: 8, description: "Committed to delivering luxury vertical spaces inside Vijay Nagar.", featured: false },
  { id: "b9", name: "Silver Spring Associates", logo: "SA", rating: 4.8, projectsCount: 11, experienceYears: 24, description: "Creators of one of Indore's biggest flagship luxury townships.", featured: true },
  { id: "b10", name: "Milestone Infrastructure", logo: "MI", rating: 4.5, projectsCount: 7, experienceYears: 11, description: "Focuses on building robust, earthquake-resistant high-rise structures.", featured: false }
];

export const locations: LocationInfo[] = [
  { id: "loc1", name: "Super Corridor", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop", propertiesCount: 110, avgPricePerSqFt: "₹4,800 - ₹6,500", description: "The tech-gateway of Indore, close to TCS & Infosys.", growthRate: "+18.6% YoY" },
  { id: "loc2", name: "MR10", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop", propertiesCount: 75, avgPricePerSqFt: "₹6,000 - ₹7,800", description: "A major commercial corridor with swift metro access.", growthRate: "+14.2% YoY" },
  { id: "loc3", name: "Nipania", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop", propertiesCount: 95, avgPricePerSqFt: "₹7,200 - ₹9,500", description: "Indore's greenest and most premium residential zone.", growthRate: "+15.2% YoY" },
  { id: "loc4", name: "Vijay Nagar", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop", propertiesCount: 120, avgPricePerSqFt: "₹6,800 - ₹8,500", description: "The bustling lifestyle, retail, and commercial core of Indore.", growthRate: "+12.4% YoY" },
  { id: "loc5", name: "Bypass", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", propertiesCount: 80, avgPricePerSqFt: "₹5,500 - ₹7,800", description: "Luxury duplexes and gated township plots with scenic horizons.", growthRate: "+9.8% YoY" },
  { id: "loc6", name: "AB Road", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop", propertiesCount: 50, avgPricePerSqFt: "₹7,000 - ₹9,000", description: "Established arterial road linking major malls and complexes.", growthRate: "+11.0% YoY" },
  { id: "loc7", name: "Scheme 140", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop", propertiesCount: 45, avgPricePerSqFt: "₹6,200 - ₹8,000", description: "Premium developed residential sector inside eastern Indore.", growthRate: "+13.1% YoY" },
  { id: "loc8", name: "Scheme 78", image: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=800&auto=format&fit=crop", propertiesCount: 40, avgPricePerSqFt: "₹6,500 - ₹8,200", description: "Developed residential area next to major schools in Vijay Nagar.", growthRate: "+10.5% YoY" },
  { id: "loc9", name: "Mahalaxmi Nagar", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop", propertiesCount: 65, avgPricePerSqFt: "₹6,000 - ₹7,500", description: "Prime medical and residential zone next to Bombay Hospital.", growthRate: "+10.2% YoY" },
  { id: "loc10", name: "Bengali Square", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop", propertiesCount: 38, avgPricePerSqFt: "₹5,800 - ₹7,200", description: "Vibrant junction connectivity in eastern Indore.", growthRate: "+9.2% YoY" },
  { id: "loc11", name: "Rau", image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop", propertiesCount: 55, avgPricePerSqFt: "₹4,200 - ₹5,800", description: "Rapidly expanding residential zone near Pithampur SEZ.", growthRate: "+14.8% YoY" },
  { id: "loc12", name: "Ujjain Road", image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=800&auto=format&fit=crop", propertiesCount: 60, avgPricePerSqFt: "₹3,800 - ₹5,200", description: "High-growth plot corridor close to the holy city of Ujjain.", growthRate: "+17.5% YoY" },
  { id: "loc13", name: "Kanadia", image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop", propertiesCount: 42, avgPricePerSqFt: "₹5,200 - ₹6,800", description: "Green residential zones showing strong appreciation potential.", growthRate: "+11.5% YoY" },
  { id: "loc14", name: "Talawali Chanda", image: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=800&auto=format&fit=crop", propertiesCount: 30, avgPricePerSqFt: "₹4,500 - ₹6,000", description: "North-corridor township extension near AB Road.", growthRate: "+12.0% YoY" },
  { id: "loc15", name: "Dewas Naka", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop", propertiesCount: 48, avgPricePerSqFt: "₹5,000 - ₹6,800", description: "The industrial warehousing hub of Indore.", growthRate: "+13.5% YoY" }
];

export const testimonials = [
  { id: "t1", name: "Ramesh Aggarwal", role: "Retired Businessman", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop", rating: 5, comment: "Evaluating and buying our plot at Bypass Greens was incredibly easy. OAM's side-by-side comparison screen gave us clear details that brokers usually hide. Highly professional platform!", projectName: "Bypass Greens Scheme" },
  { id: "t2", name: "Anjali Sharma", role: "Senior HR Manager at TCS", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop", rating: 5, comment: "I used OAM to search for premium apartments close to the Super Corridor. Their filters are extremely modern. The direct site visit scheduling via WhatsApp saved me days.", projectName: "Singapore Heights" },
  { id: "t3", name: "Vikram Adityaraj", role: "Real Estate Investor", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop", rating: 5, comment: "I have bought 3 commercial showrooms through OAM in Indore. Their data about ROI trends, project clearances, and location growth rate is exceptionally precise.", projectName: "Shalimar Business Hub" },
  { id: "t4", name: "Pooja Deshmukh", role: "Tech Lead at Infosys", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop", rating: 4, comment: "As a young professional, navigating home loans was scary. OAM's integrated loan assistance eligibility tools and partner bank rates made it clear. Bought my first home seamlessly.", projectName: "Skyline Smart Residency" },
  { id: "t5", name: "Divyansh Mehta", role: "Co-Founder, Indore WebTech", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop", rating: 5, comment: "The comparison dashboard of OAM is on par with the global standards of Stripe or Apple. No lag, high readability, beautiful spacing.", projectName: "Milestone Heights" },
  { id: "t6", name: "Sanjay Pathak", role: "MD, Pathak Logistics", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop", rating: 5, comment: "OAM helped us secure our warehouse in Dewas Naka. Their support staff accompanied us for actual checks and helped us get home loan approval within a week.", projectName: "Dewas Naka Logistic Hub" }
];

export const faqs = [
  { id: "f1", question: "What is Online Awas Mela (OAM) and how is it different from normal listing portals?", answer: "Unlike traditional property listing sites that serve as classified boards, OAM is Indore's trusted primary real estate sales platform. We partner directly with developers, curate only premium verified projects, provide unbiased mathematical comparison dashboards, and assist users from smart filtering to site visits and home loan approvals.", category: "general" },
  { id: "f2", question: "How does the OAM Project Comparison tool work?", answer: "Our comparison engine allows you to choose up to 3 properties and view them side-by-side on variables like average RERA cost, actual square footage, builder rating, security layers, expected annual ROI, and starting bank EMIs.", category: "general" },
  { id: "f3", question: "Does OAM charge buyers a commission for home purchases?", answer: "No! OAM does not charge any search fee or brokerage commission to home buyers. We get flat marketing commissions directly from our partner builders for managing sales logistics.", category: "general" },
  { id: "f4", question: "How does OAM assist with Home Loans?", answer: "OAM is tied up with over 50+ public and private banking institutions (including SBI, HDFC, ICICI, Axis, etc.). We offer a built-in EMI calculator, evaluate your eligibility criteria, collect documentation digitally, and expedite loan approvals.", category: "loan" },
  { id: "f5", question: "What is the average home loan interest rate available on OAM?", answer: "Our partner banks offer premium rates starting as low as 8.4% p.a., depending on your credit score, employment records, and the selected property clearance status.", category: "loan" },
  { id: "f6", question: "How can builders partner with OAM to showcase their premium projects?", answer: "Builders can apply via our Builder Partnership page. OAM provides complete marketing funnels, dedicated digital lead dashboards, site-visit shuttle coordination, and home-loan approvals for their projects.", category: "builder" },
  { id: "f7", question: "What compliance measures does OAM enforce for listed builders?", answer: "We mandate that all listed projects possess active RERA registration numbers, clear title reports, environment permissions, local municipal corporation sanctions, and sound structural health scoring audits.", category: "builder" },
  { id: "f8", question: "Are site visits arranged by OAM free?", answer: "Yes, we arrange completely free premium site-visits including comfortable transportation from your residence, guided tours, and meetings with financial experts on site.", category: "general" }
];

export const blogs = [
  { id: "b1", title: "Why Super Corridor is Indore's Next IT & Real Estate Hotspot", excerpt: "With corporate giants TCS and Infosys expanding operations, Super Corridor is witnessing massive capital growth.", date: "July 10, 2026", readTime: "5 min read", category: "Investment Guide", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop", author: { name: "Dhiraj Mehta", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=50&auto=format&fit=crop" } },
  { id: "b2", title: "Understanding RERA Norms Before Buying Property in MP", excerpt: "A comprehensive breakdown of how RERA protect property buyers in Madhya Pradesh. Learn how to verify certificates.", date: "June 28, 2026", readTime: "7 min read", category: "Legal Compliance", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop", author: { name: "Adv. Sneha Pathak", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=50&auto=format&fit=crop" } },
  { id: "b3", title: "The Ultimate Guide to Selecting Between Villas and Apartments", excerpt: "Villas offer private spaces while apartments come with structural maintenance benefits and security systems.", date: "June 15, 2026", readTime: "4 min read", category: "Property Selection", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop", author: { name: "Kabir Dev", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=50&auto=format&fit=crop" } },
  { id: "b4", title: "How Indore's Upcoming Metro Will Impact Property Pricing", excerpt: "Analyze the pricing surge across corridor routes. We map out MR-10, Radisson Square, and Super Corridor station areas.", date: "June 02, 2026", readTime: "6 min read", category: "Infrastructure Analysis", image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=600&auto=format&fit=crop", author: { name: "Dhiraj Mehta", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=50&auto=format&fit=crop" } },
  { id: "b5", title: "5 Tips to Improve Your Home Loan Eligibility Instantly", excerpt: "From lowering credit utilization ratios to consolidating existing debts, here are top actionable tips.", date: "May 20, 2026", readTime: "4 min read", category: "Home Loans", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop", author: { name: "Amit Varma", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=50&auto=format&fit=crop" } }
];

// Helper to generate the 53 premium Indore properties programmatically to guarantee realistic diversity
function generateProperties(): Project[] {
  const list: Project[] = [];
  const locationNames = locations.map(l => l.name);
  const builderIds = builders.map(b => b.id);
  const builderNames = builders.map(b => b.name);

  // Unsplash Premium Property Images
  const images = {
    apartment: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=600&auto=format&fit=crop"
    ],
    plot: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop"
    ],
    commercial: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=600&auto=format&fit=crop"
    ],
    villa: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=600&auto=format&fit=crop"
    ]
  };

  // 1. Generate 15 Residential Projects (Apartment, Penthouse, Row House, Investment, New Launch)
  const resTypes: Array<'Apartment' | 'Penthouse' | 'Row House' | 'Investment' | 'New Launch'> = ['Apartment', 'Penthouse', 'Row House', 'Apartment', 'Penthouse'];
  for (let i = 1; i <= 15; i++) {
    const loc = locationNames[(i - 1) % locationNames.length];
    const builderIdx = (i - 1) % builderIds.length;
    const builderId = builderIds[builderIdx];
    const builderName = builderNames[builderIdx];
    
    let typeVal: Project['type'] = 'Apartment';
    if (i % 5 === 1) typeVal = 'Apartment';
    else if (i % 5 === 2) typeVal = 'Penthouse';
    else if (i % 5 === 3) typeVal = 'Row House';
    else if (i % 5 === 4) typeVal = 'Investment Property';
    else typeVal = 'New Launch Projects';

    const basePriceMin = 4500000 + (i * 800000);
    const basePriceMax = basePriceMin + 5000000 + (i * 300000);

    list.push({
      id: `res-${i}`,
      name: `${builderName.split(" ")[0]} ${['Elite', 'Heights', 'Residency', 'Meadows', 'Grandeur', 'Palace', 'Crown', 'Nest', 'Pride', 'Enclave'][i % 10]}`,
      price: `₹${(basePriceMin / 100000).toFixed(0)} Lakhs - ₹${(basePriceMax / 10000000).toFixed(2)} Cr`,
      priceMin: basePriceMin,
      priceMax: basePriceMax,
      location: loc,
      builderId,
      builderName,
      type: typeVal,
      category: 'apartment',
      area: `${1100 + (i * 80)} - ${2200 + (i * 120)} sq ft`,
      areaSqFt: 1450 + (i * 90),
      possession: i % 3 === 0 ? "Ready to Move" : i % 3 === 1 ? "Dec 2026" : "June 2027",
      possessionYear: i % 3 === 0 ? 2024 : i % 3 === 1 ? 2026 : 2027,
      image: images.apartment[(i - 1) % images.apartment.length],
      gallery: [
        images.apartment[(i - 1) % images.apartment.length],
        images.villa[i % images.villa.length],
        images.commercial[i % images.commercial.length]
      ],
      description: `Experience luxury residential living at this premium development by ${builderName} located in the prime locality of ${loc}, Indore. Built using high-end materials, seismic standards, and loaded with clubhouse spaces.`,
      amenities: ["Swimming Pool", "Clubhouse", "Gym", "24/7 Security", "EV Charging Station", "Jogging Track", "Power Backup", "Clubhouse", "Lift"],
      roi: `${(7.0 + (i * 0.2)).toFixed(1)}%`,
      emi: `₹${Math.round(basePriceMin * 0.0055).toLocaleString('en-IN')}/mo`,
      nearby: {
        schools: [`Delhi Public School (${loc})`, "Emerald Heights School"],
        hospitals: ["Care CHL Hospital", "Bombay Hospital Branch"],
        metro: [`${loc} Metro Junction (500m)`]
      },
      featured: i % 3 === 0,
      trending: i % 4 === 1,
      hotDeal: i % 5 === 2,
      newLaunch: typeVal === 'New Launch Projects' || i % 6 === 3,
      apartmentDetails: {
        bhk: i % 4 === 0 ? [1, 2] : i % 4 === 1 ? [2, 3] : [3, 4],
        towerName: `Tower ${String.fromCharCode(65 + (i % 4))}`,
        maintenance: `₹${2000 + (i * 150)}/mo`,
        parkingCount: i % 3 === 0 ? 1 : 2,
        hasClubhouse: true,
        hasLift: true
      }
    });
  }

  // 2. Generate 20 Plot Schemes (Residential Plot, Commercial Plot, Industrial Land)
  const plotTypes: Array<'Residential Plot' | 'Commercial Plot' | 'Industrial Land'> = ['Residential Plot', 'Commercial Plot', 'Industrial Land'];
  for (let i = 1; i <= 20; i++) {
    const loc = locationNames[(i + 2) % locationNames.length];
    const builderIdx = (i + 1) % builderIds.length;
    const builderId = builderIds[builderIdx];
    const builderName = builderNames[builderIdx];

    let typeVal: Project['type'] = 'Residential Plot';
    if (i % 3 === 1) typeVal = 'Residential Plot';
    else if (i % 3 === 2) typeVal = 'Commercial Plot';
    else typeVal = 'Industrial Land';

    const basePriceMin = 2500000 + (i * 400000);
    const basePriceMax = basePriceMin + 3000000 + (i * 100000);

    list.push({
      id: `plot-${i}`,
      name: `${builderName.split(" ")[0]} ${['Greens', 'Oasis', 'Park', 'Meadows', 'Acreage', 'Landmark', 'County', 'Springs', 'Empire', 'Royal'][i % 10]} Plot Scheme`,
      price: `₹${(basePriceMin / 100000).toFixed(0)} Lakhs - ₹${(basePriceMax / 100000).toFixed(0)} Lakhs`,
      priceMin: basePriceMin,
      priceMax: basePriceMax,
      location: loc,
      builderId,
      builderName,
      type: typeVal,
      category: 'plot',
      area: `${1000 + (i * 50)} - ${3000 + (i * 100)} sq ft`,
      areaSqFt: 1500 + (i * 80),
      possession: "Ready to Construct",
      possessionYear: 2024,
      image: images.plot[(i - 1) % images.plot.length],
      gallery: [
        images.plot[(i - 1) % images.plot.length],
        images.plot[i % images.plot.length]
      ],
      description: `Premium gated plot township inside ${loc}, Indore. Build your custom structural duplex inside a fully secured layout with paved roads, solar lighting and pipeline structures.`,
      amenities: ["Gated Community", "Underground Cabling", "24/7 Security", "Lush Parks", "Solar Streetlights", "Water Connection"],
      roi: `${(11.0 + (i * 0.15)).toFixed(1)}%`,
      emi: `₹${Math.round(basePriceMin * 0.0055).toLocaleString('en-IN')}/mo`,
      nearby: {
        schools: [`Standard Public School (${loc})`],
        hospitals: ["Index Medical College & Hospital"],
        metro: [`Upcoming Metro Route MR-10 Corridor (1.2km)`]
      },
      featured: i % 4 === 0,
      trending: i % 5 === 1,
      hotDeal: i % 6 === 2,
      newLaunch: i % 7 === 3,
      plotDetails: {
        plotSize: `${1000 + (i * 50)} sq ft`,
        facing: ["East", "West", "North", "South", "North-East", "South-West"][i % 6],
        isCornerPlot: i % 4 === 0,
        registryStatus: "Registered / Freehold",
        colonyApproval: "T&CP Approved & RERA Registered",
        roadWidth: `${30 + (i % 3) * 10} Feet`,
        hasWater: true,
        hasElectricity: true,
        nearbyDevelopment: `${loc} IT Corridor and Super Corridor highway expansion.`,
        appreciationPotential: `${(12 + (i % 5)).toFixed(0)}% annually projected`
      }
    });
  }

  // 3. Generate 10 Commercial Projects (Shop, Office, Showroom, Warehouse)
  const commTypes: Array<'Shop' | 'Office' | 'Showroom' | 'Warehouse'> = ['Shop', 'Office', 'Showroom', 'Warehouse'];
  for (let i = 1; i <= 10; i++) {
    const loc = locationNames[(i + 4) % locationNames.length];
    const builderIdx = (i + 3) % builderIds.length;
    const builderId = builderIds[builderIdx];
    const builderName = builderNames[builderIdx];

    let typeVal: Project['type'] = 'Office';
    if (i % 4 === 1) typeVal = 'Shop';
    else if (i % 4 === 2) typeVal = 'Office';
    else if (i % 4 === 3) typeVal = 'Showroom';
    else typeVal = 'Warehouse';

    const basePriceMin = 5000000 + (i * 1200000);
    const basePriceMax = basePriceMin + 8000000 + (i * 400000);

    list.push({
      id: `comm-${i}`,
      name: `${builderName.split(" ")[0]} ${['Trade Center', 'Business Hub', 'Capital Plaza', 'Commercial Tower', 'Logistics Park', 'Corporate Suites', 'Retail Arcade', 'Infotech Park', 'Grand Plaza', 'Square'][i % 10]}`,
      price: `₹${(basePriceMin / 100000).toFixed(0)} Lakhs - ₹${(basePriceMax / 10000000).toFixed(2)} Cr`,
      priceMin: basePriceMin,
      priceMax: basePriceMax,
      location: loc,
      builderId,
      builderName,
      type: typeVal,
      category: 'commercial',
      area: `${800 + (i * 150)} - ${4000 + (i * 400)} sq ft`,
      areaSqFt: 1200 + (i * 250),
      possession: i % 2 === 0 ? "Ready to Move" : "Dec 2026",
      possessionYear: i % 2 === 0 ? 2024 : 2026,
      image: images.commercial[(i - 1) % images.commercial.length],
      gallery: [
        images.commercial[(i - 1) % images.commercial.length],
        images.commercial[i % images.commercial.length]
      ],
      description: `State of the art commercial complex inside ${loc}, Indore. Excellent frontage, high-speed capsule lifts, centralized AC provisions and expansive multi-level car parking.`,
      amenities: ["Central AC", "Multi-level Parking", "Capsule Lifts", "24/7 Power Backup", "Fiber Optic Connect", "Fire Safety Grids"],
      roi: `${(9.5 + (i * 0.15)).toFixed(1)}%`,
      emi: `₹${Math.round(basePriceMin * 0.0055).toLocaleString('en-IN')}/mo`,
      nearby: {
        schools: [],
        hospitals: ["Medanta Superspecialty Hospital"],
        metro: [`Radisson Square Metro Hub (400m)`]
      },
      featured: i % 2 === 0,
      trending: i % 3 === 1,
      hotDeal: i % 4 === 2,
      newLaunch: i % 5 === 3,
      commercialDetails: {
        frontage: `${20 + (i % 3) * 10} Feet Main Road facing`,
        footfall: ["High Footfall Junction", "Medium Footfall Professional Area", "Premium corporate corridor"][i % 3],
        suitableBusiness: [["IT Office", "Consultancy", "Co-working Space"], ["Clothing Showroom", "Jeweler Store", "Electronics"], ["Courier Office", "Industrial Warehouse", "Logistic Sorting"]][i % 3],
        rentalYield: `${(6.2 + (i * 0.2)).toFixed(1)}% expected`,
        nearbyHubs: [`${loc} main commercial square`, "AB Road corporate zone"]
      }
    });
  }

  // 4. Generate 8 Villas & Farm Houses
  for (let i = 1; i <= 8; i++) {
    const loc = locationNames[(i + 6) % locationNames.length];
    const builderIdx = (i + 5) % builderIds.length;
    const builderId = builderIds[builderIdx];
    const builderName = builderNames[builderIdx];

    const typeVal: Project['type'] = i % 2 === 0 ? 'Villa' : 'Farm House';

    const basePriceMin = 12000000 + (i * 2000000);
    const basePriceMax = basePriceMin + 15000000 + (i * 500000);

    list.push({
      id: `villa-${i}`,
      name: `${builderName.split(" ")[0]} ${['Grandeur Villas', 'Green Pastures Farm', 'Royal Duplexes', 'Meadow Retreat', 'Signature Duplex', 'Pristine Farms', 'Elite Gated Villas', 'Serene Valley'][i - 1]}`,
      price: `₹${(basePriceMin / 10000000).toFixed(2)} Cr - ₹${(basePriceMax / 10000000).toFixed(2)} Cr`,
      priceMin: basePriceMin,
      priceMax: basePriceMax,
      location: loc,
      builderId,
      builderName,
      type: typeVal,
      category: 'villa',
      area: `${2500 + (i * 300)} - ${5500 + (i * 500)} sq ft`,
      areaSqFt: 3200 + (i * 400),
      possession: i % 2 === 0 ? "Ready to Move" : "June 2027",
      possessionYear: i % 2 === 0 ? 2024 : 2027,
      image: images.villa[(i - 1) % images.villa.length],
      gallery: [
        images.villa[(i - 1) % images.villa.length],
        images.villa[i % images.villa.length]
      ],
      description: `Ultra luxury premium gated villas in ${loc}, Indore. Sprawling construction, independent private lawn garden spaces, modular kitchens and preloaded central smart-home controls.`,
      amenities: ["Swimming Pool", "Private Garden", "Clubhouse", "Gated Security", "Gym", "Private Parking", "Home Automation"],
      roi: `${(8.0 + (i * 0.1)).toFixed(1)}%`,
      emi: `₹${Math.round(basePriceMin * 0.0055).toLocaleString('en-IN')}/mo`,
      nearby: {
        schools: ["The Shishukunj International School"],
        hospitals: ["Apollo Hospitals Indore"],
        metro: [`Radisson Square Metro Station (2.5km)`]
      },
      featured: i % 2 === 0,
      trending: i % 3 === 1,
      hotDeal: i % 4 === 2,
      newLaunch: i % 5 === 3,
      villaDetails: {
        landArea: `${3000 + (i * 500)} sq ft`,
        constructionArea: `${2500 + (i * 350)} sq ft`,
        bedroomsCount: 3 + (i % 3),
        hasGarden: true,
        privateParking: true,
        isGated: true
      }
    });
  }

  return list;
}

export const projects = generateProperties();
