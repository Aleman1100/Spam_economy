//Usar el paquete nodemailer para el envío de correos electrónicos. (3 Puntos)
const nodemailer = require('nodemailer')

// Crear una función que reciba la lista de correos, asunto y contenido a enviar. Esta
// función debe retornar una promesa. (1 Punto)
async function enviar(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'desafioLatamg13@gmail.com',
        pass: 'desafiolatam2022*',
        },
    })

    let mailOptions = {
        from: 'desafioLatamg13@gmail.com',
        to,
        subject,
        text,
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(err)
        if (data) console.log(data)
    })
}
// Paso 2
module.exports = enviar
