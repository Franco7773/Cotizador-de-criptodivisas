const Cotizador = new Api('52e6537d8e15f33401fa910879dcaab0194dd713855938f55fc149beeaeb19cd');
const Ui = new Interfaz();

Cotizador.obtenerMonedasAPI();

document.getElementById('formulario').addEventListener('submit', e => {
  e.preventDefault();
  // Leer la moneda seleccionada
  let moneda = document.getElementById('moneda');
  let monedaSelect = moneda.options[moneda.options.selectedIndex].value;

  let cryptoMoneda = document.getElementById('criptomoneda');
  let cryptoSelect = cryptoMoneda.options[cryptoMoneda.options.selectedIndex].value;

  if (monedaSelect === '' || cryptoSelect === '') {

    Ui.mostrarMensaje('Ambos campos son OBLIGATORIOS', 'alert bg-danger text-center');
    // window.location.reload();
  } else {
    // Todo bien, consultar a la API
    Cotizador.obtenerValores(monedaSelect, cryptoSelect)
      .then(data => {
        
        Ui.mostrarResultado(data.resultado.RAW, monedaSelect, cryptoSelect);
      });
  }
});
