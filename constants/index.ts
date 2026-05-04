export const NavbarComponents = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About Us", link: "/About" },
  { id: 3, name: "Services", link: "/Services" },
  { id: 4, name: "Portfolio", link: "/Portfolio" },
  { id: 5, name: "Blog", link: "/Blog" },
  { id: 6, name: "Partners", link: "/Partners" },
  { id: 7, name: "Contact Us", link: "/Contact" },
];

export interface HeroFooterItem {
  id: number;
  name: string;
  amount: number;
}

export const defaultHeroFooter: HeroFooterItem[] = [
  { id: 1, name: "Years Experience", amount: 10 },
  { id: 2, name: "Projects Done", amount: 50 },
  { id: 3, name: "Happy Clients", amount: 20 },
];

export const defaultServices = [
  {
    id: 1,
    icon: "lucide:globe",
    title: "AI-Powered Web Development",
    description:
      "We build intelligent websites and web apps with AI-driven personalization, smart search, automated content, and real-time analytics baked in from day one.",
  },
  {
    id: 2,
    icon: "lucide:layout-dashboard",
    title: "Intelligent System Development",
    description:
      "Custom ERP and business systems enhanced with AI automation — predictive reporting, smart workflows, and decision-support dashboards that learn from your data.",
  },
  {
    id: 3,
    icon: "lucide:smartphone",
    title: "AI Mobile App Development",
    description:
      "Mobile applications with embedded AI features — smart recommendations, voice interfaces, predictive UX, and real-time intelligence that elevates user experience.",
  },
  {
    id: 4,
    icon: "lucide:network",
    title: "Smart Network Design",
    description:
      "AI-monitored LAN, WAN and Wi-Fi infrastructure with intelligent traffic management, anomaly detection, and automated optimization for hotels, offices and institutions.",
  },
  {
    id: 5,
    icon: "lucide:building-2",
    title: "AI Hotel Management System",
    description:
      "HMS solutions with AI-powered occupancy forecasting, automated guest communication, smart pricing, and operational intelligence for hotels of every size.",
  },
  {
    id: 6,
    icon: "lucide:cctv",
    title: "AI CCTV Surveillance",
    description:
      "Enterprise CCTV with AI-powered motion detection, facial recognition, behavioral analytics, and real-time alert systems — far beyond passive recording.",
  },
  {
    id: 7,
    icon: "lucide:lock-keyhole",
    title: "Smart Access Control",
    description:
      "AI-integrated digital door lock systems with access pattern analytics, anomaly alerts, and seamless integration with hotel operations and security platforms.",
  },
  {
    id: 8,
    icon: "lucide:cpu",
    title: "AI Automation & Custom Software",
    description:
      "Intelligent automation systems that eliminate repetitive work — AI-driven inventory management, reporting, scheduling, and business process optimization.",
  },
  {
    id: 9,
    icon: "lucide:shield-check",
    title: "IT Support & AI Monitoring",
    description:
      "Proactive IT support powered by AI monitoring — predictive maintenance, automated incident detection, and intelligent troubleshooting before issues impact your business.",
  },
  {
    id: 10,
    icon: "lucide:lightbulb",
    title: "AI Strategy & Tech Consulting",
    description:
      "Expert AI adoption roadmaps, digital transformation strategy, and technology audits — helping Ethiopian businesses leverage AI to compete at a global level.",
  },
];

