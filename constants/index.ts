import { blogs, GetBlog, GetPartner, GetPortFolio, GetService, GetTeam, GetTestimonial, HeroFooterFetch, partner, portfolio, Services, teams, testimony } from "@/lib/actions";

export const NavbarComponents = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "About Us",
    link: "/About",
  },
  {
    id: 3,
    name: "Services",
    link: "/Services",
  },
  {
    id: 4,
    name: "Portfolio",
    link: "/Portfolio",
  },
  {
    id: 5,
    name: "Blog",
    link: "/Blog",
  },
  {
    id: 6,
    name: "Partners",
    link: "/Partners",
  },
  {
    id: 7,
    name: "Contact Us",
    link: "/Contact",
  },
];

export interface HeroFooterItem {
  id: number;
  name: string;
  amount: number;
}

const fetchedHeroFooter = await HeroFooterFetch()
const fetchedServices: Services[] = await GetService()
const fetchedPortfolios: portfolio[] = await GetPortFolio()
const fetchedBlogs: blogs[] = await GetBlog()
const fetchedTeamMembers: teams[] = await GetTeam()
const fetchedPartners: partner[] = await GetPartner()
const fetchedTestimonials: testimony[] = await GetTestimonial()

export const HeroFooter: HeroFooterItem[] = fetchedHeroFooter ?? [
  {
    id: 1,
    name: "Experience",
    amount: 10,
  },
  {
    id: 2,
    name: "Projects Done",
    amount: 20,
  },
  {
    id: 3,
    name: "Happy Clients",
    amount: 20,
  },
];

// Default Services data
const defaultServices = [
  {
    id: 1,
    icon: "streamline-plump-color:browser-website-1",
    title: "Website Development",
    description:
      "Developing an elegant and attractive website that truly represent you or your organization or team in the digital world.",
  },
  {
    id: 2,
    icon: "noto-v1:man-technologist",
    title: "System Development",
    description:
      "Developing and Enhancing not just a website or digital presence but also enhancing your revenue and profit to significant level/amount by building a digital system and/or working area.",
  },
  {
    id: 3,
    icon: "carbon:application-mobile",
    title: "Mobile App Development",
    description:
      "Leverging up an income and customer satisfaction of your company or service by providing/building super enthusiastic and simple to use mobile application.",
  },
  {
    id: 4,
    icon: "material-symbols-light:tools-installation-kit-outline-sharp",
    title: "Network Design and Installation",
    description:
      "LAN, WAN and Wi-Fi infrastructure, structured Cabling and wireless Optimization: Secure and Scalable designs for Hotels, Offices and Institutions.",
  },
  {
    id: 5,
    icon: "noto-v1:hotel",
    title: "Hotel Management System",
    description:
      "Local and web Based HMS Solutions for the Front Office, Back Office, reporting and operational Workflows with customizations based on the Hotel Size and Operation Style.",
  },
  {
    id: 6,
    icon: "mdi:cctv",
    title: "CCTV Surveillance Systems",
    description:
      "HikVision & enterprise-grade CCTV Solutions, NVR/DVR installation and configuration, Remote Monitoring and System Optimiztion.",
  },
  {
    id: 7,
    icon: "twemoji:door",
    title: "Digital Door Lock Systems",
    description:
      "Hotel Smart Lock Installation, Software Activation, Card Programming and Access Control with Full Integration with Hotel Operations.",
  },
  {
    id: 8,
    icon: "streamline-plump-color:cog-automation",
    title: "Custom Software and Automation Systems",
    description:
      "Building Up and Enhancing custom Softwares and system automations with enthusiastic business automation tools that has inventory and reporting systems.",
  },
  {
    id: 9,
    icon: "icon-park:laptop-computer",
    title: "IT Support and System Maintainance",
    description:
      "Preventive and Corrective Maintainance for Servers, Networks and System TroubleShooting with Long-Term Support Contracts.",
  },
  {
    id: 10,
    icon: "carbon:ibm-consulting-advantage-assistant",
    title: "Tech Consulting",
    description:
      "Proffessional, Elegant and Skilled IT Consulting Services with our incredible proffessionals for both Governmental and Non-Governmental Institutions",
  },
];

// Static services data
export const Service: Services[] = fetchedServices ? (defaultServices as Services[]).concat(fetchedServices) : defaultServices;

