import "./globals.css"
import { Inter } from "@next/font/google"
import { cn } from "~/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "max-w-4xl m-auto")}>
        {children}
      </body>
    </html>
  )
}
