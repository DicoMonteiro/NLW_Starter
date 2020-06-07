// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()


// iniciar o objeto de banco de dados
// que irá fazer conexoes na database
const db =  new sqlite3.Database("./src/database/database.db")

module.exports = db
// utilizar o objeto de bando de dados, para nossas operações
// db.serialize( () => {
//     // com comandos SQL:
    
//     // 1 - Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id  INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // 2 -Inserir dados na tabela
//     const query = `
//             INSERT INTO places (
//                 image,
//                 name,
//                 address,
//                 address2,
//                 state,
//                 city,
//                 items
//             ) VALUES (
//                 ?,?,?,?,?,?,?
//             ); 
//         `
//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     // Função criada para retornar após a execução da query
//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }
    
//     // db.run(query, values, afterInsertData)

//     // 3 - Consultar dados na tabela
//     db.all(`SELECT * FROM places`, function(err, rows) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Aqui estão os registros")
//         console.log(rows)
//     })


//     // 4 - Deletar dados na tabela
//     // db.run(`DELETE FROM places WHERE id=?`, [3], function(err) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("Registro deletado com sucesso!")
//     // })

//     // 3 - Consultar dados na tabela
//     // db.all(`SELECT * FROM places`, function(err, rows) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("Aqui estão os registros")
//     //     console.log(rows)
//     // })

//     // Atualizar dados na tabela
// })