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
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Simple "isLoggedIn" check using a cookie (demo only)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isLoggedIn = document.cookie.split(';').some(cookie => cookie.trim().startsWith('admin=1'))
      if (!isLoggedIn) window.location.href = '/admin/login'
    }
  }, [])

  function fetchProdutos() {
    fetch('/api/produtos').then(res => res.json()).then(setProdutos).finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProdutos()
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
    setError(null)
    setSuccess(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const method = editing ? 'PUT' : 'POST'
    const body = JSON.stringify({
      ...form,
      preco: parseFloat(form.preco),
      id: editing?.id
    })
    try {
      const res = await fetch('/api/produtos', { method, body, headers: {'Content-Type': 'application/json'} })
      if (!res.ok) throw new Error('Erro ao salvar produto.')
      setSuccess(editing ? 'Produto atualizado!' : 'Produto adicionado!')
      setEditing(null)
      setForm({ nome: '', descricao: '', preco: '', imagemUrl: '' })
      setLoading(true)
      fetchProdutos()
    } catch {
      setError('Erro ao salvar produto.')
    }
  }

  async function handleDelete(id: number) {
    setError(null)
    setSuccess(null)
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return
    try {
      const res = await fetch('/api/produtos?id=' + id, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setSuccess('Produto excluído!')
      setLoading(true)
      fetchProdutos()
    } catch {
      setError('Erro ao excluir produto.')
    }
  }

  return (
    <main>
      <h1>Gerenciar Produtos</h1>
      <form onSubmit={handleSubmit} style={{
        marginBottom: 36,
        background: '#fffbe7',
        borderRadius: 16,
        boxShadow: '0 1px 10px #f7c87312',
        padding: '32px 24px 24px',
        border: '1.5px solid #ffe3be'
      }}>
        <h2 style={{marginTop:0, marginBottom:12}}>
          {editing ? 'Editar Produto' : 'Adicionar Produto'}
        </h2>
        <div>
          <label>
            Nome
            <input name="nome" value={form.nome} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Descrição
            <textarea name="descricao" value={form.descricao} onChange={handleChange} required rows={2} />
          </label>
        </div>
        <div>
          <label>
            Preço (R$)
            <input name="preco" value={form.preco} onChange={handleChange} type="number" min="0" step="0.01" required />
          </label>
        </div>
        <div>
          <label>
            URL da Imagem
            <input name="imagemUrl" value={form.imagemUrl} onChange={handleChange} required />
          </label>
        </div>
        <div style={{display:'flex', gap:12, marginTop:14}}>
          <button type="submit">{editing ? 'Salvar Alterações' : 'Adicionar'}</button>
          {editing && (
            <button type="button"
              style={{background:'#ffe3be', color:'#a8651c', border:'1px solid #eab676'}}
              onClick={() => { setEditing(null); setForm({ nome: '', descricao: '', preco: '', imagemUrl: '' }) }}>
              Cancelar
            </button>
          )}
        </div>
        {success && <div className="error-message" style={{background:'#54d66b', color:'#fff', marginTop:10}}>{success}</div>}
        {error && <div className="error-message" role="alert">{error}</div>}
      </form>
      {loading ? <p style={{color:'#a8651c', fontWeight:600}}>Carregando...</p> : (
        <div style={{overflowX: 'auto'}}>
        <table>
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
                <td>
                  <img src={produto.imagemUrl} alt={produto.nome}
                    style={{width: 56, borderRadius: 8, boxShadow:'0 1px 6px #eab67622'}} />
                </td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td><span className="product-price" style={{padding:'4px 10px', fontSize:'0.98rem'}}>
                  R$ {produto.preco.toFixed(2)}
                </span></td>
                <td>
                  <button onClick={() => handleEdit(produto)} style={{marginRight:7}}>Editar</button>
                  <button onClick={() => handleDelete(produto.id)}
                    style={{background:'#d66b4f', color:'#fff', margin:'0'}}
                  >Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </main>
  )
}