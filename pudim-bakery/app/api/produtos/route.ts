import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const produtos = await prisma.produto.findMany({ orderBy: { criadoEm: 'desc' } })
  return NextResponse.json(produtos)
}

export async function POST(req: NextRequest) {
  const { nome, descricao, preco, imagemUrl } = await req.json()
  const novo = await prisma.produto.create({
    data: { nome, descricao, preco, imagemUrl }
  })
  return NextResponse.json(novo, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const { id, nome, descricao, preco, imagemUrl } = await req.json()
  const atualizado = await prisma.produto.update({
    where: { id: Number(id) },
    data: { nome, descricao, preco, imagemUrl }
  })
  return NextResponse.json(atualizado)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))
  await prisma.produto.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}