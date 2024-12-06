const express = require('express')
const app = express()
const port = 3000

const routers_gatti = require("./routers/routers_gatti.js") //routers
const not_found_middleware = require("./middlewares/not_found_middleware.js") //middlewares
const logger_middleware = require("./middlewares/logger_middleware.js")

//per quando usiamo "post" per leggere il formato json
app.use(express.json())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// middleware to trigger a 500 error
/* app.use('/gatti', (req, res, next) => {
    throw new Error("You broke everything dude! 💥");
}); */

app.use("/gatti", logger_middleware)

app.use('/gatti', routers_gatti)

app.use(not_found_middleware)

// Last middleware to handle errors
/* app.use((err, req, res, next) => {
    console.log("Error: ", err.message);
    // this prints the stack trace of the error
    console.error(err.stack);
    res.status(500).send({
      message: "Something went wrong",
      error: err.message
    })
}); */


