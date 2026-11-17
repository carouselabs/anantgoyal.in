// "#…" links point at homepage sections; on other pages they become "/#…".
export const NAV_LINKS = [
  { href: "/email-design/", label: "Design" },
  { href: "#capabilities", label: "Services" },
  { href: "#software", label: "Software" },
  { href: "#outreach", label: "Outreach" },
  { href: "#about", label: "About" },
];

export const navHref = (href: string, home: boolean) => (href.startsWith("#") && !home ? `/${href}` : href);
