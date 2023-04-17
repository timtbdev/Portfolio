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

interface PageAttributes {
  title: string
  description: string
}

export function getPageOgImageUrl(title: string, description: string) {
  const attributes = [
    `?type=page`,
    `&title=${encodeURIComponent(title)}`,
    `&description=${encodeURIComponent(description)}`,
    // Joining a multiline string for readability.
  ].join("")

  return absoluteUrl(`api/og${attributes}`)
}
