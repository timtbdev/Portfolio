import { env } from "@/env.mjs"
import { ClassValue, clsx } from "clsx"
import { initializeApp } from "firebase/app"
import { twMerge } from "tailwind-merge"

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export function initFirebase() {
  if (typeof window !== undefined) {
    initializeApp(clientCredentials)
    console.log("Firebase has been init successfully")
  }
}

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

export function formatYearMonth(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
}

export function absoluteUrl(path: string = "") {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function constructOgImageUri(
  subTitle: string,
  title: string,
  tags: Array<string>,
  slug: string
) {
  const uri = [
    `?title=${encodeURIComponent(title)}`,
    `&subTitle=${encodeURIComponent(subTitle)}`,
    `${tags.map((tag) => `&tags=${encodeURIComponent(tag)}`).join("")}`,
    `&slug=${encodeURIComponent(slug)}`,
    // Joining a multiline string for readability.
  ].join("")

  return absoluteUrl(`/api/og${uri}`)
}

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str)

export const removeLastChar = (str: string) => str.slice(0,-1)
