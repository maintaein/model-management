export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div>
        <h2>Admin Panel</h2>
      </div>
      <main>{children}</main>
    </div>
  )
}
