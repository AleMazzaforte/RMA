

document.querySelector('form').addEventListener('submit', function(e) {
    const monedaSelect = document.getElementById('moneda');
    
    if (monedaSelect.value === '') {
      e.preventDefault(); // Evita el envío del formulario
      alert('Por favor, selecciona una moneda válida.');
    }
  });
  