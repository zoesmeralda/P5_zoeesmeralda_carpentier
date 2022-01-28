let products = [];
let produitLocalStorage = JSON.parse(localStorage.getItem("product"));
var DivEmpty = document.querySelector("#cart__items");
//affichage panier
function getCart() {
  // Si le panier est vide
  if (produitLocalStorage == null || produitLocalStorage === 0) {
    let CartVide = `<p>Votre panier est vide</p>`;
    document.getElementById("cart__items").innerHTML = CartVide;

    //si le panier est rempli
  } else {
    for (let product in produitLocalStorage) {
      let produitArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(produitArticle);
      produitArticle.className = "cart__item";
      produitArticle.setAttribute(
        "data-id",
        produitLocalStorage[product].id,
        "data-color",
        produitLocalStorage[product]
      );
      console.log(
        produitLocalStorage[product].id,
        product.id,
        "test",
        produitLocalStorage,
        product
      );
      // Insertion "div"
      let productDivImg = document.createElement("div");
      produitArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";

      // Insertion de l'image
      let imageProduit = document.createElement("img");
      productDivImg.appendChild(imageProduit);
      imageProduit.src = produitLocalStorage[product].image;
      console.log(imageProduit);
      // Insertion "div"
      let produitItemContent = document.createElement("div");
      produitArticle.appendChild(produitItemContent);
      produitItemContent.className = "cart__item__content";

      // Insertion "div"
      let productItemContentTitlePrice = document.createElement("div");
      produitItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className =
        "cart__item__content__titlePrice";

      // Insertion du titre h2
      let titreProduit = document.createElement("h2");
      productItemContentTitlePrice.appendChild(titreProduit);
      titreProduit.innerHTML = produitLocalStorage[product].name;

      // Insertion de la couleur
      let produitColor = document.createElement("p");
      titreProduit.appendChild(produitColor);
      produitColor.innerHTML = produitLocalStorage[product].color;

      // Insertion du prix
      let prixDuProduit = document.createElement("p");
      productItemContentTitlePrice.appendChild(prixDuProduit);
      prixDuProduit.innerHTML = produitLocalStorage[product].price + " €";
      console.log(prixDuProduit);
      // Insertion de l'élément "div"
      let productItemContentSettings = document.createElement("div");
      produitItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = "cart__item__content__settings";

      // Insertion de l'élément "div"
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(
        productItemContentSettingsQuantity
      );
      productItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";

      // Insertion de "Qté : "
      let productQte = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQte);
      productQte.innerHTML = "Qté : ";

      // Insertion de la quantité
      let productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = produitLocalStorage[product].quantity;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      // Insertion "div"
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";

      // Insertion de "p" supprimer
      let productSupprimer = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productSupprimer);
      productSupprimer.className = "deleteItem";
      productSupprimer.innerHTML = "Supprimer";
    }
  }
}

function getTotals() {
  // Récupération total des quantités
  var elemsQtt = document.getElementsByClassName("itemQuantity");
  var myLength = elemsQtt.length,
    totalQtt = 0;

  for (var i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQtt;
  console.log(totalQtt);

  // Récupération prix total
  totalPrice = 0;

  for (var i = 0; i < myLength; ++i) {
    totalPrice += elemsQtt[i].valueAsNumber * produitLocalStorage[i].price;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}
//modification de la quantité

function QuantityModif() {
  let quantityModif = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < quantityModif.length; i++) {
    quantityModif[i].addEventListener("change", (event) => {
      event.preventDefault();

      let ModifyQuantity = produitLocalStorage[i].quantity;
      let ModifyQuantityValeur = quantityModif[i].valueAsNumber;

      let Resultat = produitLocalStorage.find(
        (re) => re.ModifyQuantityValeur !== ModifyQuantity
      );

      Resultat.quantity = ModifyQuantityValeur;
      produitLocalStorage[i].quantity = Resultat.quantity;

      localStorage.setItem("product", JSON.stringify(produitLocalStorage));

      location.reload();
    });
  }
}
// suppression des produits

function SupprimProduit() {
  let bouton_suppr = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < bouton_suppr.length; i++) {
    bouton_suppr[i].addEventListener("click", (event) => {
      event.preventDefault();

      let ElementSupp = produitLocalStorage[i].id;
      let SupprCouleur = produitLocalStorage[i].color;

      produitLocalStorage = produitLocalStorage.filter(
        (re) => re.id !== ElementSupp || re.color !== SupprCouleur
      );

      localStorage.setItem("product", JSON.stringify(produitLocalStorage));

      alert("le produit à été supprimé");

      location.reload();
    });
  }
}

//validation du formulaire avec regex

function FormVal() {
  let formulaire = document.querySelector(".cart__order__form");

  let emailChara = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charactere = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressChara = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Ecoute de la modification du prénom
  formulaire.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Ecoute de la modification du nom
  formulaire.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute de la modification adresse
  formulaire.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute de la modification ville
  formulaire.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute de la modification email
  formulaire.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let msgErrorPrenom = inputFirstName.nextElementSibling;

    if (charactere.test(inputFirstName.value)) {
      msgErrorPrenom.innerHTML = "";
    } else {
      msgErrorPrenom.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let msgErrorNom = inputLastName.nextElementSibling;

    if (charactere.test(inputLastName.value)) {
      msgErrorNom.innerHTML = "";
    } else {
      msgErrorNom.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressChara.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charactere.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailChara.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
//envoi du formulaire

function FormSend() {
  const commander = document.getElementById("order");

  commander.addEventListener("click", (event) => {
    event.preventDefault();
    //envoi des coordonnées du formulaire client
    let inputName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAdress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputMail = document.getElementById("email");

    //Construction d'un array depuis le local storage
    let ids = [];
    for (let i = 0; i < produitLocalStorage.length; i++) {
      ids.push(produitLocalStorage[i].id);
    }

    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputMail.value,
      },
      products: ids,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    //recuperation des options depuis l'api

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();

        localStorage.setItem("orderId", data.orderId);

        const urlOrder = (document.location.href =
          "confirmation.html" + "?" + "id" + "=" + data.orderId);
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  });
}

//confirmationOrderId() //
getCart();
getTotals();
QuantityModif();
SupprimProduit();
FormVal();
FormSend();
