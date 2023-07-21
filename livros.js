const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const livros = [
    {
    nome: "A menina que roubava livros",
    imagem: "https://intrinseca.com.br/blog/wp-content/uploads/2022/02/post-1.jpg",
    resumo: "The Book Thief é um drama do escritor australiano Markus Zusak, publicado em 2005 pela editora Picador. No Brasil e em Portugal, foi lançado pela Intrínseca e a Presença, respetivamente. O livro é sobre Liesel Meminger, uma garota que encontra a Morte três vezes durante 1939 e 1943 na Alemanha nazista. "
    },
    {
    nome: "A morte é um dia que vale a pena viver",
    imagem: "https://psicologapatriciafeiten.com/wp-content/uploads/2021/05/Resenha-do-livro-A-morte-e-um-dia-que-vale-a-pena-viver.jpg",
    resumo: "Cuidar de alguém é a maior vitória perante a doença e é um excelente motivo para procurar um novo olhar para a vida."
    },
]

function mostraLivros (request,response){
    response.json(livros)
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get("/livros", mostraLivros))
app.listen(porta, mostraPorta)