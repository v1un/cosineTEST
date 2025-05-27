import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Bem-vindo à Padaria Pudim!</h1>
      <p>Delicie-se com nossos pudins e bolos caseiros.</p>
      <Link href="/produtos">
        <button>Ver Produtos</button>
      </Link>
      <section>
        <h2>Contato</h2>
        <p>Rua dos Doces, 123 - Centro</p>
        <p>WhatsApp: (11) 99999-9999</p>
      </section>
    </main>
  )
}