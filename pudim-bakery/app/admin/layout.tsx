export const metadata = {
  title: 'Administração - Padaria Pudim',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="admin-nav">
        <span>🍮 Painel Administrativo</span>
      </nav>
      <div style={{maxWidth: 850, margin: '0 auto'}}>
        {children}
      </div>
    </div>
  )
}