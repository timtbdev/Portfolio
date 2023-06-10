import { Icon } from "@heroicons/react"
import { ReadTimeResults } from "reading-time"

export type Menu = {
  title: string
  url: string
  idx: number
  icon: Icon
}

export type Footer = {
  socials: Social[]
  copyright: string
}

export type Social = {
  name: string
  href: string
  icon: Icon
}

export type MetaAttributes = {
  title: string
  ogTitle: string
  author: { name: string; twitterUrl: string; twitterAddress: string }
  description: string
  tags: Array<string>
}

export type Author = {
  name: string
  role: string
  imageUrl: string
}

export type PostAttributes = {
  id: string
  title: string
  slug: string
  description?: string
  imageUrl: string
  date: string
  readingTime: json
}

export type ImageAttributes = {
  href: string
  description: string
}

// Dashboard (DB) - Admin Panel

export type DBNavItem = {
  name: string
  href: string
}

export type DBItemType = {
  title: string
  description: string
  baseUrl: string
  pageUrl: string
  empty: {
    title: string
    descripton: string
  }
  notFound: string
  tableHeaders: string[]
  apiUrl: string
  editUrl: string
}

export type DBCategoryType = {
  value: string
  label: string
}

export type User = {
  id: string
  name: string
  email: string
  image: string
}

type Feature = {
  title: string
  description?: string
}
