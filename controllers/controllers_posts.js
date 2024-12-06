//INIZIO NUOVO ESERCIZIO
//importiamo il file di connessione al database
const connection = require("../db/db.js");

//INDEX
function index(req, res) {
    //prepariamo la query
    const sql = `SELECT * FROM posts`;
    //eseguiamo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "database query failed" });
        res.json(results)
    })
}

//SHOW
function show(req, res) {
    //recuperiamo l'id dall'url
    const id = req.params.id
    //prepariamo la query
    const sql = `SELECT * FROM posts WHERE id = ?`;
    //eseguiamo la query
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "database query failed" });
        if (results.length === 0) return res.status(404).json({ error: "post not found" });
        res.json(results[0]);
    })
}

//DESTROY
function destroy(req, res) {
    //recuperiamo l'id dall'url
    const id = req.params.id
    //eseguiamo la query per eliminare il post
    connection.query(`DELETE FROM posts WHERE id = ?`, [id], (err) => {
        if (err) return res.status(500).json({ error: "failed to delete post" });
        res.sendStatus(204)
    })
    console.log(id);

}

module.exports = {
    index,
    show,
    destroy
}