import { footer, menu } from "../config"
import { BottomNavigation, MobileBottomNavigation } from "./navigations"

const Footer = () => {
  return (
    <>
      <MobileBottomNavigation menu={menu} />
      <BottomNavigation footer={footer} />
    </>
  )
}

export default Footer
