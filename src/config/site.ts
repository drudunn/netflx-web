import { useProfileStore } from "@/stores/profile"
import type { SiteConfig } from "@/types"

import { Icons } from "@/components/icons"

const domain = "https://dunndunn.wedding"

export const siteConfig: SiteConfig = {
  name: "Dunnflix",
  description:
    "Dunn-Dunn, the wedding of Andru & Christina.",
  url: domain,
  ogImage: `${domain}/opengraph-image.png`,
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: Icons.home,
    },
    {
      title: "RSVP",
      href: "/account",
      icon: Icons.check,
    },
    {
      title: "Schedule",
      href: "/schedule",
      icon: Icons.tvShow,
    },
    {
      title: "Venue",
      href: "/venue",
      icon: Icons.pizza,
    },
    {
      title: "FAQs",
      href: "/faqs",
      icon: Icons.info,
    },
    {
      title: "Gifts",
      href: "/gifts",
      icon: Icons.trendingUp,
    },
    {
      title: "Notifications",
      onClick: () => alert("🛹 Do a kickflip"),
      icon: Icons.bell,
    },
  ],
  profileDropdownItems: [
    {
      title: "Manage Profiles",
      href: "/account",
      icon: Icons.edit,
    },
    {
      title: "Account",
      href: "/account",
      icon: Icons.user,
    },
    {
      title: "Help Center",
      href: "/help-center",
      icon: Icons.help,
    },
    {
      title: "Sign Out",
      icon: Icons.externalLink,

      // eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      onClick: async () => await (window as any).Clerk.signOut(),
    },
  ],
  footerItems: [
    { title: "Audio Description", href: "/" },
    { title: "Help Center", href: "/help-center" },
    { title: "Gift Cards", href: "/" },
    { title: "Media Center", href: "/" },
    { title: "Investor Relations", href: "/" },
    { title: "Jobs", href: "/" },
    { title: "Terms of Use", href: "/terms-of-use" },
    { title: "Privacy", href: "/" },
    { title: "Legal Notices", href: "/" },
    { title: "Cookie Preferences", href: "/" },
    { title: "Corporate Information", href: "/" },
    { title: "Contact Us", href: "/" },
  ],
  links: {
    twitter: "https://www.twitter.com/drudunn",
    github: "https://www.github.com/drudunn",
  },
  socialLinks: [
    {
      title: "Facebook",
      href: "https://www.instagram.com/drudunn",
      icon: Icons.facebook,
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com/christina_lucy_/",
      icon: Icons.instagram,
    },
    {
      title: "Twitter",
      href: "https://dunn.wtf",
      icon: Icons.twitter,
    },
    {
      title: "Youtube",
      href: "https://www.mankellow.com",
      icon: Icons.youtube,
    },
  ],
}
