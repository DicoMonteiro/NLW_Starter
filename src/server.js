// Express pacote de gerenciamento de servidor e outras coisas.
const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// configurar pasta publica para ele enxergar os css da aplicação
server.use(express.static("public"))


// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",  {
    express: server,
    noCache: true
})


// configurar caminhos/rotas da minha aplicação
// página inicial
// req : requisição
// res : response
server.get("/", (req, res) => {
    // res.sendFile(__dirname + "/views/index.html")
    return res.render("index.html", { title: "Seu marketplace de coleta de resíduos." })
})

// rota de criação do ponto
// Utilizando o render, já é interpretado que existe uma configuração anterior no nunjucks(express) para executar
server.get("/create-point", (req, res) => {
    // res.sendFile(__dirname + "/views/create-point.html")
    // req.query: Query String da nossa url
    console.log(req.query)


    return res.render("create-point.html")
})


server.post("/savepoint", (req, res) => {
    // req.body: O corpo do nosso fomrulário
    // console.log(req.body)

    // Inserir dados no banco de dados
    const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (
                ?,?,?,?,?,?,?
            ); 
        `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.uf,
        req.body.city,
        req.body.items
    ]

    // Função criada para retornar após a execução da query
    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
    
    db.run(query, values, afterInsertData)

})


server.get("/search", (req, res) => {
    // res.sendFile(__dirname + "/views/create-point.html")
    const search = req.query.search
    
    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    // pegar os registro no bando de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length

        // console.log("Aqui estão os registros")
        // console.log(rows)



        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })
})

// ligar o servidor
server.listen(3000)