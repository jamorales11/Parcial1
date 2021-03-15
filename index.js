const url = "./Assets/restaurant.json";

const atraparJson = fetch(url).then((res) => res.json());

const json = async () => {
  const x = await atraparJson;
  return x;
};

let elementosCarrito = [];
const nItems = document.getElementById("nItems");

json().then((json) => {
  const handleClick = (evt) => {
    const categoria = evt.path[0].textContent;

    document.getElementById("cards").innerHTML = "";

    for (let i = 0; i < json.length; i++) {
      if (json[i].name == categoria) {
        const h2Burguers = document.getElementById("nombreCategoria");
        h2Burguers.textContent = json[i].name;
        h2Burguers.style.borderTop = "solid";
        h2Burguers.style.borderBottom = "solid";
        h2Burguers.style.borderWidth = "0.1px";
        h2Burguers.style.borderColor = "#323a42";

        const cardsBurguers = document.getElementById("cards");
        const productos = json[i].products;

        for (let j = 0; j < productos.length; j++) {
          const producto = productos[j];
          let urlImagen = producto.image;
          let nombreProducto = producto.name;
          let descripcionProducto = producto.description;
          let precioProducto = producto.price;

          let htmlCard =
            "<div class='card' style='width: 18rem'><img src=" +
            urlImagen +
            " class='card-img-top' alt='Imagen " +
            nombreProducto +
            "' /><div class='card-body'><h5 class='card-title'>" +
            nombreProducto +
            "</h5><p class='card-text'>" +
            descripcionProducto +
            "</p><p id='precio' class='card-text'>$" +
            precioProducto +
            "</p><a id='botonPrecio' class='btn btn-primary'>Add to car</a></div></div>";
          let card = document.createElement("p");
          cardsBurguers.appendChild(card);
          card.outerHTML = htmlCard;
        }
      }
    }
    agregarAlCarrito();
  };

  const burguers = document.getElementById("burguers");
  burguers.addEventListener("click", handleClick);

  const tacos = document.getElementById("tacos");
  tacos.addEventListener("click", handleClick);

  const salads = document.getElementById("salads");
  salads.addEventListener("click", handleClick);

  const desserts = document.getElementById("desserts");
  desserts.addEventListener("click", handleClick);

  const drinks = document.getElementById("drinks");
  drinks.addEventListener("click", handleClick);
});

const agregarAlCarrito = () => {
  const cards = document.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    const handleAgregar = (evt) => {
      let nombreProdCar = evt.path[1].childNodes[0].textContent;
      let precioProdCar = parseFloat(
        evt.path[1].childNodes[2].textContent.slice(1)
      );
      const elemento = {
        item: elementosCarrito.length + 1,
        qty: 1,
        description: nombreProdCar,
        unitPrice: precioProdCar,
        amount: precioProdCar,
      };
      elementosCarrito.push(elemento);

      nItems.textContent = elementosCarrito.length + " items";
    };

    cards[i].childNodes[1].childNodes[3].addEventListener(
      "click",
      handleAgregar
    );
  }
};

const carrito = document.getElementById("carritoIcon");

const handleCarrito = () => {
  const titulo = document.getElementById("nombreCategoria");
  titulo.textContent = "Order detail";
  titulo.style.borderTop = "solid";
  titulo.style.borderBottom = "solid";
  titulo.style.borderWidth = "0.1px";
  titulo.style.borderColor = "#323a42";

  //creando tabla
  const seccionCentral = document.getElementById("cards");
  seccionCentral.innerHTML = "";
  const tablehtml =
    "<table id='tabla' class='table table-striped'><thead><tr id='encabezado'><th scope='col'>Item</th><th scope='col'>Qty</th><th scope='col'>Description</th><th scope='col'>Unit Price</th><th scope='col'>Amount</th><th scope='col'>Modify</th></tr></thead><tbody id='cuerpoTabla'></tbody></table>";
  const nuevaTabla = document.createElement("p");
  seccionCentral.appendChild(nuevaTabla);
  nuevaTabla.outerHTML = tablehtml;

  const handleCantidad = (evt) => {
    fila = evt.path[2];
    indexElemento = elementosCarrito.findIndex(
      (e) => e.description === evt.path[2].childNodes[2].textContent
    );

    if (evt.path[0].textContent === "+") {
      elementosCarrito[indexElemento].qty += 1;
      elementosCarrito[indexElemento].amount +=
        elementosCarrito[indexElemento].unitPrice;
    } else {
      if (elementosCarrito[indexElemento].qty > 0) {
        elementosCarrito[indexElemento].qty -= 1;
        elementosCarrito[indexElemento].amount -=
          elementosCarrito[indexElemento].unitPrice;
      }
      if (elementosCarrito[indexElemento].qty == 0) {
        elementosCarrito.splice(indexElemento, 1);
        nItems.textContent = elementosCarrito.length + " items";
      }
    }

    handleCarrito();
  };

  let precioTotal = 0;

  for (let i = 0; i < elementosCarrito.length; i++) {
    let elemento = elementosCarrito[i];
    let item = elemento.item;
    let qty = elemento.qty;
    let description = elemento.description;
    let unitPrice = elemento.unitPrice;
    let amount = elemento.amount;

    const bodyTabla = document.getElementById("cuerpoTabla");
    const fila = document.createElement("tr");
    bodyTabla.appendChild(fila);

    const itemTb = document.createElement("th");
    itemTb.textContent = item;
    fila.appendChild(itemTb);

    const qtyTb = document.createElement("td");
    qtyTb.textContent = qty;
    fila.appendChild(qtyTb);

    const descriptionTb = document.createElement("td");
    descriptionTb.textContent = description;
    fila.appendChild(descriptionTb);

    const priceTb = document.createElement("td");
    priceTb.textContent = unitPrice;
    fila.appendChild(priceTb);

    const amountTb = document.createElement("td");
    amountTb.textContent = amount;
    precioTotal += parseFloat(amount);
    fila.appendChild(amountTb);

    const modifyTb = document.createElement("td");
    idBotonMas = "butMas" + i;
    idBotonMenos = "butMenos" + i;
    const botones =
      "<button type='button' class='btn btn-secondary' id='" +
      idBotonMas +
      "'>+</button><button type='button' class='btn btn-secondary' id='" +
      idBotonMenos +
      "'>-</button>";

    modifyTb.innerHTML = botones;

    fila.appendChild(modifyTb);
    document
      .getElementById(idBotonMas)
      .addEventListener("click", handleCantidad);
    document
      .getElementById(idBotonMenos)
      .addEventListener("click", handleCantidad);
  }

  const rowBotones = document.createElement("p");
  seccionCentral.appendChild(rowBotones);
  rowBotones.outerHTML =
    "<div class='row'><div class ='col-9'><p><strong>Precio $" +
    precioTotal +
    "</strong></p></div><div class ='col-3'><button type='button' class='btn btn-rojo' id='cancel' data-bs-toggle='modal' data-bs-target='#staticBackdrop'>Cancel</button><button type='button' class='btn btn-outline-secondary' id='confirm'>Confirm order</button></div></div>";

  const handleConfirmar = () => {
    console.log(elementosCarrito);
  };

  document.getElementById("confirm").addEventListener("click", handleConfirmar);

  const handleCancelar = () => {
    elementosCarrito.splice(0, elementosCarrito.length);
    handleCarrito();
    nItems.textContent = elementosCarrito.length + " items";
  };

  document
    .getElementById("yesCancel")
    .addEventListener("click", handleCancelar);
};

carrito.addEventListener("click", handleCarrito);
