import { useEffect } from "react"
import { useMotionValue, useScroll, useTransform } from "framer-motion"

let clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max)

export default function useBoundedScroll(bounds: number) {
  let { scrollY } = useScroll()
  let scrollYBounded = useMotionValue(0)
  let scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1])

  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious()
      let diff = current - previous
      let newScrollYBounded = scrollYBounded.get() + diff

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds))
    })
  }, [bounds, scrollY, scrollYBounded])

  return { scrollYBounded, scrollYBoundedProgress }
}
