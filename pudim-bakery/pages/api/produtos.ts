import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const produtos = await prisma.produto.findMany({ orderBy: { criadoEm: 'desc' } })
    return res.status(200).json(produtos)
  }
  if (req.method === 'POST') {
    const { nome, descricao, preco, imagemUrl } = req.body
    const novo = await prisma.produto.create({
      data: { nome, descricao, preco, imagemUrl }
    })
    return res.status(201).json(novo)
  }
  if (req.method === 'PUT') {
    const { id, nome, descricao, preco, imagemUrl } = req.body
    const atualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: { nome, descricao, preco, imagemUrl }
    })
    return res.status(200).json(atualizado)
  }
  if (req.method === 'DELETE') {
    const id = Number(req.query.id)
    await prisma.produto.delete({ where: { id } })
    return res.status(204).end()
  }
  res.status(405).end()
}