import { Icon } from "@heroicons/react"

export type Menu = {
  title: string
  url: string
  idx: number
  icon: Icon
}

export type Feature = {
  title: string
  description: string
}

export type Project = {
  id: number
  title: string
  releaseDate: string
  icon: string
  iconDescription: string
  type: string
  url: string
  features: Feature[]
  images: string[]
  text: string
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

export type Category = {
  title: string
  href: string
}

export type Author = {
  name: string
  role: string
  imageUrl: string
}

export type BlogAttributes = {
  id: number
  title: string
  href: string
  description: string
  imageUrl: string
  date: string
  dateTime: string
  category: Category
  author: Author
}

export type AddressAttributes = {
  id: number
  title: string
  href: string
  address: string
}
