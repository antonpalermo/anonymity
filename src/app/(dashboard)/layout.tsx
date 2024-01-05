import Navbar from "@/components/navbar"

export default function TeamRootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-5">{children}</div>
      </main>
    </>
  )
}
