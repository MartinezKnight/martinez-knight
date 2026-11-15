import { useEffect } from "react";

const PAGE_DESCRIPTIONS: Record<string, string> = {
  Home: "Martinez Knight helps organisations across Nigeria build connected digital infrastructure, business systems and growth capabilities.",
  About: "Learn about Martinez Knight, our capabilities, approach and experience delivering digital infrastructure and business transformation.",
  Work: "Explore Martinez Knight projects across websites, hosting, digital platforms, business systems, brand and marketing operations.",
  Services: "Explore website development, digital infrastructure, SEO, digital marketing, CRM, business automation, IT support and corporate services in Nigeria.",
  Blog: "Practical insights from Martinez Knight on digital infrastructure, business technology, automation, marketing and organisational growth.",
  Careers: "Martinez Knight has roots in HR management and recruitment support in Asaba, Delta State, Nigeria. Register your interest for suitable opportunities.",
  "Recruitment & HR Consultancy | Delta State and Nigeria": "Martinez Knight has roots in HR management and recruitment support in Asaba, Delta State, Nigeria. Register your interest for suitable opportunities and recruitment-related engagements.",
  "Contact Us": "Contact Martinez Knight for website development, business email, hosting, SEO, digital marketing, CRM, automation, IT support and business enquiries.",
  "Business Growth & Discovery": "Share your organisation's goals and challenges with Martinez Knight for a structured business discovery and digital growth assessment.",
  "Training & Professional Development": "Explore practical digital skills, corporate training and professional development programmes from Martinez Knight in Nigeria.",
  "Apply — Training & Professional Development": "Apply for a Martinez Knight training programme or professional development track.",
  Sitemap: "Browse the Martinez Knight website, services, work, company information, training and contact pages.",
  "Prospect Pipeline": "Private Martinez Knight business prospect management workspace.",
};

function setMeta(selector: string, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!element) {
    const isLink = selector.startsWith("link");
    element = document.createElement(isLink ? "link" : "meta") as HTMLMetaElement | HTMLLinkElement;
    if (selector.includes('property="')) {
      (element as HTMLMetaElement).setAttribute("property", selector.match(/property="([^"]+)"/)?.[1] || "");
    } else if (selector.includes('name="')) {
      (element as HTMLMetaElement).name = selector.match(/name="([^"]+)"/)?.[1] || "";
    } else if (isLink) {
      (element as HTMLLinkElement).rel = "canonical";
    }
    document.head.appendChild(element);
  }
  if (attribute === "content") (element as HTMLMetaElement).content = value;
  else (element as HTMLLinkElement).href = value;
}

export function useTitle(title: string) {
  useEffect(() => {
    const fullTitle = `${title} — Martinez Knight`;
    const description = PAGE_DESCRIPTIONS[title] ||
      `Martinez Knight provides ${title.toLowerCase()} solutions for organisations across Nigeria, connecting digital infrastructure, business systems and practical growth support.`;
    const canonical = `${window.location.origin}${window.location.pathname}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('link[rel="canonical"]', "href", canonical);
    setMeta('meta[name="robots"]', "content", title === "Prospect Pipeline" ? "noindex, nofollow" : "index, follow");
  }, [title]);
}
