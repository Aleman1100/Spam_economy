const enviar = require('./mailer')
const getIndicadores = require('./indicadores')
const url = require('url')
const http = require('http')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

http
    .createServer(function (req, res) {
        const {correos,asunto,contenido} = url.parse(req.url, true).query
        
        if (req.url == '/') {
            res.setHeader('content-type', 'text/html')
            fs.readFile('index.html','utf8', (err,data) => {
                res.end(data)
            })
        }

        if (req.url.startsWith('/mailing')) { 
            getIndicadores().then((template) => {
                if (correos.includes(",")) {
                    enviar(correos.split(','), asunto, contenido + template).then((err,data) => {
                        // Enviar un mensaje de éxito o error por cada intento de envío de correos electrónicos. (2 Puntos)
                        if (err){
                            res.write(`Correos no enviados a ${correos}, revisar datos ingresados`)
                            res.end()
                        } else {
                            res.write(`Correos enviados con exito a ${correos}`)
                            res.end()
                        }
                        let respaldo = `Correos: ${correos} - 
                        Asunto: ${asunto} -
                        Contenido: ${contenido} - 
                        Template: ${template}
                        `
                        let id = uuidv4().slice(15)
                        console.log(respaldo)
                        fs.mkdir("./correos", () => {
                            fs.writeFile(`./correos/${id}.txt`, respaldo, "utf-8" ,() => {
                                console.log(`Correo respaldo con id ${id}`)
                            })
                        })
                    })
                }
            })
        }        
           
})
.listen(3000, () => console.log('UP'))