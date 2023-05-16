import { FC, ReactNode } from "react"
import { Container, Footer, Grid, Header, Main } from "@/components/core"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <Container>
        <Grid>
          <Main>{children}</Main>
        </Grid>
      </Container>
      <Footer />
    </div>
  )
}
