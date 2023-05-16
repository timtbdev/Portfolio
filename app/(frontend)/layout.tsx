import { ReactNode } from "react"
import {
  Main,
  MainContainer,
  MainFooter,
  MainGrid,
  MainHeader,
} from "@/components/main"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <MainHeader />
      <MainContainer>
        <MainGrid>
          <Main>{children}</Main>
        </MainGrid>
      </MainContainer>
      <MainFooter />
    </div>
  )
}
