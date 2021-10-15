// si estás viendo esto significa que me falta terminarlo :'(

class licencia {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  ObtenerIVA() {
    return this.price * 1.21;
  }
}

let licencias = [];
licencias.push(new licencia("Limited Lease", 29.99));
licencias.push(new licencia("Trackout Lease", 79.99));
licencias.push(new licencia("Unlimited Lease", 149.99));

function ejecutarCODERHOUSE() {
  let selLease = parseInt(
    prompt(
      "A continuación, selecciona el tipo de licencia que querés:\n\n" +
        "   1. Limited Lease\n" +
        "   2. Trackout Lease\n" +
        "   3. Unlimited Lease"
    )
  );

  let precioNormal = 0;

  if (selLease >= 1 && selLease <= 3) {
    switch (selLease) {
      case 1:
        precioNormal = 29.99;
      case 2:
        precioNormal = 79.99;
      case 3:
        precioNormal = 149.99;
    }
  } else {
    alert("Necesitamos que selecciones una opción para continuar");
  }

  /* if (precioNormal > 0) {
      
  } */
}
