import mql from "@microlink/mql"

import LinkHoverCard from "./hover-card"

export default async function LinkPreview({ target }: { target: string }) {
  //   const screenshot = await mql(target, {
  //     screenshot: {
  //         browser: 'dark',

  //     },
  //     device: ''
  //   })
  //   console.log(screenshot.data.screenshot)
  const image =
    "https://iad.microlink.io/GiQy_rYnyov1GCA9oK_s0487KVGjMOZoB6aq5dcVJLD--4jlwLg9hTlLYEIf4_QGdoGwyofujZm0gVq0Kt99dA.png"

  //   if (!screenshot.data.screenshot?.url) return null
  return <LinkHoverCard target={target} image={image} />
}
