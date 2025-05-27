import Link from 'next/link'

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '70vh',
      justifyContent: 'center',
      gap: 32
    }}>
      <img
        src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80"
        alt="Padaria Pudim"
        style={{
          width: 'min(340px, 85vw)',
          borderRadius: 22,
          boxShadow: '0 4px 32px #eab67633',
          marginBottom: 14
        }}
      />
      <h1>Bem-vindo à <span style={{color:'#eab676'}}>Padaria Pudim</span>!</h1>
      <p style={{fontSize: '1.18rem', textAlign: 'center', maxWidth: 520}}>
        Delicie-se com nossos <strong>pudins</strong> e <strong>bolos caseiros</strong> preparados com carinho.<br/>
        Faça seu pedido online ou venha nos visitar!
      </p>
      <Link href="/produtos">
        <button style={{fontSize: '1.15rem', padding: '12px 38px', marginTop: 10}}>Ver Produtos</button>
      </Link>
      <section style={{
        background: '#fffbe7',
        borderRadius: 14,
        boxShadow: '0 1px 10px #f7c87322',
        padding: '32px 26px 20px',
        marginTop: 30,
        textAlign: 'center',
        maxWidth: 400
      }}>
        <h2>Contato</h2>
        <p>Rua dos Doces, 123 - Centro</p>
        <p>
          WhatsApp:&nbsp;
          <a href="https://wa.me/5511999999999" style={{color:'#a8651c', textDecoration:'underline'}}> (11) 99999-9999 </a>
        </p>
      </section>
    </main>
  )
}