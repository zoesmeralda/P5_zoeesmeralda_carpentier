//confirmation finale recuperation du numero de commande

function confirmationFinale() {
  const idNode = document.getElementById("orderId");
  idNode.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
  localStorage.removeItem("orderID");
  localStorage.removeItem("product");
}

confirmationFinale();
