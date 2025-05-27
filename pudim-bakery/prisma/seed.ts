import prisma from '../lib/prisma'

async function main() {
  await prisma.produto.createMany({
    data: [
      {
        nome: "Pudim Tradicional",
        descricao: "Pudim de leite condensado clássico, cremoso e delicioso.",
        preco: 35.00,
        imagemUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
      },
      {
        nome: "Pudim de Chocolate",
        descricao: "Uma versão irresistível com chocolate.",
        preco: 40.00,
        imagemUrl: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c"
      },
      {
        nome: "Bolo de Cenoura",
        descricao: "Bolo fofinho com cobertura de chocolate.",
        preco: 28.00,
        imagemUrl: "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb"
      }
    ]
  })
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())