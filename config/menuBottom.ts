import {
  BoltIcon,
  BriefcaseIcon,
  PaperAirplaneIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"

import { Menu } from "types"

export const menuBottom: Menu[] = [
  {
    title: "Home",
    url: "/",
    idx: 1,
    icon: BoltIcon,
  },
  {
    title: "Project",
    url: "/project",
    idx: 2,
    icon: BriefcaseIcon,
  },
  {
    title: "About",
    url: "/about",
    idx: 3,
    icon: UserCircleIcon,
  },
  {
    title: "Blog",
    url: "/blog",
    idx: 4,
    icon: Squares2X2Icon,
  },
]
