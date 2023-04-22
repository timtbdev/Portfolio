"use client"

import { FC } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default ThemeProvider
