class Api {

  constructor(apikey) {

    this.apikey = apikey;
  }
  // Obtener todas las monedas
  async obtenerMonedasAPI() {

    let url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;
    // fetch a la API
    let urlObtenerMonedas = await fetch(url);
    // Respuesta en JSON
    let monedas = await urlObtenerMonedas.json();

    return { monedas };
  }

  async obtenerValores(moneda, crypto) {

    let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`;
    // Consultar en rest api
    let urlConvertir = await fetch(url);
    // Respuesta en JSON
    let resultado = await urlConvertir.json();

    return {
      resultado
    };
  }
}