// Default Portfolios data
const defaultPortfolios = [
  {
    id: 1,
    link: "https://hotel-display-swart.vercel.app/",
    title: "Hotel Display",
    description:
      "Bereket International Hotels' Hotel Display Website is one of our Great and exceptional project that we also as a company experienced a new way of thinking and problem solving skill.",
    type: "Website",
    duration: 7
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
    image: "/assets/gebresadik.jpg",
  },
  {
    id: 4,
    title: "Victory Hotel",
    description:
      "Awesome Digital Door Lock System Installation and Configuration for our great client Victory Hotel, Hossana with modern and reliable technologies that escalate Victory to the true form of victory.",
    type: "Hotel and Hospitality Technology",
    duration: 7,
    image: "/assets/victory.jpg",
  },
  {
    id: 5,
    title: "Tinsea Hotel(G+4)",
    description:
      "Here is one our clients with an outstanding performance by the service delivered from us which is an impressive 16-Channel NVR CCTV Camera System Installation and Configuration and Full Wi-Fi design and Installation.",
    type: "Hotel and Hospitality Technology",
    duration: 7,
    image: "/assets/tinsea.jpg",
  },
  {
    id: 6,
    title: "Shuferoch Hotel",
    description:
      "For Shuferoch Hotel, we installed a 16-channel NVR CCTV system and delivered a complete Wi-Fi network solution, and we continue to support their operations.",
    type: "Hotel and Hospitality Technology",
    duration: 7,
    image: "/assets/shuferoch.jpg",
  },
  {
    id: 7,
    title: "Alem Hotel",
    description:
      "Alem Hotel trusted us for a HikVision 32-channel NVR CCTV installation, and we remain committed to delivering ongoing value as their technology partner.",
    type: "Hotel and Hospitality Technology",
    duration: 7,
    image: "/assets/alem.jpg",
  },
  {
    id: 8,
    title: "Sono Hotel",
    description:
      "Sono Hotel received a 16-channel NVR CCTV installation plus a full Wi-Fi design and setup, and we provided support for their future needs.",
    type: "Hotel and Hospitality Technology",
    duration: 7,
    image: "/assets/sono.jpg",
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

// Concatenate fetched portfolios with default portfolios
export const Portfolios: portfolio[] = fetchedPortfolios ? (defaultPortfolios as portfolio[]).concat(fetchedPortfolios) : defaultPortfolios;

// Default Blogs data
const defaultBlogs = [
  {
    id: 1,
    image: "/assets/blog-1.jpg",
    title: "Artificial Intelligence in Everyday Applications",
    description:
      "Artificial Intelligence is no longer limited to research labs. From smart assistants to recommendation systems, AI is transforming how we interact with technology in our daily lives.",
    source: "TechCrunch",
    date: "2025-01-15",
    link: "https://techcrunch.com/category/artificial-intelligence/",
  },
  {
    id: 2,
    image: "/assets/blog-2.jpg",
    title: "Why Modern Web Development Is Moving Toward Full-Stack Frameworks",
    description:
      "Frameworks like Next.js, Nuxt, and Remix are reshaping web development by combining frontend and backend capabilities into a single, efficient workflow.",
    source: "Medium",
    date: "2025-02-03",
    link: "https://medium.com/@mdburkee/the-evolution-of-full-stack-frameworks-960bec2bd5e0",
  },
  {
    id: 3,
    image: "/assets/blog-3.webp",
    title: "Cybersecurity Trends Every Developer Should Know in 2025",
    description:
      "With the rise of cloud computing and remote work, cybersecurity has become a critical concern. This article explores key trends like zero-trust architecture and secure authentication.",
    source: "The Verge",
    date: "2025-03-10",
    link: "https://www.theverge.com/23410990/cybersecurity-ransomware-healthcare-data-hipaa-hospitals",
  },
];

// LIFO (Last In First Out) for blogs - fetched blogs come first, then default blogs
export const Blogs = fetchedBlogs ? fetchedBlogs.concat(defaultBlogs) : defaultBlogs;

// Default Testimonial data
const defaultTestimonial = [
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

// Concatenate fetched testimonials with default testimonials
export const Testimonial = fetchedTestimonials ? defaultTestimonial.concat(fetchedTestimonials) : defaultTestimonial;

// Default Partner data
const defaultPartner = [
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

// Concatenate fetched partners with default partners
export const Partner = fetchedPartners ? defaultPartner.concat(fetchedPartners) : defaultPartner;

// Default Team Members data
const defaultTeamMembers = [
  {
    id: 1,
    image: "/assets/ceo.jpg",
    name: "Atlabachew Tadese",
    position: "CoFounder and CEO",
    title: "The Founder",
    description: "Leader of Greatness and Success",
    facebook: "https://web.facebook.com/atlabachwu.tadesse?rdid=ifJ8ODEsgk9GGUyS&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F18aQKFHDHV%2F%3F_rdc%3D1%26_rdr#",
    instagram: "https://www.instagram.com/atlawu_/",
    linkedin: "https://www.linkedin.com/in/atile-networkengineer/",
    telegram: "https://t.me/Yodahe_Enat",
  },
  {
    id: 2,
    image: "/assets/cto.jpg",
    name: "Abdurehman Ali",
    position: "CoFounder and CTO",
    title: "The Invincible",
    description: "Source of Hard working and Passion",
    facebook: "https://web.facebook.com/profile.php?id=100073479755802",
    instagram: "https://www.instagram.com/abdurehman6252/",
    linkedin: "https://www.linkedin.com/in/abdurehman-ali-592238281/",
    telegram: "https://t.me/AbduWolf",
  },
];

// Concatenate fetched team members with default team members
export const teamMembers = fetchedTeamMembers ? defaultTeamMembers.concat(fetchedTeamMembers) : defaultTeamMembers;

export const footerLink = [
  {
    id: 1,
    icon: "skill-icons:gmail-dark",
    link: "",
  },
  {
    id: 2,
    icon: "skill-icons:linkedin",
    link: "",
  },
  {
    id: 3,
    icon: "logos:telegram",
    link: "",
  },
  {
    id: 4,
    icon: "skill-icons:github-dark",
    link: "",
  },
  {
    id: 5,
    icon: "logos:tiktok-icon",
    link: "",
  },
  {
    id: 6,
    icon: "logos:youtube-icon",
    link: "",
  },
];

export const AdminList = [
  {
    id: 1,
    name: "Dashboard",
    icon: "streamline-sharp-color:dashboard-circle",
  },
  {
    id: 2,
    name: "Update Password",
    icon: "mdi:lock-outline",
  },
  {
    id: 3,
    name: "HeroFooter",
    icon: "fluent-mdl2:completed",
  },
  {
    id: 4,
    name: "Services",
    icon: "flat-color-icons:services",
  },
  {
    id: 5,
    name: "Portfolios",
    icon: "dashicons:portfolio",
  },
  {
    id: 6,
    name: "Blogs",
    icon: "streamline-ultimate-color:blogger-logo",
  },
  {
    id: 7,
    name: "Team Members",
    icon: "fluent-color:people-team-48",
  },
  {
    id: 8,
    name: "Partners",
    icon: "carbon:partnership",
  },
  {
    id: 9,
    name: "Contact Messages",
    icon: "flat-color-icons:contacts",
  },
  {
    id: 10,
    name: "Testimonials",
    icon: "dashicons:testimonial",
  },
];

export const HeroFooterList = [
  {
    id: 1,
    name: "Experience",
    icon: "mdi:briefcase-account",
  },
  {
    id: 2,
    name: "Projects Done",
    icon: "mdi:flag-checkered",
  },
  {
    id: 3,
    name: "Happy Clients",
    icon: "mdi:emoticon-happy-outline",
  },
];

export const portFolioTypes = [
  {
    id: 1,
    name: "Website",
  },
  {
    id: 2,
    name: "Web App",
  },
  {
    id: 3,
    name: "Digital System(SaaS)",
  },
  {
    id: 4,
    name: "Mobile App",
  },
  {
    id: 5,
    name: "Hotel and Hospitality Technology",
  },
  {
    id: 6,
    name: "Network and Wi-Fi infrastructure Projects",
  },
];

export const accessibility = [
  {
    id: 1,
    name: "Addis Ababa",
  },
  {
    id: 2,
    name: "Hossana",
  },
  {
    id: 3,
    name: "Bahir Dar",
  },
  {
    id: 4,
    name: "Butajira",
  },
  {
    id: 5,
    name: "Wolkite",
  },
  {
    id: 6,
    name: "Jimma",
  },
  {
    id: 7,
    name: "Gambella",
  },
  {
    id: 8,
    name: "Hawassa",
  },
];