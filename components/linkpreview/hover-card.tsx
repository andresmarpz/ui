"use client"

import Image from "next/image"
import * as HoverCard from "@radix-ui/react-hover-card"

interface Props {
  target: string
  image: string
}

export default function LinkHoverCard({ target, image }: Props) {
  return (
    <HoverCard.Root defaultOpen={true}>
      <HoverCard.Trigger asChild>
        <a href={target}>{target}</a>
      </HoverCard.Trigger>
      <HoverCard.Content side="top" align="center" sideOffset={5}>
        <HoverCard.Arrow />
        <HoverCard.Content>
          <p>Google</p>
          <img
            className="rounded-lg"
            src={image}
            width={256}
            height={160}
            alt="asdasd"
          />
        </HoverCard.Content>
      </HoverCard.Content>
    </HoverCard.Root>
  )
}
