"use client"

import React, { forwardRef, useEffect, useRef } from "react"
import mergeRefs from "~/lib/merge-refs"
import { cn } from "~/lib/utils"

type Props = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "className"> & {
  src: string
  containerClassName?: string
  videoClassName?: string
}

const GlowingVideo = forwardRef<HTMLVideoElement, Props>(
  (
    { containerClassName, videoClassName, autoPlay, ...props },
    forwardedRef
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const video = videoRef.current
      const canvas = canvasRef.current

      if (!video || !canvas) return

      const ctx = canvas.getContext("2d")

      const updateCanvas = () => {
        if (video.paused || video.ended) return

        canvas.style.width = `${video.clientWidth + 50}px`
        canvas.style.height = `${video.clientHeight + 50}px`
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)

        requestAnimationFrame(updateCanvas)
      }

      video.addEventListener("loadedmetadata", () => {
        canvas.width = video.videoWidth || video.clientWidth
        canvas.height = video.videoHeight || video.clientHeight
      })
      video.addEventListener("play", updateCanvas)
      if (autoPlay) video.play()

      return () => video.removeEventListener("play", updateCanvas)
    }, [autoPlay])

    return (
      <div className={cn("relative", containerClassName)}>
        <canvas
          className={cn(
            "blur-2xl absolute z-10",
            "top-[-25px] left-[-25px] opacity-50"
          )}
          ref={canvasRef}
        />
        <video
          className={cn(
            "relative z-20 w-full h-full object-cover",
            videoClassName
          )}
          {...props}
          ref={mergeRefs([videoRef, forwardedRef])}
        />
      </div>
    )
  }
)
GlowingVideo.displayName = "GlowingVideo"

export default GlowingVideo
