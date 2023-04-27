import { EmailIcon, GithubIcon, TwitterIcon } from "@/icons"

import { ContactAttributes as Contact } from "types"

export const contacts: Contact[] = [
  {
    id: 1,
    title: "Email",
    address: "timtb.dev@gmail.com",
    href: "mailto:timtb.dev@gmail.com",
    text: "Please drop me an email.",
    icon: EmailIcon,
    iconColor: "text-green-500",
  },
  {
    id: 2,
    title: "Twitter",
    address: "@timtbdev",
    href: "https://twitter.com/timtbdev",
    text: "Please follow me on twitter.",
    icon: TwitterIcon,
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    title: "Github",
    address: "timtbdev",
    href: "https://github.com/timtbdev",
    text: "Please visit my Github account.",
    icon: GithubIcon,
    iconColor: "text-slate-900 dark:text-slate-400",
  },
]
