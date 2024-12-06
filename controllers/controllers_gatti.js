/* const gatti = require("../db/db_gatti.js") */
//serve per aggiornare il contenuto del file db
/* const fs = require("fs") */

//INIZIO NUOVO ESERCIZIO
//importiamo il file di connessione al database
const connection = require("../db/db.js");

//INDEX
function indexxx(req, res) {
    //prepariamo la query
    const sql = `SELECT * FROM posts`
    //eseguiamo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "database query failed" });
        res.json(results)
    })
}










//VECCHIO ESERCIZIO
//1-mostro tutta l'array di oggetti
const index = (req, res) => {
    res.json({
        data: gatti,
        count: gatti.length
    })
}


//1-A-mostro solo un oggetto dell'array cercando per nome
const show = (req, res) => {
    const gatto = gatti.find((gatto) => gatto.nome.toLowerCase() === req.params.nome)

    if (!gatto) {
        return res.status(404).json({
            error: `Gatto non trovato: ${req.params.nome}`
        })
    }
    return res.status(200).json({ data: gatto })
}


//2-aggiungo un oggetto all'array
const store = (req, res) => {
    const gatto = {
        nome: req.body.nome,
        colore: req.body.colore,
        eta: req.body.eta
    }
    gatti.push(gatto)

    //aggiorno il contenuto dell'array permanentemente del file db
    fs.writeFileSync("./db/db_gatti.js", `module.exports = ${JSON.stringify(gatti, null, 4)}`)

    return res.status(201).json({
        status: 201,
        data: gatti,
        count: gatti.length
    })
}


//3-modifico un oggetto dall'array
const update = (req, res) => {
    const gatto = gatti.find(gatto => gatto.nome.toLowerCase() === (req.params.nome))

    if (!gatto) {
        return res.status(404).json({
            error: `Gatto non trovato: ${req.params.nome}`
        })
    }

    gatto.nome = req.body.nome
    gatto.colore = req.body.colore
    gatto.eta = req.body.eta

    //aggiorno il contenuto dell'array permanentemente del file db
    fs.writeFileSync("./db/db_gatti.js", `module.exports = ${JSON.stringify(gatti, null, 4)}`)

    res.status(200).json({
        status: 200,
        data: gatti
    })
}


//3-elimino un oggetto dell'array
const destroy = (req, res) => {
    const gatto = gatti.find(gatto => gatto.nome.toLowerCase() === (req.params.nome))

    if (!gatto) {
        return res.status(404).json({
            error: `Gatto non trovato: ${req.params.nome}`
        })
    }

    const new_gatti = gatti.filter(gatto => gatto.nome.toLowerCase() !== (req.params.nome))

    //aggiorno il contenuto dell'array permanentemente del file db
    fs.writeFileSync("./db/db_gatti.js", `module.exports = ${JSON.stringify(new_gatti, null, 4)}`)

    res.status(200).json({
        status: 200,
        data: new_gatti,
        count: new_gatti.length
    })
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}