const cart = [];

export {cart};

// The code below is for adding items to the cart and updating the cart quantity display.
// It would typically be found in a file like scripts/amazon.js

export function addToCart(productId, button) {
    let matchingItem;
    cart.forEach((cartItem)=>{
            if(cartItem.id === productId)
            {
                matchingItem = cartItem;
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
}