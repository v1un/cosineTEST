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
      <form onSubmit={handleSubmit}>
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{marginLeft: 8}}
          />
        </label>
        <button type="submit" style={{marginLeft: 8}}>Entrar</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </main>
  )
}