export const defaultPortfolios = [
  {
    id: 1,
    link: "https://hotel-display-swart.vercel.app/",
    title: "Hotel Display",
    description:
      "Bereket International Hotels' Hotel Display Website is one of our Great and exceptional project that we also as a company experienced a new way of thinking and problem solving skill.",
    type: "Website",
    duration: 7,
  },
  {
    id: 2,
    link: "https://hotcol.vercel.app/",
    title: "HotCol",
    description:
      "HotCol is a hotel management system designed for enhancing digital working enviroments for Hotels and Cafes with Greater level Detail-Oriented and stanning way of reporting and analytics.",
    type: "Digital System(SaaS)",
    duration: 20,
    version: 1,
    special: true,
    image: "/assets/hotcol.png",
  },
  {
    id: 3,
    title: "GebreSadik Hotel & Spa",
    description:
      "With Our one giant Client GebreSadik Hotel & Spa We delivered a bunch of Services that Incorporates CCTV Camera, Digital Lock Configuration(Degi digital lock) and also Network Setups.",
    type: "Hotel and Hospitality Technology",
    duration: 15,
  },
  {
    id: 4,
    title: "Victory Hotel",
    description:
      "Awesome Digital Door Lock System Installation and Configuration for our great client Victory Hotel, Hossana with modern and reliable technologies that escalate Victory to the true form of victory.",
    type: "Hotel and Hospitality Technology",
    duration: 7,
  },
  {
    id: 5,
    title: "Tinsea Hotel(G+4)",
    description:
      "Here is one our clients with an outstanding performance by the service delivered from us which is an impressive 16-Channel NVR CCTV Camera System Installation and Configuration and Full Wi-Fi design and Installation.",
    type: "Hotel and Hospitality Technology",
    duration: 7,
  },
  {
    id: 6,
    title: "Shuferoch Hotel",
    description:
      "For Shuferoch Hotel, we installed a 16-channel NVR CCTV system and delivered a complete Wi-Fi network solution, and we continue to support their operations.",
    type: "Hotel and Hospitality Technology",
    duration: 7,
  },
  {
    id: 7,
    title: "Alem Hotel",
    description:
      "Alem Hotel trusted us for a HikVision 32-channel NVR CCTV installation, and we remain committed to delivering ongoing value as their technology partner.",
    type: "Hotel and Hospitality Technology",
    duration: 7,
  },
  {
    id: 8,
    title: "Sono Hotel",
    description:
      "Sono Hotel received a 16-channel NVR CCTV installation plus a full Wi-Fi design and setup, and we provided support for their future needs.",
    type: "Hotel and Hospitality Technology",
    duration: 7,
  },
  {
    id: 9,
    title: "Handakina Cafe and Pension",
    description:
      "Handakina Cafe and Pension brought us in for a HikVision 4-channel DVR installation, and we completed the project successfully with a very satisfied client.",
    type: "Hotel and Hospitality Technology",
    duration: 3,
  },
  {
    id: 10,
    title: "Boez Cafe and Restaurant",
    description:
      "Boez Cafe and Restaurant engaged us for a 4-channel NVR CCTV installation, which we delivered successfully and left the client pleased.",
    type: "Hotel and Hospitality Technology",
    duration: 2,
  },
  {
    id: 11,
    title: "Ela Resort",
    description:
      "Ela Resort contracted us for a digital door lock system and shared network integration, and we delivered a robust solution to meet their needs.",
    type: "Hotel and Hospitality Technology",
    duration: 2,
  },
  {
    id: 12,
    title: "Ilitro Hotel",
    description:
      "Ilitro Hotel engaged our team for digital access control and shared network resources, and we completed the installation to the client's satisfaction.",
    type: "Hotel and Hospitality Technology",
    duration: 2,
  },
  {
    id: 13,
    title: "Hiwot Hospital",
    description:
      "Hiwot Hospital chose us for network design and implementation supporting their Hospital Management System (HMS), and we delivered a secure, reliable solution.",
    type: "Network and Wi-Fi Infrastructure Projects",
    duration: 2,
  },
  {
    id: 14,
    title: "Central Ethiopia President's Home",
    description:
      "We implemented a secure wireless network at the Central Ethiopia President's Home and completed the installation with precision.",
    type: "Network and Wi-Fi Infrastructure Projects",
    special: true,
    duration: 2,
  },
  {
    id: 15,
    title: "Central Ethiopia Region Plan & Design Office",
    description:
      "For the Central Ethiopia Region Plan & Design Office, we expanded Wi-Fi coverage and upgraded infrastructure with a successful rollout.",
    type: "Network and Wi-Fi Infrastructure Projects",
    special: true,
    duration: 3,
  },
  {
    id: 16,
    title: "Lechigogo Preparatory Schools",
    description:
      "Lechigogo Preparatory Schools relied on us for LAN design and installation, and we delivered the project on schedule.",
    type: "Network and Wi-Fi Infrastructure Projects",
    duration: 7,
  },
  {
    id: 17,
    title: "Tesdika Pension(G+3)",
    description:
      "Tesdika Pension asked us to install structured cabling and expand Wi-Fi coverage, and we carried out the upgrade successfully.",
    type: "Network and Wi-Fi Infrastructure Projects",
    duration: 2,
  },
  {
    id: 18,
    title: "Dani Pension(G+4)",
    description:
      "Dani Pension engaged us for a full wireless network deployment, and we completed the installation with excellent results.",
    type: "Network and Wi-Fi Infrastructure Projects",
    duration: 2,
  },
  {
    id: 19,
    title: "Shallom Pension(G+4)",
    description:
      "Shallom Pension hired us for network design and installation, and we finished the project successfully with a satisfied client.",
    type: "Network and Wi-Fi Infrastructure Projects",
    duration: 2,
  },
  {
    id: 20,
    title: "Lopiso Cafe & Pension(G+3)",
    description:
      "Lopiso Cafe & Pension received a complete end-to-end network and Wi-Fi setup from our team, which we delivered successfully.",
    type: "Network and Wi-Fi Infrastructure Projects",
    duration: 2,
  },
  {
    id: 21,
    title: "Asham Hotel",
    description:
      "Asham Hotel engaged us for wireless network installation, and we completed the work successfully with a happy client.",
    type: "Network and Wi-Fi Infrastructure Projects",
    duration: 1,
  },
];

