const express = require("express")
const router = express.Router()
const {v4: uuidv4} = require ("uuid")
const cors = require('cors')


const conectaBancoDeDados = require("./bancoDeDados")
conectaBancoDeDados()

const app = express()
app.use(express.json())
app.use(cors())
const porta = 3333

const livro = require("./livroModel")

//GET
async function mostraLivros (request,response){
    try{
        const livrosVindosDoBancoDeDados = await livro.find()
        response.json(livrosVindosDoBancoDeDados)
    } catch(erro){
        console.log(erro)
    }
    
}
//POST
async function criaLivro (request, response){
    const novoLivro = new livro ({
        nome: request.body.nome,
        imagem: request.body.imagem,
        resumo: request.body.resumo
    })
    try{
        const livroCriado = await novoLivro.save()
        response.status(201).json(livroCriado)
    } catch(erro){
        console.log(erro)
    }        
}
//PATCH
async function corrigeLivro (request, response){
    try{
        const livroEncontrado = await livro.findById(request.params.id)

        if (request.body.nome){
            livroEncontrado.nome = request.body.nome
        }
        if (request.body.imagem){
            livroEncontrado.imagem = request.body.imagem
        }
        if (request.body.resumo){
            livroEncontrado.resumo = request.body.resumo
        }
        const livroAtualizadoNoBancoDeDados = await livroEncontrado.save()

        response.json(livroAtualizadoNoBancoDeDados)

    } catch(erro){
        console.log(erro)
    }   
}
//DELETE
async function deletarLivro (request, response){
    try{
        await livro.findByIdAndDelete(request.params.id)
        response.json({mensagem: "Livro deletado com sucesso!"})

    } catch (erro) {
        console.log(erro)
    }
}
//PORTA
function mostraPorta(){
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get("/livros", mostraLivros))
app.use(router.post("/livros", criaLivro))
app.use(router.patch("/livros/:id", corrigeLivro))
app.use(router.delete("/livros/:id", deletarLivro))
app.listen(porta, mostraPorta)