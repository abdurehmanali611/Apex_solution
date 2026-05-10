export const portfolioTypeImageMap: Record<string, string> = {
  Website: "/assets/website.jpg",
  "Web App": "/assets/webapp.jpg",
  "Digital System(SaaS)": "/assets/webapp.jpg",
  "Mobile App": "/assets/mobileapp.jpg",
  "Hotel and Hospitality Technology": "/assets/hotel.jpg",
  "Network and Wi-Fi Infrastructure Projects": "/assets/network.jpg",
};

export function getPortfolioImage(type: string, image?: string) {
  return image || portfolioTypeImageMap[type] || "/assets/webapp.jpg";
}
