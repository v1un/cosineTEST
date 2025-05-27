'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
      window.location.href = '/admin'
    } else {
      setError('Senha incorreta!')
    }
  }

  return (
    <main>
      <h1>Login do Administrador</h1>
      <form onSubmit={handleSubmit} style={{
        maxWidth: 360,
        margin: '0 auto',
        background: '#fffbe7',
        borderRadius: 16,
        boxShadow: '0 2px 12px #f7c87322',
        padding: '32px 24px 24px'
      }}>
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" style={{width: '100%', margin: '16px 0 0'}}>Entrar</button>
      </form>
      {error && <div className="error-message" role="alert">{error}</div>}
    </main>
  )
}