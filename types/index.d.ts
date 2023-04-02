import { ForwardRefExoticComponent, SVGProps } from "react"
import { StaticImageData } from "next/image"
import { Icon } from "@heroicons/react"

export type SiteConfig = {
  title: string
  keywords: string[]
  description: string
  url: string
  og: string
}
export type AboutConfig = {
  title: string
  keywords: string
  description: string
  url: string
  og: string
}
export type Menu = {
  title: string
  url: string
  idx: number
  icon: Icon
}

export type Profile = {
  name: string
  title: string
  image: StaticImageData
  description: string
  bio: {
    title: string
    intro: string
    portfolio: string
  }
}

export type Heading = {
  title: string
  text: string
  subText: string
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
