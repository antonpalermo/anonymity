export const metadata = {
  title: "FYEO",
  description: "For your eyes only! Hope that's clear for everyone."
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
