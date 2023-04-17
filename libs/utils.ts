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

export function absoluteUrl(path: string = "") {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getUrl() {
  return process.env.NEXT_PUBLIC_APP_URL
}

export function constructOgImageUri(
  subTitle: string,
  title: string,
  tags: Array<string>,
  slug: string,
) {
  const uri = [
    `&title=${encodeURIComponent(title)}`,
    `?subTitle=${encodeURIComponent(subTitle)}`,
    `${tags.map((tag) => `&tags=${encodeURIComponent(tag)}`).join("")}`,
    `&slug=${encodeURIComponent(slug)}`,
    // Joining a multiline string for readability.
  ].join("")

  return absoluteUrl(`/api/og${uri}`)
}
