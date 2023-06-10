import { DBCategoryType, DBItemType, DBNavItem } from "types"

export const dbNavigations: DBNavItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/dashboard/projects" },
  { name: "Posts", href: "/dashboard/posts" },
  { name: "Contents", href: "/dashboard/contents" },
]

export const dbProjects: DBItemType = {
  title: "Projects",
  description: "List of projects",
  baseUrl: "/dashboard/projects/",
  pageUrl: "?page=",
  empty: {
    title: "No Project",
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

export const categories: DBCategoryType[] = [
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

export const tags: DBCategoryType[] = [
  {
    value: "java",
    label: "Java",
  },
  {
    value: "Kotlin",
    label: "Kotlin",
  },
  {
    value: "xml",
    label: "XML",
  },
  {
    value: "javascript",
    label: "JavaScript",
  },
  {
    value: "react",
    label: "React",
  },
  {
    value: "nextjs",
    label: "NextJs",
  },
  {
    value: "tailwindcss",
    label: "TailwindCss",
  },
]

export const dbPosts: DBItemType = {
  title: "Posts",
  description: "List of posts",
  baseUrl: "/dashboard/posts/",
  pageUrl: "?page=",
  empty: {
    title: "No Post",
    descripton: "Get started by creating a new post.",
  },
  notFound: "This post cound not be found. Please try again.",
  tableHeaders: ["Title", "Description", "Published", "Actions"],
  apiUrl: "/api/posts/",
  editUrl: "/editor/posts/",
}

export const dbContents: DBItemType = {
  title: "Contents",
  description: "List of contents",
  baseUrl: "/dashboard/contents/",
  pageUrl: "?content=",
  empty: {
    title: "No Content",
    descripton: "Get started by creating a new content.",
  },
  notFound: "This content cound not be found. Please try again.",
  tableHeaders: ["Title", "Type", "Updated", "Actions"],
  apiUrl: "/api/contents/",
  editUrl: "/editor/contents/",
}

export const dbUser: DBItemType = {
  title: "Profile",
  description: "Personal information",
  baseUrl: "/dashboard",
  pageUrl: "?user=",
  empty: {
    title: "No Profile",
    descripton: "Please contact your admin.",
  },
  notFound: "This page cound not be found. Please try again.",
  tableHeaders: ["Name", "Email", "Social accounts", "Actions"],
  apiUrl: "/api/users/",
  editUrl: "/editor/users/",
}