export const defaultBlogs = [
  // ── Ethiopian Tech & Digital News ──────────────────────────
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    title: "Ethiopia's Digital Economy Strategy: How the Country Is Leaping Into the AI Era",
    description:
      "Ethiopia's government has launched an ambitious Digital Economy Strategy targeting 50% internet penetration by 2030. With investments in fiber infrastructure, AI education, and tech hubs in Addis Ababa and regional cities, the country is positioning itself as East Africa's next digital powerhouse.",
    source: "Addis Fortune",
    date: "2024-11-08",
    link: "https://addisfortune.com",
    category: "Ethiopia",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    title: "Ethiopian Startups Raise Record Funding as Fintech and AgriTech Lead the Charge",
    description:
      "Ethiopian tech startups secured over $120M in funding, with fintech platforms like Telebirr expanding to 40M+ users and AgriTech solutions transforming smallholder farming. The ecosystem is maturing fast — and AI is at the center of every breakthrough.",
    source: "Disrupt Africa",
    date: "2024-09-14",
    link: "https://disrupt-africa.com",
    category: "Ethiopia",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
    title: "Hotel Technology Revolution: How Ethiopian Hospitality Is Going Digital",
    description:
      "From Addis Ababa's five-star hotels to regional lodges in Hossana and Hawassa, Ethiopian hospitality businesses are adopting smart HMS platforms, AI-powered guest management, and integrated CCTV systems — transforming the guest experience and operational efficiency.",
    source: "Ethiopian Business Review",
    date: "2024-07-22",
    link: "https://ethiopianbusinessreview.net",
    category: "Ethiopia",
  },
  // ── Global Digital & AI News ────────────────────────────────
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    title: "The Age of Agentic AI: How Autonomous AI Systems Are Reshaping Enterprise Software",
    description:
      "Agentic AI — systems that plan, reason, and act autonomously — is moving from research labs into production. From automated code generation to self-healing infrastructure, enterprises are deploying AI agents that work 24/7 without human intervention. Here's what it means for your business.",
    source: "MIT Technology Review",
    date: "2024-12-03",
    link: "https://technologyreview.com",
    category: "Global",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    title: "Smart Buildings & AI Networks: The Infrastructure Powering the Next Decade",
    description:
      "AI-managed networks are no longer a luxury — they're a necessity. From predictive bandwidth allocation to zero-trust security architectures, intelligent network infrastructure is becoming the backbone of every modern hotel, hospital, and enterprise.",
    source: "Network World",
    date: "2024-10-17",
    link: "https://networkworld.com",
    category: "Global",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    title: "AI in Surveillance: Computer Vision Is Transforming Security Systems Worldwide",
    description:
      "Modern CCTV is no longer passive recording. AI-powered computer vision now enables real-time threat detection, crowd analytics, license plate recognition, and behavioral anomaly alerts. The global smart surveillance market is projected to hit $75B by 2028 — and Africa is catching up fast.",
    source: "TechCrunch",
    date: "2024-08-29",
    link: "https://techcrunch.com",
    category: "Global",
  },
];

export const defaultTestimonials = [
  {
    id: 1,
    name: "Mr. Abraham",
    profession: "Gebresadik Hotel Manager",
    image: "/assets/testimonial-1.jpg",
    content:
      "Working with ApexSolution is easy. Their technical support aligns with project timelines and never becomes a bottleneck.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mr. Ejge",
    profession: "Human Resource Manager & Room Division Manager",
    image: "/assets/testimonial-3.jpg",
    content:
      "Downtime costs money. ApexSolution minimizes it. Their technical support is efficient, well-documented, and trustworthy.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mr. Bekele",
    profession: "Bereket International Hotel Manager",
    image: "/assets/testimonial-2.jpg",
    content:
      "Their Tech Support ensures our systems run smoothly 24/7. Issues are solved quickly, even during peak hours.",
    rating: 5,
  },
];

export const defaultPartners = [
  {
    id: 1,
    image: "/assets/partner-1.jpg",
    title: "Abo-tech",
    description:
      "Abo-tech is a networking and telecommunication company and distributer which had a great role in accomplishing many IT and Networking Projects",
  },
  {
    id: 2,
    image: "/assets/partner-2.PNG",
    title: "Ahadu Hospitality",
    description:
      "Ahadu Hospitality is a Hospitality company and which had a great experience in expressing and defining hospitality as a service.",
  },
  {
    id: 3,
    image: "/assets/strivein.jpg",
    title: "StriveIn",
    description:
      "StriveIn is a software company which we share with them many backstories and victories. Our Friendship with them will be a long lasting one.",
  },
];

