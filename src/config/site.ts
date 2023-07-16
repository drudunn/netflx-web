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
      title: "Schedule",
      href: "/tv-shows",
      icon: Icons.tvShow,
    },
    {
      title: "Venue",
      href: "/movies",
      icon: Icons.movie,
    },
    {
      title: "Gifts",
      href: "/new-and-popular",
      icon: Icons.trendingUp,
    },
    {
      title: "My RSVP",
      href: "/my-list",
      icon: Icons.list,
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
      href: "/profiles",
      icon: Icons.edit,
    },
    {
      title: "Exit Profile",
      icon: Icons.externalLink,
      onClick: () => useProfileStore.setState({ profile: null }),
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
      title: "Sign Out of Dunnflix",
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
