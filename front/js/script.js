fetch("http://localhost:3000/api/products/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    var section = document.querySelector("section");
    console.log(value);
    for (let index = 0; index < value.length; index++) {
      // creation element
      const dataAPI = value[index];
      const imageArticle = document.createElement("img");
      imageArticle.setAttribute("id", "imageAPI");
      const productLink = document.createElement("a");

      productLink.setAttribute("href", "product.html?" + "id=" + dataAPI._id);
      const articleItems = document.createElement("article");
      const productName = document.createElement("h3");
      const productDescription = document.createElement("p");

      //variable pour parent/enfant

      var parent1 = section.appendChild(productLink);
      console.log(parent1);
      var parent2 = productLink.appendChild(articleItems);
      var parent3 = articleItems.appendChild(imageArticle);
      var parent4 = articleItems.appendChild(productName);
      var parent5 = articleItems.appendChild(productDescription);

      // recupérer les données de l'api ainis que l'attreibu alt

      var element1 = value[index].name;
      var element2 = value[index].imageUrl;
      var element3 = value[index].description;
      var element5 = value[index].altTxt;
      imageArticle.setAttribute("alt", element5);

      // recuperer source et afficher en fonction de leur variable

      imageArticle.src = element2;
      productName.innerHTML = element1;
      productDescription.innerHTML = element3;
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
