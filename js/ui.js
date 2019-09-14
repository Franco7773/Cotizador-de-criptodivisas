class Interfaz {

  constructor() {

    this.init();
  }
  init() {

    this.construirSelect();
  }
  
  construirSelect() {
// for( [key, value] of Object.entries(monedas.monedas.Data))
    Cotizador.obtenerMonedasAPI()
      .then(monedas => {
        // Crear un select de opciones
        let select = document.getElementById('criptomoneda');
        
        let obj = Object.entries(monedas.monedas.Data);
        // Iterar los resultados de la API
        for(let i = 0; i < obj.length; i++) {
          let v = obj[i][1];
          // Añadir el Symbol y el nombre como opciones
          let opcion = document.createElement('option');

          opcion.value = v.Symbol;
          opcion.appendChild(document.createTextNode(v.CoinName));

          select.appendChild(opcion);
        }
      })
  }
  
  mostrarMensaje(msj, clases) {

    let div = document.createElement('div');
    div.className = clases;
    div.appendChild(document.createTextNode(msj));
    // Seleccionar mensaje
    let divMensaje = document.querySelector('.mensaje');
    divMensaje.appendChild(div);
    // Mostar contenido
    setTimeout(() => {

      document.querySelector('.mensaje div').remove();
    }, 3000);
  }

  // Imprimir resultado de la cotizacion
  mostrarResultado(resultado, moneda, crypto) {
    // En caso de un resultado anterior, ocultar
    let resultadoAnterior = document.querySelector('#resultado > div');
    
    if (resultadoAnterior) {
      
      resultadoAnterior.remove();
    }

    let datosMoneda = resultado[crypto][moneda];
    // Recortar digitos de precio
    let precio = datosMoneda.PRICE.toFixed(2),
        porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
        actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');
    // Construir el template
    let templateHTML = `
      <div class="card bg-warning">
        <div class="card-body text-light">
          <h2 class="card-title">Resultado:</h2>
          <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: ${precio}</p>
          <p>Variación último día: ${porcentaje}%</p>
          <p>Última actualización: ${actualizado}</p>
        </div>
      </div>
    `;
    // Insertar el resultado
    this.mostrarSpinner();
    
    setTimeout(() => {
      
      this.mostrarSpinner('none');
      document.querySelector('#resultado').innerHTML = templateHTML;
    }, 3000);
  }
  // Mostrar un Spinner de carga al enviar la cotizacón.
  mostrarSpinner(display = 'block') {

    let spinner = document.querySelector('.contenido-spinner');
    spinner.style.display = display;
  }
}
