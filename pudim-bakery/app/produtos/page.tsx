import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function ProdutosPage() {
  const produtos = await prisma.produto.findMany({
    orderBy: { criadoEm: 'desc' }
  })

  return (
    <main>
      <h1>Produtos</h1>
      <ul style={{display: 'flex', flexWrap: 'wrap', gap: 32, listStyle: 'none', padding: 0}}>
        {produtos.map(produto => (
          <li key={produto.id} style={{border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 260}}>
            <img src={produto.imagemUrl} alt={produto.nome} style={{width: '100%', borderRadius: 8}} />
            <h2>{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <strong>R$ {produto.preco.toFixed(2)}</strong>
          </li>
        ))}
      </ul>
    </main>
  )
}