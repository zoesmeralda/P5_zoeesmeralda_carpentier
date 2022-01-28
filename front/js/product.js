const str = window.location.href;
let url = new URL(str);
let productId = url.searchParams.get("id");
console.log(productId);

const couleur = document.querySelector("#colors");
const quantité = document.querySelector("#quantity");

var datApi;
fetch("http://localhost:3000/api/products/" + productId)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (article) {
    datApi = article;
    if (datApi) {
      prendrePro(datApi);
    }
  });
//recuperation du produit dans l'api
function prendrePro(datApi) {
  let imageArticle = document.createElement("img");
  document.querySelector(".item__img").appendChild(imageArticle);
  imageArticle.src = datApi.imageUrl;
  imageArticle.alt = datApi.altTxt;

  // "h1"
  let productName = document.getElementById("title");
  productName.innerHTML = datApi.name;

  //  prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = datApi.price;

  // description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = datApi.description;

  // Insertion des options de couleurs
  for (let colors of datApi.colors) {
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
}

//ajout couleur quantite au local storage

function addLocalstorage(datApi) {
  let colorChoice = couleur.value;
  let quantityChoice = quantité.value;
  console.log(colorChoice, quantityChoice);

  let choix = {
    id: productId,
    image: datApi.imageUrl,
    name: datApi.name,
    price: datApi.price,
    color: colorChoice,
    quantity: Number(quantityChoice),
  };

  //*local storage
  let produitLocalStorage = JSON.parse(localStorage.getItem("product"));

  let update = false;
  // si il y a des produits
  console.log(
    productId,
    colorChoice,
    quantityChoice,
    produitLocalStorage,
    choix
  );
  if (produitLocalStorage && produitLocalStorage.length > 0) {
    console.log("produitLocalStorageexistant");
    produitLocalStorage.forEach(function (productOk, key) {
      if (productOk.id == productId && productOk.color == colorChoice) {
        produitLocalStorage[key].quantity =
          parseInt(productOk.quantity) + parseInt(quantityChoice);
        update = true;
      }
    });

    if (!update) {
      produitLocalStorage.push(choix);
    }
  }

  // si il n'y a pas de produit
  else {
    produitLocalStorage = [];
    produitLocalStorage.push(choix);
    console.log("localStoragevide", produitLocalStorage);
  }

  localStorage.setItem("product", JSON.stringify(produitLocalStorage));
}
const addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", function () {
  console.log("addEventListener");
  confirmCart();
  addLocalstorage(datApi);
});
let confirmCart = () => {
  alert("Ajouté au panier");
};
