import prisma from '../../lib/prisma'

export default async function ProdutosPage() {
  const produtos = await prisma.produto.findMany({
    orderBy: { criadoEm: 'desc' }
  })

  return (
    <main>
      <h1>Nossos Produtos</h1>
      <ul className="product-list">
        {produtos.map(produto => (
          <li className="product-card" key={produto.id}>
            <img src={produto.imagemUrl} alt={produto.nome} />
            <h2 style={{marginBottom: 0}}>{produto.nome}</h2>
            <p style={{margin: '7px 0 0', color: '#7d4c18', textAlign: 'center', fontSize: '1.02rem', minHeight: 40}}>
              {produto.descricao}
            </p>
            <div className="product-price">
              R$ {produto.preco.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}