import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({ orderBy: { criadoEm: 'desc' } })
    return NextResponse.json(produtos)
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao buscar produtos.' }, { status: 500 })
  }
}

function isAdmin(req: NextRequest): boolean {
  // Check for admin cookie
  const cookie = req.cookies.get('admin')
  return cookie?.value === '1'
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { nome, descricao, preco, imagemUrl } = await req.json()
    if (!nome || !descricao || !preco || !imagemUrl) return NextResponse.json({ error: 'Dados obrigatórios faltando.' }, { status: 400 })
    const novo = await prisma.produto.create({
      data: { nome, descricao, preco: Number(preco), imagemUrl }
    })
    return NextResponse.json(novo, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erro ao criar produto.' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id, nome, descricao, preco, imagemUrl } = await req.json()
    if (!id || !nome || !descricao || !preco || !imagemUrl) return NextResponse.json({ error: 'Dados obrigatórios faltando.' }, { status: 400 })
    const atualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: { nome, descricao, preco: Number(preco), imagemUrl }
    })
    return NextResponse.json(atualizado)
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar produto.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { searchParams } = new URL(req.url)
    const id = Number(searchParams.get('id'))
    if (!id) return NextResponse.json({ error: 'ID não informado.' }, { status: 400 })
    await prisma.produto.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: 'Erro ao excluir produto.' }, { status: 500 })
  }
}