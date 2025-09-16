import { cart } from "../data/cart.js";    
// Generate products grid

let productHtml = ``;
products.forEach(product => {
    productHtml += `<div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
            <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary  js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
        </button>
        </div>
    `
});

let productsGrid = document.querySelector('.products-grid');
productsGrid.innerHTML = productHtml;


let addToCartButtons = document.querySelectorAll('.js-add-to-cart');
addToCartButtons.forEach((button)=>
{
    button.addEventListener('click',()=>{
        let matchingItem;
        const productId = button.dataset.productId;
        cart.forEach((item)=>{
            if(item.id === productId)
            {
                matchingItem = item;
            }
        })
        if(matchingItem)
        {
            matchingItem.quantity +=parseInt(button.parentElement.querySelector('select').value);
        }
        else
        {
            cart.push({
                id: productId,
                quantity: parseInt(button.parentElement.querySelector('select').value)
            })
        }
        let cartQuantity = 0;
        cart.forEach((item)=>{
            cartQuantity += item.quantity;
        });
        document.querySelector('.cart-quantity').innerText = cartQuantity;

        let addedToCart = button.parentElement.querySelector('.added-to-cart');
        addedToCart.classList.add('js-added-to-cart');
        setTimeout(()=>{
            addedToCart.classList.remove('js-added-to-cart');
        },1000)
    })
});

