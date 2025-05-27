import './globals.css'

export const metadata = {
  title: 'Padaria Pudim',
  description: 'Os melhores pudins da cidade!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Next.js root layout: only this file should use html/body
    <html lang="pt">
      <body>
        {children}
      </body>
    </html>
  )
}