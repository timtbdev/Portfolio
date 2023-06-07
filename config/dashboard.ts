import TableHeader from "@/components/ui/table-header"
import { empty } from "@prisma/client/runtime"

import { DBCategoryType, DBItemType, DBNavItem } from "types"

export const dbNavigations: DBNavItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/dashboard/projects" },
  { name: "Posts", href: "/dashboard/posts" },
  { name: "Pages", href: "/dashboard/pages" },
  { name: "Contact", href: "/dashboard/socials" },
]

export const dbProjects: DBItemType = {
  title: "Projects",
  description: "All projects",
  baseUrl: "/dashboard/projects/",
  pageUrl: "?page=",
  empty: {
    title: "No Projects",
    descripton: "Get started by creating a new project.",
  },
  notFound: "This project cound not be found. Please try again.",
  tableHeaders: ["Title", "Category", "Published", "Actions"],
  apiUrl: "/api/projects/",
  editUrl: "/editor/projects/",
}

export const projectCategories: DBCategoryType[] = [
  {
    value: "android",
    label: "Android Application",
  },
  {
    value: "web",
    label: "Web Application",
  },
  {
    value: "ios",
    label: "iOS Application",
  },
]

export const postCategories: DBCategoryType[] = [
  {
    value: "android",
    label: "Android",
  },
  {
    value: "nextjs",
    label: "Next.js",
  },
  {
    value: "tailwindcss",
    label: "TailwindCss",
  },
  {
    value: "react",
    label: "React",
  },
]

export const dbPosts: DBItemType = {
  title: "Posts",
  description: "All posts",
  baseUrl: "/dashboard/posts/",
  pageUrl: "?page=",
  empty: {
    title: "No Posts",
    descripton: "Get started by creating a new post.",
  },
  notFound: "This post cound not be found. Please try again.",
  tableHeaders: ["Title", "Description", "Published", "Actions"],
  apiUrl: "/api/posts/",
  editUrl: "/editor/posts/",
}

export const dbPages: DBItemType = {
  title: "Pages",
  description: "All pages",
  baseUrl: "/dashboard/pages/",
  pageUrl: "?page=",
  empty: {
    title: "No Pages",
    descripton: "Get started by creating a new page.",
  },
  notFound: "This page cound not be found. Please try again.",
  tableHeaders: ["Title", "Page", "Published", "Actions"],
  apiUrl: "/api/pages/",
  editUrl: "/editor/pages/",
}

export const dbSocials: DBItemType = {
  title: "Socials",
  description: "All social addresses",
  baseUrl: "/dashboard/socials/",
  pageUrl: "?page=",
  empty: {
    title: "No Social addresses",
    descripton: "Get started by creating an new social address.",
  },
  notFound: "This social address cound not be found. Please try again.",
  tableHeaders: ["Title", "Link", "Actions"],
  apiUrl: "/api/socials/",
  editUrl: "/editor/socials/",
}
