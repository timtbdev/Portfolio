import { footer, menu } from "../config"
import { BottomNavigation, MobileBottomNavigation } from "./navigations"

export default function Footer() {
  return (
    <>
      <MobileBottomNavigation menu={menu} />
      <BottomNavigation footer={footer} />
    </>
  )
}