export const defaultTeamMembers = [
  {
    id: 1,
    image: "/assets/ceo.jpg",
    name: "Atlabachew Tadese",
    position: "CoFounder & CEO",
    title: "The Founder",
    description: "Leader of Greatness and Success",
    facebook:
      "https://web.facebook.com/atlabachwu.tadesse?rdid=ifJ8ODEsgk9GGUyS&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F18aQKFHDHV%2F%3F_rdc%3D1%26_rdr#",
    instagram: "https://www.instagram.com/atlawu_/",
    linkedin: "https://www.linkedin.com/in/atile-networkengineer/",
    telegram: "https://t.me/Yodahe_Enat",
    portfolio: "https://5d9a0d16.mydala.app/",
  },
  {
    id: 2,
    image: "/assets/cto.jpg",
    name: "Abdurehman Ali",
    position: "CoFounder & CTO",
    title: "The Invincible",
    description: "Source of Hard working and Passion",
    facebook: "https://github.com/abdurehmanali611",
    instagram: "https://www.instagram.com/abdurehman6252/",
    linkedin: "https://www.linkedin.com/in/abdurehman-ali-592238281/",
    telegram: "https://t.me/AbduWolf",
    portfolio: "https://apex-abdu-portfolio.vercel.app",
  },
  {
    id: 3,
    image: "/teddy.jpg",
    name: "Tewodros Million",
    position: "Technical Project Manager & AI Solutions Lead",
    title: "The Architect",
    description: "Bridging strategy and execution through AI-driven solutions and precision project delivery.",
    facebook: "https://www.facebook.com/tewodros.million",
    instagram: "https://www.instagram.com/tewodros.million",
    linkedin: "https://www.linkedin.com/in/tewodros-million",
    telegram: "https://t.me/tewodrosmillion",
    portfolio: "https://professional-portfolio-nine-hazel.vercel.app/",
  },
];

export const footerLinks = [
  { id: 1, label: "Email",    link: "mailto:apexsolution@gmail.com",                        icon: "mail" },
  { id: 2, label: "LinkedIn", link: "https://www.linkedin.com/company/apex-solution-et",    icon: "linkedin" },
  { id: 3, label: "Telegram", link: "https://t.me/ApexSolutionET",                          icon: "send" },
  { id: 4, label: "GitHub",   link: "https://github.com/apex-solution",                    icon: "github" },
  { id: 5, label: "TikTok",   link: "https://www.tiktok.com/@apexsolution",                icon: "music-2" },
  { id: 6, label: "YouTube",  link: "https://www.youtube.com/@ApexSolution",               icon: "youtube" },
];

// Keep old name for backward compat
export const footerLink = footerLinks;

export const AdminList = [
  { id: 1, name: "Dashboard", icon: "streamline-sharp-color:dashboard-circle" },
  { id: 2, name: "Update Password", icon: "mdi:lock-outline" },
  { id: 3, name: "HeroFooter", icon: "fluent-mdl2:completed" },
  { id: 4, name: "Services", icon: "flat-color-icons:services" },
  { id: 5, name: "Portfolios", icon: "dashicons:portfolio" },
  { id: 6, name: "Blogs", icon: "streamline-ultimate-color:blogger-logo" },
  { id: 7, name: "Team Members", icon: "fluent-color:people-team-48" },
  { id: 8, name: "Partners", icon: "carbon:partnership" },
  { id: 9, name: "Contact Messages", icon: "flat-color-icons:contacts" },
  { id: 10, name: "Testimonials", icon: "dashicons:testimonial" },
];

export const HeroFooterList = [
  { id: 1, name: "Experience", icon: "mdi:briefcase-account" },
  { id: 2, name: "Projects Done", icon: "mdi:flag-checkered" },
  { id: 3, name: "Happy Clients", icon: "mdi:emoticon-happy-outline" },
];

export const portFolioTypes = [
  { id: 1, name: "Website" },
  { id: 2, name: "Web App" },
  { id: 3, name: "Digital System(SaaS)" },
  { id: 4, name: "Mobile App" },
  { id: 5, name: "Hotel and Hospitality Technology" },
  { id: 6, name: "Network and Wi-Fi infrastructure Projects" },
];

export const accessibility = [
  { id: 1, name: "Addis Ababa" },
  { id: 2, name: "Hossana" },
  { id: 3, name: "Bahir Dar" },
  { id: 4, name: "Butajira" },
  { id: 5, name: "Wolkite" },
  { id: 6, name: "Jimma" },
  { id: 7, name: "Gambella" },
  { id: 8, name: "Hawassa" },
];
