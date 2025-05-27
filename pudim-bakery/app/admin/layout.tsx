export const metadata = {
  title: 'Administração - Padaria Pudim',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <nav style={{background: '#eee', padding: 16, marginBottom: 32}}>
          <span style={{fontWeight: 'bold'}}>Painel Administrativo</span>
        </nav>
        <div style={{maxWidth: 600, margin: '0 auto'}}>
          {children}
        </div>
      </body>
    </html>
  )
}