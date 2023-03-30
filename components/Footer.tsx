import { footer, menu } from "../config"
import { BottomNavigation, MobileBottomNavigation } from "./navigations"

const Footer = () => {
  return (
    <>
      <BottomNavigation footer={footer} />
      <MobileBottomNavigation menu={menu} />
    </>
  )
}

export default Footer
