const BASE = process.env.NEXT_PUBLIC_API_URL || "https://apex-backend-tdth.vercel.app/api";

// Cached fetch with 60s revalidation + 3s timeout
async function cachedGet(path: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(`${BASE}${path}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export const fetchServices    = () => cachedGet("/services/");
export const fetchPortfolios  = () => cachedGet("/portfolio/");
export const fetchBlogs       = () => cachedGet("/blogs/");
export const fetchTeam        = () => cachedGet("/teams/");
export const fetchPartners    = () => cachedGet("/partners/");
export const fetchTestimonials = () => cachedGet("/testimonials/");
export const fetchHeroFooter  = () => cachedGet("/heroFooter/");
