document.getElementById("cart-button").addEventListener("click", function() {
    document.getElementById("cart").classList.toggle("hidden")
})

/*Test-funksjon for produktopplisting*/

function fetchProduct(){
    let productHTML = ""
    products.map(p => productHTML += `<article class="product-card">
                <img src="website_images/PROD_${p.imagefile}" alt="${p.title}">
                <a href="#">${p.category}</a>
                <h3>${p.title}</h3>
                <p>Kr. ${p.price}</p>
                <button onClick="addToCart(${p.prodid})">Legg til handlevogn</button>
            </article>`)

            document.getElementById("product-list").innerHTML = productHTML
            /*Kaller på variabelen som konstruerer ny HTML */
}

fetchProduct()

/*Generer handlevogn*/
function showCart(){
    //Unike produkter, et nytt sett
    let uniqueItems = new Set(cart)
    //... er lik spread, altså spre verdier
    //Array med unike id-ene
    let uniqueArray = [...uniqueItems]
    //Oversikt over antall per produkt
    let cartItems = []
    //Løpe gjennom alle unike produkter
    //Filterer produkt id-en 
    uniqueArray.map(item => {
        cartItems.push({prodid: item, quantity: cart.filter(i => i === item).length})
    })

    //Gå gjennom cartItems for å lage HTML til handlevognen og regne ut totalpris
    //Gå gjennom, løpe gjennom - map, filter, forEach
    let cartHTML = ""
    let totalPrice = 0

    cartItems.map(ci => {
        //Hente produktinformasjon
        let product = products.find(i => i.prodid === ci.prodid)
        //Skrive ut HTML
        cartHTML += `<tr>
                    <td class="title">${product.title}</td>
                    <td class="price">${product.price}</td>
                    <td class="quantity">${ci.quantity}</td>
                    <td class="delete"><button onClick="deleteFromCart(${product.prodid})">X</button></td>
                </tr>`
        //Summere totalpris, (+= pris * antall) 
        totalPrice += Number(product.price) * Number(ci.quantity)
    })

    if(cart.length === 0){
        cartHTML += "<tr><td>Ingen varer i handlevognen<td><tr>"
    }

    //---Oppdatere HTML-elementer---

    //Id-en til handlevognen, og referer til variabelen som lager handlevognen
    document.getElementById("cart-items").innerHTML = cartHTML
    //Skriver ut totalprisen, altså summen
    document.getElementById("total-price").innerHTML = totalPrice
    document.getElementById("cart-quantity").innerHTML = cart.length

}

function deleteFromCart(prodid){
    //indexOf - første treffet av en verdi (jakten på en index i en array)
    let deleteIndex = cart.indexOf(prodid)
    if(deleteIndex > -1){
        cart.splice(deleteIndex, 1)
    }
    //Oppdatere handlevogn-utskrift
    showCart()
}


/*Legg til handlevogn*/

function addToCart(prodid){
    console.log("legg til produkt med id:" + prodid)
    cart.push(prodid)
    console.log(cart)

    //Oppdaterer handlevognvisning:
    showCart()
}

