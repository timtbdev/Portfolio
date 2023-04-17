import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getUrl() {
  return process.env.NEXT_PUBLIC_APP_URL
}

export function constructOgImagePageUri(
  caption: string,
  title: string,
  description: string,
  authorName: string,
  authorImageUrl: string
) {
  const attributes = [
    `?caption=${encodeURIComponent(caption)}`,
    `&title=${encodeURIComponent(title)}`,
    `&description=${encodeURIComponent(description)}`,
    `&authorName=${encodeURIComponent(authorName)}`,
    `&authorImageUrl=${encodeURIComponent(authorImageUrl)}`,
    // Joining a multiline string for readability.
  ].join("")

  return absoluteUrl(`api/og-page${attributes}`)
}
