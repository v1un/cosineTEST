'use client'

import { useState, useEffect } from 'react'

type Produto = {
  id: number
  nome: string
  descricao: string
  preco: number
  imagemUrl: string
}

export default function AdminPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Produto | null>(null)
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '', imagemUrl: '' })

  // Simple "isLoggedIn" check using a cookie (demo only)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isLoggedIn = document.cookie.split(';').some(cookie => cookie.trim().startsWith('admin=1'))
      if (!isLoggedIn) window.location.href = '/admin/login'
    }
  }, [])

  useEffect(() => {
    fetch('/api/produtos').then(res => res.json()).then(setProdutos).finally(() => setLoading(false))
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleEdit(produto: Produto) {
    setEditing(produto)
    setForm({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco.toString(),
      imagemUrl: produto.imagemUrl
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editing ? 'PUT' : 'POST'
    const body = JSON.stringify({
      ...form,
      preco: parseFloat(form.preco),
      id: editing?.id
    })
    await fetch('/api/produtos', { method, body, headers: {'Content-Type': 'application/json'} })
    setEditing(null)
    setForm({ nome: '', descricao: '', preco: '', imagemUrl: '' })
    setLoading(true)
    fetch('/api/produtos').then(res => res.json()).then(setProdutos).finally(() => setLoading(false))
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return
    await fetch('/api/produtos?id=' + id, { method: 'DELETE' })
    setLoading(true)
    fetch('/api/produtos').then(res => res.json()).then(setProdutos).finally(() => setLoading(false))
  }

  return (
    <main>
      <h1>Produtos</h1>
      <form onSubmit={handleSubmit} style={{marginBottom: 32, borderBottom: '1px solid #ccc', paddingBottom: 16}}>
        <h2>{editing ? 'Editar Produto' : 'Adicionar Produto'}</h2>
        <div>
          <label>Nome<br/>
            <input name="nome" value={form.nome} onChange={handleChange} required style={{width: '100%'}} />
          </label>
        </div>
        <div>
          <label>Descrição<br/>
            <textarea name="descricao" value={form.descricao} onChange={handleChange} required style={{width: '100%'}} />
          </label>
        </div>
        <div>
          <label>Preço (R$)<br/>
            <input name="preco" value={form.preco} onChange={handleChange} type="number" min="0" step="0.01" required style={{width: '100%'}} />
          </label>
        </div>
        <div>
          <label>URL da Imagem<br/>
            <input name="imagemUrl" value={form.imagemUrl} onChange={handleChange} required style={{width: '100%'}} />
          </label>
        </div>
        <button type="submit">{editing ? 'Salvar Alterações' : 'Adicionar'}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ nome: '', descricao: '', preco: '', imagemUrl: '' }) }}>Cancelar</button>}
      </form>
      {loading ? <p>Carregando...</p> : (
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id}>
                <td><img src={produto.imagemUrl} alt={produto.nome} style={{width: 56, borderRadius: 8}} /></td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>R$ {produto.preco.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleEdit(produto)}>Editar</button>
                  <button onClick={() => handleDelete(produto.id)} style={{color: 'red'}}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}