import './globals.css'

export const metadata = {
  title: 'Padaria Pudim',
  description: 'Os melhores pudins da cidade!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        {children}
      </body>
    </html>
  )
}