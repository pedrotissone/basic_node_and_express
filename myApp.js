let express = require('express');
let app = express();

let bodyParser = require("body-parser")

//Ejercicio 2 serve a string

// app.get("/", (req, res) => {
//   res.send("hola mundo");
// })

//Ejercicio 7 (hay que usarlo aca para que se ejecute antes)
//Use the next() function as a third argument to get de method path and ip of any request
app.use((request, response, next) => {
  console.log(request.method + " " + request.path + " - " + request.ip)
  next()
})

//Ejercicio 3 serve HTML File using de get method

app.get("/", (req, res) =>{
  res.sendFile(__dirname + "/views/index.html")
})

//Ejercicio 4 serve static assets

//Primero montas el middleware con el metodo app.use() indicando el path en el que se va a utilizar y luego el middleware en cuestion con el path absoluto a la carpeta de archivos estaticos

app.use("/public", express.static(__dirname + "/public"))

//Ejercicio 5 Serve JSON on a specific route (create a simple REST (Representation State Transfer) API to transfer data)
// app.get("/json", (req, res) => {
//   res.json({"message": "Hello json"})
// })

//Ejercicio 6 create a .env file and set the variable MESSAGE_STYLE to uppercase and use if statement to change the response
app.get("/json", (req, res) => {
  if(process.env.MESSAGE_STYLE == "uppercase"){
    res.json({"message": "HELLO JSON"})
  } else{
     res.json({"message": "Hello json"})    
  } 
})

//Ejercicio 8 Chain Middleware to Create a Time Server
app.get("/now", (req, res, next) => {
  req.time = new Date().toString()
  console.log(req.time)
  next()
}, (req, res) => {
  res.json({"time": req.time})
})

//Ejercicio 9 Get route parameter input from the client
app.get("/:word/echo", (req, res) => {
  console.log(req.params)
  res.json({"echo": req.params.word})  
})

//Ejercicio 10 query parameter input from the client

// app.get("/name", (req, res) => {
//   let firstname = req.query.first
//   let lastname = req.query.last
//   console.log(firstname + " " + lastname)
//   res.json({"name": firstname + " " + lastname})
  
// })

//Ejercicio 11 montamos el middleware de body parser

// app.use(bodyParser.urlencoded({extended: false}), (req, res, next)=> {
  
// })

//Ejercicio 12 obtener datos del form atraves del metodo req.body

app.post("/name", bodyParser.urlencoded({extended: false}), (req, res) => {
  console.log("hola post")  
  let firstname = req.body.first
  let lastname = req.body.last
  res.json({"name": firstname + " " + lastname})
})





































 module.exports = app;
