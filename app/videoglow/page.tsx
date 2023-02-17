import GlowingVideo from "~/components/glowing-video"

export default function VideoGlow() {
  return (
    <main>
      <h1>VideoGlow</h1>

      <p>
        VideoGlow is a video player that uses WebGL to apply a glow effect to
        the video.
      </p>

      <GlowingVideo
        containerClassName="w-full rounded-lg shadow-2xl mt-16"
        videoClassName="rounded-lg"
        src="/assets/shader-gradient.mp4"
        playsInline
        autoPlay
        muted
        loop
      />
    </main>
  )
}
