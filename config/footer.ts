import { GithubIcon, TwitterIcon } from "@/icons"

import { Footer } from "types"

export const footer: Footer = {
  copyright: "2023 Tim. All rights reserved. No Cookies.",
  socials: [
    {
      name: "Twitter",
      href: "https://twitter.com/timtbdev",
      icon: TwitterIcon,
    },
    {
      name: "GitHub",
      href: "https://github.com/timtbdev/projects",
      icon: GithubIcon,
    },
  ],
}
