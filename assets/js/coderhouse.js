class licencia {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  ObtenerIVA() {
    return parseInt(this.price * 1.21);
  }
}

let licencias = [];
licencias.push(new licencia("Limited Lease", 29.99));
licencias.push(new licencia("Trackout Lease", 79.99));
licencias.push(new licencia("Unlimited Lease", 149.99));

function ejecutarCODERHOUSE() {
  let txtAskLeases =
    "A continuación, selecciona el tipo de licencia que querés:\n\n";

  licencias.forEach((element, index) => {
    txtAskLeases += "   " + (index + 1) + ". " + element.name + "\n";
  });

  let selLease = parseInt(prompt(txtAskLeases));

  let precioNormal = 0;

  if (selLease >= 1 && selLease <= licencias.length) {
    precioNormal = licencias[selLease - 1].price;
  } else {
    alert("Necesitamos que selecciones una opción para continuar");
  }

  if (precioNormal > 0) {
    alert(
      "Elegiste " +
        licencias[selLease - 1].name +
        ", que vale $" +
        licencias[selLease - 1].price +
        ".\n" +
        "Con el impuesto IVA, el precio se va a $" +
        licencias[selLease - 1].ObtenerIVA()
    );
  }
}
