"use client"

import React, { FC, useState } from "react"
import Image from "next/image"
import { cn } from "@/libs/utils"
import { motion } from "framer-motion"
import { useKeenSlider } from "keen-slider/react"

import "keen-slider/keen-slider.min.css"
import { shimmer, toBase64 } from "@/libs/utils"

interface SliderProps {
  images: string[]
}

const Slider: FC<SliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {images.map((image, idx) => (
          <div
            key={image + idx}
            className="keen-slider__slide relative mx-auto w-9/12"
          >
            <span className="sr-only">Screenshot</span>
            <Image
              src={image}
              width={440}
              height={440}
              alt="Screenshot"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(640, 840)
              )}`}
              priority={true}
            />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <nav className="flex items-center justify-between px-4 dark:border-white/10 sm:px-0">
            <div className="mt-6 flex w-0 flex-1">
              <button
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
                className="group relative inline-flex h-9 items-center overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-t from-gray-100 via-gray-50 to-gray-50 px-4 text-base font-medium text-gray-600 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20 dark:bg-gradient-to-tl dark:from-slate-700 dark:via-slate-700 dark:to-slate-800 dark:text-slate-400 dark:ring-white/10 hover:dark:bg-gradient-to-t hover:dark:from-slate-700 hover:dark:via-slate-700 hover:dark:to-slate-800 dark:active:ring-white/20"
              >
                <svg
                  className="-ml-1 mr-2 rotate-180 stroke-slate-500 stroke-2 dark:stroke-slate-400"
                  fill="none"
                  width="11"
                  height="11"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                >
                  <path
                    className="opacity-0 transition group-hover:opacity-100"
                    d="M0 5h7"
                  ></path>
                  <path
                    className="transition group-hover:translate-x-[3px]"
                    d="M1 1l4 4-4 4"
                  ></path>
                </svg>
                Prev<span className="sr-only">Previous screenshot</span>
              </button>
            </div>
            <div className="-mt-px flex">
              <ol className="mt-6 flex items-center space-x-5">
                {[
                  ...Array(
                    instanceRef.current.track.details.slides.length
                  ).keys(),
                ].map((idx) => {
                  return (
                    <li key={idx}>
                      <motion.button
                        key={idx}
                        onClick={() => {
                          instanceRef.current?.moveToIdx(idx)
                        }}
                        className="relative flex items-center justify-center"
                        initial={false}
                        animate={{
                          scale: currentSlide === idx ? 1.1 : 1,
                          opacity: currentSlide === idx ? 1 : 0.8,
                        }}
                        transition={{ type: "spring", stiffness: 100 }}
                      >
                        <span
                          className="absolute flex h-5 w-5 p-px"
                          aria-hidden="true"
                        >
                          <span
                            className={cn("h-full w-full rounded-full", {
                              "bg-gradient-to-t from-gray-100 via-gray-50 to-white shadow-md shadow-black/5 ring-1 ring-black/5 transition duration-200 ease-in-out hover:bg-gradient-to-tr hover:from-gray-100 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20 dark:bg-gradient-to-t dark:from-slate-600 dark:via-slate-700 dark:to-slate-800 dark:ring-white/10 dark:hover:bg-gradient-to-br dark:hover:from-slate-800 dark:hover:via-slate-700 dark:hover:to-slate-600 dark:active:ring-white/20":
                                currentSlide === idx,
                              "bg-gray-100 ring-1 ring-black/5 active:scale-[96%] active:ring-black/20 dark:bg-slate-50/5 dark:active:ring-white/20":
                                currentSlide != idx,
                            })}
                          ></span>
                        </span>
                        <span
                          className={cn(
                            "relative block h-2.5 w-2.5 rounded-full",
                            {
                              "bg-gray-400/80 transition duration-200 ease-in-out dark:bg-slate-500":
                                currentSlide === idx,
                              "bg-gray-300 dark:bg-slate-600":
                                currentSlide != idx,
                            }
                          )}
                          aria-hidden="true"
                        ></span>

                        <span className="sr-only">Screenshot {idx + 1}</span>
                      </motion.button>
                    </li>
                  )
                })}
              </ol>
            </div>
            <div className="mt-6 flex w-0 flex-1 justify-end">
              <button
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
                className="group relative inline-flex h-9 items-center overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-t from-gray-100 via-gray-50 to-gray-50 px-4 text-base font-medium text-gray-600 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20 dark:bg-gradient-to-tl dark:from-slate-700 dark:via-slate-700 dark:to-slate-800 dark:text-slate-400 dark:ring-white/10 hover:dark:bg-gradient-to-t hover:dark:from-slate-700 hover:dark:via-slate-700 hover:dark:to-slate-800 dark:active:ring-white/20"
              >
                Next<span className="sr-only">Next screenshot</span>
                <svg
                  className="-mr-1 ml-2 stroke-slate-500 stroke-2 dark:stroke-slate-400"
                  fill="none"
                  width="11"
                  height="11"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                >
                  <path
                    className="opacity-0 transition group-hover:opacity-100"
                    d="M0 5h7"
                  ></path>
                  <path
                    className="transition group-hover:translate-x-[3px]"
                    d="M1 1l4 4-4 4"
                  ></path>
                </svg>
              </button>
            </div>
          </nav>
        </>
      )}
    </>
  )
}

export default Slider
