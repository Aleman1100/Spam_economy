// Realizar una petición a la api de mindicador.cl y preparar un template que incluya los
// valores del dólar, euro, uf y utm. Este template debe ser concatenado al mensaje
// descrito por el usuario en el formulario HTML. (2 Puntos)
const axios = require ('axios')

async function getIndicadores() {
    const { data } = await axios.get("https://mindicador.cl/api");
    let template = `\n\rHola! Los indicadores economicos de hoy son los siguientes:
    El valor del dolar hoy es : ${data.dolar.valor}
    El valor del euro hoy es : ${data.euro.valor}
    El valor de la UF hoy es : ${data.uf.valor}
    El valor de la UTM hoy es : ${data.utm.valor}
    `
    return template;
  }

module.exports = getIndicadores