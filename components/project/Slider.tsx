"use client"

import React, { FC, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useKeenSlider } from "keen-slider/react"

import "keen-slider/keen-slider.min.css"
import { clsx } from "clsx"

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
              width={640}
              height={840}
              alt="Screenshot"
              priority
            />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <nav className="flex items-center justify-between border-t border-zinc-200 px-4 dark:border-zinc-700/40 sm:px-0">
            <div className="mt-6 flex w-0 flex-1">
              <button
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
                className="group relative inline-flex h-9 items-center overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-t from-slate-100 via-slate-50 to-white px-4 py-2 font-medium text-slate-600 shadow-md shadow-black/5 ring-1 ring-black/10 duration-200 hover:bg-gradient-to-b hover:from-slate-50 hover:via-slate-100/50 hover:to-slate-50 active:scale-[99%] active:ring-black/20"
              >
                <svg
                  className="-ml-1 mr-2 rotate-180 stroke-slate-500 stroke-2 dark:stroke-slate-200"
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
                      <button
                        key={idx}
                        onClick={() => {
                          instanceRef.current?.moveToIdx(idx)
                        }}
                        className="relative flex items-center justify-center"
                      >
                        <span
                          className="absolute flex h-5 w-5 p-px"
                          aria-hidden="true"
                        >
                          <span
                            className={clsx("h-full w-full rounded-full", {
                              "bg-zinc-200 transition duration-500 ease-in-out dark:bg-zinc-700":
                                currentSlide === idx,
                              "bg-zinc-100 dark:bg-transparent":
                                currentSlide != idx,
                            })}
                          ></span>
                        </span>
                        <span
                          className={clsx(
                            "relative block h-2.5 w-2.5 rounded-full",
                            {
                              "bg-zinc-500/40 transition duration-500 ease-in-out dark:bg-zinc-500":
                                currentSlide === idx,
                              "bg-zinc-300 dark:bg-zinc-600":
                                currentSlide != idx,
                            }
                          )}
                          aria-hidden="true"
                        ></span>

                        <span className="sr-only">Screenshot {idx + 1}</span>
                      </button>
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
                className="group inline-flex h-9 items-center whitespace-nowrap rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              >
                Next<span className="sr-only">Next screenshot</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className="-mr-1 mt-0.5 h-5 w-5"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
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
