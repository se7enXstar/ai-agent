import "styles/tailwind.css"
import "@radix-ui/themes/styles.css"

import { Theme } from "@radix-ui/themes"
import Header from "components/Header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Header />
          {children}
        </Theme>
      </body>
    </html>
  )
}
