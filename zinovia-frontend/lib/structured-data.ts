import { siteConfig, companyInfo } from "./constants";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      contactType: "customer service",
      email: companyInfo.email,
    },
    sameAs: [
      companyInfo.social.twitter,
      companyInfo.social.linkedin,
      companyInfo.social.github,
    ],
  };
}

