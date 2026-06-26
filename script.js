const page = document.body.dataset.page;
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let buyNowItem = JSON.parse(localStorage.getItem("buyNow")) || [];


// home
if (page === "home") {
  
    async function fetchProducts() {

        try{
            
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            const productsContainer = document.getElementById("products-grid");

            if (!response.ok){
                throw new Error("Could not fetch resource");
            }

            productsContainer.innerHTML = "";

            data.forEach(product => {
                const card = document.createElement("div");
                card.classList.add("product");
                
                const img = document.createElement("img");
                img.src = product.image;

                const title = document.createElement("p");
                title.textContent = product.title;

                const price = document.createElement("p");
                price.classList.add("price");
                price.textContent = "$" + product.price;

                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("buttonContainer");

                const addButton = document.createElement("button");
                addButton.textContent = "Add to Cart";
                addButton.classList.add("addButton");
                

                const buyButton = document.createElement("button");
                buyButton.textContent = "Buy Now";

                buttonContainer.appendChild(addButton);
                buttonContainer.appendChild(buyButton);
                

                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(price);
                card.appendChild(buttonContainer);

                addButton.addEventListener("click", () => {
                    addButton.textContent = "Added to Cart";

                    cartItems.push({
                        title: product.title,
                        price: product.price,
                        image: product.image
                    });

                    localStorage.setItem("cart", JSON.stringify(cartItems));
                })

                buyButton.addEventListener("click", () => {

                    const buyNowItem = [{
                        title: product.title,
                        price: product.price,
                        image: product.image
                    }];

                    localStorage.setItem("buyNow", JSON.stringify(buyNowItem));

                    window.location.href = "cart.html";
                });

                productsContainer.appendChild(card);

            });
            
        }
        catch(error){
            console.log(error);
        }

        
    }

    fetchProducts();

}

// cart
if (page === "cart") {
  const buyNowData = JSON.parse(localStorage.getItem("buyNow")) || [];

  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  console.log(cartData);
  console.log(buyNowData);

  const cardContainer = document.getElementById("cart-items");

  let itemsToShow;

    if (buyNowData.length > 0) {
        itemsToShow = buyNowData;
    } else {
        itemsToShow = cartData;
    }

    const isBuyNow = buyNowData.length > 0;

    itemsToShow.forEach((product, index) => {
        const cardCart = document.createElement("div");
        cardCart.classList.add("card-cart");

        const imgCart = document.createElement("img");
        imgCart.src = product.image;

        const info = document.createElement("div");
        info.classList.add("card-info");

        const titleCart = document.createElement("p");
        titleCart.textContent = product.title;

        const priceCart = document.createElement("p");
        priceCart.classList.add("price");
        priceCart.textContent = "$" + product.price;

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.textContent = "Remove Item";

        cardContainer.appendChild(cardCart);

        info.appendChild(titleCart);
        info.appendChild(priceCart);

        cardCart.appendChild(imgCart);
        cardCart.appendChild(info);
        cardContainer.appendChild(cardCart);
        cardCart.appendChild(removeBtn);

        removeBtn.addEventListener(("click"), () => {
            
            itemsToShow.splice(index, 1);

            if (isBuyNow) {
                localStorage.setItem("buyNow", JSON.stringify(itemsToShow));
            } else {
                localStorage.setItem("cart", JSON.stringify(itemsToShow));
            }

            total -= product.price;
            totalElement.textContent = total.toFixed(2);

            cardCart.remove();

        });
    });

    let total = 0;

    itemsToShow.forEach(product => {
        total += product.price;
    })

    const totalElement = document.getElementById("total");
    totalElement.textContent = total.toFixed(2);

}
